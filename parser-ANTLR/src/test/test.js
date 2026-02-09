import antlr4 from "antlr4";

import DocumentLexer from "../parser/DocumentLexer.js";
import DocumentParser from "../parser/DocumentParser.js";
import GraphemeVisitor from "../app/GraphemeVisitor.js";

import * as fs from 'node:fs';
import beautify from 'js-beautify';

function printCodeBlock(str) {
    const lines = str.split('\n');
    const numWidth = String(lines.length).length;
    lines.forEach((line, index) => {
        const fmtNum = String(index+1).padStart(numWidth);
        console.log(`${fmtNum} | ${line}`);
    });
}

const input = fs.readFileSync(process.argv[2], 'utf8');

const chars = new antlr4.InputStream(input);
const lexer = new DocumentLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
const parser = new DocumentParser(tokens);
parser.buildParseTrees = true;

const tree = parser.document();

const visitor = new GraphemeVisitor();
const htmlOutput = visitor.visit(tree);

console.log("Program:");
printCodeBlock(input);

console.log("Result:");
var prettyHtml = beautify.html(
    htmlOutput, 
    { 
        indent_size: 4, 
        space_in_empty_paren: true,
        preserve_newlines: true,
    }
);


printCodeBlock(prettyHtml);
fs.writeFileSync(process.argv[3], prettyHtml, 'utf8');