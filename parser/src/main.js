import { createEditor, getEditorContent, highlightError, clearErrors } from './text-editor.js';

import { parse } from "./parser.js";
import { Visitor } from "./visitor.js";

import initialSource    from '../../README.asl';
import vocabSource      from '../dist/libs/vocab.asl';
import handshapesSource from '../dist/libs/handshapes.asl';
import alphabetSource   from '../dist/libs/alphabet.asl';
import diacriticsSource from '../dist/libs/diacritics.asl';
import arrowsSource     from '../dist/libs/arrows.asl';
import layoutsSource    from '../dist/libs/layouts.asl';

const tabContents = {
    readme:     { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: initialSource},
    vocab:      { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: vocabSource},
    diacritics: { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: diacriticsSource},
    handshapes: { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: handshapesSource},
    arrows:     { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: arrowsSource},
    layouts:    { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: layoutsSource},
    alphabet:   { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: alphabetSource},
    scratch:    { edit_sx: 0, edit_sy: 0, out_sx: 0, out_sy: 0, content: 'import vocab\nimport alphabet\n===\n# Example document\n\nTry playing around!'}
};

let activeTab = 'readme';

function switchTab(tabName) {
    const out = document.getElementById('output');
    tabContents[activeTab].out_sx  = out.contentDocument?.documentElement?.scrollLeft ?? 0;
    tabContents[activeTab].out_sy  = out.contentDocument?.documentElement?.scrollTop  ?? 0;
    tabContents[activeTab].edit_sx = editor.scrollDOM.scrollLeft;
    tabContents[activeTab].edit_sy = editor.scrollDOM.scrollTop;

    tabContents[activeTab].content = getEditorContent(editor);
    activeTab = tabName;

    editor.dispatch({
        changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: tabContents[activeTab].content
        }
    });

    document.querySelectorAll('.tab').forEach(t => {
        t.classList.toggle('active', t.dataset.tab === tabName);
    });

    execute();
}

document.querySelectorAll('.tab').forEach(t => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
});

const editor = createEditor(
    document.getElementById('editor'),
    initialSource,
    () => {}
);

function writeLines(out, lines) {
    for (const line of lines) {
        const pre = document.createElement('pre');
        pre.className = 'out-line';
        pre.textContent = line;
        out.appendChild(pre);
    }
    if (lines.length === 0) {
        const div = document.createElement('div');
        div.style.color = '#6b7280';
        div.textContent = '(no output)';
        out.appendChild(div);
    }
}

function renderRow(out, row) {
    for (const item of row) {

        // nested grapheme container
        if (item?.type === "Graphemes" && Array.isArray(item.val)) {
            renderRow(out, item.val);
            continue;
        }

        // SVG object
        if (item?.type === "Grapheme") {
            const svgWrapper = document.createElement("div");
            svgWrapper.style.display = "inline-block";
            svgWrapper.innerHTML = item.fullHTML;
            out.appendChild(svgWrapper);
        }

        // SVG string
        if (typeof item?.val === "string") {
            const svgWrapper = document.createElement("div");
            svgWrapper.style.display = "inline-block";
            svgWrapper.innerHTML = item.val;
            out.appendChild(svgWrapper);
        }

        // raw string case (if val list sometimes contains strings directly)
        if (typeof item === "string") {
            const svgWrapper = document.createElement("div");
            svgWrapper.style.display = "inline-block";
            svgWrapper.innerHTML = item;
            out.appendChild(svgWrapper);
        }
    }
}

function renderGrid(out, svgGrid) {
    for (const row of svgGrid) {
        // console.log("[ROW]", row);
        const rowContainer = document.createElement('div');
        rowContainer.style.display = 'flex';
        rowContainer.style.flexWrap = 'wrap';
        rowContainer.style.gap = '8px'; // space between SVGs

        renderRow(rowContainer, row);

        out.appendChild(rowContainer);
    }
}

function escapeHTML(str) {
  var p = document.createElement("p");
  p.textContent = str; 
  return p.innerHTML;
}

// visit all imported files
async function resolveImports(ast, tabContents) {
    const resolvedStatements = [];
    for (const stmt of ast.statements) {
        if (stmt.type === 'Import') {
            try {
                const tabKey = Object.keys(tabContents).find(k => 
                    k === stmt.path || k === stmt.path.replace('.asl', '')
                );
                //console.log('[RESOLVE]', tabKey);
                const source = tabKey 
                    ? tabContents[tabKey].content
                    : await fetch('libs/' + stmt.path + '.asl').then(r => {
                        if (!r.ok) throw new Error(`Could not import "${stmt.path}.asl": ${r.status} ${r.statusText}`);
                        return r.text();
                    });
                //console.log('[RESOLVE]', source);

                const importedAst = parse(source);
                await resolveImports(importedAst, tabContents);
                resolvedStatements.push(...importedAst.statements.filter(s => s.type !== 'Import'));
            } catch(e) {
                throw new Error(`Import "${stmt.path}" failed: ${e.message}`);
            }
        } else {
            resolvedStatements.push(stmt);
        }
    }
    ast.statements = resolvedStatements;
}

async function execute() {
    //const source = lib_handshapes+lib_diacritics+lib_asl_vocab+getEditorContent(editor);
    const source = getEditorContent(editor);
    const out = document.getElementById('output');
    out.innerHTML = '';

    const selected = document.querySelector('input[name="compiler-type"]:checked');
    const chosenFormat = selected.value;
    
    const visitor = new Visitor();

    // ;
    // console.log("Result:", result);
    
    try {
        const ast = parse(source);
        // console.log("AST:", JSON.stringify(ast, null, 2));
        switch(chosenFormat) {
            case "AST":
                const lines = JSON.stringify(ast, null, 2);
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${lines}</pre></body></html>`;
                break;
            case "raw-HTML":
                await resolveImports(ast, tabContents);
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${escapeHTML(visitor.visit(ast))}</pre></body></html>`;
                break;
            case "Markdown":
                await resolveImports(ast, tabContents);
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${escapeHTML(visitor.visitDocumentRaw(ast))}</pre></body></html>`;
                break;
            case "debug":
                visitor.debug = true;
            case "HTML":
                tabContents[activeTab].out_sy = out.contentDocument.documentElement.scrollTop ;
                tabContents[activeTab].out_sx = out.contentDocument.documentElement.scrollLeft;
                tabContents[activeTab].edit_sy = editor.scrollDOM.scrollTop ;
                tabContents[activeTab].edit_sx = editor.scrollDOM.scrollLeft;
                await resolveImports(ast, tabContents);
                const html = visitor.visit(ast);
                const showBorders = document.getElementById('show-borders').checked;
                const borderStyle = showBorders 
                    ? `svg { border: 2px dashed lightgrey; }`
                    : `svg { border: none; }`;
                const glyphSize = sizes[svgSizeIndex];
                const fontSize = sizes[fontSizeIndex];
                out.srcdoc = `<!DOCTYPE html><html><head>
                <base target="_blank">
                <style>
                    body { font-family: serif; font-size: ${fontSize}; padding: 12px; line-height: 1.6; margin: 0; box-sizing: border-box; overflow-wrap: break-word; }
                    svg { display: inline-block; vertical-align: baseline; width: ${glyphSize}; height: ${glyphSize}; padding: 2px 2px 4px 2px; }
                    div[style*="display:flex"] { gap: 4px; }
                    div { max-width: 100%; }
                    pre { white-space: pre-wrap; overflow-wrap: break-word; max-width: 100%; background:#efefe7; }
                    code { color: #550000; }
                    *:not(pre) > code { background:#efefe7; }
                    table { border-collapse: collapse; }
                    table, th, td { border: 1px solid black; }
                    ${borderStyle}
                </style></head><body>${html}</body></html>`;
                out.addEventListener('load', () => {
                    out.contentDocument.documentElement.scrollTop  = tabContents[activeTab].out_sy;
                    out.contentDocument.documentElement.scrollLeft = tabContents[activeTab].out_sx;
                    editor.scrollDOM.scrollTop  = tabContents[activeTab].edit_sy;
                    editor.scrollDOM.scrollLeft = tabContents[activeTab].edit_sx;
                }, { once: true });
                break;
            default:
                throw new Error(`no compiler type selected chosenFormat=${chosenFormat}`);
        }

        
    } catch(e) {
        const out = document.getElementById('output');
        if (e.location) {
            const { start, end } = e.location;
            const msg = `Error at line ${start.line}, column ${start.column}: ${e.message}`;
            out.srcdoc = `<!DOCTYPE html><html><body><div style="color:#911c1c;font-family:monospace;padding:12px;">${msg}</div></body></html>`;
            highlightError(editor, start, end);
        } else {
            out.srcdoc = `<!DOCTYPE html><html><body><pre style="color:#911c1c;font-family:monospace;padding:12px;">${e.message}\n${e.stack}</pre></body></html>`;
        }
    }
}

document.getElementById('editor').addEventListener('keydown', e => {
    clearErrors(editor);
    if ((e.ctrlKey || e.metaKey) && (e.key === 'S' || e.key === 's')) {
        execute();
        e.preventDefault();
    }
});

document.getElementById('show-borders').addEventListener('change', execute);

document.getElementById('svg-increase').addEventListener('click', () => {
    if (svgSizeIndex < sizes.length - 1) { svgSizeIndex++; svgSizeDisplay.textContent = sizes[svgSizeIndex]; execute(); }
});
document.getElementById('svg-decrease').addEventListener('click', () => {
    if (svgSizeIndex > 0) { svgSizeIndex--; svgSizeDisplay.textContent = sizes[svgSizeIndex]; execute(); }
});

document.getElementById('font-increase').addEventListener('click', () => {
    if (fontSizeIndex < sizes.length - 1) { fontSizeIndex++; fontSizeDisplay.textContent = sizes[fontSizeIndex]; execute(); }
});
document.getElementById('font-decrease').addEventListener('click', () => {
    if (fontSizeIndex > 0) { fontSizeIndex--; fontSizeDisplay.textContent = sizes[fontSizeIndex]; execute(); }
});

document.getElementById('run-btn').addEventListener('click', execute);

execute();

// const input = `
// foo,bar = {
//     size 200 200
//     fwd 10
//     turn 90
//     fwd 20
//     pen up
//     goto -10 10
//     pen down
//     fwd 100
//     face 270
//     fwd 12
// }
// baz = a b c
// ---
// foo bar baz a b c
// `;