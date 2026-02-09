import DocumentVisitor from '../parser/DocumentVisitor.js';

/**
 * Visitor that interprets the document and generates HTML/SVG.
 */

class Pen {
    static UP = 0;
    static DOWN = 1;
    constructor(state) {
        this._state = state || Pen.UP;
    }
    isUp() { return this._state == Pen.UP; }
    isDown() { return this._state == Pen.DOWN; }
    up() { this._state = Pen.UP; console.log('UP'); }
    down() { this._state = Pen.DOWN; console.log('DOWN'); }
}

class Types {
    static NUM = 'Types.NUM';
    static STR = 'Types.STR';
    static ARROW = 'Types.ARROW';
    static GRAPHEMES = 'Types.GRAPHEMES';
}

class Symbol {
    constructor(type, val) {
        console.log(`new Symbol: ${type}, ${val}`);

        switch(type) {
            case Types.NUM:
                this.val = Number(val);
                this.type = Types.NUM;
            break;

            case Types.STR:
                this.val = val;
                this.type = Types.STR;
            break;

            case Types.ARROW:
                this.val = val;
                this.type = Types.ARROW;
            break;

            case Types.GRAPHEMES:
                this.val = val;
                this.type = Types.GRAPHEMES;
            break;
        }

    }

    static _numBinOp(name, a1, a2, op) {
        if(a1.type != Types.NUM || a2.type != Types.NUM) throw new SyntaxError(`Types: ${a1.type} and ${a2.type}, invalid for '${name}'.`)
        return new Symbol(Types.NUM, op(a1.val,a2.val));
    }
    static add(a1, a2) {
        return Symbol._numBinOp('+', a1, a2, (a,b) => a+b);
    }
    static sub(a1, a2) {
        return Symbol._numBinOp('-', a1, a2, (a,b) => a-b);
    }
    static mul(a1, a2) {
        return Symbol._numBinOp('*', a1, a2, (a,b) => a*b);
    }
    static div(a1, a2) {
        return Symbol._numBinOp('*', a1, a2, (a,b) => a/b);
    }
    static negate(a) {
        if(a1.type != Types.NUM) throw new SyntaxError(`Type: ${a.type}, invalid for '-'.`)
        return new Symbol(Types.NUM, -a.val);
    }
    static copy(a) {
        return new Symbol(a.type, a.val);
    }
}

const Extras = {
    NOOP: (arg) => {},
    KEYWORD: (name, kw) => { 
        return (arg) => {if(arg.val != kw) throw new SyntaxError(`Value: ${arg.val} is not allowed as argument to '${name}'. Only '${kw}' may be used.`); }
    },
    KEYWORDS: (name, kws) => { 
        return (arg) => {if(!kws.includes(arg.val)) throw new SyntaxError(`Value: ${arg.val} is not allowed as argument to '${name}'. Only ${kws.map(kw => `'${kw}'`).join(', ')} may be used.`); }
    }
}

class Turtle {
    constructor() {
        this.x = 0; 
        this.y = 0; // (0,0) is bottom left
        this.angle = -90; //"0" is north
        this.pen = new Pen(Pen.UP);
        this.paths = [null];

        this.width = 1;
        this.height = 1;
        this.isSizeSet = false;

        this.strokeWidth = 0.1;

        this._commands = {
            'move': { 
                signatures: [[Types.NUM, Types.NUM]],
                run:        [(args) => this._move(args[0].val, args[1].val)]
            },
            'forward': {
                signatures: [[Types.NUM]],
                run:        [(args) => this._forward(args[0].val)]
            },
            'right': {
                signatures: [[Types.NUM]],
                run:        [(args) => this._right(args[0].val)]
            },
            'left': {
                signatures: [[Types.NUM]],
                run:        [(args) => this._left(args[0].val)]
            },
            'back': {
                signatures: [[Types.NUM]],
                run:        [(args) => this._left(args[0].val)]
            },
            'rotate': {
                signatures: [[Types.NUM]],
                run:        [(args) => this._rotate(args[0].val)]
            },
            'pen': {
                signatures: [[Types.STR]],
                extra:      [[Extras.KEYWORDS('pen', ['up','down'])]], // extra must have the same shape as signatures, and provide an extra function for each parameter, that either does nothing or throws an error.
                run:        [(args) => (args[0].val == 'up') ? this.pen.up() : this.pen.down()]
            },
            'size': {
                signatures: [[Types.NUM], [Types.NUM, Types.NUM]],
                run:        [(args) => this._size(args[0].val,args[0].val), (args) => this._size(args[0].val,args[1].val)]
            },
            'goto': {
                signatures: [
                    [Types.NUM, Types.NUM], // goto(x, y)
                    [Types.NUM, Types.NUM, Types.STR, Types.NUM, Types.NUM, Types.NUM, Types.NUM] // goto(x,y,'curve',h1x,h1y,h2x,h2y)
                ],
                extra: [
                    [Extras.NOOP, Extras.NOOP],
                    [Extras.NOOP, Extras.NOOP, Extras.KEYWORD('goto', 'curve'), Extras.NOOP, Extras.NOOP,Extras.NOOP, Extras.NOOP]
                ],
                run: [
                    (args) => this._goto(args[0].val,args[1].val),
                    (args) => this._goto(args[0].val,args[1].val,true,args[3].val,args[4].val,args[5].val,args[6].val)
                ]
            },
            'stroke': {
                signatures: [[Types.NUM]],
                run:        [(args) => this._strokeWidth(args[0].val)]
            }
        }
    }

    _validateName(name) {
        if(!(name in this._commands)) throw new ReferenceError(`'${name}' has not be declared.`);
    }

    _validateArgs(name, args) {
        const command = this._commands[name];
        
        for(let i = 0; i < command.signatures.length; i++) {
            let matchI = i;
            let match = true;
            if(args.length != command.signatures[i].length) { match = false; continue }
            console.log(args);
            for(let j = 0; j < args.length; j++) {
                console.log(`arg: ${args[j]} ${args[j].type} ${args[j].val}`)
                if(args[j].type != command.signatures[i][j]) { match = false; continue }
                if(command.extra !== undefined) command.extra[i][j](args[j]); // if arg is of correct type, and there is an extra list defined, arg must pass the extra condition
            }
            if(match) {
                console.log(`matching rule: '${matchI}' for [[${name} ${args.map(arg => arg.val).join(' ')}]]`);
                return matchI;
            }
        }

        throw new SyntaxError( `No signature found for ${name} matching arguments: (${args.length})[${ args.map(arg => arg.type).join(' ') }]` );
    }

    _runCommand(name, args, signatureIndex) {
        this._commands[name].run[signatureIndex](args);
    }

    runCommand(name, args) {
        this._validateName(name);
        const signatureIndex = this._validateArgs(name, args);
        this._runCommand(name, args, signatureIndex);
    }

    degToRad(deg) {
        return deg * Math.PI / 180;
    }

    _strokeWidth(newSW) {
        if(newSW === this.strokeWidth) return;
        this._new_path();
        this.strokeWidth = newSW;
    }

    _size(width, height) { 
        if(this.isSizeSet) {
            throw new SyntaxError("'size' can only be called once per definition");
        }
        this.width=width; 
        this.height=height; 
        this.isSizeSet=true; 
    }

    _home() { this._goto(0,0); }

    _append_to_path(data) { 
        const end = this.paths.length-1;
        if(this.paths[end] === null) {
            this.paths[end] = '<path d="';
        }
        this.paths[end] += data; 
    }

    _close_path() { this._append_to_path(`" stroke="#000" stroke-width="${this.strokeWidth}" fill="none"/>`); }
    _new_path() { this._close_path(); this.paths.push(null); }

    _goto_raw(newX, newY) {
        newY = this.height - newY;
        this._append_to_path(`${newX} ${newY}`);
        this.x = newX;
        this.y = newY;
    }

    _goto(newX, newY, isCurve, h1x, h1y, h2x, h2y) {
        if(this.pen.isUp()) {
            this._append_to_path('M'); // curve doesnt matter if pen is up, just move
        } else if(isCurve) {
            this._append_to_path(`C${h1x} ${h1y} ${h2x} ${h2y} `); // add curve handles
        } else { //line
            this._append_to_path('L'); // regular line
        }
        this._goto_raw(newX, newY);
    }

    _move_raw(dx, dy) {
        dy *= -1;
        this._append_to_path(`${dx} ${dy}`);
        this.x += dx;
        this.y += dy;
    }

    _move(dx, dy) { 
        this._append_to_path(this.pen.isDown() ? 'l' : 'm'); //pen down = Line to, pen up = Move to, lower means relative coordinates
        this._move_raw(dx, dy);
    }

    _forward(dist, aOff = 0) { 
        const th = this.degToRad(this.angle + aOff);
        this._move(Math.cos(th) * dist, Math.sin(th) * dist);
    }

    _right(dist) { this._forward(dist,  90); }
    _left(dist)  { this._forward(dist, -90); }
    _back(dist)  { this._forward(dist, 180); }

    _rotate(deg) { this.angle += deg; }

    toSVG() {
        if(!this.paths.at(-1).endsWith('/>')) this._close_path();
        return `
<svg
  width="${this.width*10}"
  height="${this.height*10}"
  viewBox="0 0 ${this.width} ${this.height}"
  xmlns="http://www.w3.org/2000/svg"
>

${this.paths.filter(path => path !== null).join('\n')}

</svg>
`;
    }
}

function log(name, obj) { console.log('DEBUG:', name, '[', obj, ']'); return obj; }

export default class GraphemeVisitor extends DocumentVisitor {
    constructor() {
        super();
        this.symbolTable = {};
        this.curr_turtle = null;
    }

    // document: assignment* grapheme_list EOF ;
    visitDocument(ctx) {
        for (let i = 0; i < ctx.assignment().length; i++) {
            this.visit(ctx.assignment(i));
        }
        return log('doc', this.visit(ctx.grapheme_list()));
    }

    // assignment: iden_list ASSIGN grapheme_list SEMICOLON ;
    visitAssignment(ctx) {
        const names = this.visit(ctx.iden_list());

        const graphemes = this.visit(ctx.grapheme_list());
        for (const name of names) {
            this.symbolTable[name] = new Symbol(Types.GRAPHEMES, graphemes);
        }

    }

    // iden_list: IDEN (COMMA IDEN)* ;
    visitIden_list(ctx) {
        return ctx.IDEN().map(token => token.getText());
    }

    // grapheme_list: grapheme+ ;
    visitGrapheme_list(ctx) {
        let result = '';
        for (let i = 0; i < ctx.grapheme().length; i++) {
            const g = this.visit(ctx.grapheme(i));
            console.log(g);
            if(g.type != Types.GRAPHEMES) throw new SyntaxError(`Invalid type in grapheme list: ${g.type}`);
            result += g.val + '\n';
        }
        return log('graphemelist', result);
    }

    // grapheme: IDEN | OPEN_CURLY command_list CLOSE_CURLY ;
    visitGrapheme(ctx) {
        if (ctx.IDEN()) {
            const name = ctx.IDEN().getText();
            if (!(name in this.symbolTable)) throw new ReferenceError(`'${name}' has not been declared.`);
            if(this.symbolTable[name].type != Types.GRAPHEMES) throw new SyntaxError(`Cannot assign variable of type: '${this.symbolTable[name].type}' to type ${Types.GRAPHEMES}.`);
            return this.symbolTable[name];
        } else {
            if(this.curr_turtle !== null) throw new SyntaxError("New Grapheme created before previous closed.");
            
            this.curr_turtle = new Turtle();
            this.visit(ctx.command_list());
            const grapheme = this.curr_turtle.toSVG();
            
            this.curr_turtle = null;

            return log('grapheme', new Symbol(Types.GRAPHEMES, grapheme));
        }
    }

    // command_list: (command SEMICOLON)* command SEMICOLON? ;
    visitCommand_list(ctx) {
        if(this.curr_turtle === null) throw new SyntaxError("No turtle passed to visitCommand_list");
        for (let i = 0; i < ctx.command().length; i++) {
            this.visit(ctx.command(i));
        }
    }

    // command: group
    visitCommandGroup(ctx) {
        if(this.curr_turtle === null) throw new SyntaxError("No turtle passed to visitCommandGroup");
        return this.visit(ctx.group());
    }

    // command: iden_list ASSIGN expr
    visitAssignCommand(ctx) {
        if(this.curr_turtle === null) throw new SyntaxError("No turtle passed to visitAssignCommand");
        const names = this.visit(ctx.iden_list());
        const expr = this.visit(ctx.expr());
        
        if(expr.type != Types.NUM) throw new SyntaxError(`Cannot assign variable of type: '${expr.type}' to type ${Types.NUM}.`);

        for (const name of names) {
            this.symbolTable[name] = Symbol.copy(expr);
        }

    }

    // command: IDEN arg*
    visitFunctionCommand(ctx) {
        if(this.curr_turtle === null) throw new SyntaxError("No turtle passed to visitFunctionCommand");
        const name = ctx.IDEN().getText();
        const args = ctx.arg().map(argCtx => this.visit(argCtx));
        this.curr_turtle.runCommand(name, args);
        return;
    }

    // group: OPEN_SQUARE command_list CLOSE_SQUARE ;
    visitGroup(ctx) {
        return `<div class="group">\n${this.visit(ctx.command_list())}\n</div>`;
    }

    // arg: expr | arrow ;
    visitArg(ctx) {
        if (ctx.expr())  return this.visit(ctx.expr());
        if (ctx.arrow()) return new Symbol(Types.ARROW, this.visit(ctx.arrow()));
    }

    // expr: (PLUS | DASH) expr
    visitUnarySign(ctx) {
        const child = this.visit(ctx.expr());
        if(ctx.PLUS()) {
            return child;
        } else if(ctx.DASH()) {
            return Symbol.negate(child);
        } else {
            throw new SyntaxError(`Unknown unary operator: '${ctx.op.text}', expected '+' or '-'.`);
        }
    }

    // expr: OPEN_PAREN expr CLOSE_PAREN
    visitParens(ctx) {
        return this.visit(ctx.expr());
    }

    // expr: expr op=(STAR | SLASH) expr
    visitMulDiv(ctx) {
        const left  = this.visit(ctx.expr(0));
        const right = this.visit(ctx.expr(1));
        if(ctx.op.text == '*') {
            return Symbol.mul(left, right);
        } else if(ctx.op.text == '/') {
            return Symbol.div(left, right);
        } else {
            throw new SyntaxError(`Unknown binary operator: '${ctx.op.text}', expected '*' or '/'.`);
        }
    }

    // expr: expr op=(PLUS | DASH)  expr
    visitAddSub(ctx) {
        const left  = this.visit(ctx.expr(0));
        const right = this.visit(ctx.expr(1));
        if(ctx.op.text == '+') {
            return Symbol.add(left, right);
        } else if(ctx.op.text == '-') {
            return Symbol.sub(left, right);
        } else {
            throw new SyntaxError(`Unknown binary operator: '${ctx.op.text}', expected '+' or '-'.`);
        }
    }

    // expr: NUM
    visitNumber(ctx) {
        return new Symbol(Types.NUM, ctx.NUM().getText());
    }

    // expr: IDEN
    visitIden(ctx) {
        /* in an expression, an IDEN might be:
         *   - a string, as in `pen *up*`
         *   - an int, as in `x = 10; forward *x*` 
         *   - or an invalid type, as in `x = { ... }; y = { forward *x*; };`
         */

        const name = ctx.IDEN().getText();
        if(!(name in this.symbolTable)) return new Symbol(Types.STR, name); // if it's not in the symbol table implicit cast to string

        switch(this.symbolTable[name].type) {
            case Types.NUM: return Symbol.copy(this.symbolTable[name]);
            default: throw new SyntaxError(`Invalid type in numeric expression: ${this.symbolTable[name].type}`);
        }
    }

    // arrow: PIPE? DASH arrow_head? ;
    visitArrow(ctx) {
        let out = '';
        if (ctx.PIPE()) out += '|';
        if (ctx.DASH()) out += '-';
        if (ctx.arrow_head()) out += this.visit(ctx.arrow_head());
        return out;
    }

    // arrow_head: BANG | DOT+ | CLOSE_ANGLE DOT* ;
    visitArrow_head(ctx) {
        if (ctx.BANG()) return '!';
        if (ctx.DOT()) return '.'.repeat(ctx.DOT().length);
        if (ctx.CLOSE_ANGLE()) {
            return '>' + '.'.repeat(ctx.DOT().length);
        }
    }
}