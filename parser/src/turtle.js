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
    },{
        types: ['Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, cx, cy) => turtle.curveto(x, y, cx, cy, cx, cy)
    }],
    smoothto: [{
        types: ['Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, cx, cy) => turtle.smoothto(x, y, cx, cy, cx, cy)
    }],
    arcto: [{
        types: ['Number', 'Number', 'Number'],
        method: (turtle, x, y, r) => turtle.arcto(x, y, r, r, false, 1)
    },{
        types: ['Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, r, dir) => turtle.arcto(x, y, r, r, false, dir)
    },{
        types: ['Number', 'Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, rx, ry, dir) => turtle.arcto(x, y, rx, ry, false, dir)
    }],
    largearcto: [{
        types: ['Number', 'Number', 'Number'],
        method: (turtle, x, y, r) => turtle.arcto(x, y, r, r, true, 1)
    },{
        types: ['Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, r, dir) => turtle.arcto(x, y, r, r, true, dir)
    },{
        types: ['Number', 'Number', 'Number', 'Number', 'Number'],
        method: (turtle, x, y, rx, ry, dir) => turtle.arcto(x, y, rx, ry, true, dir)
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
    },{
        types: ['Graphemes'],
        method: (turtle, gs) => { console.log('[FLIP DRAW]'); turtle.flip(); gs.forEach(g => turtle.draw(g)) }
    },{
        types: ['Graphemes', 'Number', 'Number'],
        method: (turtle, gs, w, h) => { turtle.flip(); gs.forEach(g => turtle.draw(g, w, h)) }
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
    constructor(debug=false) {
        this.transform = new Mat2D();
        this._stack = [];
        this.width = 200;
        this.height = 200;
        this.strokeWidth = 1.5;
        this.isPenDown = false;
        this.paths = [];
        this.currentPath = new SVGPath(new SVGSeg("M", 0, 0));

        this.debug = debug;
        this.debugControlPoints = debug ? [] : null;
        this.debugArcs = debug ? [] : null;
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
        console.log('[DRAW]', this);
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
        console.log('[GOTO]', x,y);
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
        if (this.debug) {
            this.debugControlPoints.push({ x, y, c1x, c1y, c2x, c2y, fromX: this.transform.e, fromY: this.transform.f });
        }
        this.transform.e = x;
        this.transform.f = y;
    }

    smoothto(x, y, cx, cy) {
        if (this.isPenDown) {
            this.currentPath.push(new SVGSeg("S", cx, cy, x, y));
        }
        if (this.debug) {
            this.debugControlPoints.push({ x, y, c2x:cx, c2y:cy, fromX: this.transform.e, fromY: this.transform.f });
        }
        this.transform.e = x;
        this.transform.f = y;
    }


    computeArcCenter(x1, y1, x2, y2, rx, ry, large, sweep) {
        // midpoint
        const mx = (x1 - x2) / 2;
        const my = (y1 - y2) / 2;

        const rx2 = rx * rx, ry2 = ry * ry;
        const mx2 = mx * mx, my2 = my * my;

        const num = Math.max(0, rx2 * ry2 - rx2 * my2 - ry2 * mx2);
        const den = rx2 * my2 + ry2 * mx2;
        const sq = den === 0 ? 0 : Math.sqrt(num / den);
        const sign = (large === sweep) ? -1 : 1;

        const cx1 =  sign * sq * (rx * my / ry);
        const cy1 = -sign * sq * (ry * mx / rx);

        // transform back
        const cx = cx1 + (x1 + x2) / 2;
        const cy = cy1 + (y1 + y2) / 2;

        return { cx, cy };
    }
    arcto(x, y, rx, ry, large, dir) {
        const sweep = dir >= 0 ? 1 : 0;
        const largeFlag = large ? 1 : 0;

        if (this.isPenDown) {
            this.currentPath.push(new SVGSeg("A", Math.abs(rx), Math.abs(ry), 0, largeFlag, sweep, x, y));
        }
        if (this.debug) {
            const { cx, cy } = this.computeArcCenter(
                this.transform.e, this.transform.f,
                x, y, Math.abs(rx), Math.abs(ry), largeFlag, sweep
            );
            this.debugArcs.push({ 
                x1: this.transform.e, y1: this.transform.f,
                x2: x, y2: y,
                cx, cy
            });
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
        // console.log(`face(${deg}) -> ${this.transform.toSVG()}`);
    }

    toSVG() {
        if (!this.currentPath.empty()) {
            this.paths.push(this.currentPath);
            this.currentPath = new SVGPath();
        }

        const pathElems = this.paths.map(d => d.toPathString(this));
        const innerPaths = pathElems.join('');

        let debugElems = '';
        if (this.debug) {
            const x = this.transform.e;
            const y = this.transform.f;
            const dx = this.transform.a * 40;
            const dy = this.transform.b * 40;
            debugElems = (
                `<circle cx="${x}" cy="${y}" r="4" fill="red" opacity="0.7"/>` +
                `<line x1="${x}" y1="${y}" x2="${x + dx}" y2="${y + dy}"`      +
                    ` stroke="red" stroke-width="4" opacity="0.6"`             +
                    ` marker-end="url(#debug-arrow)"/>`
            );
            for (const cp of this.debugControlPoints) {
                // console.log('[CONTROL POINT]', cp);
                if(cp.c1x != undefined) {
                debugElems += (
                        `<circle cx="${cp.c1x}" cy="${cp.c1y}" r="4" fill="blue" opacity="0.6"/>`    +
                        `<line x1="${cp.fromX}" y1="${cp.fromY}" x2="${cp.c1x}" y2="${cp.c1y}"`      +
                            ` stroke="blue" stroke-width="4" stroke-dasharray="3,3" opacity="0.6"/>`
                    );
                }
                debugElems += (
                    `<circle cx="${cp.c2x}" cy="${cp.c2y}" r="4" fill="green" opacity="0.6"/>`    +
                    `<line x1="${cp.x}" y1="${cp.y}" x2="${cp.c2x}" y2="${cp.c2y}"`               +
                        ` stroke="green" stroke-width="4" stroke-dasharray="3,3" opacity="0.6"/>`
                );
            }
            for (const arc of this.debugArcs) {
                debugElems += (
                    `<circle cx="${arc.cx}" cy="${arc.cy}" r="4" fill="purple" opacity="0.6"/>` +
                    `<line x1="${arc.cx}" y1="${arc.cy}" x2="${arc.x1}" y2="${arc.y1}" ` +
                        `stroke="purple" stroke-width="4" stroke-dasharray="3,3" opacity="0.6"/>` +
                    `<line x1="${arc.cx}" y1="${arc.cy}" x2="${arc.x2}" y2="${arc.y2}" ` +
                        `stroke="purple" stroke-width="4" stroke-dasharray="3,3" opacity="0.6"/>`
                );
            }
            // console.log('[DEBUG ELEMENTS]', debugElems);
        }

        const viewBox = `${-this.width/2} ${-this.height/2} ${this.width} ${this.height}`;
        const fullHTML = 
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="3rem" height="3rem" overflow="visible">` +
            `<defs>`                                                                                                  +
                `<marker id="debug-arrow" viewBox="0 0 10 10" refX="8" refY="5"`                                      +
                        `markerWidth="4" markerHeight="4" orient="auto-start-reverse">`                               +
                    `<path d="M2 1L8 5L2 9" fill="none" stroke="red" stroke-width="2"/>`                              +
                `</marker>`                                                                                           +
            `</defs>`                                                                                                 +
            `<g transform="scale(1,-1)">${innerPaths}${debugElems}</g>`                                               +
        `</svg>`;

        // console.log('[FULL HTML]', fullHTML)
        return { type: "Grapheme", turtle: this, fullHTML, innerPaths:innerPaths+debugElems };
    }

    runCommand(name, args, unwrapArg, flattenGraphemes) {
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
            let unwrapedArgs = [];
            for (let i = 0; i < args.length; i++) {
                const expected = sig.types[i];
                let actual = unwrapArg(args[i], expected);

                if (actual === null) {
                    mismatchIndex = i;
                    break;
                }

                if (actual.type === 'Graphemes') actual = {'val':flattenGraphemes(actual)};

                unwrapedArgs.push(actual);
                console.log('[RUN COMMAND]', actual);
            }

            if (mismatchIndex === -1) {
                // perfect match
                return sig.method(this, ...unwrapedArgs.map(a => a.val));
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
