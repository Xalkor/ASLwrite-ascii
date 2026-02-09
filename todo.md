# 2/7/26
- get the grammar in `test-ANTLR` to actually parse the expressions
- convert the grammar from `parser3` from flex/bison to ANTLR

# 2/8/26
- added ANTLR grammar for asl write ascii
- added variables
- added expressions
- removed dashes from variable names
- need to add 
  - "stamping"
  - syntax highlighting for `.asl` files
  - real unit tests
  - figure out how name shadowing should work (i.e. if `5_num = {some grapheme}` then what should `5_num = 7;` do in a grapheme definition)
    - Unfortunately I think the answer is to add scopes, so it is shadowed in the current scope but not the whole document
    - I could also image the symbol table is `(name, type) -> val` instead of `name -> (type, val)` so the grapheme `5_num` is a different variable than the num `5-num`.