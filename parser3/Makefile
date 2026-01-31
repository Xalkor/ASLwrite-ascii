LEX=/opt/homebrew/opt/flex/bin/flex
PARSE=/opt/homebrew/opt/bison/bin/bison
CC=clang++
CXXFLAGS = -std=c++17 -stdlib=libc++

LEX_ARGS=-I /opt/homebrew/opt/flex/include

LEX_TARGET=scanner
PARSE_TARGET=grammar
OUT_NAME=parse

DEBUG_LEVEL = 1


lex:
	$(PARSE) -d $(PARSE_TARGET).y
	$(LEX) $(LEX_TARGET).lex
	$(CC) $(CXXFLAGS) $(LEX_ARGS) -o $(LEX_TARGET) -DTEST_LEXER lex.yy.c grammar.tab.c node.cpp

lex-debug:
	$(PARSE) -d $(PARSE_TARGET).y
	$(LEX) $(LEX_TARGET).lex
	$(CC) $(CXXFLAGS) -g $(LEX_ARGS) -o $(LEX_TARGET) -DTEST_LEXER -DDEBUG=$(DEBUG_LEVEL) lex.yy.c grammar.tab.c node.cpp

parse:
	$(PARSE) -d $(PARSE_TARGET).y
	$(LEX) $(LEX_TARGET).lex
	$(CC) $(CXXFLAGS) $(LEX_ARGS) -o $(OUT_NAME) lex.yy.c grammar.tab.c node.cpp

parse-debug:
	$(PARSE) -v -d $(PARSE_TARGET).y
	$(LEX) $(LEX_TARGET).lex
	$(CC) $(CXXFLAGS) -g $(LEX_ARGS) -o $(OUT_NAME) -DDEBUG=$(DEBUG_LEVEL) lex.yy.c grammar.tab.c node.cpp

clean:
	rm -f *.tab.cxx
	rm -f *.tab.hxx
	rm -f *.yy.c
	rm -f *.output
	rm -f $(LEX_TARGET)	
	rm -f $(PARSE_TARGET)
	rm -f $(OUT_NAME)