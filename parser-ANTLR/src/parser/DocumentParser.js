// Generated from grammar/Document.g4 by ANTLR 4.13.0
// jshint ignore: start
import antlr4 from 'antlr4';
import DocumentListener from './DocumentListener.js';
import DocumentVisitor from './DocumentVisitor.js';

const serializedATN = [4,1,20,136,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,1,0,5,0,26,
8,0,10,0,12,0,29,9,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,2,1,2,1,2,5,2,42,
8,2,10,2,12,2,45,9,2,1,3,4,3,48,8,3,11,3,12,3,49,1,4,1,4,1,4,1,4,1,4,3,4,
57,8,4,1,5,1,5,1,5,5,5,62,8,5,10,5,12,5,65,9,5,1,5,1,5,3,5,69,8,5,1,6,1,
6,1,6,1,6,1,6,1,6,1,6,5,6,78,8,6,10,6,12,6,81,9,6,3,6,83,8,6,1,7,1,7,3,7,
87,8,7,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,1,8,3,8,98,8,8,1,8,1,8,1,8,1,8,1,
8,1,8,5,8,106,8,8,10,8,12,8,109,9,8,1,9,1,9,1,9,1,9,1,10,3,10,116,8,10,1,
10,1,10,1,10,1,11,1,11,4,11,123,8,11,11,11,12,11,124,1,11,1,11,5,11,129,
8,11,10,11,12,11,132,9,11,3,11,134,8,11,1,11,0,1,16,12,0,2,4,6,8,10,12,14,
16,18,20,22,0,2,2,0,11,11,17,17,1,0,15,16,143,0,27,1,0,0,0,2,33,1,0,0,0,
4,38,1,0,0,0,6,47,1,0,0,0,8,56,1,0,0,0,10,63,1,0,0,0,12,82,1,0,0,0,14,86,
1,0,0,0,16,97,1,0,0,0,18,110,1,0,0,0,20,115,1,0,0,0,22,133,1,0,0,0,24,26,
3,2,1,0,25,24,1,0,0,0,26,29,1,0,0,0,27,25,1,0,0,0,27,28,1,0,0,0,28,30,1,
0,0,0,29,27,1,0,0,0,30,31,3,6,3,0,31,32,5,0,0,1,32,1,1,0,0,0,33,34,3,4,2,
0,34,35,5,1,0,0,35,36,3,6,3,0,36,37,5,9,0,0,37,3,1,0,0,0,38,43,5,19,0,0,
39,40,5,8,0,0,40,42,5,19,0,0,41,39,1,0,0,0,42,45,1,0,0,0,43,41,1,0,0,0,43,
44,1,0,0,0,44,5,1,0,0,0,45,43,1,0,0,0,46,48,3,8,4,0,47,46,1,0,0,0,48,49,
1,0,0,0,49,47,1,0,0,0,49,50,1,0,0,0,50,7,1,0,0,0,51,57,5,19,0,0,52,53,5,
2,0,0,53,54,3,10,5,0,54,55,5,3,0,0,55,57,1,0,0,0,56,51,1,0,0,0,56,52,1,0,
0,0,57,9,1,0,0,0,58,59,3,12,6,0,59,60,5,9,0,0,60,62,1,0,0,0,61,58,1,0,0,
0,62,65,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,66,1,0,0,0,65,63,1,0,0,0,
66,68,3,12,6,0,67,69,5,9,0,0,68,67,1,0,0,0,68,69,1,0,0,0,69,11,1,0,0,0,70,
83,3,18,9,0,71,72,3,4,2,0,72,73,5,1,0,0,73,74,3,16,8,0,74,83,1,0,0,0,75,
79,5,19,0,0,76,78,3,14,7,0,77,76,1,0,0,0,78,81,1,0,0,0,79,77,1,0,0,0,79,
80,1,0,0,0,80,83,1,0,0,0,81,79,1,0,0,0,82,70,1,0,0,0,82,71,1,0,0,0,82,75,
1,0,0,0,83,13,1,0,0,0,84,87,3,16,8,0,85,87,3,20,10,0,86,84,1,0,0,0,86,85,
1,0,0,0,87,15,1,0,0,0,88,89,6,8,-1,0,89,90,7,0,0,0,90,98,3,16,8,6,91,92,
5,6,0,0,92,93,3,16,8,0,93,94,5,7,0,0,94,98,1,0,0,0,95,98,5,18,0,0,96,98,
5,19,0,0,97,88,1,0,0,0,97,91,1,0,0,0,97,95,1,0,0,0,97,96,1,0,0,0,98,107,
1,0,0,0,99,100,10,4,0,0,100,101,7,1,0,0,101,106,3,16,8,5,102,103,10,3,0,
0,103,104,7,0,0,0,104,106,3,16,8,4,105,99,1,0,0,0,105,102,1,0,0,0,106,109,
1,0,0,0,107,105,1,0,0,0,107,108,1,0,0,0,108,17,1,0,0,0,109,107,1,0,0,0,110,
111,5,4,0,0,111,112,3,10,5,0,112,113,5,5,0,0,113,19,1,0,0,0,114,116,5,10,
0,0,115,114,1,0,0,0,115,116,1,0,0,0,116,117,1,0,0,0,117,118,5,11,0,0,118,
119,3,22,11,0,119,21,1,0,0,0,120,134,5,13,0,0,121,123,5,14,0,0,122,121,1,
0,0,0,123,124,1,0,0,0,124,122,1,0,0,0,124,125,1,0,0,0,125,134,1,0,0,0,126,
130,5,12,0,0,127,129,5,14,0,0,128,127,1,0,0,0,129,132,1,0,0,0,130,128,1,
0,0,0,130,131,1,0,0,0,131,134,1,0,0,0,132,130,1,0,0,0,133,120,1,0,0,0,133,
122,1,0,0,0,133,126,1,0,0,0,134,23,1,0,0,0,16,27,43,49,56,63,68,79,82,86,
97,105,107,115,124,130,133];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class DocumentParser extends antlr4.Parser {

    static grammarFileName = "Document.g4";
    static literalNames = [ null, "'='", "'{'", "'}'", "'['", "']'", "'('", 
                            "')'", "','", "';'", "'|'", "'-'", "'>'", "'!'", 
                            "'.'", "'*'", "'/'", "'+'" ];
    static symbolicNames = [ null, "ASSIGN", "OPEN_CURLY", "CLOSE_CURLY", 
                             "OPEN_SQUARE", "CLOSE_SQUARE", "OPEN_PAREN", 
                             "CLOSE_PAREN", "COMMA", "SEMICOLON", "PIPE", 
                             "DASH", "CLOSE_ANGLE", "BANG", "DOT", "STAR", 
                             "SLASH", "PLUS", "NUM", "IDEN", "WHITESPACE" ];
    static ruleNames = [ "document", "assignment", "iden_list", "grapheme_list", 
                         "grapheme", "command_list", "command", "arg", "expr", 
                         "group", "arrow", "arrow_head" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = DocumentParser.ruleNames;
        this.literalNames = DocumentParser.literalNames;
        this.symbolicNames = DocumentParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 8:
    	    		return this.expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 4);
    		case 1:
    			return this.precpred(this._ctx, 3);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	document() {
	    let localctx = new DocumentContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, DocumentParser.RULE_document);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 27;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,0,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 24;
	                this.assignment(); 
	            }
	            this.state = 29;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,0,this._ctx);
	        }

	        this.state = 30;
	        this.grapheme_list();
	        this.state = 31;
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
	        this.state = 33;
	        this.iden_list();
	        this.state = 34;
	        this.match(DocumentParser.ASSIGN);
	        this.state = 35;
	        this.grapheme_list();
	        this.state = 36;
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
	        this.state = 38;
	        this.match(DocumentParser.IDEN);
	        this.state = 43;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===8) {
	            this.state = 39;
	            this.match(DocumentParser.COMMA);
	            this.state = 40;
	            this.match(DocumentParser.IDEN);
	            this.state = 45;
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
	        this.state = 47; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 46;
	            this.grapheme();
	            this.state = 49; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while(_la===2 || _la===19);
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
	        this.state = 56;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 19:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 51;
	            this.match(DocumentParser.IDEN);
	            break;
	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 52;
	            this.match(DocumentParser.OPEN_CURLY);
	            this.state = 53;
	            this.command_list();
	            this.state = 54;
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
	        this.state = 63;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,4,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 58;
	                this.command();
	                this.state = 59;
	                this.match(DocumentParser.SEMICOLON); 
	            }
	            this.state = 65;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,4,this._ctx);
	        }

	        this.state = 66;
	        this.command();
	        this.state = 68;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===9) {
	            this.state = 67;
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
	        this.state = 82;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	        switch(la_) {
	        case 1:
	            localctx = new CommandGroupContext(this, localctx);
	            this.enterOuterAlt(localctx, 1);
	            this.state = 70;
	            this.group();
	            break;

	        case 2:
	            localctx = new AssignCommandContext(this, localctx);
	            this.enterOuterAlt(localctx, 2);
	            this.state = 71;
	            this.iden_list();
	            this.state = 72;
	            this.match(DocumentParser.ASSIGN);
	            this.state = 73;
	            this.expr(0);
	            break;

	        case 3:
	            localctx = new FunctionCommandContext(this, localctx);
	            this.enterOuterAlt(localctx, 3);
	            this.state = 75;
	            this.match(DocumentParser.IDEN);
	            this.state = 79;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while((((_la) & ~0x1f) === 0 && ((1 << _la) & 920640) !== 0)) {
	                this.state = 76;
	                this.arg();
	                this.state = 81;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;

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
	        this.state = 86;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,8,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 84;
	            this.expr(0);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 85;
	            this.arrow();
	            break;

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


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 16;
	    this.enterRecursionRule(localctx, 16, DocumentParser.RULE_expr, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 97;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 11:
	        case 17:
	            localctx = new UnarySignContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 89;
	            _la = this._input.LA(1);
	            if(!(_la===11 || _la===17)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 90;
	            this.expr(6);
	            break;
	        case 6:
	            localctx = new ParensContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 91;
	            this.match(DocumentParser.OPEN_PAREN);
	            this.state = 92;
	            this.expr(0);
	            this.state = 93;
	            this.match(DocumentParser.CLOSE_PAREN);
	            break;
	        case 18:
	            localctx = new NumberContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 95;
	            this.match(DocumentParser.NUM);
	            break;
	        case 19:
	            localctx = new IdenContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 96;
	            this.match(DocumentParser.IDEN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 107;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,11,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 105;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, DocumentParser.RULE_expr);
	                    this.state = 99;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 100;
	                    localctx.op = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===15 || _la===16)) {
	                        localctx.op = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 101;
	                    this.expr(5);
	                    break;

	                case 2:
	                    localctx = new AddSubContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, DocumentParser.RULE_expr);
	                    this.state = 102;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 103;
	                    localctx.op = this._input.LT(1);
	                    _la = this._input.LA(1);
	                    if(!(_la===11 || _la===17)) {
	                        localctx.op = this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 104;
	                    this.expr(4);
	                    break;

	                } 
	            }
	            this.state = 109;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,11,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	group() {
	    let localctx = new GroupContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, DocumentParser.RULE_group);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 110;
	        this.match(DocumentParser.OPEN_SQUARE);
	        this.state = 111;
	        this.command_list();
	        this.state = 112;
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
	    this.enterRule(localctx, 20, DocumentParser.RULE_arrow);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 115;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===10) {
	            this.state = 114;
	            this.match(DocumentParser.PIPE);
	        }

	        this.state = 117;
	        this.match(DocumentParser.DASH);
	        this.state = 118;
	        this.arrow_head();
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
	    this.enterRule(localctx, 22, DocumentParser.RULE_arrow_head);
	    var _la = 0;
	    try {
	        this.state = 133;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 13:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 120;
	            this.match(DocumentParser.BANG);
	            break;
	        case 14:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 122; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            do {
	                this.state = 121;
	                this.match(DocumentParser.DOT);
	                this.state = 124; 
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            } while(_la===14);
	            break;
	        case 12:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 126;
	            this.match(DocumentParser.CLOSE_ANGLE);
	            this.state = 130;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===14) {
	                this.state = 127;
	                this.match(DocumentParser.DOT);
	                this.state = 132;
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
DocumentParser.OPEN_PAREN = 6;
DocumentParser.CLOSE_PAREN = 7;
DocumentParser.COMMA = 8;
DocumentParser.SEMICOLON = 9;
DocumentParser.PIPE = 10;
DocumentParser.DASH = 11;
DocumentParser.CLOSE_ANGLE = 12;
DocumentParser.BANG = 13;
DocumentParser.DOT = 14;
DocumentParser.STAR = 15;
DocumentParser.SLASH = 16;
DocumentParser.PLUS = 17;
DocumentParser.NUM = 18;
DocumentParser.IDEN = 19;
DocumentParser.WHITESPACE = 20;

DocumentParser.RULE_document = 0;
DocumentParser.RULE_assignment = 1;
DocumentParser.RULE_iden_list = 2;
DocumentParser.RULE_grapheme_list = 3;
DocumentParser.RULE_grapheme = 4;
DocumentParser.RULE_command_list = 5;
DocumentParser.RULE_command = 6;
DocumentParser.RULE_arg = 7;
DocumentParser.RULE_expr = 8;
DocumentParser.RULE_group = 9;
DocumentParser.RULE_arrow = 10;
DocumentParser.RULE_arrow_head = 11;

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


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class CommandGroupContext extends CommandContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	group() {
	    return this.getTypedRuleContext(GroupContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterCommandGroup(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitCommandGroup(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitCommandGroup(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.CommandGroupContext = CommandGroupContext;

class FunctionCommandContext extends CommandContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

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
	        listener.enterFunctionCommand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitFunctionCommand(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitFunctionCommand(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.FunctionCommandContext = FunctionCommandContext;

class AssignCommandContext extends CommandContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	iden_list() {
	    return this.getTypedRuleContext(Iden_listContext,0);
	};

	ASSIGN() {
	    return this.getToken(DocumentParser.ASSIGN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterAssignCommand(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitAssignCommand(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitAssignCommand(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.AssignCommandContext = AssignCommandContext;

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

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
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



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = DocumentParser.RULE_expr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class UnarySignContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	PLUS() {
	    return this.getToken(DocumentParser.PLUS, 0);
	};

	DASH() {
	    return this.getToken(DocumentParser.DASH, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterUnarySign(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitUnarySign(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitUnarySign(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.UnarySignContext = UnarySignContext;

class NumberContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	NUM() {
	    return this.getToken(DocumentParser.NUM, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterNumber(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitNumber(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitNumber(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.NumberContext = NumberContext;

class ParensContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	OPEN_PAREN() {
	    return this.getToken(DocumentParser.OPEN_PAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	CLOSE_PAREN() {
	    return this.getToken(DocumentParser.CLOSE_PAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterParens(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitParens(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitParens(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.ParensContext = ParensContext;

class IdenContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	IDEN() {
	    return this.getToken(DocumentParser.IDEN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterIden(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitIden(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitIden(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.IdenContext = IdenContext;

class AddSubContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null;;
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	PLUS() {
	    return this.getToken(DocumentParser.PLUS, 0);
	};

	DASH() {
	    return this.getToken(DocumentParser.DASH, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterAddSub(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitAddSub(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitAddSub(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.AddSubContext = AddSubContext;

class MulDivContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        this.op = null;;
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	STAR() {
	    return this.getToken(DocumentParser.STAR, 0);
	};

	SLASH() {
	    return this.getToken(DocumentParser.SLASH, 0);
	};

	enterRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.enterMulDiv(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof DocumentListener ) {
	        listener.exitMulDiv(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof DocumentVisitor ) {
	        return visitor.visitMulDiv(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

DocumentParser.MulDivContext = MulDivContext;

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

	arrow_head() {
	    return this.getTypedRuleContext(Arrow_headContext,0);
	};

	PIPE() {
	    return this.getToken(DocumentParser.PIPE, 0);
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
DocumentParser.ExprContext = ExprContext; 
DocumentParser.GroupContext = GroupContext; 
DocumentParser.ArrowContext = ArrowContext; 
DocumentParser.Arrow_headContext = Arrow_headContext; 
