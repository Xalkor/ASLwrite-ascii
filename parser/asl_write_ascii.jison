%{
window.rootNode = null;

const DEBUG = false;

let vars = {
    '_font' : '../font-debug',
    '_default-hand': 'R'
};

// A container for multiple SceneNodes
class Scene {
    constructor() {
        this.children = [];
    }

    push(node) {
        this.children.push(node);
    }

    async render() {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("xmlns", svgNS);

        let maxX = 0, maxY = 0;
        for (const child of this.children) {
            const [w, h] = child.getSize();
            maxX = Math.max(maxX, (child.x ?? 0) + w);
            maxY = Math.max(maxY, (child.y ?? 0) + h);
        }

        svg.setAttribute("width", maxX);
        svg.setAttribute("height", maxY);

        for (const child of this.children) {
            const renderedSVG = await child.render(svg);
            svg.appendChild(renderedSVG);
        }

        return svg;
    }
}


async function getSvgSize(src) {
    console.log(src);
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve({ width: img.width, height: img.height });
        img.onerror = reject;
        img.src = src;
    });
}
class SceneImage {
    constructor(src, x = 0, y = 0, flip = false) {
        this.src = src;
        this.x = x;
        this.y = y;
        this.flip = flip;
        this.offset = 0;
    }

    getSize() {
        return [this.width, this.height];
    }

    async render(svg) {
        const svgNS = "http://www.w3.org/2000/svg";
        const img = document.createElementNS(svgNS, "image");
        img.setAttribute("href", this.src);
        img.setAttribute("x", this.x);
        img.setAttribute("y", this.y);
        console.log(this.x, this.y); //TODO: why NaN here???
        const {width, height} = await getSvgSize(this.src);
        console.log(width, height);
        img.setAttribute("width", width);
        img.setAttribute("height", height);
        console.log(img);

        if (this.flip) {
            //img.setAttribute("transform", `translate(${this.x + this.width}, ${this.y}) scale(-1,1)`);
            img.setAttribute("transform", `translate(${this.x + this.width*2 + this.offset}, ${this.y}) scale(-1,1)`);
        }

        return img;
    }
}


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
    async toScene() { throw new Error("Method 'toScene()' must be implemented."); };
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

    async toScene() {
        return await this.groups[0].toScene();
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

    async toScene() {
        if (this.groups.length === 0) return new Scene();
        if (this.groups.length === 1) return this.groups[0].toScene();

        const firstScene = await this.groups[0].toScene();

        const scene = new Scene();
        for (const child of firstScene.children) scene.push(child);

        let prevScene = firstScene;
        for (let i = 1; i < this.groups.length; i++) {
            const nextGroup = this.groups[i];
            const connector = this.connectors[i - 1];

            const nextScene = await nextGroup.toScene();

            const dir = connector.iden.asDir();
            let dx = 0, dy = 0;
            const offset = 10;
            console.log('dir: ', dir);
            if(dir.includes('N') || dir.includes('U')) dy -= (Math.max(...nextScene.children.map(c => c.height)) + offset);
            if(dir.includes('S') || dir.includes('B')) dy += (Math.max(...nextScene.children.map(c => c.height)) + offset);
            if(dir.includes('E') || dir.includes('L')) dx -= (Math.max(...nextScene.children.map(c => c.width )) + offset);
            if(dir.includes('W') || dir.includes('R')) dx += (Math.max(...nextScene.children.map(c => c.width )) + offset);
            console.log('dx: ', dx, 'dy: ', dy);
            for (const c of nextScene.children) {
                c.x += dx;
                c.y += dy;
                c.offset = offset;
                scene.push(c);
            }

            // TODO: add arrows from connector.arrow as SceneLine or SceneArrow

            prevScene = nextScene;
        }

        return scene;
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

    async toScene() {
        const digit = this.digit.val;

        let isRight;
        if (this.handedness)
            isRight = this.handedness.asHand() === "R";
        else
            isRight = vars["_default-hand"] === "R";

        const src = `${vars._font}/hand-shapes/${digit}.svg`;

        const imgNode = new SceneImage(src, 0, 0, !isRight);

        const scene = new Scene();
        scene.push(imgNode);
        return scene;
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