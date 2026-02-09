ANTLR       = java -jar /Users/ems/antlr/antlr.jar
OUT_DIR     = src/parser
ANTLR_FLAGS = -Dlanguage=JavaScript \
			  -visitor \
              -o $(OUT_DIR) \
              -Xexact-output-dir
TARGET      = grammar/Document.g4

WEBPACK  = npx webpack
DIST_DIR = dist

JAVA_OUT = java
JS_OUT   = src/parser
GRUN     = java org.antlr.v4.gui.TestRig

TESTS = 0 1 2 3 4 5 6

.PHONY: all clean build bundle test java grun

all: build bundle

build:
	@echo "Generating parser/lexer from grammar $(TARGET)..."
	$(ANTLR) $(TARGET) $(ANTLR_FLAGS)

test: build
	@for i in $(TESTS); do \
		echo ""; \
		echo "====running test: $$i===="; \
		node src/test/test.js src/test/test$$i.asl src/test/test$$i.svg; \
	done
	
bundle: build
	@echo "Bundling JS into $(DIST_DIR)/bundle.js..."
	$(WEBPACK) --config webpack.config.js

java:
	$(ANTLR) $(TARGET) -o $(JAVA_OUT) -Xexact-output-dir
	javac $(JAVA_OUT)/*.java

grun: java
	cd $(JAVA_OUT) && $(GRUN) Document document -gui < /dev/stdin

clean:
	rm -rf $(OUT_DIR)/*
	rm -rf $(DIST_DIR)/*
	rm -rf $(JAVA_OUT)/*