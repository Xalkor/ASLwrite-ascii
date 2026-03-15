import { Decoration, EditorView, keymap, lineNumbers, highlightActiveLine } from '@codemirror/view';
import { StateEffect, StateField, RangeSet, RangeSetBuilder, EditorState } from '@codemirror/state';
import { defaultKeymap, historyKeymap, history } from '@codemirror/commands';
import { HighlightStyle, syntaxHighlighting, StreamLanguage } from '@codemirror/language';
import { tags } from '@lezer/highlight';

// DiceLang stream language definition
const diceLangStream = StreamLanguage.define({
    token(stream) {
        // comments
        if (stream.match(/#.*/)) return 'comment';

        // numbers
        if (stream.match(/\d+/)) return 'number';

        // keywords
        if (stream.match(/\b(penup|pendown|forward|turn|goto|size|face|draw|flip|curveto)\b/)) return 'keyword';
        if (stream.match(/---/)) return 'keyword';

        // identifiers
        if (stream.match(/~?[a-zA-Z_][a-zA-Z0-9_~]*/)) return 'variableName';

        // built-ins
        if (stream.match(/~/)) return 'typeName'; // using typeName as proxy for built-in

        // multi-char operators first, then single char
        if (stream.match(/==|!=|<=|>=/)) return 'operator';
        if (stream.match(/[+\/\-*<>]/)) return 'operator';

        stream.next();
        return null;
    }
});

// Theme
const diceLangTheme = EditorView.theme({
    '&': {
        height: '100%',
        fontSize: '0.95rem',
        fontFamily: "'Fira Code', 'Courier New', monospace",
        fontVariantLigatures: 'contextual',
        fontFeatureSettings: '"cv06", "zero", "cv31", "ss01", "ss02", "ss04", "ss09", "calt", "calc", "cv24"',
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
const diceLangHighlight = HighlightStyle.define([
    { tag: tags.comment,      color: '#cfc2bc', fontStyle: 'italic' },
    { tag: tags.number,       color: '#63b1c5' },
    { tag: tags.keyword,      color: '#b36aa8', fontWeight: 'bold' },
    { tag: tags.typeName,     color: '#c25671' },
    { tag: tags.operator,     color: '#C89B7B' },
    { tag: tags.variableName, color: '#7584c3' },
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
            diceLangStream,
            diceLangTheme,
            errorDecoField,
            syntaxHighlighting(diceLangHighlight),
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