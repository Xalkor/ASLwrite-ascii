// Generated from grammar/Document.g4 by ANTLR 4.13.0
import org.antlr.v4.runtime.tree.ParseTreeListener;

/**
 * This interface defines a complete listener for a parse tree produced by
 * {@link DocumentParser}.
 */
public interface DocumentListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by {@link DocumentParser#document}.
	 * @param ctx the parse tree
	 */
	void enterDocument(DocumentParser.DocumentContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#document}.
	 * @param ctx the parse tree
	 */
	void exitDocument(DocumentParser.DocumentContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#assignment}.
	 * @param ctx the parse tree
	 */
	void enterAssignment(DocumentParser.AssignmentContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#assignment}.
	 * @param ctx the parse tree
	 */
	void exitAssignment(DocumentParser.AssignmentContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#iden_list}.
	 * @param ctx the parse tree
	 */
	void enterIden_list(DocumentParser.Iden_listContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#iden_list}.
	 * @param ctx the parse tree
	 */
	void exitIden_list(DocumentParser.Iden_listContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#grapheme_list}.
	 * @param ctx the parse tree
	 */
	void enterGrapheme_list(DocumentParser.Grapheme_listContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#grapheme_list}.
	 * @param ctx the parse tree
	 */
	void exitGrapheme_list(DocumentParser.Grapheme_listContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#grapheme}.
	 * @param ctx the parse tree
	 */
	void enterGrapheme(DocumentParser.GraphemeContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#grapheme}.
	 * @param ctx the parse tree
	 */
	void exitGrapheme(DocumentParser.GraphemeContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#command_list}.
	 * @param ctx the parse tree
	 */
	void enterCommand_list(DocumentParser.Command_listContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#command_list}.
	 * @param ctx the parse tree
	 */
	void exitCommand_list(DocumentParser.Command_listContext ctx);
	/**
	 * Enter a parse tree produced by the {@code commandGroup}
	 * labeled alternative in {@link DocumentParser#command}.
	 * @param ctx the parse tree
	 */
	void enterCommandGroup(DocumentParser.CommandGroupContext ctx);
	/**
	 * Exit a parse tree produced by the {@code commandGroup}
	 * labeled alternative in {@link DocumentParser#command}.
	 * @param ctx the parse tree
	 */
	void exitCommandGroup(DocumentParser.CommandGroupContext ctx);
	/**
	 * Enter a parse tree produced by the {@code assignCommand}
	 * labeled alternative in {@link DocumentParser#command}.
	 * @param ctx the parse tree
	 */
	void enterAssignCommand(DocumentParser.AssignCommandContext ctx);
	/**
	 * Exit a parse tree produced by the {@code assignCommand}
	 * labeled alternative in {@link DocumentParser#command}.
	 * @param ctx the parse tree
	 */
	void exitAssignCommand(DocumentParser.AssignCommandContext ctx);
	/**
	 * Enter a parse tree produced by the {@code functionCommand}
	 * labeled alternative in {@link DocumentParser#command}.
	 * @param ctx the parse tree
	 */
	void enterFunctionCommand(DocumentParser.FunctionCommandContext ctx);
	/**
	 * Exit a parse tree produced by the {@code functionCommand}
	 * labeled alternative in {@link DocumentParser#command}.
	 * @param ctx the parse tree
	 */
	void exitFunctionCommand(DocumentParser.FunctionCommandContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#arg}.
	 * @param ctx the parse tree
	 */
	void enterArg(DocumentParser.ArgContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#arg}.
	 * @param ctx the parse tree
	 */
	void exitArg(DocumentParser.ArgContext ctx);
	/**
	 * Enter a parse tree produced by the {@code unarySign}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterUnarySign(DocumentParser.UnarySignContext ctx);
	/**
	 * Exit a parse tree produced by the {@code unarySign}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitUnarySign(DocumentParser.UnarySignContext ctx);
	/**
	 * Enter a parse tree produced by the {@code number}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterNumber(DocumentParser.NumberContext ctx);
	/**
	 * Exit a parse tree produced by the {@code number}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitNumber(DocumentParser.NumberContext ctx);
	/**
	 * Enter a parse tree produced by the {@code parens}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterParens(DocumentParser.ParensContext ctx);
	/**
	 * Exit a parse tree produced by the {@code parens}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitParens(DocumentParser.ParensContext ctx);
	/**
	 * Enter a parse tree produced by the {@code iden}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterIden(DocumentParser.IdenContext ctx);
	/**
	 * Exit a parse tree produced by the {@code iden}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitIden(DocumentParser.IdenContext ctx);
	/**
	 * Enter a parse tree produced by the {@code addSub}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterAddSub(DocumentParser.AddSubContext ctx);
	/**
	 * Exit a parse tree produced by the {@code addSub}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitAddSub(DocumentParser.AddSubContext ctx);
	/**
	 * Enter a parse tree produced by the {@code mulDiv}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void enterMulDiv(DocumentParser.MulDivContext ctx);
	/**
	 * Exit a parse tree produced by the {@code mulDiv}
	 * labeled alternative in {@link DocumentParser#expr}.
	 * @param ctx the parse tree
	 */
	void exitMulDiv(DocumentParser.MulDivContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#group}.
	 * @param ctx the parse tree
	 */
	void enterGroup(DocumentParser.GroupContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#group}.
	 * @param ctx the parse tree
	 */
	void exitGroup(DocumentParser.GroupContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#arrow}.
	 * @param ctx the parse tree
	 */
	void enterArrow(DocumentParser.ArrowContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#arrow}.
	 * @param ctx the parse tree
	 */
	void exitArrow(DocumentParser.ArrowContext ctx);
	/**
	 * Enter a parse tree produced by {@link DocumentParser#arrow_head}.
	 * @param ctx the parse tree
	 */
	void enterArrow_head(DocumentParser.Arrow_headContext ctx);
	/**
	 * Exit a parse tree produced by {@link DocumentParser#arrow_head}.
	 * @param ctx the parse tree
	 */
	void exitArrow_head(DocumentParser.Arrow_headContext ctx);
}