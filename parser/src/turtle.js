import { Mat2D } from "./matrix.js";

const signatures = {
    forward: [{
        types: ['Number'],
        method: (turtle, len) => turtle.forward(len)
    }],
    turn: [{
        types: ['Number'],
        method: (turtle, deg) => turtle.turn(deg)
    }],
    face: [{
        types: ['Number'],
        method: (turtle, deg) => turtle.face(deg)
    }],
    goto: [{
        types: ['Number', 'Number'],
        method: (turtle, x, y) => turtle.goto(x, y)
    }],
    curveto: [{
        types: ['Number', 'Number', 'Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, c1x, c1y, c2x, c2y) => turtle.curveto(x, y, c1x, c1y, c2x, c2y)
    }],
    draw: [{
        types: ['Graphemes'],
        method: (turtle, gs) => gs.forEach(g => turtle.draw(g))
    },{
        types: ['Graphemes', 'Number', 'Number'],
        method: (turtle, gs, w, h) => gs.forEach(g => turtle.draw(g, w, h))
    }],
    penup: [{
        types: [],
        method: (turtle) => turtle.penUp()
    }],
    flip: [{
        types: [],
        method: (turtle) => turtle.flip()
    }],
    pendown: [{
        types: [],
        method: (turtle) => turtle.penDown()
    }]
};

class SVGSeg {
    constructor(name, ...args) {
        this.name = name;
        this.args = args;
    }

    toString() {
        return `${this.name}${this.args.join(' ')}`;
    }
}
class SVGPath {
    constructor(seed = null) {
        this.segs = seed !== null ? [seed] : [];
    }

    empty() {
        return this.segs.length == 0;
    }

    push(seg) {
        this.segs.push(seg);
    }

    map(fn) {
        let newPath = new SVGPath();
        this.segs.forEach(seg=>{newPath.push(fn(seg))});
        return newPath
    }

    toPathString(ctx) {
        const data = this.segs.map(seg => seg.toString()).join(' ');
        return `<path d="${data}" stroke="black" fill="none" stroke-width="${ctx.strokeWidth}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
    }
}


export class Turtle {
    constructor() {
        this.transform = new Mat2D();
        this._stack = [];
        this.width = 200;
        this.height = 200;
        this.strokeWidth = 1.5;
        this.isPenDown = false;
        this.paths = [];
        this.currentPath = new SVGPath(new SVGSeg("M", 0, 0));
    }

    push() {
        this._stack.push({
            a: this.transform.a, b: this.transform.b,
            c: this.transform.c, d: this.transform.d,
            e: this.transform.e, f: this.transform.f
        });
    }

    pop() {
        if (!this._stack || this._stack.length === 0) return;
        const s = this._stack.pop();
        this.transform = new Mat2D(s.a, s.b, s.c, s.d, s.e, s.f);
    }

    penDown() {
        if (this.isPenDown) return; // already down
        this.isPenDown = true;
        this.currentPath.push(new SVGSeg("M", this.transform.e, this.transform.f)); // move to current pos
    }

    penUp() {
        if (!this.isPenDown) return; // already up
        this.isPenDown = false;
        if (!this.currentPath.empty()) {
            this.paths.push(this.currentPath); // finalize current path
            this.currentPath = new SVGPath();
        }
    }

    flip() {
        this.transform = this.transform.multiply(Mat2D.scaling(-1, 1));
    }

    draw(grapheme, w = null, h = null) {
        let transformMatrix = this.transform;

        if (w !== null && h !== null) {
            const scaleX = w / grapheme.turtle.width;
            const scaleY = h / grapheme.turtle.height;
            transformMatrix = this.transform.multiply(Mat2D.scaling(scaleX, scaleY));
        }

        const group = `<g transform="${transformMatrix.toSVG()}">${grapheme.innerPaths}</g>`;
        this.paths.push({ toPathString: () => group });
    }

    forward(dist) {
        this.transform = this.transform.multiply(Mat2D.translation(dist, 0));
        const x = this.transform.e;
        const y = this.transform.f;
        if (this.isPenDown) {
            this.currentPath.push(new SVGSeg("L", x, y));
        }
    }

    goto(x, y) {
        if (this.isPenDown) {
            this.currentPath.push(new SVGSeg("L", x, y));
        }
        this.transform.e = x;
        this.transform.f = y;
    }

    curveto(x, y, c1x, c1y, c2x, c2y) {
        if (this.isPenDown) {
            this.currentPath.push(new SVGSeg("C", c1x, c1y, c2x, c2y, x, y));
        }
        this.transform.e = x;
        this.transform.f = y;
    }

    turn(deg) {
        const rad = deg * Math.PI / 180;
        this.transform = this.transform.multiply(Mat2D.rotation(rad));
    }

    face(deg) {
        const rad = deg * Math.PI / 180;
        const rot = Mat2D.rotation(rad);
        const [e, f] = [this.transform.e, this.transform.f];
        this.transform.a = rot.a;
        this.transform.b = rot.b;
        this.transform.c = rot.c;
        this.transform.d = rot.d;
        this.transform.e = e;
        this.transform.f = f;
        console.log(`face(${deg}) -> ${this.transform.toSVG()}`);
    }

    toSVG() {
        if (!this.currentPath.empty()) {
            this.paths.push(this.currentPath);
            this.currentPath = new SVGPath();
        }

        const pathElems = this.paths.map(d => d.toPathString(this));
        const innerPaths = pathElems.join('');

        const viewBox = `${-this.width/2} ${-this.height/2} ${this.width} ${this.height}`;

        const fullHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="3rem" height="3rem" overflow="visible">
        <g transform="scale(1,-1)">${innerPaths}</g>
        </svg>`;

        return { type: "Grapheme", turtle: this, fullHTML, innerPaths };
    }

    runCommand(name, args) {
        if (!signatures.hasOwnProperty(name)) {
            throw new Error(`No drawing command called: ${name}`);
        }

        const overloads = signatures[name];

        const arityMatches = overloads.filter(sig => sig.types.length === args.length);

        if (arityMatches.length === 0) {
            const possible = [...new Set(overloads.map(s => s.types.length))];
            const s = possible.length > 1 ? 's' : '';
            throw new Error(`${name} takes ${possible.join(' or ')} argument${s}, not ${args.length}.`);
        }

        for (const sig of arityMatches) {
            let mismatchIndex = -1;

            for (let i = 0; i < args.length; i++) {
                const expected = sig.types[i];
                const actual = args[i].type;

                if (expected !== actual) {
                    mismatchIndex = i;
                    break;
                }
            }

            if (mismatchIndex === -1) {
                // perfect match
                return sig.method(this, ...args.map(a => a.val));
            } else {
                const expected = sig.types[mismatchIndex];
                const actual = args[mismatchIndex].type;
                throw new Error(
                    `Argument ${mismatchIndex + 1} of ${name} must be type '${expected}', not '${actual}'.`
                );
            }
        }
    }
}
