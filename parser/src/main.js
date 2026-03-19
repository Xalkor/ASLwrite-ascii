import { createEditor, getEditorContent, highlightError, clearErrors } from './text-editor.js';

import { parse } from "./parser.js";
import { Visitor } from "./visitor.js";

import initialSource    from '../../README.asl';
import vocabSource      from '../dist/libs/vocab.asl';
import handshapesSource from '../dist/libs/handshapes.asl';
import diacriticsSource from '../dist/libs/diacritics.asl';

const tabContents = {
    readme:     initialSource,
    vocab:      vocabSource,
    diacritics: diacriticsSource,
    handshapes: handshapesSource,
    scratch:    'import vocab\n===\n# Example document\n\nTry playing around!'
};

let activeTab = 'readme';

function switchTab(tabName) {
    tabContents[activeTab] = getEditorContent(editor);
    activeTab = tabName;

    editor.dispatch({
        changes: {
            from: 0,
            to: editor.state.doc.length,
            insert: tabContents[activeTab]
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
export async function resolveImports(ast) {
    const resolvedStatements = [];
    for (const stmt of ast.statements) {
        if (stmt.type === 'Import') {
            const source = await fetch('libs/' + stmt.path + '.asl').then(r => {
                if (!r.ok) throw new Error(`Could not import "${stmt.path}.asl": ${r.status} ${r.statusText}`);
                return r.text();
            });
            const importedAst = parse(source);
            // recursively resolve imports in the imported file
            await resolveImports(importedAst);
            // only inject definitions, ignore body
            resolvedStatements.push(...importedAst.statements.filter(s => s.type === 'Definition'));
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
                await resolveImports(ast);
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${escapeHTML(visitor.visit(ast))}</pre></body></html>`;
                break;
            case "Markdown":
                await resolveImports(ast);
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${escapeHTML(visitor.visitDocumentRaw(ast))}</pre></body></html>`;
                break;
            case "debug":
                visitor.debug = true;
            case "HTML":
                await resolveImports(ast);
                const prevScroll = out.contentDocument?.documentElement?.scrollTop ?? 0;
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
                    pre { white-space: pre-wrap; overflow-wrap: break-word; max-width: 100%; }
                    ${borderStyle}
                </style></head><body>${html}</body></html>`;
                out.addEventListener('load', () => {
                    out.contentDocument.documentElement.scrollTop = prevScroll;
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
            out.srcdoc = `<!DOCTYPE html><html><body><div style="color:#911c1c;font-family:monospace;padding:12px;">${e.message}</div></body></html>`;
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

document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('output').innerHTML = '';
});

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