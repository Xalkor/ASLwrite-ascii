import { Env } from './env.js';
import { Turtle } from './turtle.js';
import { marked } from 'marked';
import markedFootnote from 'marked-footnote';

marked.use(markedFootnote());

export class Visitor {
    constructor() {
        this.env = new Env();
        this.turtle = null;
        this.debug = false;
    }

    visit(node) {
        console.log('[VISIT]', node);
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

    // Document
    //     = statements:Statements _ "===" _ body:Body { return node("Document", { statements    , body }); }
    //     / body:Body                                 { return node("Document", { statements: [], body }); }
    visitDocument(node) {
        console.log('[DOCUMENT]', node);
        node.statements.forEach( s => this.visit(s) );
        return this.visit(node.body);
    }

    visitDocumentRaw(node) {
        node.statements.forEach( s => this.visit(s) );
        return this.visitBodyRaw(node.body);
    }

    // should be delt with by the import resolver
    visitImport(node) {
        throw new Error("Import resovler failed, Import node left in AST");
    }

    // GraphemeDef
    //     = idens:IdenList _ "=" _ graphemes:Graphemes _ ";"                                           { return node("GraphemeDef", { idens, args:null, graphemes            }); }
    //     / idens:IdenList _ "=" _ grapheme:Grapheme                                                   { return node("GraphemeDef", { idens, args:null, graphemes:[grapheme] }); }
    //     / idens:IdenList SPACE? "(" SPACE? args:ArgList SPACE? ")" _ "=" _ graphemes:Graphemes _ ";" { return node("GraphemeDef", { idens, args,      graphemes            }); }
    //     / idens:IdenList SPACE? "(" SPACE? args:ArgList SPACE? ")" _ "=" _ grapheme:Grapheme         { return node("GraphemeDef", { idens, args,      graphemes:[grapheme] }); }   
    visitGraphemeDef(node) {
        if(node.args === null) {
            const val = { type: "Graphemes", val: node.graphemes.map(g => this.visit(g)) };
            node.idens.forEach( iden => this.env.define(iden, val) );
        } else {
            node.idens.forEach(iden => this.env.define(
                iden, 
                { type:'Fn->Graphemes', args: node.args, body: node.graphemes }
            ));
        }
    }

    // ExprDef
    // = idens:IdenList _ "=" _ expr:Expr                                           { return node("ExprDef", { idens, args:null, expr }); }
    // / idens:IdenList SPACE? "(" SPACE? args:ArgList SPACE? ")" _ "=" _ expr:Expr { return node("ExprDef", { idens, args,      expr }); }
    visitExprDef(node) {
        if(node.args === null) { // number variable
            node.idens.forEach( iden => this.env.define(iden, this.visit(node.expr)) );
        } else { // number function
            node.idens.forEach(iden => this.env.define(
                iden, 
                { type:'Fn->Number', args: node.args, body: node.expr }
            ));
        }
    }

    // Iden = name:IDEN { return node("Iden", {name})   }
    visitIden(node) {
        const captureScope = this.env;
        return { type: "thunk", as:(type) => captureScope.lookup(node.name, type) };
    }

    //unwrap a thunk, or pass-through non-lazy value
    asType(node, type) {
        console.log('[AS TYPE]', type, node);
        if(node.type === "thunk") {
            const as = node.as(type);
            console.log('[AS TYPE]', as);
            return as;
        }

        if(node.type === type) {
            console.log('[AS TYPE]', node);
            return node;
        }

        return null;
    }

    // Block = "{" _ comms:Commands _ "}" { return node("Block", {comms} ); }
    visitBlock(node) {
        const prevTurtle = this.turtle;
        const prevEnv = this.env;
        
        this.turtle = new Turtle(this.debug);
        this.env = new Env(this.env); // new scope inheriting from parent
        
        node.comms.forEach(c => this.visit(c));
        
        const result = this.turtle.toSVG();
        
        this.turtle = prevTurtle;
        this.env = prevEnv;
        
        return result;
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
        this.turtle.runCommand(node.name, args, (n,t)=>this.asType(n,t), gs => this.flattenGraphemes(gs));
    }

    // return node("Prod", { head, tail:tail.map( t => {op:t[1], val:t[3]}) }); 
    visitProd(node) { 
        console.log('[PROD]', node);
        const head = this.visit(node.head);
        return { 
            type: 'Number', 
            val : node.tail.reduce( (acc, t) => {
                const factor = this.visit(t.val);
                console.log('[PROD REDUCE]', acc, t, factor);
                if(t.op == '*')
                    return acc * this.asType(factor, 'Number').val
                else
                    return acc / this.asType(factor, 'Number').val
            }, this.asType(head, 'Number').val ) 
        };
    }

    // return node("Sum", { head, tail:tail.map( t => {op:t[1], val:t[3]}) }); 
    visitSum(node) {
        //console.log('[SUM]', node);
        const head = this.visit(node.head);
        return { 
            type: 'Number', 
            val : node.tail.reduce( (acc, t) => {
                const factor = this.visit(t.val);
                //console.log('[SUM REDUCE]', acc, t, factor);
                if(t.op == '+')
                    return acc + this.asType(factor, 'Number').val
                else
                    return acc - this.asType(factor, 'Number').val
            }, this.asType(head, 'Number').val ) 
        };
    }

    // op:("+"/"-") child:Expr { return node("UnaryOp", {op, child}); }
    visitUnaryOp(node) {
        switch(node.op){
            case "+": return this.asType(this.visit(node.child), 'Number');
            case "-": 
                const child = this.visit(node.child);
                const resolved = this.asType(child, 'Number');
                return { type: 'Number', val: -resolved.val };
            default: throw new Error(`Unknown unary op: ${node.op}`);
        }
    }

    // / fname:Iden _ "(" _ args:ArgList _ ")"  { return node("Call", {fname, args}); }
    visitCall(node) {
        return {
            type: "thunk",
            as  : (type) => {
                console.log('[AS]', type)
                const fnNode = this.env.lookup(node.fname.name, `Fn->${type}`);
                const actualArgs = node.args.map( a => this.visit(a) );
                if(actualArgs.length !== fnNode.args.length) {
                    const s = fnNode.args.length==1 ? "" : "s";
                    throw new Error(`Function ${node.fname} expects ${fnNode.args.length} argument${s}, not ${actualArgs.length}`);
                }

                const curScope = this.env;
                this.env = new Env(curScope);

                const curTurtle = this.turtle;
                this.turtle = new Turtle(this.debug);
                console.log('[CALL]', 'new scope/turtle', this.turtle.transform );
            
                for(let i = 0; i < actualArgs.length; i++) {
                    console.log('[CALL]', fnNode.args[i].name, actualArgs[i] );
                    if(actualArgs[i].type === 'Grapheme') 
                        actualArgs[i] = { type: "Graphemes", val: [actualArgs[i]] }
                    this.env.define( fnNode.args[i].name, actualArgs[i] );
                }

                console.log('[CALL]', fnNode.type );

                let val;
                if(fnNode.type === 'Fn->Graphemes') {
                    console.log("[FN->GRAPHEME BODY]", fnNode.body)
                    
                    val = { type: "Graphemes", val: fnNode.body.map(g => this.visit(g)) };
                } else {
                    val = this.visit(fnNode.body);
                }

                console.log('[CALL]', 'close scope' );

                this.env = curScope;
                this.turtle = curTurtle;
                return val;
            }
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
        console.log('[GRAPHEME NODE]', node);
        const result = this.visit(node);
        const flat = this.flattenGraphemes(result)
        console.log('[GRAPHEME FLAT]', flat);
        return flat;
    }

    flattenGraphemes(result) {
        const graphemesResult = this.asType(result, "Graphemes")
        if (graphemesResult?.type === "Graphemes") {
            console.log('[FLATTEN GRAPHEMES]', graphemesResult)
            return graphemesResult.val.flatMap(v => this.flattenGraphemes(v));
        }
        if (graphemesResult?.type === "thunk") {
            console.log('[FLATTEN THUNK]', graphemesResult)
            return this.asType(graphemesResult, "Graphemes").val.flatMap(v => this.flattenGraphemes(v));
        }
        console.log('[FLATTEN OTHER]', result)
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
        console.log('[ASL INLINE]', node);
        let glyphs = node.graphemes.flatMap(g => this.visitGrapheme(g));
        console.log('[ASL INLINE]', glyphs);
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