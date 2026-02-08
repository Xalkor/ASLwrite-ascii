# ANTLR setup
ANTLR = java -jar /Users/ems/antlr/antlr.jar
OUT_DIR = src/parser
ANTLR_FLAGS = -Dlanguage=JavaScript \
			  -visitor \
              -o $(OUT_DIR) \
              -Xexact-output-dir
TARGET = grammar/Expr.g4
WEBPACK = npx webpack
DIST_DIR = dist

.PHONY: all clean build bundle test

all: build bundle

build:
	@echo "Generating parser/lexer from grammar $(TARGET)..."
	$(ANTLR) $(TARGET) $(ANTLR_FLAGS)

test: build
	@echo "Running test..."
	node src/test/test.js

bundle: build
	@echo "Bundling JS into $(DIST_DIR)/bundle.js..."
	$(WEBPACK) --config webpack.config.js

clean:
	rm -rf $(OUT_DIR)/*
	rm -rf $(DIST_DIR)/*