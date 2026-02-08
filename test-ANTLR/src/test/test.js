import antlr4 from "antlr4";

import ExprLexer from "../parser/ExprLexer.js";
import ExprParser from "../parser/ExprParser.js";
import EvalVisitor from "../app/EvalVisitor.js";

const input = "(10+20)*3";

const chars = new antlr4.InputStream(input);
const lexer = new ExprLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new ExprParser(tokens);

const tree = parser.prog();

const visitor = new EvalVisitor();
const result = tree.accept(visitor);

console.log("Program:", input);
console.log("Result:", result);