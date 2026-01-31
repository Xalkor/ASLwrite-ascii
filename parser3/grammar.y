%{
#include <stdio.h>
#include <stdlib.h>
#include "node.h"

Node* root = NULL;

extern int yylex();
extern int yyparse();
void dump(Node* n);
void run(Node* n);
extern FILE* yyin;

void yyerror(const char* s);

%}

%union {
	int val;
	char* str;
	Node* node;
}

%token <str> IDEN
%token <str> DOTS
%token <val> NUM

%token BODY_BEGIN
%token BODY_END

%token ASSIGN
%token OPEN_CURLY
%token CLOSE_CURLY
%token OPEN_SQUARE
%token CLOSE_SQUARE
%token COMMA
%token CARROT
%token AT
%token TWIDDLE
%token QUOTE
%token UNDERSCORE
%token PIPE
%token DASH
%token CLOSE_ANGLE
%token BANG
%token SEMICOLON

%type <node> document assignment grapheme_list iden_list grapheme command_list command arg_list arg group arrow arrow_head diacritic

%start start

%%

start: document { root = $1; }

document: assignment document { $$ = static_cast<Document*>($2)->push_assignment($1); }
        | grapheme_list       { $$ = new Document($1); }
        ;

assignment: iden_list ASSIGN grapheme_list SEMICOLON { $$ = new Assignment($1, $3); }
          ;

iden_list: IDEN COMMA iden_list { $$ = static_cast<IdenList*>($3)->push(new Iden($1)); }
         | IDEN                 { $$ = new IdenList(new Iden($1));                     }
         ;

grapheme_list: grapheme grapheme_list { $$ = static_cast<GraphemeList*>($2)->push($1); }
             | grapheme               { $$ = new GraphemeList($1);                     }
             ;

grapheme: IDEN                                { $$ = new SimpleGrapheme(new Iden($1)); }
        | OPEN_CURLY command_list CLOSE_CURLY { $$ = new ProgrammedGrapheme($2);       }
        ;

command_list: command SEMICOLON command_list        { $$ = static_cast<CommandList*>($3)->push($1); }
            | command optional_semicolon            { $$ = new CommandList($1);                     }
            | group optional_semicolon command_list { $$ = static_cast<CommandList*>($3)->push($1); }
            | group optional_semicolon              { $$ = new CommandList($1);                     }
            ;

optional_semicolon: SEMICOLON | /*epsilon*/ ;

command: IDEN arg_list { $$ = new Command(new Iden($1), $2);                }
       | IDEN          { $$ = new Command(new Iden($1), new ArgList(NULL)); }
       ;

arg_list: arg arg_list { $$ = static_cast<ArgList*>($2)->push($1); }
        | arg          { $$ = new ArgList($1); }
        ;

arg: IDEN      { $$ = new Iden($1);      }
   | NUM       { $$ = new Num($1);       }
   | diacritic
   | arrow
   ;

diacritic: CARROT  { $$ = new Diacritic( Diacritic::Type::HINGE      ); }
         | AT      { $$ = new Diacritic( Diacritic::Type::ROTATIONAL ); }
         | TWIDDLE { $$ = new Diacritic( Diacritic::Type::FLUTTER    ); }
         | QUOTE   { $$ = new Diacritic( Diacritic::Type::RATTLE     ); }
         ;

arrow: PIPE DASH arrow_head { $$ = static_cast<Arrow*>($3)->make_vertical(); }
     | DASH arrow_head      { $$ = $2;                                       }
     ;

arrow_head: BANG             { $$ = new Arrow(false, true, NULL ); }
          | DOTS             { $$ = new Arrow(false, false, $1  ); }
          | CLOSE_ANGLE      { $$ = new Arrow(true, false, NULL ); }
          | CLOSE_ANGLE DOTS { $$ = new Arrow(true, false, $2   ); }
          | /* epsilon */    { $$ = new Arrow(false, false, NULL); }
          ;

group: OPEN_SQUARE command_list CLOSE_SQUARE { $$ = new CommandGroup($2); }

%%

#ifndef TEST_LEXER
int main() {
    yyparse();
    dump(root);
    run(root);
    return 0;
}
#endif

void yyerror(const char* s) {
        fprintf(stderr, "Parse error: %s\n", s);
        exit(1);
}

void dump(Node* n) {
    std::cout << n->toString() << std::endl;
}

void run(Node* n) {
    //State* state;
    //n->run(state);
}