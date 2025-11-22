%{
window.rootNode = null;

let vars = {
    '_font' : '../font',
    '_default-hand': 'R'
};

class Node {
    constructor() { 
        if (this.constructor == Node) {
            throw new Error("Abstract classes can't be instantiated.");
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
        this.groups.push(group);
        return this;
    }

    _debugTreeString(prefix, arc, last, root) {
        let s = `${prefix}${arc}GroupList\n`;
        if(this.groups.length == 0) return s;

        for(let i = this.groups.length-1; i >= 0 ; i--) {
            let lastGroup = i == 0;
            let indent =  (root ? '' : (last ? '         ' : ' |       '));
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
    constructor(head, connector = null, tail = null) {
        super();
        this.head = head;
        this.connector = connector;
        this.tail = tail;
    }

    _debugTreeString(prefix, arc, last, root) {
        let s = `${prefix}${arc}Group\n`;
        if(!this.head) return s;

        let indent =  (root ? '' : (last ? '         ' : ' │       '));
        let newArc = this.tail ? " ├─head: " : " └─head: ";
        let nl = this.tail ? "\n" : "";
        s += `${this.head._debugTreeString(prefix + indent, newArc, !this.tail, false)}${nl}`;

        if (this.connector) {
            s += `${this.connector._debugTreeString(prefix + indent, " ├─conn: ", !this.tail, false)}\n`;
        }

        if (this.tail) {
            s += this.tail._debugTreeString(prefix + indent, " └─tail: ", true, false);
        }

        return s;
    }

    eval() {
        return this.head.eval();
    }
}

class Grapheme extends Node {
    constructor(digit, handedness = null, diacritic = null) {
        super();
        this.digit = digit;
        this.handedness = handedness;
        this.diacritic = diacritic;
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
            digitImg.classList.add('_flip');
        }

        return digitImg;
    }
}

const digits = ["0-num","0-flat","1-num","1-claw","1-d","1-i","2-num","2-bend","2-claw","2-close","2-cross","3-num","3-claw","3-close","3-flat","3-k","4-num","4-close","4-claw","5-num","5-close","5-claw","5-half","5-bend","5-c","6-num","6-claw","6-inverse","7-num","7-8","8-num","8-inverse","8-open","9-num","10-num","10-a","10-s","10-t","20-num","1-thumb","20-claw","20-g"];
class Iden extends Node {
    constructor(val) {
        super();
        this.val = val;
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

    eval() {}
}

class Diacritic extends Node {
    constructor(type) {
        super();
        this.type = type;
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
    }

    _debugTreeString(prefix, arc, last, root) {
        return `${prefix}${arc}[${this.iden._debugTreeString('','')}, ${this.arrow._debugTreeString()}]`;
    }

    eval() { };
}

class NullArrow extends Node {
    constructor(){ super(); }
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

    eval() { };
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

[A-Za-z0-9\-]+              return 'IDEN';

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

%start Document

%%

Document: GroupList                                   { window.rootNode = $1; $$ = $1; }
        ;

// GroupListHead: EOF                                    { console.log('A'); $$ = new GroupList(); }
//              | Group GroupList                        { console.log('B'); $$ = new GroupList($1); }
//              ; 

GroupList: EOF                                        { console.log('C'); $$ = new GroupList(); }
         | Group GroupList                            { console.log('D', $2, $1); $$ = $2.push($1); }
         ;

Group: '(' ')'                                        { $$ = new Group(null, null, null); }
     | '(' Group ')'                                  { $$ = $2; }
     | '(' Grapheme ')'                               { $$ = new Group($2, null, null); }
     | '(' Group ')' '[' Connector ']' '(' Group ')'  { $$ = new Group($2, $5, $8); }
     ;

Grapheme: Iden                                        { $$ = new Grapheme($1); } // One Iden is just "digit"
        | Iden Iden                                   { $$ = new Grapheme($2, $1); } // Iden Iden is "handedness digit" but constructor wants (digit, handedness)
        | Iden Iden Diacritic                         { $$ = new Grapheme($2, $1, $3); } // Iden Iden DIACRITIC is "handedness digit diacritic"
        | Iden Diacritic                              { $$ = new Grapheme($1, null, $2); } // Iden DIACRITIC is "digit diacritic"
        ;

Connector: Iden                                       { $$ = new Connector($1, new NullArrow()); }
         | Iden ',' Arrow                             { $$ = new Connector($1, $3); }
         ;

Iden: IDEN                                            { $$ = new Iden($1); } 
    ;

Diacritic: CARET                                      { $$ = new Diacritic($1); }
         | AT_SIGN                                    { $$ = new Diacritic($1); }
         | TWIDDLE                                    { $$ = new Diacritic($1); } 
         | QUOTE                                      { $$ = new Diacritic($1); } 
         | PIPE                                       { $$ = new Diacritic($1); }
         | UNDERSCORE                                 { $$ = new Diacritic($1); }
         ;

Arrow: VerticalArrow                                  { $$ = $1; }
     | HorizontalArrow                                { $$ = $1; }
     ;

VerticalArrow: PIPE HorizontalArrow                   { $$ = $2.setVertical(); }
             ;

HorizontalArrow: DASH DOTS                            { $$ = new Arrow(true, false, false, $2.length); }
               | DASH BANG                            { $$ = new Arrow(true, true, false, 0); }
               | DASH GT DOTS                         { $$ = new Arrow(true, false, true, $3.length); }
               ;