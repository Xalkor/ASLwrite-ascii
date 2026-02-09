// Generated from grammar/Document.g4 by ANTLR 4.13.0
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class DocumentParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.13.0", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		ASSIGN=1, OPEN_CURLY=2, CLOSE_CURLY=3, OPEN_SQUARE=4, CLOSE_SQUARE=5, 
		OPEN_PAREN=6, CLOSE_PAREN=7, COMMA=8, SEMICOLON=9, PIPE=10, DASH=11, CLOSE_ANGLE=12, 
		BANG=13, DOT=14, STAR=15, SLASH=16, PLUS=17, NUM=18, IDEN=19, WHITESPACE=20;
	public static final int
		RULE_document = 0, RULE_assignment = 1, RULE_iden_list = 2, RULE_grapheme_list = 3, 
		RULE_grapheme = 4, RULE_command_list = 5, RULE_command = 6, RULE_arg = 7, 
		RULE_expr = 8, RULE_group = 9, RULE_arrow = 10, RULE_arrow_head = 11;
	private static String[] makeRuleNames() {
		return new String[] {
			"document", "assignment", "iden_list", "grapheme_list", "grapheme", "command_list", 
			"command", "arg", "expr", "group", "arrow", "arrow_head"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'='", "'{'", "'}'", "'['", "']'", "'('", "')'", "','", "';'", 
			"'|'", "'-'", "'>'", "'!'", "'.'", "'*'", "'/'", "'+'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ASSIGN", "OPEN_CURLY", "CLOSE_CURLY", "OPEN_SQUARE", "CLOSE_SQUARE", 
			"OPEN_PAREN", "CLOSE_PAREN", "COMMA", "SEMICOLON", "PIPE", "DASH", "CLOSE_ANGLE", 
			"BANG", "DOT", "STAR", "SLASH", "PLUS", "NUM", "IDEN", "WHITESPACE"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Document.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public DocumentParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@SuppressWarnings("CheckReturnValue")
	public static class DocumentContext extends ParserRuleContext {
		public Grapheme_listContext grapheme_list() {
			return getRuleContext(Grapheme_listContext.class,0);
		}
		public TerminalNode EOF() { return getToken(DocumentParser.EOF, 0); }
		public List<AssignmentContext> assignment() {
			return getRuleContexts(AssignmentContext.class);
		}
		public AssignmentContext assignment(int i) {
			return getRuleContext(AssignmentContext.class,i);
		}
		public DocumentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_document; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterDocument(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitDocument(this);
		}
	}

	public final DocumentContext document() throws RecognitionException {
		DocumentContext _localctx = new DocumentContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_document);
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(27);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(24);
					assignment();
					}
					} 
				}
				setState(29);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			}
			setState(30);
			grapheme_list();
			setState(31);
			match(EOF);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class AssignmentContext extends ParserRuleContext {
		public Iden_listContext iden_list() {
			return getRuleContext(Iden_listContext.class,0);
		}
		public TerminalNode ASSIGN() { return getToken(DocumentParser.ASSIGN, 0); }
		public Grapheme_listContext grapheme_list() {
			return getRuleContext(Grapheme_listContext.class,0);
		}
		public TerminalNode SEMICOLON() { return getToken(DocumentParser.SEMICOLON, 0); }
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterAssignment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitAssignment(this);
		}
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_assignment);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(33);
			iden_list();
			setState(34);
			match(ASSIGN);
			setState(35);
			grapheme_list();
			setState(36);
			match(SEMICOLON);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Iden_listContext extends ParserRuleContext {
		public List<TerminalNode> IDEN() { return getTokens(DocumentParser.IDEN); }
		public TerminalNode IDEN(int i) {
			return getToken(DocumentParser.IDEN, i);
		}
		public List<TerminalNode> COMMA() { return getTokens(DocumentParser.COMMA); }
		public TerminalNode COMMA(int i) {
			return getToken(DocumentParser.COMMA, i);
		}
		public Iden_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_iden_list; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterIden_list(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitIden_list(this);
		}
	}

	public final Iden_listContext iden_list() throws RecognitionException {
		Iden_listContext _localctx = new Iden_listContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_iden_list);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(38);
			match(IDEN);
			setState(43);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(39);
				match(COMMA);
				setState(40);
				match(IDEN);
				}
				}
				setState(45);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Grapheme_listContext extends ParserRuleContext {
		public List<GraphemeContext> grapheme() {
			return getRuleContexts(GraphemeContext.class);
		}
		public GraphemeContext grapheme(int i) {
			return getRuleContext(GraphemeContext.class,i);
		}
		public Grapheme_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grapheme_list; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterGrapheme_list(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitGrapheme_list(this);
		}
	}

	public final Grapheme_listContext grapheme_list() throws RecognitionException {
		Grapheme_listContext _localctx = new Grapheme_listContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_grapheme_list);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(47); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(46);
				grapheme();
				}
				}
				setState(49); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==OPEN_CURLY || _la==IDEN );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class GraphemeContext extends ParserRuleContext {
		public TerminalNode IDEN() { return getToken(DocumentParser.IDEN, 0); }
		public TerminalNode OPEN_CURLY() { return getToken(DocumentParser.OPEN_CURLY, 0); }
		public Command_listContext command_list() {
			return getRuleContext(Command_listContext.class,0);
		}
		public TerminalNode CLOSE_CURLY() { return getToken(DocumentParser.CLOSE_CURLY, 0); }
		public GraphemeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_grapheme; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterGrapheme(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitGrapheme(this);
		}
	}

	public final GraphemeContext grapheme() throws RecognitionException {
		GraphemeContext _localctx = new GraphemeContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_grapheme);
		try {
			setState(56);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDEN:
				enterOuterAlt(_localctx, 1);
				{
				setState(51);
				match(IDEN);
				}
				break;
			case OPEN_CURLY:
				enterOuterAlt(_localctx, 2);
				{
				setState(52);
				match(OPEN_CURLY);
				setState(53);
				command_list();
				setState(54);
				match(CLOSE_CURLY);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Command_listContext extends ParserRuleContext {
		public List<CommandContext> command() {
			return getRuleContexts(CommandContext.class);
		}
		public CommandContext command(int i) {
			return getRuleContext(CommandContext.class,i);
		}
		public List<TerminalNode> SEMICOLON() { return getTokens(DocumentParser.SEMICOLON); }
		public TerminalNode SEMICOLON(int i) {
			return getToken(DocumentParser.SEMICOLON, i);
		}
		public Command_listContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_command_list; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterCommand_list(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitCommand_list(this);
		}
	}

	public final Command_listContext command_list() throws RecognitionException {
		Command_listContext _localctx = new Command_listContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_command_list);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(63);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(58);
					command();
					setState(59);
					match(SEMICOLON);
					}
					} 
				}
				setState(65);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			setState(66);
			command();
			setState(68);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SEMICOLON) {
				{
				setState(67);
				match(SEMICOLON);
				}
			}

			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class CommandContext extends ParserRuleContext {
		public CommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_command; }
	 
		public CommandContext() { }
		public void copyFrom(CommandContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class CommandGroupContext extends CommandContext {
		public GroupContext group() {
			return getRuleContext(GroupContext.class,0);
		}
		public CommandGroupContext(CommandContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterCommandGroup(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitCommandGroup(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class FunctionCommandContext extends CommandContext {
		public TerminalNode IDEN() { return getToken(DocumentParser.IDEN, 0); }
		public List<ArgContext> arg() {
			return getRuleContexts(ArgContext.class);
		}
		public ArgContext arg(int i) {
			return getRuleContext(ArgContext.class,i);
		}
		public FunctionCommandContext(CommandContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterFunctionCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitFunctionCommand(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AssignCommandContext extends CommandContext {
		public Iden_listContext iden_list() {
			return getRuleContext(Iden_listContext.class,0);
		}
		public TerminalNode ASSIGN() { return getToken(DocumentParser.ASSIGN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public AssignCommandContext(CommandContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterAssignCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitAssignCommand(this);
		}
	}

	public final CommandContext command() throws RecognitionException {
		CommandContext _localctx = new CommandContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_command);
		int _la;
		try {
			setState(82);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,7,_ctx) ) {
			case 1:
				_localctx = new CommandGroupContext(_localctx);
				enterOuterAlt(_localctx, 1);
				{
				setState(70);
				group();
				}
				break;
			case 2:
				_localctx = new AssignCommandContext(_localctx);
				enterOuterAlt(_localctx, 2);
				{
				setState(71);
				iden_list();
				setState(72);
				match(ASSIGN);
				setState(73);
				expr(0);
				}
				break;
			case 3:
				_localctx = new FunctionCommandContext(_localctx);
				enterOuterAlt(_localctx, 3);
				{
				setState(75);
				match(IDEN);
				setState(79);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 920640L) != 0)) {
					{
					{
					setState(76);
					arg();
					}
					}
					setState(81);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArgContext extends ParserRuleContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public ArrowContext arrow() {
			return getRuleContext(ArrowContext.class,0);
		}
		public ArgContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arg; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterArg(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitArg(this);
		}
	}

	public final ArgContext arg() throws RecognitionException {
		ArgContext _localctx = new ArgContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_arg);
		try {
			setState(86);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,8,_ctx) ) {
			case 1:
				enterOuterAlt(_localctx, 1);
				{
				setState(84);
				expr(0);
				}
				break;
			case 2:
				enterOuterAlt(_localctx, 2);
				{
				setState(85);
				arrow();
				}
				break;
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ExprContext extends ParserRuleContext {
		public ExprContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_expr; }
	 
		public ExprContext() { }
		public void copyFrom(ExprContext ctx) {
			super.copyFrom(ctx);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class UnarySignContext extends ExprContext {
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode PLUS() { return getToken(DocumentParser.PLUS, 0); }
		public TerminalNode DASH() { return getToken(DocumentParser.DASH, 0); }
		public UnarySignContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterUnarySign(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitUnarySign(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class NumberContext extends ExprContext {
		public TerminalNode NUM() { return getToken(DocumentParser.NUM, 0); }
		public NumberContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterNumber(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitNumber(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class ParensContext extends ExprContext {
		public TerminalNode OPEN_PAREN() { return getToken(DocumentParser.OPEN_PAREN, 0); }
		public ExprContext expr() {
			return getRuleContext(ExprContext.class,0);
		}
		public TerminalNode CLOSE_PAREN() { return getToken(DocumentParser.CLOSE_PAREN, 0); }
		public ParensContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterParens(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitParens(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class IdenContext extends ExprContext {
		public TerminalNode IDEN() { return getToken(DocumentParser.IDEN, 0); }
		public IdenContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterIden(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitIden(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class AddSubContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode PLUS() { return getToken(DocumentParser.PLUS, 0); }
		public TerminalNode DASH() { return getToken(DocumentParser.DASH, 0); }
		public AddSubContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterAddSub(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitAddSub(this);
		}
	}
	@SuppressWarnings("CheckReturnValue")
	public static class MulDivContext extends ExprContext {
		public Token op;
		public List<ExprContext> expr() {
			return getRuleContexts(ExprContext.class);
		}
		public ExprContext expr(int i) {
			return getRuleContext(ExprContext.class,i);
		}
		public TerminalNode STAR() { return getToken(DocumentParser.STAR, 0); }
		public TerminalNode SLASH() { return getToken(DocumentParser.SLASH, 0); }
		public MulDivContext(ExprContext ctx) { copyFrom(ctx); }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterMulDiv(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitMulDiv(this);
		}
	}

	public final ExprContext expr() throws RecognitionException {
		return expr(0);
	}

	private ExprContext expr(int _p) throws RecognitionException {
		ParserRuleContext _parentctx = _ctx;
		int _parentState = getState();
		ExprContext _localctx = new ExprContext(_ctx, _parentState);
		ExprContext _prevctx = _localctx;
		int _startState = 16;
		enterRecursionRule(_localctx, 16, RULE_expr, _p);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(97);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case DASH:
			case PLUS:
				{
				_localctx = new UnarySignContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;

				setState(89);
				_la = _input.LA(1);
				if ( !(_la==DASH || _la==PLUS) ) {
				_errHandler.recoverInline(this);
				}
				else {
					if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
					_errHandler.reportMatch(this);
					consume();
				}
				setState(90);
				expr(6);
				}
				break;
			case OPEN_PAREN:
				{
				_localctx = new ParensContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(91);
				match(OPEN_PAREN);
				setState(92);
				expr(0);
				setState(93);
				match(CLOSE_PAREN);
				}
				break;
			case NUM:
				{
				_localctx = new NumberContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(95);
				match(NUM);
				}
				break;
			case IDEN:
				{
				_localctx = new IdenContext(_localctx);
				_ctx = _localctx;
				_prevctx = _localctx;
				setState(96);
				match(IDEN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			_ctx.stop = _input.LT(-1);
			setState(107);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					if ( _parseListeners!=null ) triggerExitRuleEvent();
					_prevctx = _localctx;
					{
					setState(105);
					_errHandler.sync(this);
					switch ( getInterpreter().adaptivePredict(_input,10,_ctx) ) {
					case 1:
						{
						_localctx = new MulDivContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(99);
						if (!(precpred(_ctx, 4))) throw new FailedPredicateException(this, "precpred(_ctx, 4)");
						setState(100);
						((MulDivContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==STAR || _la==SLASH) ) {
							((MulDivContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(101);
						expr(5);
						}
						break;
					case 2:
						{
						_localctx = new AddSubContext(new ExprContext(_parentctx, _parentState));
						pushNewRecursionContext(_localctx, _startState, RULE_expr);
						setState(102);
						if (!(precpred(_ctx, 3))) throw new FailedPredicateException(this, "precpred(_ctx, 3)");
						setState(103);
						((AddSubContext)_localctx).op = _input.LT(1);
						_la = _input.LA(1);
						if ( !(_la==DASH || _la==PLUS) ) {
							((AddSubContext)_localctx).op = (Token)_errHandler.recoverInline(this);
						}
						else {
							if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
							_errHandler.reportMatch(this);
							consume();
						}
						setState(104);
						expr(4);
						}
						break;
					}
					} 
				}
				setState(109);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,11,_ctx);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class GroupContext extends ParserRuleContext {
		public TerminalNode OPEN_SQUARE() { return getToken(DocumentParser.OPEN_SQUARE, 0); }
		public Command_listContext command_list() {
			return getRuleContext(Command_listContext.class,0);
		}
		public TerminalNode CLOSE_SQUARE() { return getToken(DocumentParser.CLOSE_SQUARE, 0); }
		public GroupContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_group; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterGroup(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitGroup(this);
		}
	}

	public final GroupContext group() throws RecognitionException {
		GroupContext _localctx = new GroupContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_group);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(110);
			match(OPEN_SQUARE);
			setState(111);
			command_list();
			setState(112);
			match(CLOSE_SQUARE);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class ArrowContext extends ParserRuleContext {
		public TerminalNode DASH() { return getToken(DocumentParser.DASH, 0); }
		public Arrow_headContext arrow_head() {
			return getRuleContext(Arrow_headContext.class,0);
		}
		public TerminalNode PIPE() { return getToken(DocumentParser.PIPE, 0); }
		public ArrowContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrow; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterArrow(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitArrow(this);
		}
	}

	public final ArrowContext arrow() throws RecognitionException {
		ArrowContext _localctx = new ArrowContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_arrow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(115);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PIPE) {
				{
				setState(114);
				match(PIPE);
				}
			}

			setState(117);
			match(DASH);
			setState(118);
			arrow_head();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	@SuppressWarnings("CheckReturnValue")
	public static class Arrow_headContext extends ParserRuleContext {
		public TerminalNode BANG() { return getToken(DocumentParser.BANG, 0); }
		public List<TerminalNode> DOT() { return getTokens(DocumentParser.DOT); }
		public TerminalNode DOT(int i) {
			return getToken(DocumentParser.DOT, i);
		}
		public TerminalNode CLOSE_ANGLE() { return getToken(DocumentParser.CLOSE_ANGLE, 0); }
		public Arrow_headContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_arrow_head; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterArrow_head(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitArrow_head(this);
		}
	}

	public final Arrow_headContext arrow_head() throws RecognitionException {
		Arrow_headContext _localctx = new Arrow_headContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_arrow_head);
		int _la;
		try {
			setState(133);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BANG:
				enterOuterAlt(_localctx, 1);
				{
				setState(120);
				match(BANG);
				}
				break;
			case DOT:
				enterOuterAlt(_localctx, 2);
				{
				setState(122); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(121);
					match(DOT);
					}
					}
					setState(124); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==DOT );
				}
				break;
			case CLOSE_ANGLE:
				enterOuterAlt(_localctx, 3);
				{
				setState(126);
				match(CLOSE_ANGLE);
				setState(130);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==DOT) {
					{
					{
					setState(127);
					match(DOT);
					}
					}
					setState(132);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public boolean sempred(RuleContext _localctx, int ruleIndex, int predIndex) {
		switch (ruleIndex) {
		case 8:
			return expr_sempred((ExprContext)_localctx, predIndex);
		}
		return true;
	}
	private boolean expr_sempred(ExprContext _localctx, int predIndex) {
		switch (predIndex) {
		case 0:
			return precpred(_ctx, 4);
		case 1:
			return precpred(_ctx, 3);
		}
		return true;
	}

	public static final String _serializedATN =
		"\u0004\u0001\u0014\u0088\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001"+
		"\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004"+
		"\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007"+
		"\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b\u0007\u000b"+
		"\u0001\u0000\u0005\u0000\u001a\b\u0000\n\u0000\f\u0000\u001d\t\u0000\u0001"+
		"\u0000\u0001\u0000\u0001\u0000\u0001\u0001\u0001\u0001\u0001\u0001\u0001"+
		"\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0001\u0002\u0005\u0002*\b"+
		"\u0002\n\u0002\f\u0002-\t\u0002\u0001\u0003\u0004\u00030\b\u0003\u000b"+
		"\u0003\f\u00031\u0001\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0001"+
		"\u0004\u0003\u00049\b\u0004\u0001\u0005\u0001\u0005\u0001\u0005\u0005"+
		"\u0005>\b\u0005\n\u0005\f\u0005A\t\u0005\u0001\u0005\u0001\u0005\u0003"+
		"\u0005E\b\u0005\u0001\u0006\u0001\u0006\u0001\u0006\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0001\u0006\u0005\u0006N\b\u0006\n\u0006\f\u0006Q\t"+
		"\u0006\u0003\u0006S\b\u0006\u0001\u0007\u0001\u0007\u0003\u0007W\b\u0007"+
		"\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001"+
		"\b\u0003\bb\b\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0001\b\u0005"+
		"\bj\b\b\n\b\f\bm\t\b\u0001\t\u0001\t\u0001\t\u0001\t\u0001\n\u0003\nt"+
		"\b\n\u0001\n\u0001\n\u0001\n\u0001\u000b\u0001\u000b\u0004\u000b{\b\u000b"+
		"\u000b\u000b\f\u000b|\u0001\u000b\u0001\u000b\u0005\u000b\u0081\b\u000b"+
		"\n\u000b\f\u000b\u0084\t\u000b\u0003\u000b\u0086\b\u000b\u0001\u000b\u0000"+
		"\u0001\u0010\f\u0000\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0016"+
		"\u0000\u0002\u0002\u0000\u000b\u000b\u0011\u0011\u0001\u0000\u000f\u0010"+
		"\u008f\u0000\u001b\u0001\u0000\u0000\u0000\u0002!\u0001\u0000\u0000\u0000"+
		"\u0004&\u0001\u0000\u0000\u0000\u0006/\u0001\u0000\u0000\u0000\b8\u0001"+
		"\u0000\u0000\u0000\n?\u0001\u0000\u0000\u0000\fR\u0001\u0000\u0000\u0000"+
		"\u000eV\u0001\u0000\u0000\u0000\u0010a\u0001\u0000\u0000\u0000\u0012n"+
		"\u0001\u0000\u0000\u0000\u0014s\u0001\u0000\u0000\u0000\u0016\u0085\u0001"+
		"\u0000\u0000\u0000\u0018\u001a\u0003\u0002\u0001\u0000\u0019\u0018\u0001"+
		"\u0000\u0000\u0000\u001a\u001d\u0001\u0000\u0000\u0000\u001b\u0019\u0001"+
		"\u0000\u0000\u0000\u001b\u001c\u0001\u0000\u0000\u0000\u001c\u001e\u0001"+
		"\u0000\u0000\u0000\u001d\u001b\u0001\u0000\u0000\u0000\u001e\u001f\u0003"+
		"\u0006\u0003\u0000\u001f \u0005\u0000\u0000\u0001 \u0001\u0001\u0000\u0000"+
		"\u0000!\"\u0003\u0004\u0002\u0000\"#\u0005\u0001\u0000\u0000#$\u0003\u0006"+
		"\u0003\u0000$%\u0005\t\u0000\u0000%\u0003\u0001\u0000\u0000\u0000&+\u0005"+
		"\u0013\u0000\u0000\'(\u0005\b\u0000\u0000(*\u0005\u0013\u0000\u0000)\'"+
		"\u0001\u0000\u0000\u0000*-\u0001\u0000\u0000\u0000+)\u0001\u0000\u0000"+
		"\u0000+,\u0001\u0000\u0000\u0000,\u0005\u0001\u0000\u0000\u0000-+\u0001"+
		"\u0000\u0000\u0000.0\u0003\b\u0004\u0000/.\u0001\u0000\u0000\u000001\u0001"+
		"\u0000\u0000\u00001/\u0001\u0000\u0000\u000012\u0001\u0000\u0000\u0000"+
		"2\u0007\u0001\u0000\u0000\u000039\u0005\u0013\u0000\u000045\u0005\u0002"+
		"\u0000\u000056\u0003\n\u0005\u000067\u0005\u0003\u0000\u000079\u0001\u0000"+
		"\u0000\u000083\u0001\u0000\u0000\u000084\u0001\u0000\u0000\u00009\t\u0001"+
		"\u0000\u0000\u0000:;\u0003\f\u0006\u0000;<\u0005\t\u0000\u0000<>\u0001"+
		"\u0000\u0000\u0000=:\u0001\u0000\u0000\u0000>A\u0001\u0000\u0000\u0000"+
		"?=\u0001\u0000\u0000\u0000?@\u0001\u0000\u0000\u0000@B\u0001\u0000\u0000"+
		"\u0000A?\u0001\u0000\u0000\u0000BD\u0003\f\u0006\u0000CE\u0005\t\u0000"+
		"\u0000DC\u0001\u0000\u0000\u0000DE\u0001\u0000\u0000\u0000E\u000b\u0001"+
		"\u0000\u0000\u0000FS\u0003\u0012\t\u0000GH\u0003\u0004\u0002\u0000HI\u0005"+
		"\u0001\u0000\u0000IJ\u0003\u0010\b\u0000JS\u0001\u0000\u0000\u0000KO\u0005"+
		"\u0013\u0000\u0000LN\u0003\u000e\u0007\u0000ML\u0001\u0000\u0000\u0000"+
		"NQ\u0001\u0000\u0000\u0000OM\u0001\u0000\u0000\u0000OP\u0001\u0000\u0000"+
		"\u0000PS\u0001\u0000\u0000\u0000QO\u0001\u0000\u0000\u0000RF\u0001\u0000"+
		"\u0000\u0000RG\u0001\u0000\u0000\u0000RK\u0001\u0000\u0000\u0000S\r\u0001"+
		"\u0000\u0000\u0000TW\u0003\u0010\b\u0000UW\u0003\u0014\n\u0000VT\u0001"+
		"\u0000\u0000\u0000VU\u0001\u0000\u0000\u0000W\u000f\u0001\u0000\u0000"+
		"\u0000XY\u0006\b\uffff\uffff\u0000YZ\u0007\u0000\u0000\u0000Zb\u0003\u0010"+
		"\b\u0006[\\\u0005\u0006\u0000\u0000\\]\u0003\u0010\b\u0000]^\u0005\u0007"+
		"\u0000\u0000^b\u0001\u0000\u0000\u0000_b\u0005\u0012\u0000\u0000`b\u0005"+
		"\u0013\u0000\u0000aX\u0001\u0000\u0000\u0000a[\u0001\u0000\u0000\u0000"+
		"a_\u0001\u0000\u0000\u0000a`\u0001\u0000\u0000\u0000bk\u0001\u0000\u0000"+
		"\u0000cd\n\u0004\u0000\u0000de\u0007\u0001\u0000\u0000ej\u0003\u0010\b"+
		"\u0005fg\n\u0003\u0000\u0000gh\u0007\u0000\u0000\u0000hj\u0003\u0010\b"+
		"\u0004ic\u0001\u0000\u0000\u0000if\u0001\u0000\u0000\u0000jm\u0001\u0000"+
		"\u0000\u0000ki\u0001\u0000\u0000\u0000kl\u0001\u0000\u0000\u0000l\u0011"+
		"\u0001\u0000\u0000\u0000mk\u0001\u0000\u0000\u0000no\u0005\u0004\u0000"+
		"\u0000op\u0003\n\u0005\u0000pq\u0005\u0005\u0000\u0000q\u0013\u0001\u0000"+
		"\u0000\u0000rt\u0005\n\u0000\u0000sr\u0001\u0000\u0000\u0000st\u0001\u0000"+
		"\u0000\u0000tu\u0001\u0000\u0000\u0000uv\u0005\u000b\u0000\u0000vw\u0003"+
		"\u0016\u000b\u0000w\u0015\u0001\u0000\u0000\u0000x\u0086\u0005\r\u0000"+
		"\u0000y{\u0005\u000e\u0000\u0000zy\u0001\u0000\u0000\u0000{|\u0001\u0000"+
		"\u0000\u0000|z\u0001\u0000\u0000\u0000|}\u0001\u0000\u0000\u0000}\u0086"+
		"\u0001\u0000\u0000\u0000~\u0082\u0005\f\u0000\u0000\u007f\u0081\u0005"+
		"\u000e\u0000\u0000\u0080\u007f\u0001\u0000\u0000\u0000\u0081\u0084\u0001"+
		"\u0000\u0000\u0000\u0082\u0080\u0001\u0000\u0000\u0000\u0082\u0083\u0001"+
		"\u0000\u0000\u0000\u0083\u0086\u0001\u0000\u0000\u0000\u0084\u0082\u0001"+
		"\u0000\u0000\u0000\u0085x\u0001\u0000\u0000\u0000\u0085z\u0001\u0000\u0000"+
		"\u0000\u0085~\u0001\u0000\u0000\u0000\u0086\u0017\u0001\u0000\u0000\u0000"+
		"\u0010\u001b+18?DORVaiks|\u0082\u0085";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}