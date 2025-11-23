%{
window.rootNode = null;

const DEBUG = false;

let vars = {
    '_font' : '../font',
    '_default-hand': 'R'
};

class Node {
    constructor() { 
        if (this.constructor == Node) {
            throw new Error("Abstract classes can't be instantiated.");
        } else if (DEBUG) {
            console.log(`new ${this.constructor.name} created:`);
        }
    }
    debugTreeString() { return this._debugTreeString('', '', true, true); }
    _debugTreeString(prefix, arc, last, root) { throw new Error("Method '_debugTreeString()' must be implemented."); };
    eval() { throw new Error("Method 'eval()' must be implemented."); };
}

class GroupList extends Node {
    constructor(firstGroup=null) {
        super();
        this.groups = firstGroup === null ? [] : [firstGroup];
    }

    push(group) {
        if(DEBUG) console.log(`group added to list`);
        this.groups.push(group);
        return this;
    }

    _debugTreeString(prefix, arc, last, root) {
        let s = `${prefix}${arc}GroupList\n`;
        if(this.groups.length == 0) return s;

        for(let i = this.groups.length-1; i >= 0 ; i--) {
            let lastGroup = i == 0;
            let indent =  (root ? '' : (last ? '         ' : ' │       '));
            let newArc = !lastGroup ? " ├───────:" : " └───────:";
            let nl = !lastGroup ? "\n" : "";
            s += `${this.groups[i]._debugTreeString(prefix + indent, newArc, lastGroup, false)}${nl}`;
        }

        return s;
    }

    eval() {
        return this.groups.map((_,i,gs) => gs[gs.length-i-1].eval());
    }
}

class Group extends Node {
    constructor(firstGroup = null, connector = null) {
        super();
        this.groups = firstGroup === null ? [] : [firstGroup];
        this.connectors = connector === null ? [] : [connector];
        if(DEBUG) {
            console.log(this.debugTreeString());
        }
    }

    push([group, connector]) {
        if(DEBUG) console.log(`group and connector added to group`);
        this.groups.push(group);
        this.connectors.push(connector);
        return this;
    }

    _debugTreeString(prefix, arc, last, root) {
        if(this.groups.length == 0) return `${prefix}${arc}Group{}`;

        let s = `${prefix}${arc}Group\n`;

        for(let i = this.groups.length-1; i >= 0 ; i--) {
            let lastGroup = i == 0;
            let indent =  (root ? '' : (last ? '         ' : ' │       '));
            let newArc = !lastGroup ? " ├───────:" : " └───────:";
            let nl = !lastGroup ? "\n" : "";
            s += `${this.groups[i]._debugTreeString(prefix + indent, newArc, lastGroup, false)}${nl}`;
            if(i != 0)
                s += `${this.connectors[i-1]._debugTreeString(prefix + indent, newArc, lastGroup, false)}\n`;
        }

        return s;
    }

    eval() {
        if (this.groups.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'empty-group';
            return empty;
        }

        if (this.groups.length === 1) {
            return this.groups[0].eval();
        }

        const firstGrapheme = this.groups[0].eval();
        let currentContainer = document.createElement('div');
        currentContainer.className = 'group-segment';
        currentContainer.appendChild(firstGrapheme);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'group-positioned-container';
        wrapper.appendChild(currentContainer);

        for (let i = 1; i < this.groups.length; i++) {
            const groupElement = this.groups[i].eval();
            
            const positionedWrapper = document.createElement('div');
            positionedWrapper.className = 'group-positioned';
            positionedWrapper.appendChild(groupElement);
            
            const connector = this.connectors[i - 1];
            const direction = connector.iden.asDir();
            
            positionedWrapper.classList.add(`position-${direction.toLowerCase()}`);
            
            if (connector.arrow && connector.arrow.constructor !== NullArrow) {
                const arrowContainer = document.createElement('div');
                arrowContainer.className = 'arrow-container';
                arrowContainer.classList.add(`arrow-direction-${direction.toLowerCase()}`);
                
                const arrowElement = connector.arrow.eval();
                arrowContainer.appendChild(arrowElement);
                
                currentContainer.appendChild(arrowContainer);
            }
            
            currentContainer.appendChild(positionedWrapper);
            
            currentContainer = positionedWrapper;
        }

        return wrapper;
    }
}

class Grapheme extends Node {
    constructor(digit, handedness = null, diacritic = null) {
        super();
        this.digit = digit;
        this.handedness = handedness;
        this.diacritic = diacritic;
        if(DEBUG) console.log(this.debugTreeString());
    }

    _debugTreeString(prefix, arc, last, root) {
        let digitStr = this.digit._debugTreeString('','');
        let handStr = this.handedness ? this.handedness._debugTreeString('','') : '<default hand>';
        if(this.diacritic) {
            let diacriticStr = this.diacritic._debugTreeString();
            return `${prefix}${arc}Grapheme{${digitStr}, ${handStr}, ${diacriticStr}}`;
        }
        return `${prefix}${arc}Grapheme{${digitStr}, ${handStr}}`;
    }

    eval() {
        let digitImg = this.digit.asImg();
        let isRight;
        if(this.handedness) {
            isRight = this.handedness.asHand() == "R";
        } else if(vars['_default-hand'] == 'R') {
            isRight = true;
        } else if(vars['_default-hand'] == 'L') {
            isRight = false;
        } else {
            throw new Error(`_default-hand must be set to L or R, not "${vars['_default-hand']}"`);
        }

        if(!isRight) {
            digitImg.classList.add('flip');
        }

        return digitImg;
    }
}

const digits = ["0-num","0-flat","1-num","1-claw","1-d","1-i","2-num","2-bend","2-claw","2-close","2-cross","3-num","3-claw","3-close","3-flat","3-k","4-num","4-close","4-claw","5-num","5-close","5-claw","5-half","5-bend","5-c","6-num","6-claw","6-inverse","7-num","7-8","8-num","8-inverse","8-open","9-num","10-num","10-a","10-s","10-t","20-num","1-thumb","20-claw","20-g"];
const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW", "U", "UR", "R", "BR", "B", "BL", "L", "UL"];
class Iden extends Node {
    constructor(val) {
        super();
        this.val = val;
        if(DEBUG) console.log(this.debugTreeString());
    }

    _debugTreeString(prefix, arc, last, root) {
        return `${prefix}${arc}Iden{${this.val}}`;
    }

    asImg() {
        if(digits.includes(this.val)) {
            let digitImg = document.createElement('img');
            digitImg.src = `${vars['_font']}/hand-shapes/${this.val}.svg`;
            return digitImg;
        }
        throw new Error(`Unknown digit name: "${this.val}"`);
    }

    asHand() {
        let upVal = this.val.toUpperCase();
        if(upVal == 'R' || upVal == 'L') return upVal;
        throw new Error(`"${this.val}" is not a valid hand name, must be L or R`);
    }

    asDir() {
        let upVal = this.val.toUpperCase();
        if(dirs.includes(this.val)) { 
            return upVal;
        }
        throw new Error(`"${this.val}" is not a valid direction name`);
    }

    eval() {}
}

class Diacritic extends Node {
    constructor(type) {
        super();
        this.type = type;
        if(DEBUG) console.log(this.debugTreeString());
    }

    _debugTreeString(prefix, arc, last, root) {
        return `Diacritic{${this.type}}`;
    }

    eval() { };
}

class Connector extends Node {
    constructor(iden, arrow = null) {
        super();
        this.iden = iden;
        this.arrow = arrow;
        if(DEBUG) console.log(this.debugTreeString());
    }

    _debugTreeString(prefix, arc, last, root) {
        return `${prefix}${arc}Connector{${this.iden._debugTreeString('','')}, ${this.arrow._debugTreeString()}}`;
    }

    eval() { };
}

class NullArrow extends Node {
    constructor(){ super(); if(DEBUG) console.log(this.debugTreeString()); }
    _debugTreeString() { return 'Arrow{}'; }
    isNull() { return true; }
}

class Arrow extends NullArrow {
    constructor(horizontal, firm, turn, numEndpoints = 0) {
        super();
        this.horizontal = horizontal;
        this.firm = firm;
        this.turn = turn;
        this.numEndpoints = numEndpoints;
        if(DEBUG) console.log(this.debugTreeString());
    }

    isNull() { return false; }
    setVertical() { this.horizontal = false; return this; }
    setHorizontal() { this.horizontal = true; return this; }

    _debugTreeString(prefix, arc, last, root) {
        let s = 'Arrow{' + (this.horizontal ? '-' : '|-');
        if(this.firm) {
            return s + '!}';
        }
        if(this.turn) {
            s += '>';
        }
        return s + '.'.repeat(this.numEndpoints) + '}';
    }

    eval() {
        // const arrow = document.createElement('span');
        // arrow.className = 'arrow-indicator';
        
        // let arrowText = '';
        
        // if (!this.horizontal) {
        //     arrowText += '|';
        // }
        
        // arrowText += '-';
        
        // if (this.firm) {
        //     arrowText += '!';
        // } else if (this.turn) {
        //     arrowText += '>';
        // }
        
        // arrowText += '.'.repeat(this.numEndpoints);
        
        // arrow.textContent = arrowText;
        // return arrow;

        const container = document.createElement('div');
        container.className = 'arrow-line-container';
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'arrow-svg');
        svg.dataset.endpoints = this.numEndpoints;
        
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('class', 'arrow-line');
        line.setAttribute('stroke', '#333');
        line.setAttribute('stroke-width', '2');
        svg.appendChild(line);

        for(let i = 0; i < this.numEndpoints; i++) {
            const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            dot.setAttribute('class', 'arrow-dot');
            dot.setAttribute('fill', '#333');
            svg.appendChild(dot);
        }
        
        container.appendChild(svg);
        
        return container;
    }


}

%}

%lex
%%

\s+                         /* skip whitespace */
"("                         return '(';
")"                         return ')';
"["                         return '[';
"]"                         return ']';
","                         return ',';

[A-Za-z0-9][A-Za-z0-9\-]*   return 'IDEN';

"^"                         return 'CARET';
"@"                         return 'AT_SIGN';
"~"                         return 'TWIDDLE';
"\""                        return 'QUOTE';
"_"                         return 'UNDERSCORE';
"|"                         return 'PIPE';
"-"                         return 'DASH';
">"                         return 'GT';
"!"                         return 'BANG';
\.+                         return 'DOTS';
<<EOF>>                     return 'EOF';

/lex

%glr

%start Document

%%

Document: GroupList                                    { window.rootNode = $1; $$ = $1; }
        ;

GroupList: EOF                                         { $$ = new GroupList(); }
         | GroupChain GroupList                        { $$ = $2.push($1); }
         ;

// Group: '(' Group ')' '[' Connector ']' '(' Group ')'  { $$ = new Group($2, $5, $8); }
//      | Grapheme                                       { $$ = new Group($1, null, null); }
//      ;

GroupChain: '(' Group ')'                              { $$ = new Group($2); }
          | GroupChain '[' Connector ']' '(' Group ')' { $$ = $1.push([$6, $3]); }
          ;

Group: Grapheme                                        { $$ = $1 }
     | GroupChain                                      { $$ = $1; }
     | /* empty */                                     { $$ = null; }
     ;

Grapheme: IDEN IDEN Diacritic                          { $$ = new Grapheme(new Iden($2), new Iden($1), $3); } // Iden Iden DIACRITIC is "handedness digit diacritic"
        | IDEN IDEN                                    { $$ = new Grapheme(new Iden($2), new Iden($1)); } // Iden Iden is "handedness digit" but constructor wants (digit, handedness)
        | IDEN Diacritic                               { $$ = new Grapheme(new Iden($1), null, $2); } // Iden DIACRITIC is "digit diacritic"
        | IDEN                                         { $$ = new Grapheme(new Iden($1)); } // One Iden is just "digit"
        ;

Connector: IDEN                                        { $$ = new Connector(new Iden($1), new NullArrow()); }
         | IDEN ',' Arrow                              { $$ = new Connector(new Iden($1), $3); }
         ;

Diacritic: CARET                                       { $$ = new Diacritic($1); }
         | AT_SIGN                                     { $$ = new Diacritic($1); }
         | TWIDDLE                                     { $$ = new Diacritic($1); } 
         | QUOTE                                       { $$ = new Diacritic($1); } 
         | PIPE                                        { $$ = new Diacritic($1); }
         | UNDERSCORE                                  { $$ = new Diacritic($1); }
         ;

Arrow: VerticalArrow                                   { $$ = $1; }
     | HorizontalArrow                                 { $$ = $1; }
     ;

VerticalArrow: PIPE HorizontalArrow                    { $$ = $2.setVertical(); }
             ;

HorizontalArrow: DASH DOTS                             { $$ = new Arrow(true, false, false, $2.length); }
               | DASH BANG                             { $$ = new Arrow(true, true, false, 0); }
               | DASH GT DOTS                          { $$ = new Arrow(true, false, true, $3.length); }
               ;