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
		COMMA=6, SEMICOLON=7, PIPE=8, DASH=9, CLOSE_ANGLE=10, BANG=11, DOT=12, 
		NUM=13, IDEN=14, WHITESPACE=15;
	public static final int
		RULE_document = 0, RULE_assignment = 1, RULE_iden_list = 2, RULE_grapheme_list = 3, 
		RULE_grapheme = 4, RULE_command_list = 5, RULE_command = 6, RULE_arg = 7, 
		RULE_group = 8, RULE_arrow = 9, RULE_arrow_head = 10;
	private static String[] makeRuleNames() {
		return new String[] {
			"document", "assignment", "iden_list", "grapheme_list", "grapheme", "command_list", 
			"command", "arg", "group", "arrow", "arrow_head"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, "'='", "'{'", "'}'", "'['", "']'", "','", "';'", "'|'", "'-'", 
			"'>'", "'!'", "'.'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ASSIGN", "OPEN_CURLY", "CLOSE_CURLY", "OPEN_SQUARE", "CLOSE_SQUARE", 
			"COMMA", "SEMICOLON", "PIPE", "DASH", "CLOSE_ANGLE", "BANG", "DOT", "NUM", 
			"IDEN", "WHITESPACE"
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
			setState(25);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(22);
					assignment();
					}
					} 
				}
				setState(27);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,0,_ctx);
			}
			setState(28);
			grapheme_list();
			setState(29);
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
			setState(31);
			iden_list();
			setState(32);
			match(ASSIGN);
			setState(33);
			grapheme_list();
			setState(34);
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
			setState(36);
			match(IDEN);
			setState(41);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==COMMA) {
				{
				{
				setState(37);
				match(COMMA);
				setState(38);
				match(IDEN);
				}
				}
				setState(43);
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
			setState(45); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(44);
				grapheme();
				}
				}
				setState(47); 
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
			setState(54);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDEN:
				enterOuterAlt(_localctx, 1);
				{
				setState(49);
				match(IDEN);
				}
				break;
			case OPEN_CURLY:
				enterOuterAlt(_localctx, 2);
				{
				setState(50);
				match(OPEN_CURLY);
				setState(51);
				command_list();
				setState(52);
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
			setState(61);
			_errHandler.sync(this);
			_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER ) {
				if ( _alt==1 ) {
					{
					{
					setState(56);
					command();
					setState(57);
					match(SEMICOLON);
					}
					} 
				}
				setState(63);
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,4,_ctx);
			}
			setState(64);
			command();
			setState(66);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==SEMICOLON) {
				{
				setState(65);
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
		public GroupContext group() {
			return getRuleContext(GroupContext.class,0);
		}
		public TerminalNode IDEN() { return getToken(DocumentParser.IDEN, 0); }
		public List<ArgContext> arg() {
			return getRuleContexts(ArgContext.class);
		}
		public ArgContext arg(int i) {
			return getRuleContext(ArgContext.class,i);
		}
		public CommandContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_command; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).enterCommand(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof DocumentListener ) ((DocumentListener)listener).exitCommand(this);
		}
	}

	public final CommandContext command() throws RecognitionException {
		CommandContext _localctx = new CommandContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_command);
		int _la;
		try {
			setState(76);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case OPEN_SQUARE:
				enterOuterAlt(_localctx, 1);
				{
				setState(68);
				group();
				}
				break;
			case IDEN:
				enterOuterAlt(_localctx, 2);
				{
				setState(69);
				match(IDEN);
				setState(73);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while ((((_la) & ~0x3f) == 0 && ((1L << _la) & 25344L) != 0)) {
					{
					{
					setState(70);
					arg();
					}
					}
					setState(75);
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

	@SuppressWarnings("CheckReturnValue")
	public static class ArgContext extends ParserRuleContext {
		public TerminalNode IDEN() { return getToken(DocumentParser.IDEN, 0); }
		public TerminalNode NUM() { return getToken(DocumentParser.NUM, 0); }
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
			setState(81);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case IDEN:
				enterOuterAlt(_localctx, 1);
				{
				setState(78);
				match(IDEN);
				}
				break;
			case NUM:
				enterOuterAlt(_localctx, 2);
				{
				setState(79);
				match(NUM);
				}
				break;
			case PIPE:
			case DASH:
				enterOuterAlt(_localctx, 3);
				{
				setState(80);
				arrow();
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
		enterRule(_localctx, 16, RULE_group);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(83);
			match(OPEN_SQUARE);
			setState(84);
			command_list();
			setState(85);
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
		public TerminalNode PIPE() { return getToken(DocumentParser.PIPE, 0); }
		public Arrow_headContext arrow_head() {
			return getRuleContext(Arrow_headContext.class,0);
		}
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
		enterRule(_localctx, 18, RULE_arrow);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(88);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if (_la==PIPE) {
				{
				setState(87);
				match(PIPE);
				}
			}

			setState(90);
			match(DASH);
			setState(92);
			_errHandler.sync(this);
			_la = _input.LA(1);
			if ((((_la) & ~0x3f) == 0 && ((1L << _la) & 7168L) != 0)) {
				{
				setState(91);
				arrow_head();
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
		enterRule(_localctx, 20, RULE_arrow_head);
		int _la;
		try {
			setState(107);
			_errHandler.sync(this);
			switch (_input.LA(1)) {
			case BANG:
				enterOuterAlt(_localctx, 1);
				{
				setState(94);
				match(BANG);
				}
				break;
			case DOT:
				enterOuterAlt(_localctx, 2);
				{
				setState(96); 
				_errHandler.sync(this);
				_la = _input.LA(1);
				do {
					{
					{
					setState(95);
					match(DOT);
					}
					}
					setState(98); 
					_errHandler.sync(this);
					_la = _input.LA(1);
				} while ( _la==DOT );
				}
				break;
			case CLOSE_ANGLE:
				enterOuterAlt(_localctx, 3);
				{
				setState(100);
				match(CLOSE_ANGLE);
				setState(104);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==DOT) {
					{
					{
					setState(101);
					match(DOT);
					}
					}
					setState(106);
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

	public static final String _serializedATN =
		"\u0004\u0001\u000fn\u0002\u0000\u0007\u0000\u0002\u0001\u0007\u0001\u0002"+
		"\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004\u0007\u0004\u0002"+
		"\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007\u0007\u0007\u0002"+
		"\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0001\u0000\u0005\u0000\u0018"+
		"\b\u0000\n\u0000\f\u0000\u001b\t\u0000\u0001\u0000\u0001\u0000\u0001\u0000"+
		"\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0001\u0002"+
		"\u0001\u0002\u0001\u0002\u0005\u0002(\b\u0002\n\u0002\f\u0002+\t\u0002"+
		"\u0001\u0003\u0004\u0003.\b\u0003\u000b\u0003\f\u0003/\u0001\u0004\u0001"+
		"\u0004\u0001\u0004\u0001\u0004\u0001\u0004\u0003\u00047\b\u0004\u0001"+
		"\u0005\u0001\u0005\u0001\u0005\u0005\u0005<\b\u0005\n\u0005\f\u0005?\t"+
		"\u0005\u0001\u0005\u0001\u0005\u0003\u0005C\b\u0005\u0001\u0006\u0001"+
		"\u0006\u0001\u0006\u0005\u0006H\b\u0006\n\u0006\f\u0006K\t\u0006\u0003"+
		"\u0006M\b\u0006\u0001\u0007\u0001\u0007\u0001\u0007\u0003\u0007R\b\u0007"+
		"\u0001\b\u0001\b\u0001\b\u0001\b\u0001\t\u0003\tY\b\t\u0001\t\u0001\t"+
		"\u0003\t]\b\t\u0001\n\u0001\n\u0004\na\b\n\u000b\n\f\nb\u0001\n\u0001"+
		"\n\u0005\ng\b\n\n\n\f\nj\t\n\u0003\nl\b\n\u0001\n\u0000\u0000\u000b\u0000"+
		"\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0014\u0000\u0000r\u0000\u0019"+
		"\u0001\u0000\u0000\u0000\u0002\u001f\u0001\u0000\u0000\u0000\u0004$\u0001"+
		"\u0000\u0000\u0000\u0006-\u0001\u0000\u0000\u0000\b6\u0001\u0000\u0000"+
		"\u0000\n=\u0001\u0000\u0000\u0000\fL\u0001\u0000\u0000\u0000\u000eQ\u0001"+
		"\u0000\u0000\u0000\u0010S\u0001\u0000\u0000\u0000\u0012X\u0001\u0000\u0000"+
		"\u0000\u0014k\u0001\u0000\u0000\u0000\u0016\u0018\u0003\u0002\u0001\u0000"+
		"\u0017\u0016\u0001\u0000\u0000\u0000\u0018\u001b\u0001\u0000\u0000\u0000"+
		"\u0019\u0017\u0001\u0000\u0000\u0000\u0019\u001a\u0001\u0000\u0000\u0000"+
		"\u001a\u001c\u0001\u0000\u0000\u0000\u001b\u0019\u0001\u0000\u0000\u0000"+
		"\u001c\u001d\u0003\u0006\u0003\u0000\u001d\u001e\u0005\u0000\u0000\u0001"+
		"\u001e\u0001\u0001\u0000\u0000\u0000\u001f \u0003\u0004\u0002\u0000 !"+
		"\u0005\u0001\u0000\u0000!\"\u0003\u0006\u0003\u0000\"#\u0005\u0007\u0000"+
		"\u0000#\u0003\u0001\u0000\u0000\u0000$)\u0005\u000e\u0000\u0000%&\u0005"+
		"\u0006\u0000\u0000&(\u0005\u000e\u0000\u0000\'%\u0001\u0000\u0000\u0000"+
		"(+\u0001\u0000\u0000\u0000)\'\u0001\u0000\u0000\u0000)*\u0001\u0000\u0000"+
		"\u0000*\u0005\u0001\u0000\u0000\u0000+)\u0001\u0000\u0000\u0000,.\u0003"+
		"\b\u0004\u0000-,\u0001\u0000\u0000\u0000./\u0001\u0000\u0000\u0000/-\u0001"+
		"\u0000\u0000\u0000/0\u0001\u0000\u0000\u00000\u0007\u0001\u0000\u0000"+
		"\u000017\u0005\u000e\u0000\u000023\u0005\u0002\u0000\u000034\u0003\n\u0005"+
		"\u000045\u0005\u0003\u0000\u000057\u0001\u0000\u0000\u000061\u0001\u0000"+
		"\u0000\u000062\u0001\u0000\u0000\u00007\t\u0001\u0000\u0000\u000089\u0003"+
		"\f\u0006\u00009:\u0005\u0007\u0000\u0000:<\u0001\u0000\u0000\u0000;8\u0001"+
		"\u0000\u0000\u0000<?\u0001\u0000\u0000\u0000=;\u0001\u0000\u0000\u0000"+
		"=>\u0001\u0000\u0000\u0000>@\u0001\u0000\u0000\u0000?=\u0001\u0000\u0000"+
		"\u0000@B\u0003\f\u0006\u0000AC\u0005\u0007\u0000\u0000BA\u0001\u0000\u0000"+
		"\u0000BC\u0001\u0000\u0000\u0000C\u000b\u0001\u0000\u0000\u0000DM\u0003"+
		"\u0010\b\u0000EI\u0005\u000e\u0000\u0000FH\u0003\u000e\u0007\u0000GF\u0001"+
		"\u0000\u0000\u0000HK\u0001\u0000\u0000\u0000IG\u0001\u0000\u0000\u0000"+
		"IJ\u0001\u0000\u0000\u0000JM\u0001\u0000\u0000\u0000KI\u0001\u0000\u0000"+
		"\u0000LD\u0001\u0000\u0000\u0000LE\u0001\u0000\u0000\u0000M\r\u0001\u0000"+
		"\u0000\u0000NR\u0005\u000e\u0000\u0000OR\u0005\r\u0000\u0000PR\u0003\u0012"+
		"\t\u0000QN\u0001\u0000\u0000\u0000QO\u0001\u0000\u0000\u0000QP\u0001\u0000"+
		"\u0000\u0000R\u000f\u0001\u0000\u0000\u0000ST\u0005\u0004\u0000\u0000"+
		"TU\u0003\n\u0005\u0000UV\u0005\u0005\u0000\u0000V\u0011\u0001\u0000\u0000"+
		"\u0000WY\u0005\b\u0000\u0000XW\u0001\u0000\u0000\u0000XY\u0001\u0000\u0000"+
		"\u0000YZ\u0001\u0000\u0000\u0000Z\\\u0005\t\u0000\u0000[]\u0003\u0014"+
		"\n\u0000\\[\u0001\u0000\u0000\u0000\\]\u0001\u0000\u0000\u0000]\u0013"+
		"\u0001\u0000\u0000\u0000^l\u0005\u000b\u0000\u0000_a\u0005\f\u0000\u0000"+
		"`_\u0001\u0000\u0000\u0000ab\u0001\u0000\u0000\u0000b`\u0001\u0000\u0000"+
		"\u0000bc\u0001\u0000\u0000\u0000cl\u0001\u0000\u0000\u0000dh\u0005\n\u0000"+
		"\u0000eg\u0005\f\u0000\u0000fe\u0001\u0000\u0000\u0000gj\u0001\u0000\u0000"+
		"\u0000hf\u0001\u0000\u0000\u0000hi\u0001\u0000\u0000\u0000il\u0001\u0000"+
		"\u0000\u0000jh\u0001\u0000\u0000\u0000k^\u0001\u0000\u0000\u0000k`\u0001"+
		"\u0000\u0000\u0000kd\u0001\u0000\u0000\u0000l\u0015\u0001\u0000\u0000"+
		"\u0000\u000e\u0019)/6=BILQX\\bhk";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}