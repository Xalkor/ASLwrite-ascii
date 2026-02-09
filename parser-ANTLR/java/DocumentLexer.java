// Generated from grammar/Document.g4 by ANTLR 4.13.0
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast", "CheckReturnValue"})
public class DocumentLexer extends Lexer {
	static { RuntimeMetaData.checkVersion("4.13.0", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		ASSIGN=1, OPEN_CURLY=2, CLOSE_CURLY=3, OPEN_SQUARE=4, CLOSE_SQUARE=5, 
		OPEN_PAREN=6, CLOSE_PAREN=7, COMMA=8, SEMICOLON=9, PIPE=10, DASH=11, CLOSE_ANGLE=12, 
		BANG=13, DOT=14, STAR=15, SLASH=16, PLUS=17, NUM=18, IDEN=19, WHITESPACE=20;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"ASSIGN", "OPEN_CURLY", "CLOSE_CURLY", "OPEN_SQUARE", "CLOSE_SQUARE", 
			"OPEN_PAREN", "CLOSE_PAREN", "COMMA", "SEMICOLON", "PIPE", "DASH", "CLOSE_ANGLE", 
			"BANG", "DOT", "STAR", "SLASH", "PLUS", "NUM", "IDEN", "WHITESPACE"
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


	public DocumentLexer(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Document.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\u0004\u0000\u0014m\u0006\uffff\uffff\u0002\u0000\u0007\u0000\u0002\u0001"+
		"\u0007\u0001\u0002\u0002\u0007\u0002\u0002\u0003\u0007\u0003\u0002\u0004"+
		"\u0007\u0004\u0002\u0005\u0007\u0005\u0002\u0006\u0007\u0006\u0002\u0007"+
		"\u0007\u0007\u0002\b\u0007\b\u0002\t\u0007\t\u0002\n\u0007\n\u0002\u000b"+
		"\u0007\u000b\u0002\f\u0007\f\u0002\r\u0007\r\u0002\u000e\u0007\u000e\u0002"+
		"\u000f\u0007\u000f\u0002\u0010\u0007\u0010\u0002\u0011\u0007\u0011\u0002"+
		"\u0012\u0007\u0012\u0002\u0013\u0007\u0013\u0001\u0000\u0001\u0000\u0001"+
		"\u0001\u0001\u0001\u0001\u0002\u0001\u0002\u0001\u0003\u0001\u0003\u0001"+
		"\u0004\u0001\u0004\u0001\u0005\u0001\u0005\u0001\u0006\u0001\u0006\u0001"+
		"\u0007\u0001\u0007\u0001\b\u0001\b\u0001\t\u0001\t\u0001\n\u0001\n\u0001"+
		"\u000b\u0001\u000b\u0001\f\u0001\f\u0001\r\u0001\r\u0001\u000e\u0001\u000e"+
		"\u0001\u000f\u0001\u000f\u0001\u0010\u0001\u0010\u0001\u0011\u0004\u0011"+
		"M\b\u0011\u000b\u0011\f\u0011N\u0001\u0011\u0003\u0011R\b\u0011\u0001"+
		"\u0011\u0005\u0011U\b\u0011\n\u0011\f\u0011X\t\u0011\u0001\u0012\u0005"+
		"\u0012[\b\u0012\n\u0012\f\u0012^\t\u0012\u0001\u0012\u0001\u0012\u0005"+
		"\u0012b\b\u0012\n\u0012\f\u0012e\t\u0012\u0001\u0013\u0004\u0013h\b\u0013"+
		"\u000b\u0013\f\u0013i\u0001\u0013\u0001\u0013\u0000\u0000\u0014\u0001"+
		"\u0001\u0003\u0002\u0005\u0003\u0007\u0004\t\u0005\u000b\u0006\r\u0007"+
		"\u000f\b\u0011\t\u0013\n\u0015\u000b\u0017\f\u0019\r\u001b\u000e\u001d"+
		"\u000f\u001f\u0010!\u0011#\u0012%\u0013\'\u0014\u0001\u0000\u0004\u0001"+
		"\u000009\u0006\u0000\"\"09@Z^_az~~\u0005\u0000\"\"@Z^_az~~\u0003\u0000"+
		"\t\n\r\r  r\u0000\u0001\u0001\u0000\u0000\u0000\u0000\u0003\u0001\u0000"+
		"\u0000\u0000\u0000\u0005\u0001\u0000\u0000\u0000\u0000\u0007\u0001\u0000"+
		"\u0000\u0000\u0000\t\u0001\u0000\u0000\u0000\u0000\u000b\u0001\u0000\u0000"+
		"\u0000\u0000\r\u0001\u0000\u0000\u0000\u0000\u000f\u0001\u0000\u0000\u0000"+
		"\u0000\u0011\u0001\u0000\u0000\u0000\u0000\u0013\u0001\u0000\u0000\u0000"+
		"\u0000\u0015\u0001\u0000\u0000\u0000\u0000\u0017\u0001\u0000\u0000\u0000"+
		"\u0000\u0019\u0001\u0000\u0000\u0000\u0000\u001b\u0001\u0000\u0000\u0000"+
		"\u0000\u001d\u0001\u0000\u0000\u0000\u0000\u001f\u0001\u0000\u0000\u0000"+
		"\u0000!\u0001\u0000\u0000\u0000\u0000#\u0001\u0000\u0000\u0000\u0000%"+
		"\u0001\u0000\u0000\u0000\u0000\'\u0001\u0000\u0000\u0000\u0001)\u0001"+
		"\u0000\u0000\u0000\u0003+\u0001\u0000\u0000\u0000\u0005-\u0001\u0000\u0000"+
		"\u0000\u0007/\u0001\u0000\u0000\u0000\t1\u0001\u0000\u0000\u0000\u000b"+
		"3\u0001\u0000\u0000\u0000\r5\u0001\u0000\u0000\u0000\u000f7\u0001\u0000"+
		"\u0000\u0000\u00119\u0001\u0000\u0000\u0000\u0013;\u0001\u0000\u0000\u0000"+
		"\u0015=\u0001\u0000\u0000\u0000\u0017?\u0001\u0000\u0000\u0000\u0019A"+
		"\u0001\u0000\u0000\u0000\u001bC\u0001\u0000\u0000\u0000\u001dE\u0001\u0000"+
		"\u0000\u0000\u001fG\u0001\u0000\u0000\u0000!I\u0001\u0000\u0000\u0000"+
		"#L\u0001\u0000\u0000\u0000%\\\u0001\u0000\u0000\u0000\'g\u0001\u0000\u0000"+
		"\u0000)*\u0005=\u0000\u0000*\u0002\u0001\u0000\u0000\u0000+,\u0005{\u0000"+
		"\u0000,\u0004\u0001\u0000\u0000\u0000-.\u0005}\u0000\u0000.\u0006\u0001"+
		"\u0000\u0000\u0000/0\u0005[\u0000\u00000\b\u0001\u0000\u0000\u000012\u0005"+
		"]\u0000\u00002\n\u0001\u0000\u0000\u000034\u0005(\u0000\u00004\f\u0001"+
		"\u0000\u0000\u000056\u0005)\u0000\u00006\u000e\u0001\u0000\u0000\u0000"+
		"78\u0005,\u0000\u00008\u0010\u0001\u0000\u0000\u00009:\u0005;\u0000\u0000"+
		":\u0012\u0001\u0000\u0000\u0000;<\u0005|\u0000\u0000<\u0014\u0001\u0000"+
		"\u0000\u0000=>\u0005-\u0000\u0000>\u0016\u0001\u0000\u0000\u0000?@\u0005"+
		">\u0000\u0000@\u0018\u0001\u0000\u0000\u0000AB\u0005!\u0000\u0000B\u001a"+
		"\u0001\u0000\u0000\u0000CD\u0005.\u0000\u0000D\u001c\u0001\u0000\u0000"+
		"\u0000EF\u0005*\u0000\u0000F\u001e\u0001\u0000\u0000\u0000GH\u0005/\u0000"+
		"\u0000H \u0001\u0000\u0000\u0000IJ\u0005+\u0000\u0000J\"\u0001\u0000\u0000"+
		"\u0000KM\u0007\u0000\u0000\u0000LK\u0001\u0000\u0000\u0000MN\u0001\u0000"+
		"\u0000\u0000NL\u0001\u0000\u0000\u0000NO\u0001\u0000\u0000\u0000OQ\u0001"+
		"\u0000\u0000\u0000PR\u0005.\u0000\u0000QP\u0001\u0000\u0000\u0000QR\u0001"+
		"\u0000\u0000\u0000RV\u0001\u0000\u0000\u0000SU\u0007\u0000\u0000\u0000"+
		"TS\u0001\u0000\u0000\u0000UX\u0001\u0000\u0000\u0000VT\u0001\u0000\u0000"+
		"\u0000VW\u0001\u0000\u0000\u0000W$\u0001\u0000\u0000\u0000XV\u0001\u0000"+
		"\u0000\u0000Y[\u0007\u0001\u0000\u0000ZY\u0001\u0000\u0000\u0000[^\u0001"+
		"\u0000\u0000\u0000\\Z\u0001\u0000\u0000\u0000\\]\u0001\u0000\u0000\u0000"+
		"]_\u0001\u0000\u0000\u0000^\\\u0001\u0000\u0000\u0000_c\u0007\u0002\u0000"+
		"\u0000`b\u0007\u0001\u0000\u0000a`\u0001\u0000\u0000\u0000be\u0001\u0000"+
		"\u0000\u0000ca\u0001\u0000\u0000\u0000cd\u0001\u0000\u0000\u0000d&\u0001"+
		"\u0000\u0000\u0000ec\u0001\u0000\u0000\u0000fh\u0007\u0003\u0000\u0000"+
		"gf\u0001\u0000\u0000\u0000hi\u0001\u0000\u0000\u0000ig\u0001\u0000\u0000"+
		"\u0000ij\u0001\u0000\u0000\u0000jk\u0001\u0000\u0000\u0000kl\u0006\u0013"+
		"\u0000\u0000l(\u0001\u0000\u0000\u0000\u0007\u0000NQV\\ci\u0001\u0006"+
		"\u0000\u0000";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}