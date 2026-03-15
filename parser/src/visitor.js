import { Env } from './env.js';
import { Turtle } from './turtle.js';

export class Visitor {
    constructor() {
        this.env = new Env();
        this.turtle = null;
    }

    visit(node) {
        console.log('[VISIT]', node);
        const method = this[`visit${node.type}`];
        if (!method) {
            throw new Error(`No visitor for ${node.type}`);
        }
        return method.call(this, node);
    }

    // Document
    //     = defs:Definitions _ "---" _ body:Body     { return node("Document", { defs    , body }); }
    //     / body:Body                                { return node("Document", { defs: [], body }); }                      
    visitDocument(node) {
        console.log('visit Document :', node);
        node.defs.forEach( def => this.visit(def) );
        return this.visit(node.body);
    }

    // Definition 
    //     = idens:IdenList _ "=" _ graphemes:Graphemes _ ";" { return node("Definition", { idens, graphemes            }); }
    //     / idens:IdenList _ "=" _ grapheme:Grapheme         { return node("Definition", { idens, graphemes:[grapheme] }); }    
    visitDefinition(node) {
        console.log('visit Definition :', node);
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
        console.log('[ARGS]', args);
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

    // Body = head:Line tail:(NEW_LINE Line)* { return node("Body", { rows: flatten(head, tail) }); }
    visitBody(node) {
        return node.rows.map( r => this.visit(r) );
    }

    // Row = head:Iden tail:(SPACE IDEN)* { return node("Row", { cols: flatten(head, tail) }); }
    visitRow(node) {
        return node.cols.map( c => this.visit(c) );
    }
}