// Generated from grammar/Document.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import DocumentListener from './DocumentListener.js';
import DocumentVisitor from './DocumentVisitor.js';

const serializedATN = [4,1,15,110,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,5,0,24,8,0,10,0,
12,0,27,9,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,5,2,40,8,2,10,2,
12,2,43,9,2,1,3,4,3,46,8,3,11,3,12,3,47,1,4,1,4,1,4,1,4,1,4,3,4,55,8,4,1,
5,1,5,1,5,5,5,60,8,5,10,5,12,5,63,9,5,1,5,1,5,3,5,67,8,5,1,6,1,6,1,6,5,6,
72,8,6,10,6,12,6,75,9,6,3,6,77,8,6,1,7,1,7,1,7,3,7,82,8,7,1,8,1,8,1,8,1,
8,1,9,3,9,89,8,9,1,9,1,9,3,9,93,8,9,1,10,1,10,4,10,97,8,10,11,10,12,10,98,
1,10,1,10,5,10,103,8,10,10,10,12,10,106,9,10,3,10,108,8,10,1,10,0,0,11,0,
2,4,6,8,10,12,14,16,18,20,0,0,114,0,25,1,0,0,0,2,31,1,0,0,0,4,36,1,0,0,0,
6,45,1,0,0,0,8,54,1,0,0,0,10,61,1,0,0,0,12,76,1,0,0,0,14,81,1,0,0,0,16,83,
1,0,0,0,18,88,1,0,0,0,20,107,1,0,0,0,22,24,3,2,1,0,23,22,1,0,0,0,24,27,1,
0,0,0,25,23,1,0,0,0,25,26,1,0,0,0,26,28,1,0,0,0,27,25,1,0,0,0,28,29,3,6,
3,0,29,30,5,0,0,1,30,1,1,0,0,0,31,32,3,4,2,0,32,33,5,1,0,0,33,34,3,6,3,0,
34,35,5,7,0,0,35,3,1,0,0,0,36,41,5,14,0,0,37,38,5,6,0,0,38,40,5,14,0,0,39,
37,1,0,0,0,40,43,1,0,0,0,41,39,1,0,0,0,41,42,1,0,0,0,42,5,1,0,0,0,43,41,
1,0,0,0,44,46,3,8,4,0,45,44,1,0,0,0,46,47,1,0,0,0,47,45,1,0,0,0,47,48,1,
0,0,0,48,7,1,0,0,0,49,55,5,14,0,0,50,51,5,2,0,0,51,52,3,10,5,0,52,53,5,3,
0,0,53,55,1,0,0,0,54,49,1,0,0,0,54,50,1,0,0,0,55,9,1,0,0,0,56,57,3,12,6,
0,57,58,5,7,0,0,58,60,1,0,0,0,59,56,1,0,0,0,60,63,1,0,0,0,61,59,1,0,0,0,
61,62,1,0,0,0,62,64,1,0,0,0,63,61,1,0,0,0,64,66,3,12,6,0,65,67,5,7,0,0,66,
65,1,0,0,0,66,67,1,0,0,0,67,11,1,0,0,0,68,77,3,16,8,0,69,73,5,14,0,0,70,
72,3,14,7,0,71,70,1,0,0,0,72,75,1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,77,
1,0,0,0,75,73,1,0,0,0,76,68,1,0,0,0,76,69,1,0,0,0,77,13,1,0,0,0,78,82,5,
14,0,0,79,82,5,13,0,0,80,82,3,18,9,0,81,78,1,0,0,0,81,79,1,0,0,0,81,80,1,
0,0,0,82,15,1,0,0,0,83,84,5,4,0,0,84,85,3,10,5,0,85,86,5,5,0,0,86,17,1,0,
0,0,87,89,5,8,0,0,88,87,1,0,0,0,88,89,1,0,0,0,89,90,1,0,0,0,90,92,5,9,0,
0,91,93,3,20,10,0,92,91,1,0,0,0,92,93,1,0,0,0,93,19,1,0,0,0,94,108,5,11,
0,0,95,97,5,12,0,0,96,95,1,0,0,0,97,98,1,0,0,0,98,96,1,0,0,0,98,99,1,0,0,
0,99,108,1,0,0,0,100,104,5,10,0,0,101,103,5,12,0,0,102,101,1,0,0,0,103,106,
1,0,0,0,104,102,1,0,0,0,104,105,1,0,0,0,105,108,1,0,0,0,106,104,1,0,0,0,
107,94,1,0,0,0,107,96,1,0,0,0,107,100,1,0,0,0,108,21,1,0,0,0,14,25,41,47,
54,61,66,73,76,81,88,92,98,104,107];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class DocumentParser extends antlr4.Parser {

    static grammarFileName = "Document.g4";
    static literalNames = [ null, "'='", "'{'", "'}'", "'['", "']'", "','", 
                            "';'", "'|'", "'-'", "'>'", "'!'", "'.'" ];
    static symbolicNames = [ null, "ASSIGN", "OPEN_CURLY", "CLOSE_CURLY", 
                             "OPEN_SQUARE", "CLOSE_SQUARE", "COMMA", "SEMICOLON", 
                             "PIPE", "DASH", "CLOSE_ANGLE", "BANG", "DOT", 
                             "NUM", "IDEN", "WHITESPACE" ];
    static ruleNames = [ "document", "assignment", "iden_list", "grapheme_list", 
                         "grapheme", "command_list", "command", "arg", "group", 
                         "arrow", "arrow_head" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = DocumentParser.ruleNames;
        this.literalNames = DocumentParser.literalNames;
        this.symbolicNames = DocumentParser.symbolicNames;
    }



	document() {
	    let localctx = new DocumentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, DocumentParser.RULE_document);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 25;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,0,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 22;
	                this.assignment(); 
	            }
	            this.state = 27;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,0,this._ctx);
	        }

	        this.state = 28;
	        this.grapheme_list();
	        this.state = 29;
	        this.match(DocumentParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	assignment() {
	    let localctx = new AssignmentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, DocumentParser.RULE_assignment);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 31;
	        this.iden_list();
	        this.state = 32;
	        this.match(DocumentParser.ASSIGN);
	        this.state = 33;
	        this.grapheme_list();
	        this.state = 34;
	        this.match(DocumentParser.SEMICOLON);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	iden_list() {
	    let localctx = new Iden_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, DocumentParser.RULE_iden_list);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 36;
	        this.match(DocumentParser.IDEN);
	        this.state = 41;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===6) {
	            this.state = 37;
	            this.match(DocumentParser.COMMA);
	            this.state = 38;
	            this.match(DocumentParser.IDEN);
	            this.state = 43;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	grapheme_list() {
	    let localctx = new Grapheme_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, DocumentParser.RULE_grapheme_list);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 45; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 44;
	            this.grapheme();
	            this.state = 47; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===2 || _la===14);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	grapheme() {
	    let localctx = new GraphemeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, DocumentParser.RULE_grapheme);
	    try {
	        this.state = 54;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 14:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 49;
	            this.match(DocumentParser.IDEN);
	            break;
	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 50;
	            this.match(DocumentParser.OPEN_CURLY);
	            this.state = 51;
	            this.command_list();
	            this.state = 52;
	            this.match(DocumentParser.CLOSE_CURLY);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	command_list() {
	    let localctx = new Command_listContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, DocumentParser.RULE_command_list);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 61;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 56;
	                this.command();
	                this.state = 57;
	                this.match(DocumentParser.SEMICOLON); 
	            }
	            this.state = 63;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
	        }

	        this.state = 64;
	        this.command();
	        this.state = 66;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===7) {
	            this.state = 65;
	            this.match(DocumentParser.SEMICOLON);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	command() {
	    let localctx = new CommandContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, DocumentParser.RULE_command);
	    var _la = 0;
	    try {
	        this.state = 76;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 4:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 68;
	            this.group();
	            break;
	        case 14:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 69;
	            this.match(DocumentParser.IDEN);
	            this.state = 73;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while((((_la) & ~0x1f) === 0 && ((1 << _la) & 25344) !== 0)) {
	                this.state = 70;
	                this.arg();
	                this.state = 75;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	arg() {
	    let localctx = new ArgContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, DocumentParser.RULE_arg);
	    try {
	        this.state = 81;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 14:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 78;
	            this.match(DocumentParser.IDEN);
	            break;
	        case 13:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 79;
	            this.match(DocumentParser.NUM);
	            break;
	        case 8:
	        case 9:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 80;
	            this.arrow();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	group() {
	    let localctx = new GroupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, DocumentParser.RULE_group);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 83;
	        this.match(DocumentParser.OPEN_SQUARE);
	        this.state = 84;
	        this.command_list();
	        this.state = 85;
	        this.match(DocumentParser.CLOSE_SQUARE);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	arrow() {
	    let localctx = new ArrowContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, DocumentParser.RULE_arrow);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 88;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===8) {
	            this.state = 87;
	            this.match(DocumentParser.PIPE);
	        }

	        this.state = 90;
	        this.match(DocumentParser.DASH);
	        this.state = 92;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 7168) !== 0)) {
	            this.state = 91;
	            this.arrow_head();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	arrow_head() {
	    let localctx = new Arrow_headContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, DocumentParser.RULE_arrow_head);
	    var _la = 0;
	    try {
	        this.state = 107;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 94;
	            this.match(DocumentParser.BANG);
	            break;
	        case 12:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 96; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 95;
	                this.match(DocumentParser.DOT);
	                this.state = 98; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===12);
	            break;
	        case 10:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 100;
	            this.match(DocumentParser.CLOSE_ANGLE);
	            this.state = 104;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===12) {
	                this.state = 101;
	                this.match(DocumentParser.DOT);
	                this.state = 106;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

DocumentParser.EOF = antlr4.Token.EOF;
DocumentParser.ASSIGN = 1;
DocumentParser.OPEN_CURLY = 2;
DocumentParser.CLOSE_CURLY = 3;
DocumentParser.OPEN_SQUARE = 4;
DocumentParser.CLOSE_SQUARE = 5;
DocumentParser.COMMA = 6;
DocumentParser.SEMICOLON = 7;
DocumentParser.PIPE = 8;
DocumentParser.DASH = 9;
DocumentParser.CLOSE_ANGLE = 10;
DocumentParser.BANG = 11;
DocumentParser.DOT = 12;
DocumentParser.NUM = 13;
DocumentParser.IDEN = 14;
DocumentParser.WHITESPACE = 15;

DocumentParser.RULE_document = 0;
DocumentParser.RULE_assignment = 1;
DocumentParser.RULE_iden_list = 2;
DocumentParser.RULE_grapheme_list = 3;
DocumentParser.RULE_grapheme = 4;
DocumentParser.RULE_command_list = 5;
DocumentParser.RULE_command = 6;
DocumentParser.RULE_arg = 7;
DocumentParser.RULE_group = 8;
DocumentParser.RULE_arrow = 9;
DocumentParser.RULE_arrow_head = 10;

class DocumentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_document;
    }

	grapheme_list() {
	    return this.getTypedRuleContext(Grapheme_listContext,0);
	};

	EOF() {
	    return this.getToken(DocumentParser.EOF, 0);
	};

	assignment = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AssignmentContext);
	    } else {
	        return this.getTypedRuleContext(AssignmentContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterDocument(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitDocument(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitDocument(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AssignmentContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_assignment;
    }

	iden_list() {
	    return this.getTypedRuleContext(Iden_listContext,0);
	};

	ASSIGN() {
	    return this.getToken(DocumentParser.ASSIGN, 0);
	};

	grapheme_list() {
	    return this.getTypedRuleContext(Grapheme_listContext,0);
	};

	SEMICOLON() {
	    return this.getToken(DocumentParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterAssignment(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitAssignment(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitAssignment(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Iden_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_iden_list;
    }

	IDEN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(DocumentParser.IDEN);
	    } else {
	        return this.getToken(DocumentParser.IDEN, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(DocumentParser.COMMA);
	    } else {
	        return this.getToken(DocumentParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterIden_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitIden_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitIden_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Grapheme_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_grapheme_list;
    }

	grapheme = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(GraphemeContext);
	    } else {
	        return this.getTypedRuleContext(GraphemeContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterGrapheme_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitGrapheme_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitGrapheme_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class GraphemeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_grapheme;
    }

	IDEN() {
	    return this.getToken(DocumentParser.IDEN, 0);
	};

	OPEN_CURLY() {
	    return this.getToken(DocumentParser.OPEN_CURLY, 0);
	};

	command_list() {
	    return this.getTypedRuleContext(Command_listContext,0);
	};

	CLOSE_CURLY() {
	    return this.getToken(DocumentParser.CLOSE_CURLY, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterGrapheme(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitGrapheme(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitGrapheme(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Command_listContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_command_list;
    }

	command = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(CommandContext);
	    } else {
	        return this.getTypedRuleContext(CommandContext,i);
	    }
	};

	SEMICOLON = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(DocumentParser.SEMICOLON);
	    } else {
	        return this.getToken(DocumentParser.SEMICOLON, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterCommand_list(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitCommand_list(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitCommand_list(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class CommandContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_command;
    }

	group() {
	    return this.getTypedRuleContext(GroupContext,0);
	};

	IDEN() {
	    return this.getToken(DocumentParser.IDEN, 0);
	};

	arg = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArgContext);
	    } else {
	        return this.getTypedRuleContext(ArgContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterCommand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitCommand(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitCommand(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArgContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_arg;
    }

	IDEN() {
	    return this.getToken(DocumentParser.IDEN, 0);
	};

	NUM() {
	    return this.getToken(DocumentParser.NUM, 0);
	};

	arrow() {
	    return this.getTypedRuleContext(ArrowContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterArg(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitArg(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitArg(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class GroupContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_group;
    }

	OPEN_SQUARE() {
	    return this.getToken(DocumentParser.OPEN_SQUARE, 0);
	};

	command_list() {
	    return this.getTypedRuleContext(Command_listContext,0);
	};

	CLOSE_SQUARE() {
	    return this.getToken(DocumentParser.CLOSE_SQUARE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArrowContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_arrow;
    }

	DASH() {
	    return this.getToken(DocumentParser.DASH, 0);
	};

	PIPE() {
	    return this.getToken(DocumentParser.PIPE, 0);
	};

	arrow_head() {
	    return this.getTypedRuleContext(Arrow_headContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterArrow(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitArrow(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitArrow(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class Arrow_headContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_arrow_head;
    }

	BANG() {
	    return this.getToken(DocumentParser.BANG, 0);
	};

	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(DocumentParser.DOT);
	    } else {
	        return this.getToken(DocumentParser.DOT, i);
	    }
	};


	CLOSE_ANGLE() {
	    return this.getToken(DocumentParser.CLOSE_ANGLE, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterArrow_head(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitArrow_head(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitArrow_head(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




DocumentParser.DocumentContext = DocumentContext; 
DocumentParser.AssignmentContext = AssignmentContext; 
DocumentParser.Iden_listContext = Iden_listContext; 
DocumentParser.Grapheme_listContext = Grapheme_listContext; 
DocumentParser.GraphemeContext = GraphemeContext; 
DocumentParser.Command_listContext = Command_listContext; 
DocumentParser.CommandContext = CommandContext; 
DocumentParser.ArgContext = ArgContext; 
DocumentParser.GroupContext = GroupContext; 
DocumentParser.ArrowContext = ArrowContext; 
DocumentParser.Arrow_headContext = Arrow_headContext; 
