import { Decoration, EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { StateEffect, StateField, RangeSet, RangeSetBuilder, EditorState } from '@codemirror/state';
import { defaultKeymap, historyKeymap, history } from '@codemirror/commands';
import { HighlightStyle, syntaxHighlighting, StreamLanguage } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// aslWrite stream language definition
const aslWriteStream = StreamLanguage.define({
    startState() {
        return {
            mode: 'asl',        // 'asl' | 'markdown' | 'aslInline' | 'aslBlock' | 'blockComment' | 'markdownCode' | 'markdownFenced' | 'markdownMath' | 'markdownDisplayMath'
            seenSeparator: false
        };
    },

    token(stream, state) {

        // ── Block comment (works in any mode) ────────────────────────────
        if (state.mode === 'blockComment') {
            if (stream.match('*/')) { state.mode = state.prevMode; return 'comment'; }
            stream.next();
            return 'comment';
        }

        // ── Enter block comment from asl or aslInline/aslBlock ───────────
        if (state.mode !== 'markdown' && state.mode !== 'markdownCode' && state.mode !== 'markdownFenced' && state.mode !== 'markdownMath' && state.mode !== 'markdownDisplayMath') {
            if (stream.match('/*')) { state.prevMode = state.mode; state.mode = 'blockComment'; return 'comment'; }
        }

        // ── ASL mode (definitions section) ───────────────────────────────
        if (state.mode === 'asl') {
            if (stream.match('//')) { stream.skipToEnd(); return 'comment'; }
            if (stream.match('===')) { state.mode = 'markdown'; return 'separator'; }
            if (stream.match(/\d+/)) return 'number';
            if (stream.match(/\b(penup|pendown|forward|turn|goto|size|face|draw|flip|curveto)\b/)) return 'keyword';
            if (stream.match(/~?[a-zA-Z_][a-zA-Z0-9_~]*/)) return 'variableName';
            if (stream.match(/~/)) return 'typeName';
            if (stream.match(/==|!=|<=|>=/)) return 'operator';
            if (stream.match(/[+\/\-*<>]/)) return 'operator';
            stream.next();
            return null;
        }

        // ── ASL inline mode (@...@) ───────────────────────────────────────
        if (state.mode === 'aslInline') {
            if (stream.match('@')) { state.mode = 'markdown'; return 'separator'; }
            if (stream.match(/\d+/)) return 'number';
            if (stream.match(/\b(penup|pendown|forward|turn|goto|size|face|draw|flip|curveto)\b/)) return 'keyword';
            if (stream.match(/~?[a-zA-Z_][a-zA-Z0-9_~]*/)) return 'variableName';
            if (stream.match(/~/)) return 'typeName';
            stream.next();
            return null;
        }

        // ── ASL block mode (@@@...@@@) ────────────────────────────────────
        if (state.mode === 'aslBlock') {
            if (stream.match('@@@')) { state.mode = 'markdown'; return 'separator'; }
            if (stream.match(/\d+/)) return 'number';
            if (stream.match(/\b(penup|pendown|forward|turn|goto|size|face|draw|flip|curveto)\b/)) return 'keyword';
            if (stream.match(/~?[a-zA-Z_][a-zA-Z0-9_~]*/)) return 'variableName';
            if (stream.match(/~/)) return 'typeName';
            stream.next();
            return null;
        }

        // ── Markdown fenced code block (`````...`````) ────────────────────
        if (state.mode === 'markdownFenced') {
            if (stream.match('```')) { state.mode = 'markdown'; return 'comment'; }
            stream.next();
            return 'comment';
        }

        // ── Markdown inline code (`...`) ──────────────────────────────────
        if (state.mode === 'markdownCode') {
            if (stream.match('`')) { state.mode = 'markdown'; return 'comment'; }
            stream.next();
            return 'comment';
        }

        // ── Markdown display math ($$...$$) ───────────────────────────────
        if (state.mode === 'markdownDisplayMath') {
            if (stream.match('$$')) { state.mode = 'markdown'; return 'comment'; }
            stream.next();
            return 'comment';
        }

        // ── Markdown inline math ($...$) ──────────────────────────────────
        if (state.mode === 'markdownMath') {
            if (stream.match('$')) { state.mode = 'markdown'; return 'comment'; }
            stream.next();
            return 'comment';
        }

        // ── Markdown mode ─────────────────────────────────────────────────
        if (state.mode === 'markdown') {
            // opaque regions — must be tried before @ check
            if (stream.match('```'))  { state.mode = 'markdownFenced';      return 'comment'; }
            if (stream.match('`'))    { state.mode = 'markdownCode';        return 'comment'; }
            if (stream.match('$$'))   { state.mode = 'markdownDisplayMath'; return 'comment'; }
            if (stream.match('$'))    { state.mode = 'markdownMath';        return 'comment'; }

            // asl regions
            if (stream.match('@@@')) { state.mode = 'aslBlock';   return 'separator'; }
            if (stream.match('@'))   { state.mode = 'aslInline';  return 'separator'; }

            // headings — only at start of line
            if (stream.sol()) {
                if (stream.match(/#{6}\s/)) return 'heading6';
                if (stream.match(/#{5}\s/)) return 'heading5';
                if (stream.match(/#{4}\s/)) return 'heading4';
                if (stream.match(/#{3}\s/)) return 'heading3';
                if (stream.match(/#{2}\s/)) return 'heading2';
                if (stream.match(/#{1}\s/)) return 'heading1';
            }

            // escaped @
            if (stream.match('\\@')) return 'content';

            stream.next();
            return 'content';
        }

        stream.next();
        return null;
    },

    blankLine(state) {
        // fenced code and block math persist across blank lines
        // everything else resets to markdown if we're past the separator
    }
});

// Theme
const aslWriteTheme = EditorView.theme({
    '&': {
        height: '100%',
        fontSize: '0.95rem',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontVariantLigatures: 'contextual',
        fontFeatureSettings: '"cv06", "zero", "cv31", "ss01", "ss02", "ss04", "ss09", "calt", "calc", "cv24"', //TODO: why aren't these working in the editor?
    },
    '.cm-error': {
        display: 'inline-block',
        textDecoration: 'underline wavy red'
    },
    '.cm-content': {
        padding: '12px 0',
        caretColor: '#c084fc',
    },
    '.cm-line': {
        padding: '0 12px',
        lineHeight: '1.6',
    },
    '.cm-gutters': {
        background: '#0f0f1a',
        borderRight: '1px solid #1f2937',
        color: '#4b5563',
        padding: '0 4px',
    },
    '.cm-activeLineGutter': {
        background: '#1a1a2e',
    },
    '.cm-activeLine': {
        background: '#1a1a2e',
    },
    '.cm-cursor': {
        borderLeftColor: '#c084fc',
    },
    '.cm-selectionBackground': {
        background: '#3b1f6e !important',
    },
    '&.cm-focused .cm-selectionBackground': {
        background: '#3b1f6e !important',
    },
}, { dark: true });

// Syntax highlighting colors
const aslWriteHighlight = HighlightStyle.define([
    { tag: tags.comment,      color: '#cfc2bc', fontStyle: 'italic' },
    { tag: tags.content,      color: '#e0e0e0' },
    { tag: tags.number,       color: '#63b1c5' },
    { tag: tags.keyword,      color: '#b36aa8', fontWeight: 'bold' },
    { tag: tags.typeName,     color: '#c25671' },
    { tag: tags.operator,     color: '#C89B7B' },
    { tag: tags.variableName, color: '#7584c3' },
    { tag: tags.separator,    color: '#95AF6E', fontWeight: 'bold' },
    { tag: tags.heading1,     color: '#af91cd', fontWeight: 'bold' },
    { tag: tags.heading2,     color: '#af91cd', fontWeight: 'bold' },
    { tag: tags.heading3,     color: '#af91cd', fontWeight: 'bold' },
    { tag: tags.heading4,     color: '#af91cd', fontWeight: 'bold' },
    { tag: tags.heading5,     color: '#af91cd', fontWeight: 'bold' },
    { tag: tags.heading6,     color: '#af91cd', fontWeight: 'bold' },
]);

export function createEditor(parent, initialContent, onChange) {
    const state = EditorState.create({
        doc: initialContent,
        extensions: [
            history(),
            keymap.of([...defaultKeymap, ...historyKeymap]),
            keymap.of([{
                key: "Tab",
                run: (view) => {
                    const TAB_SPACES = 2;
                    const spaces = " ".repeat(TAB_SPACES);
                    view.dispatch({
                        changes: { from: view.state.selection.main.from, insert: spaces },
                        selection: { anchor: view.state.selection.main.from + spaces.length }
                    });
                    return true; // prevent default
                }
            }]),
            lineNumbers(),
            highlightActiveLine(),
            aslWriteStream,
            aslWriteTheme,
            errorDecoField,
            syntaxHighlighting(aslWriteHighlight),
            EditorView.updateListener.of(update => {
                if (update.docChanged) onChange(update.state.doc.toString());
            }),
        ],
    });

    return new EditorView({ state, parent });
}

export const errorDecoField = StateField.define({
  create() {
    return Decoration.none;
  },
  update(deco, tr) {
    // keep decorations unless explicitly cleared
    if (tr.effects.length) {
      for (let e of tr.effects) {
        if (e.is(setErrorDeco)) return e.value;
      }
    }
    return deco.map(tr.changes);
  },
  provide: f => EditorView.decorations.from(f)
});

export const setErrorDeco = StateEffect.define();


export function highlightError(view, start, end) {
    const from = start.offset;
    let to = end.offset;

    if (to <= from) to = from + 1;

    const deco = Decoration.set([
        Decoration.mark({ class: "cm-error", inclusive: true }).range(from, to)
    ]);


  view.dispatch({
    effects: setErrorDeco.of(deco)
  });
}

export function clearErrors(view) {
  view.dispatch({ effects: setErrorDeco.of(Decoration.none) });
}


export function getEditorContent(view) {
    return view.state.doc.toString();
}