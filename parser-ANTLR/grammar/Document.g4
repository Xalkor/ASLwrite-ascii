grammar Document;	

/*
 *           +--------+
 *           | PARSER |
 *           +--------+
 */

document: assignment* grapheme_list EOF ;

assignment: iden_list ASSIGN grapheme_list SEMICOLON ;

iden_list: IDEN (COMMA IDEN)* ;

grapheme_list: grapheme+ ;

grapheme: IDEN
        | OPEN_CURLY command_list CLOSE_CURLY
        ;

command_list: (command SEMICOLON)* command SEMICOLON? ;

command: group                 # commandGroup
       | iden_list ASSIGN expr # assignCommand
       | IDEN arg*             # functionCommand
       ;

arg: expr | arrow ;

expr: (PLUS | DASH) expr           # unarySign
    | OPEN_PAREN expr CLOSE_PAREN  # parens
    | expr op=(STAR | SLASH) expr  # mulDiv
    | expr op=(PLUS | DASH)  expr  # addSub
    | NUM                          # number
    | IDEN                         # iden
    ;

group: OPEN_SQUARE command_list CLOSE_SQUARE ;

arrow: PIPE? DASH arrow_head ;

arrow_head: BANG | DOT+ | CLOSE_ANGLE DOT* ;

/*
 *           +-------+
 *           | LEXER |
 *           +-------+
 */

ASSIGN       : '=';
OPEN_CURLY   : '{';
CLOSE_CURLY  : '}';
OPEN_SQUARE  : '[';
CLOSE_SQUARE : ']';
OPEN_PAREN   : '(';
CLOSE_PAREN  : ')';
COMMA        : ',';      
SEMICOLON    : ';';  
PIPE         : '|';       
DASH         : '-';       
CLOSE_ANGLE  : '>';
BANG         : '!';     
DOT          : '.';  
STAR         : '*';  
SLASH        : '/';  
PLUS         : '+';  

NUM: [0-9]+'.'?[0-9]*;
IDEN : [a-zA-Z0-9_^@~"]*[a-zA-Z_^@~"][a-zA-Z0-9_^@~"]*; // diacritic symbols, included as valid IDEN names

WHITESPACE : [ \t\r\n]+ -> skip;