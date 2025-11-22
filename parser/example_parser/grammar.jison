%{
window.rootNode = null;

class ExprNode {
    constructor() { 
        if (this.constructor == ExprNode) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    debugTreeString() { return this._debugTreeString('', '', true, true); }
    _debugTreeString(prefix, connector, last, root) { throw new Error("Method 'debugTreeString()' must be implemented."); };
    eval() { throw new Error("Method 'eval()' must be implemented."); };
}

class NumNode extends ExprNode {
    constructor(valStr) {
        super();
        this.val = Number(valStr);
    }

    _debugTreeString(prefix, connector, last, root) {
        return `${prefix}${connector}${this.val}\n`;
    }

    eval() { return this.val; };
}

class OpNode extends ExprNode {
    constructor(op, opSymb, children) {
        super();
        this.op = op;
        this.opSymb = opSymb;
        this.children = children;
    }

    _debugTreeString(prefix, connector, last, root) {
        let s = `${prefix}${connector}[${this.opSymb}]\n`;

        this.children.forEach((child, idx) => {
            const lastChild = idx === this.children.length - 1;
            const newConnector = lastChild ? ' \\-' : ' |-';
            const newPrefix = prefix + (root ? '' : (last ? '   ' : ' | '));
            s += child._debugTreeString(newPrefix, newConnector, lastChild, false);
        });

        return s;
    }

    eval() { return this.op(this.children.map(child => child.eval())); }
}

class BinOpNode extends OpNode {
    constructor(op, opSymb, left, right) {
        super(op, opSymb, [left, right]);
    }
}

class AddNode extends BinOpNode {
    constructor(left, right) {
        super(
            ([a, b])=>a + b, 
            "+", 
            left, right
        );
    }
}
class SubNode extends BinOpNode {
    constructor(left, right) {
        super(
            ([a, b])=>a - b, 
            "-", 
            left, right
        );
    }
}
class MulNode extends BinOpNode {
    constructor(left, right) {
        super(
            ([a, b])=>a * b, 
            "*", 
            left, right
        );
    }
}
class DivNode extends BinOpNode {
    constructor(left, right) {
        super(
            ([a, b])=>a / b, 
            "/", 
            left, right
        );
    }
}

%}

%lex
%%
\s+                   /* skip whitespace */
[0-9]+                return 'NUMBER';
"*"                   return '*';
"/"                   return '/';
"-"                   return '-';
"+"                   return '+';
"("                   return '(';
")"                   return ')';
<<EOF>>               return 'EOF';
/lex

%start Program

%left '+' '-'
%left '*' '/'

%%

Program : Expr EOF { window.rootNode = $1; $$ = $1; }
        ;

Expr: Expr '+' Expr { $$ = new AddNode($1, $3); }
    | Expr '-' Expr { $$ = new SubNode($1, $3); }
    | Expr '*' Expr { $$ = new MulNode($1, $3); }
    | Expr '/' Expr { $$ = new DivNode($1, $3); }
    | '(' Expr ')'  { $$ = $2; }
    | NUMBER        { $$ = new NumNode(yytext); }
    ;
