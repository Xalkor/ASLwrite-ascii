%{
window.rootNode = null;

window.vars = {
    '_font' : '../font-debug',
    '_default-hand': 'R'
};

window.foo = 'bar';

const SVG_NS = "http://www.w3.org/2000/svg";

function makeNS(name) {
    return document.createElementNS(SVG_NS, name);
}

async function loadInlineSvg(url) {
    const res = await fetch(url);
    const text = await res.text();
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    return doc.documentElement;
}

class Node {
    constructor() { 
        if (this.constructor == Node) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    debugTreeString() { return this._debugTreeString('', '', true, true); }
    _debugTreeString(prefix, arc, last, root) { throw new Error("Method '_debugTreeString()' must be implemented."); };
    async toScene() { throw new Error("Method 'toScene()' must be implemented."); };
}

const DIRS = {
    'N': ['N', 'U'],
    'E': ['E', 'R'],
    'S': ['S', 'D'],
    'W': ['W', 'L']
}
const ALL_DIRS = Object.values(DIRS).flat();

class Iden extends Node {
    constructor(val) {
        super();
        this.val = val;
    }

    asHand() {
        if (this.val === "R" || this.val === "L") return this.val;
        throw new Error(`Invalid hand: ${this.val}`);
    }   
    asDir() {
        // check if EVERY letter of the direction is valid
        if (this.val.split('').every(letter => ALL_DIRS.indexOf(letter) != -1)) return this.val;
        throw new Error(`Invalid direction: ${this.val}`);
    }   
    asSvgUrl() {
        return `${window.vars["_font"]}/hand-shapes/${this.val}.svg`;
    }

    _debugTreeString(prefix, arc, last, root) {
        return `${prefix}${arc}Iden{${this.val}}`;
    }
}

class Grapheme extends Node {
    constructor(digit, handedness = null, diacritic = null) {
        super();
        this.digit = digit;
        this.handedness = handedness;
        this.diacritic = diacritic;
    }

    async toScene() {
        const svg = await loadInlineSvg(this.digit.asSvgUrl());

        const vb = svg.viewBox.baseVal;
        const width = vb.width;
        const height = vb.height;

        // normalize inner svg
        svg.removeAttribute("width");
        svg.removeAttribute("height");

        const g = makeNS("g");
        g.appendChild(svg);

        const isRight = this.handedness
                      ? this.handedness.asHand() === "R"
                      : window.vars["_default-hand"] === "R";

        if (!isRight) {
            g.setAttribute(
                "transform",
                `translate(${width},0) scale(-1,1)`
            );
        }

        return { width, height, svg: g };
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
}

class Group extends Node {
    constructor(firstGroup = null, connector = null) {
        super();
        this.groups = firstGroup ? [firstGroup] : [];
        this.connectors = connector ? [connector] : [];
    }

    push([group, connector]) {
        this.groups.push(group);
        this.connectors.push(connector);
        return this;
    }

    async toScene() {
        if (this.groups.length === 0) {
            return { width: 0, height: 0, svg: makeNS("g") };
        }

        if (this.groups.length === 1) {
            return await this.groups[0].toScene();
        }

        const container = makeNS("svg");
        container.classList.add("group-container");
        
        let maxX = 0, maxY = 0;
        let minX = 0, minY = 0;
        for (let i = 0; i < this.groups.length; i++) {
            const child = this.groups[i];
            const childScene = await child.toScene();

            if(maxX == 0 && minX == 0) maxX = childScene.width;
            if(maxY == 0 && minY == 0) maxY = childScene.height;

            const g = makeNS("g");

            let currX = 0, currY = 0;
            if(i < this.connectors.length) {
                const connector = this.connectors[i] || "R"; // default to right

                const [dx, dy] = [childScene.width, childScene.height];

                const in_direction = (move, dir) => { return DIRS[dir].indexOf(move) != -1; }
                console.log(connector.iden);
                for(let move of connector.iden.asDir()) {
                    if ( in_direction(move, 'N') ) {
                        currY -= dy;
                        minY = Math.min(minY, currY);
                    } else if ( in_direction(move, 'E') ) {
                        currX += dx;
                        maxX = Math.max(maxX, currX);
                    } else if ( in_direction(move, 'S') ) {
                        currY += dy;
                        minY = Math.min(minY, currY);
                    } else if ( in_direction(move, 'W') ) {
                        currX -= dx;
                        minX = Math.max(minX, currX);
                    }
                }
            }

            g.setAttribute("transform", `translate(${currX},${currY})`);
            g.appendChild(childScene.svg);

            container.appendChild(g);

        }

        // Compute container size
        const totalWidth = maxX-minX;
        const totalHeight = maxY-minY;

        container.setAttribute("viewBox", `0 0 ${totalWidth} ${totalHeight}`);
        // container.style.width = totalWidth + "em";  // scale via CSS
        // container.style.height = "auto";

        return { width: totalWidth, height: totalHeight, svg: container };
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
}

class GroupList extends Node {
    constructor(firstGroup = null) {
        super();
        this.groups = firstGroup ? [firstGroup] : [];
    }

    push(group) {
        this.groups.push(group);
        return this;
    }

    async toScene() {
        const g = makeNS("g");

        let y = 0;
        let maxXidth = 0;

        for (const group of this.groups) {
            const scene = await group.toScene();
            const wrapper = makeNS("g");
            wrapper.setAttribute("transform", `translate(0,${y})`);
            wrapper.appendChild(scene.svg);

            g.appendChild(wrapper);

            y += scene.height;
            maxXidth = Math.max(maxXidth, scene.width);
        }

        return {
            width: maxXidth,
            height: y,
            svg: g
        };
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
}

class Diacritic extends Node {
    constructor(type) {
        super();
        this.type = type;
    }

    _debugTreeString(prefix, arc, last, root) {
        return `Diacritic{${this.type}}`;
    }
}

class Connector extends Node {
    constructor(iden, arrow = null) {
        super();
        this.iden = iden;
        this.arrow = arrow;
    }

    _debugTreeString(prefix, arc, last, root) {
        return `${prefix}${arc}Connector{${this.iden._debugTreeString('','')}, ${this.arrow._debugTreeString()}}`;
    }
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
}

async function renderRoot(rootNode, container) {
    const scene = await rootNode.toScene();

    const svg = makeNS("svg");
    svg.setAttribute("viewBox", `0 0 ${scene.width} ${scene.height}`);
    svg.setAttribute("width", scene.width);
    svg.setAttribute("height", scene.height);

    svg.appendChild(scene.svg);
    container.appendChild(svg);
}
window.renderRoot = renderRoot;

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