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

command: group
       | IDEN arg*
       ;

arg: IDEN | NUM | arrow ;

group: OPEN_SQUARE command_list CLOSE_SQUARE ;

arrow: PIPE? DASH arrow_head? ;

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
COMMA        : ',';      
SEMICOLON    : ';';  
PIPE         : '|';       
DASH         : '-';       
CLOSE_ANGLE  : '>';
BANG         : '!';     
DOT          : '.';  

NUM: '-'?[0-9]+'.'?[0-9]*;
IDEN : [a-zA-Z0-9_^@~"-]*[a-zA-Z_^@~"][a-zA-Z0-9_^@~"-]*; // diacritic symbols, included as valid IDEN names

WHITESPACE : [ \t\r\n]+ -> skip;