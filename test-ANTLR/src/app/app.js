import antlr4 from 'antlr4';
import ExprLexer from '../parser/ExprLexer.js';
import ExprParser from '../parser/ExprParser.js';

window.parseExpression = function(input) {
    const chars = new antlr4.InputStream(input);
    const lexer = new ExprLexer(chars);
    const tokens = new antlr4.CommonTokenStream(lexer);
    const parser = new ExprParser(tokens);
    const tree = parser.expr();

    // Return the parse tree as string
    return tree.toStringTree(parser.ruleNames);
}