{{
function node(type, props = {}) {
  return { type, ...props };
}

function flatten(head, tail, index=1) {
    return flattenMap(head, tail, t => t[index])
}

function flattenMap(head, tail, fn) {
    return [head, ...tail.map(fn)]
}
}}

Start = _ doc:Document _ { return doc; }

Document = statements:Statements _ "===" _ body:Body { return node("Document", { statements, body }); }

Statements = head:Statement tail:(_ Statement)* { return flatten(head, tail); }

Statement = Import / Definition 
Import = "import" SPACE path:PATH { return node("Import", { path: path.trim() }) }

Definition = GraphemeDef / ExprDef

GraphemeDef
    = idens:IdenList _ "=" _ graphemes:Graphemes _ ";"                                 { return node("GraphemeDef", { idens, args:null, graphemes            }); }
    / idens:IdenList _ "=" _ grapheme:Grapheme                                         { return node("GraphemeDef", { idens, args:null, graphemes:[grapheme] }); }
    / idens:IdenList SPACE? "(" _ args:ArgList _ ")" _ "=" _ graphemes:Graphemes _ ";" { return node("GraphemeDef", { idens, args,      graphemes            }); }
    / idens:IdenList SPACE? "(" _ args:ArgList _ ")" _ "=" _ grapheme:Grapheme         { return node("GraphemeDef", { idens, args,      graphemes:[grapheme] }); }

ExprDef
    = idens:IdenList _ "=" _ expr:Expr                                           { return node("ExprDef", { idens, args:null, expr }); }
    / idens:IdenList SPACE? "(" _ args:ArgList _ ")" _ "=" _ expr:Expr { return node("ExprDef", { idens, args,      expr }); }

IdenList = head:IDEN tail:(SPACE IDEN)* { return flatten(head, tail); }

Graphemes = head:Grapheme tail:(_ Grapheme)* { return flatten(head, tail); }

Grapheme
    = fname:Iden _ "(" _ args:ArgList _ ")"  { return node("Call", {fname, args}); }
    / Iden
    / Block

Block = "{" _ comms:Commands _ "}" { return node("Block", {comms} ); }

CommandSep = _ ";"? _  // semicolon optional, whitespace always allowed

Commands 
    = head:Command tail:(CommandSep Command)* { return flatten(head, tail); }
    / ""                                      { return []; }

Command
    = "[" _ comms:Commands _ "]"          { return node("Bracket", { comms }); }
    / name:IDEN SPACE args:ArgListOneLine { return node("Command", { name, args     }); }
    / name:IDEN                           { return node("Command", { name, args: [] }); }

ArgListOneLine 
    = head:Arg tail:(SPACE Arg)* { return flatten(head, tail); }

ArgList 
    = head:Arg tail:(_ Arg)* { return flatten(head, tail); }

Arg = Expr / Block

Expr
  = TerminalExpr
  / "#(" _ ce:ComplexExpr _ ")" { return ce; }

ComplexExpr 
    = head:Term tail:(_ op:("+"/"-") _ term:Term)* { 
       if(tail.length === 0) return head; // pass-through rule
       return node("Sum", { head, tail:tail.map( t => ({op:t[1], val:t[3]}) ) }); 
    }

Term 
    = head:Factor tail:(_ op:("*"/"/") _ fact:Factor)* { 
        if(tail.length === 0) return head; // pass-through rule
        return node("Prod", { head, tail:tail.map( t => ({op:t[1], val:t[3]}) ) }); 
    }

Factor 
    = TerminalExpr
    / "(" _ expr:Factor _ ")"    { return expr; }
    / "(" _ expr:ComplexExpr _ ")"    { return expr; }
    / Num                       
    / Iden

TerminalExpr
    = op:("+"/"-") !SPACE child:Factor       { return node("UnaryOp", {op, child}); }
    / fname:Iden _ "(" _ args:ArgList _ ")"  { return node("Call", {fname, args}); }
    / Num
    / Iden 

// --- Body ---

Body = segments:BodySegment* { return node("Body", { segments }) }

BodySegment
    = AslBlock
    / AslInline
    / MarkdownText

AslInline
    = "@" _ graphemes:Graphemes _ "@"
      { return node("AslInline", { graphemes }) }

AslBlock
    = "@@@" _ rows:BlockRows _ "@@@"
      { return node("AslBlock", { rows }) }

BlockRows
    = head:BlockRow tail:(BlockRowSep BlockRow)* { return flatten(head, tail) }

BlockRowSep = SPACE? [\n\r] SPACE?

BlockRow
    = SPACE? head:Grapheme tail:(SPACE Grapheme)* SPACE? { return flatten(head, tail) }
    / SPACE?                                             { return null }

MarkdownText = chars:MarkdownChar+ { return node("MarkdownText", { text: chars.join('') }) }

MarkdownChar
    = FencedCode
    / InlineCode
    / DisplayMath
    / InlineMath
    / "\\\\"        { return "\\\\" }  // \\ -> \
    / "\\@"         { return "@" }     // \@ -> @
    / !"@" char:.   { return char }

FencedCode  = "```" text:$(!"```" .)* "```" { return "```"  + text + "```"  }
InlineCode  = "`"   text:$(!"`"   .)* "`"   { return "`"    + text + "`"    }
DisplayMath = "$$"  text:$(!"$$"  .)* "$$"  { return "$$"   + text + "$$"   }
InlineMath  = "$"   text:$(!"$"   .)* "$"   { return "$"    + text + "$"    }

// --- Terminals ---

PATH = $([^\n\r=][^\n\r]*)

Iden = name:IDEN { return node("Iden", {name})  }
Num  = val:NUM   { return node("Number", {val}) }

IDEN = $([_a-zA-Z~][_a-zA-Z0-9~]*)
NUM  = val:$([0-9]+("." [0-9]*)?) { return Number(val); }

SPACE    = " "+
NEW_LINE = [\n\r]+
COMMENT
    = "//" [^\n\r]* (NEW_LINE / !.)
    / "/*" (!"*/" .)* "*/"

_ = (SPACE / NEW_LINE / COMMENT)*