export class Mat2D {
    constructor(a=1,b=0,c=0,d=1,e=0,f=0) {
        this.a=a; this.b=b;
        this.c=c; this.d=d;
        this.e=e; this.f=f;
    }

    multiply(m) {
        return new Mat2D(
            this.a*m.a + this.c*m.b,
            this.b*m.a + this.d*m.b,

            this.a*m.c + this.c*m.d,
            this.b*m.c + this.d*m.d,

            this.a*m.e + this.c*m.f + this.e,
            this.b*m.e + this.d*m.f + this.f
        );
    }

    static translation(x,y) {
        return new Mat2D(1,0,0,1,x,y);
    }

    static rotation(rad) {
        const c = Math.cos(rad);
        const s = Math.sin(rad);
        return new Mat2D(c,-s,s,c,0,0);
    }

    static scaling(sx, sy) {
        return new Mat2D(
            sx, 0,
            0, sy,
            0, 0
        );
    }

    transformPoint(x,y) {
        return {
            x: this.a*x + this.c*y + this.e,
            y: this.b*x + this.d*y + this.f
        };
    }

    toSVG() {
        return `matrix(${this.a} ${this.b} ${this.c} ${this.d} ${this.e} ${this.f})`;
    }
}