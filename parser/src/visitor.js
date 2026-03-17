import { Env } from './env.js';
import { Turtle } from './turtle.js';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';
marked.use(markedFootnote());

export class Visitor {
    constructor() {
        this.env = new Env();
        this.turtle = null;
    }

    visit(node) {
        // console.log('[VISIT]', node);
        const method = this[`visit${node.type}`];
        if (!method) {
            throw new Error(`No visitor for ${node.type}`);
        }
        return method.call(this, node);
    }

    // raw means dont compile the markdown to html
    visitBodyRaw(node) {
        const inlineMap = {};
        let counter = 0;
        const openInline  = '\uE000';
        const closeInline = '\uE001';

        const withPlaceholders = node.segments.map(s => {
            if (s.type === 'AslInline') {
                const key = `${openInline}${counter++}${closeInline}`;
                inlineMap[key] = this.visit(s);
                return key;
            }
            if (s.type === 'AslBlock') {
                return this.visit(s);
            }
            return this.visit(s);
        }).join('');

        const placeholder = new RegExp(`${openInline}\\d+${closeInline}`, 'g');
        return withPlaceholders.replace(placeholder, match => inlineMap[match] || match);
    }

    visitDocumentRaw(node) {
        node.defs.forEach(def => this.visit(def));
        return this.visitBodyRaw(node.body);
    }

    // Document
    //     = defs:Definitions _ "---" _ body:Body     { return node("Document", { defs    , body }); }
    //     / body:Body                                { return node("Document", { defs: [], body }); }                      
    visitDocument(node) {
        // console.log('visit Document :', node);
        node.defs.forEach( def => this.visit(def) );
        return this.visit(node.body);
    }

    // Definition 
    //     = idens:IdenList _ "=" _ graphemes:Graphemes _ ";" { return node("Definition", { idens, graphemes            }); }
    //     / idens:IdenList _ "=" _ grapheme:Grapheme         { return node("Definition", { idens, graphemes:[grapheme] }); }    
    visitDefinition(node) {
        // console.log('visit Definition :', node);
        const val = { type: "Graphemes", val: node.graphemes.map(g => this.visit(g)) };
        node.idens.forEach( iden => this.env.define(iden, val) );
    }

    // name:IDEN { return node("Iden", { name }); }
    visitIden(node) {
        const val = this.env.lookup(node.name);
        return val;
    }

    // Block = "{" _ comms:Commands _ "}" { return node("Block", {comms} ); }
    visitBlock(node) {
        const turtle = new Turtle();
        this.turtle = turtle;

        node.comms.forEach(c => this.visit(c));

        return turtle.toSVG();
    }

    // "[" _ comms:Commands _ "]"   { return node("Bracket", { comms }); }
    visitBracket(node) {
        this.turtle.push();
        node.comms.forEach(c => this.visit(c));
        this.turtle.pop();
    }

    // Command
    //     = name:IDEN SPACE args:ArgList { return node("Command", { name, args     }); }
    //     / name:IDEN                    { return node("Command", { name, args: [] }); }
    visitCommand(node) {
        const args = node.args.map( a => this.visit(a) );
        // console.log('[ARGS]', args);
        this.turtle.runCommand(node.name, args);
    }

    // op:("+"/"-") child:Expr { return node("UnaryOp", {op, child}); }
    visitUnaryOp(node) {
        switch(node.op){
            case "+": return this.visit(node.child);
            case "-": 
                const child = this.visit(node.child);
                child.val *= -1;
                return child;
            default: throw new Error(`Unknown unary op: ${node.op}`);
        }
    }

    // val:NUM { return node("Number", {val}) }
    visitNumber(node) {
        return node;
    }

    // segments:BodySegment* { return node("Body", { segments }) }
    visitBody(node) {
        const inlineMap = {};
        let counter = 0;
        const openInline  = '\uE000'; // private unicode chars to prevent a user from accidentally typeing a control code
        const closeInline = '\uE001';

        const withPlaceholders = node.segments.map(s => {
            if (s.type === 'AslInline') {
                const key = `${openInline}${counter++}${closeInline}`;
                inlineMap[key] = this.visit(s);
                return key;
            }
            if (s.type === 'AslBlock') {
                return this.visit(s);
            }
            return this.visit(s);
        }).join('');

        // console.log('[WITHPLACEHOLDERS]', withPlaceholders)
        const parsed = marked.parse(withPlaceholders);
        // console.log('[PARSED]', parsed)

        const placeholder = new RegExp(`${openInline}\\d+${closeInline}`, 'g');
        return parsed.replace(placeholder, match => inlineMap[match] || match);
    }

    // helper for visiting a grapheme that might be a single grapheme or a list
    visitGrapheme(node) {
        const result = this.visit(node);
        if (result?.type === "Graphemes") return result.val;
        return [result];
    }

    // = "@@@" _ rows:BlockRows _ "@@@"
    visitAslBlock(node) {
        const rows = node.rows.map(row => {
            if (row === null) {
                return `<div style="height:1em;"></div>`;
            }
            const glyphs = row.flatMap(g => this.visitGrapheme(g));
            return `<div style="display:flex;flex-wrap:wrap;align-items:baseline;">${glyphs.map(g => g.fullHTML).join('')}</div>`;
        });
        return `<div style="display:block;">${rows.join('')}</div>`;
    }

    // "@" graphemes:Graphemes "@"
    visitAslInline(node) {
        const glyphs = node.graphemes.flatMap(g => this.visitGrapheme(g));
        return `<span style="display:inline-flex;flex-wrap:wrap;align-items:baseline;">${glyphs.map(g => g.fullHTML).join('')}</span>`;
    }

    // Row = head:Iden tail:(SPACE IDEN)* { return node("Row", { cols: flatten(head, tail) }); }
    visitRow(node) {
        return node.cols.flatMap(c => this.visitGrapheme(c));    
    }

    // chars:MarkdownChar+ { return node("MarkdownText", { text: chars.join('') }) }
    visitMarkdownText(node) {
        return node.text;
    }
}