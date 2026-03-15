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

Document
    = defs:Definitions _ "---" _ body:Body     { return node("Document", { defs    , body }); }
    / body:Body                                { return node("Document", { defs: [], body }); }

Definitions = head:Definition tail:(NEW_LINE+ Definition)* { return flatten(head, tail); }

Definition 
    = idens:IdenList _ "=" _ graphemes:Graphemes _ ";" { return node("Definition", { idens, graphemes            }); }
    / idens:IdenList _ "=" _ grapheme:Grapheme         { return node("Definition", { idens, graphemes:[grapheme] }); }

IdenList = head:IDEN tail:("," _? IDEN)* { return flatten(head, tail, 2); }

Graphemes = head:Grapheme tail:(_ Grapheme)* { return flatten(head, tail); }

Grapheme
    = Iden
    / Block

Block = "{" _ comms:Commands _ "}" { return node("Block", {comms} ); }

CommandSep = _ ";"? _  // semicolon optional, whitespace always allowed

Commands 
    = head:Command tail:(CommandSep Command)* { return flatten(head, tail); }
    / ""                                      { return []; }

Command
    = "[" _ comms:Commands _ "]"   { return node("Bracket", { comms }); }
    / name:IDEN SPACE args:ArgList { return node("Command", { name, args     }); }
    / name:IDEN                    { return node("Command", { name, args: [] }); }

ArgList 
    = head:Arg tail:(SPACE Arg)* { return flatten(head, tail); }

Arg = Expr

Expr
  = Factor
  / "(" _ ce:ComplexExpr _ ")" { return ce; }

ComplexExpr 
    = head:Term tail:(SPACE? op:("+"/"-") SPACE? term:Term)*   { 
       if(tail.length === 0) return head; // pass-through rule
       return node("Sum", { 
           vals: flattenMap(head, tail, t=>({op:t[1], val:t[3]})) 
       }); 
    }

Term 
    = head:Factor tail:(SPACE? op:("*"/"/") SPACE? fact:Factor)* { 
        if(tail.length === 0) return head; // pass-through rule
        return node("Prod", { 
            vals: flattenMap(head, tail, t=>({op:t[1], val:t[3]})) 
        }); 
    }

Factor 
    = op:("+"/"-") !SPACE child:Factor { return node("UnaryOp", {op, child}); }
    / "(" SPACE expr:Expr SPACE ")"    { return expr; }
    / Num                       
    / Iden

Body = head:Line tail:(NEW_LINE Line)* { return node("Body", { rows: flatten(head, tail) }); }

Line 
    = SPACE? row:Row { return row; }
    / ""             { return null; }

Row = head:Iden tail:(SPACE Iden)* { return node("Row", { cols: flatten(head, tail) }); }

Iden = name:IDEN { return node("Iden",   {name}) }

Num = val:NUM { return node("Number", {val}) }

IDEN = $([_a-zA-Z~][_a-zA-Z0-9~]*)

NUM = val:$([0-9]+("." [0-9]*)?) { return Number(val); }

SPACE = " "+
NEW_LINE = [\n\r]+
COMMENT = "#" [^\n\r]* NEW_LINE

_ = (SPACE / NEW_LINE / COMMENT)*