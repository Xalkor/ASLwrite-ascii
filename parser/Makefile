OUTPUT_FILE = src/parser.js
GRAMMAR_FILE = src/parser.peggy
PEG = npx peggy

SERVE = npx serve

BUNDLE_MAIN = src/main.js
BUNDLE_TARGET = dist/asl_write_ascii.bundle.js
BUNDLE = npx esbuild

.PHONY: build host bundle all clean

build:
	$(PEG) $(GRAMMAR_FILE) -o $(OUTPUT_FILE) --format es

bundle: build
	$(BUNDLE) $(BUNDLE_MAIN) --bundle --outfile=$(BUNDLE_TARGET) --format=esm --platform=browser --loader:.asl=text

host:
	$(SERVE) dist

all: clean bundle host

clean:
	rm -rf $(OUTPUT_FILE)	
	rm -rf $(BUNDLE_TARGET)