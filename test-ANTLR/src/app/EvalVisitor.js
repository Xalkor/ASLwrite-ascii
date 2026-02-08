import ExprVisitor from "../parser/ExprVisitor.js";

export default class EvalVisitor extends ExprVisitor {

    visitProg(ctx) {
        // prog: expr EOF
        return this.visit(ctx.expr());
    }

    visitExpr(ctx) {

        // INT
        if (ctx.INT()) {
            return Number(ctx.INT().getText());
        }

        // Parentheses: '(' expr ')'
        if (ctx.children.length === 3 &&
                ctx.getChild(0).getText() === "(") {
            return this.visit(ctx.expr(0));
        }

        // Binary operators: expr op expr
        if (ctx.children.length === 3) {

            const left  = this.visit(ctx.expr(0));
            const right = this.visit(ctx.expr(1));
            const op    = ctx.getChild(1).getText();

            switch (op) {
                case "+":
                    return left + right;

                case "-":
                    return left - right;

                case "*":
                    return left * right;

                case "/":
                    return Math.trunc(left / right); // integer division
            }
        }

        throw new Error("Unknown expression: " + ctx.getText());
    }
}