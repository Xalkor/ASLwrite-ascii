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

class Arg {
    static NUM = 'NUM';
    static IDEN = 'IDEN';
    static ARROW = 'ARROW';

    constructor(type, strVal) {
        console.log(`new Arg: ${type}, ${strVal}`);

        switch(type) {
            case Arg.NUM:
                this.val = Number(strVal);
                this.type = Arg.NUM;
            break;

            case Arg.IDEN:
                this.val = strVal;
                this.type = Arg.IDEN;
            break;

            case Arg.ARROW:
                this.val = strVal;
                this.type = Arg.ARROW;
            break;
        }

    }
}

class Turtle {
    constructor() {
        this.x = 0; 
        this.y = 0; // (0,0) is bottom left
        this.angle = -90; //"0" is north
        this.pen = new Pen(Pen.UP);
        this.strokes = [];

        this.width = 1;
        this.height = 1;
        this.isSizeSet = false;

        this.strokeWidth = 0.1;

        this._commands = {
            'move': { 
                signatures: [[Arg.NUM, Arg.NUM]],
                run:        [(args) => this._move(args[0].val, args[1].val)]
            },
            'forward': {
                signatures: [[Arg.NUM]],
                run:        [(args) => this._forward(args[0].val)]
            },
            'right': {
                signatures: [[Arg.NUM]],
                run:        [(args) => this._right(args[0].val)]
            },
            'left': {
                signatures: [[Arg.NUM]],
                run:        [(args) => this._left(args[0].val)]
            },
            'back': {
                signatures: [[Arg.NUM]],
                run:        [(args) => this._left(args[0].val)]
            },
            'rotate': {
                signatures: [[Arg.NUM]],
                run:        [(args) => this._rotate(args[0].val)]
            },
            'pen': {
                signatures: [[Arg.IDEN]],
                extra:      [[(arg) => { if(arg.val != 'up' && arg.val != 'down') throw new SyntaxError(`Value: ${arg.val} is not allowed as argument to 'pen'. Only 'up' and 'down' may be used.`); }]], // extra must have the same shape as signatures, and provide an extra function for each parameter, that either does nothing or throws an error.
                run:        [(args) => (args[0].val == 'up') ? this.pen.up() : this.pen.down()]
            },
            'size': {
                signatures: [[Arg.NUM], [Arg.NUM, Arg.NUM]],
                run:        [(args) => this._size(args[0].val,args[0].val), (args) => this._size(args[0].val,args[1].val)]
            },
            'goto': {
                signatures: [[Arg.NUM, Arg.NUM]],
                run:        [(args) => this._goto(args[0].val,args[1].val)]
            },
            'stroke': {
                signatures: [[Arg.NUM]],
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
                console.log(`arg: ${args[j].type} ${args[j].val}`)
                if(args[j].type != command.signatures[i][j]) { match = false; continue }
                if(command.extra !== undefined) command.extra[i][j](args[j]); // if arg is of correct type, and there is an extra list defined, arg must pass the extra condition
            }
            if(match) {
                console.log(`matching rule: '${matchI}' for [[${name} ${args.map(arg => arg.val).join(' ')}]]`);
                return matchI;
            }
        }

        throw new SyntaxError( `No signature found for ${name} matching arguments: ${ args.map(arg => arg.type).join(' ') }` );
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

    _goto(newX, newY) {
        if(this.pen.isDown()) {
            this.strokes.push(`
<line
    x1="${this.x}"
    y1="${this.height-this.y}"
    x2="${newX}"
    y2="${this.height-newY}"
    stroke="black"
    stroke-width="${this.strokeWidth}"
/>`);
        }
        this.x = newX;
        this.y = newY;
    }

    _move(dx, dy) { this._goto(this.x + dx, this.y + dy); }

    _forward(dist, aOff = 0) { 
        const th = this.degToRad(this.angle + aOff);
        const newX = this.x + Math.cos(th) * dist;
        const newY = this.y + Math.sin(th) * dist;

        this._goto(newX, newY);
    }

    _right(dist) { this._forward(dist,  90); }
    _left(dist)  { this._forward(dist, -90); }
    _back(dist)  { this._forward(dist, 180); }

    _rotate(deg) { this.angle += deg; }

    toSVG() {
        return `
<svg
  width="${this.width*10}"
  height="${this.height*10}"
  viewBox="0 0 ${this.width} ${this.height}"
  xmlns="http://www.w3.org/2000/svg"
>

${this.strokes.join('\n')}

</svg>
`;
    }
}

export default class GraphemeVisitor extends DocumentVisitor {
    constructor() {
        super();
        this.assignments = {};
        this.curr_turtle = null;
    }

    // document: assignment* grapheme_list EOF ;
    visitDocument(ctx) {
        for (let i = 0; i < ctx.assignment().length; i++) {
            this.visit(ctx.assignment(i));
        }
        return this.visit(ctx.grapheme_list());
    }

    // assignment: iden_list ASSIGN grapheme_list SEMICOLON ;
    visitAssignment(ctx) {
        const names = this.visit(ctx.iden_list());

        const graphemes = this.visit(ctx.grapheme_list());
        for (const name of names) {
            this.assignments[name] = graphemes;
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
            result += this.visit(ctx.grapheme(i)) + '\n';
        }
        return result;
    }

    // grapheme: IDEN | OPEN_CURLY command_list CLOSE_CURLY ;
    visitGrapheme(ctx) {
        if (ctx.IDEN()) {
            const name = ctx.IDEN().getText();
            if (this.assignments[name]) {
                return this.assignments[name];
            } else {
                throw new ReferenceError(`'${name}' has not been declared.`);
            }
        } else {
            if(this.curr_turtle !== null) throw new SyntaxError("New Grapheme created before previous closed.");
            
            this.curr_turtle = new Turtle();
            this.visit(ctx.command_list());
            const grapheme = this.curr_turtle.toSVG();
            
            this.curr_turtle = null;

            return grapheme;
        }
    }

    // command_list: (command SEMICOLON)* command SEMICOLON? ;
    visitCommand_list(ctx) {
        if(this.curr_turtle === null) throw new SyntaxError("No turtle passed to visitCommand_list");
        for (let i = 0; i < ctx.command().length; i++) {
            this.visit(ctx.command(i));
        }
    }

    // command: group | IDEN arg* ;
    visitCommand(ctx) {
        if(this.curr_turtle === null) throw new SyntaxError("No turtle passed to visitCommand");
        if (ctx.group()) {
            return this.visit(ctx.group());
        } else {
            const name = ctx.IDEN().getText();
            const args = ctx.arg().map(argCtx => this.visit(argCtx));
            this.curr_turtle.runCommand(name, args);
            return ;
        }
    }

    // group: OPEN_SQUARE command_list CLOSE_SQUARE ;
    visitGroup(ctx) {
        return `<div class="group">\n${this.visit(ctx.command_list())}\n</div>`;
    }

    // arg: IDEN | NUM | arrow ;
    visitArg(ctx) {
        if (ctx.IDEN())  return new Arg(Arg.IDEN , ctx.IDEN().getText()   );
        if (ctx.NUM())   return new Arg(Arg.NUM  , ctx.NUM() .getText()   );
        if (ctx.arrow()) return new Arg(Arg.ARROW, this.visit(ctx.arrow()));
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