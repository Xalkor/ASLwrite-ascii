%option noyywrap

%{
#include <stdio.h>

#define YY_DECL int yylex()

#include "node.h"
#include "grammar.tab.h"

#ifdef DEBUG
    extern const char* ESC[256];
    const char* ESC[256] = {NULL};
#endif

%}

%x COMMAND_MODE

%%

-?[0-9]+(\.[0-9]+)?                      { LOG(1, "NUM[%s]\n", yytext);  yylval.val = atof(yytext);   return NUM;  }
[a-zA-Z0-9_\-]*[a-zA-Z]+[a-zA-Z0-9_\-]*  { LOG(1, "IDEN[%s]\n", yytext); yylval.str = strdup(yytext); return IDEN; }
\.+                                      { LOG(1, "DOTS[%s]\n", yytext); yylval.str = strdup(yytext); return DOTS; }

"="  { LOG(1, "%s\n", yytext); return ASSIGN;       }
"{"  { LOG(1, "%s\n", yytext); return OPEN_CURLY;   }
"}"  { LOG(1, "%s\n", yytext); return CLOSE_CURLY;  }
"["  { LOG(1, "%s\n", yytext); return OPEN_SQUARE;  }
"]"  { LOG(1, "%s\n", yytext); return CLOSE_SQUARE; }
","  { LOG(1, "%s\n", yytext); return COMMA;        }
";"  { LOG(1, "%s\n", yytext); return SEMICOLON;    }
"^"  { LOG(1, "%s\n", yytext); return CARROT;       }
"@"  { LOG(1, "%s\n", yytext); return AT;           }
"~"  { LOG(1, "%s\n", yytext); return TWIDDLE;      }
"\"" { LOG(1, "%s\n", yytext); return QUOTE;        }
"_"  { LOG(1, "%s\n", yytext); return UNDERSCORE;   }
"|"  { LOG(1, "%s\n", yytext); return PIPE;         }
"-"  { LOG(1, "%s\n", yytext); return DASH;         }
">"  { LOG(1, "%s\n", yytext); return CLOSE_ANGLE;  }
"!"  { LOG(1, "%s\n", yytext); return BANG;         }


[ \t\r\n,]+ { LOG(2, "skip: [%s]\n", ESC[yytext[0]] == NULL ? yytext : ESC[yytext[0]]); /* Ignore other characters */ }

%%

#ifdef TEST_LEXER
int main(void)
{
    #ifdef DEBUG
        ESC['\n']="\\n"; 
        ESC['\t']="\\t"; 
        ESC['\r']="\\r";
    #endif

    int tok;
    while ((tok = yylex()) != 0);
    return 0;
}
#endif