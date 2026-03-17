import { createEditor, getEditorContent, highlightError, clearErrors } from './text-editor.js';

import { parse } from "./parser.js";
import { Visitor } from "./visitor.js";

import initialSource from '../../README.asl?raw';

const lib_handshapes = `num_1 = {
  // vertical line
  goto 0 -100
  pendown
  face -90
  forward 200
  // cross
  penup
  goto -40 -66
  pendown
  goto 40 -33
}

_big_v = {
  penup
  goto -66 100
  pendown
  goto 0 -100
  goto 66 100
}
_small_v = {
  penup
  goto -33 100
  pendown
  goto 0 0
  goto 33 100
}
_thumb = {
  penup
  goto -15 -50
  pendown
  face 180
  forward 40
}
_cross = {
  penup
  goto -45 -66
  pendown
  goto 55 -33
}
num_2 = {
  draw _big_v
  draw _cross
}
num_3 = {
  draw _big_v
  draw _thumb
}
num_4 = {
  draw _big_v
  draw _small_v
  draw _cross
}
num_5 = {
  draw _big_v
  draw _small_v
  draw _thumb
}
claw_5 = {
  // outer handshape
  goto -66 100
  pendown
  goto 66 100
  goto 0 -100
  penup
  // vertical line
  goto 0 -100
  pendown
  face -90
  forward 133
  turn -90
  forward 66
  // thumb
  penup
  goto 0 -33
  pendown
  face 180
  forward 33
  // extra finger
  penup
  goto -66 66
  pendown
  face 0
  forward 66
}
_big_u = {
  goto -50 100
  pendown
  curveto  0 -100 -50   20 -60 -100
  curveto 50  100  60 -100  50   20 
}
close_5 = {
  draw _big_u

  penup
  goto -30 0
  draw _thumb
}
`;

const lib_asl_vocab = `_dot = {
  penup
  goto -10 10
  pendown
  forward 20
  turn 90
  forward 20
  turn 90
  forward 20
  turn 90
  forward 20
}
_arrow_to_me = {
  pendown
  face 90
  forward 75
  penup
  forward 16
  draw _dot 16 16
}
I,me = {
  [turn 180; draw num_1]
  goto 30 10
  draw _arrow_to_me
}
want = {
  goto -50 +50
  draw num_5 85 85
  
  goto +50 +50
  [flip; draw num_5 85 85]
  
  goto -50 -50
  [flip; draw claw_5 85 85]
  
  goto +50 -50
  draw claw_5 85 85
  
  goto 0 50
  draw _arrow_to_me
}
study = {
  goto -50 -50
  [turn 75; draw close_5 85 85]
  goto 50 50
  [turn -170; flip; draw num_5 85 85; draw ~ 85 85]
}
`;

const lib_diacritics = `~,flutter = {
  penup
  goto -100 120
  pendown
  curveto -50 120 -90 140 -60 140
  curveto   0 120 -40 140 -10 140
  curveto  50 120  10 140  40 140
  curveto 100 120  60 140  90 140
}
`;

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
  var p = document.createElement("p"); // or 'div', 'textarea', etc.
  p.textContent = str; 
  return p.innerHTML;
}

function execute() {
    const source = lib_handshapes+lib_diacritics+lib_asl_vocab+getEditorContent(editor);
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
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${escapeHTML(visitor.visit(ast))}</pre></body></html>`;
                break;
            case "Markdown":
                out.srcdoc = `<!DOCTYPE html><html><body><pre>${escapeHTML(visitor.visitDocumentRaw(ast))}</pre></body></html>`;
                break;
            case "HTML":
                const prevScroll = out.contentDocument?.documentElement?.scrollTop ?? 0;
                const html = visitor.visit(ast);
                const showBorders = document.getElementById('show-borders').checked;
                const borderStyle = showBorders 
                    ? `svg { border: 2px dashed lightgrey; }`
                    : `svg { border: none; }`;
                const glyphSize = sizes[sizeIndex];
                out.srcdoc = `<!DOCTYPE html><html><head>
                <base target="_blank">
                <style>
                    body { font-family: serif; padding: 12px; line-height: 1.6; margin: 0; box-sizing: border-box; overflow-wrap: break-word; }
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

document.getElementById('font-increase').addEventListener('click', () => {
    if (sizeIndex < sizes.length - 1) { sizeIndex++; sizeDisplay.textContent = sizes[sizeIndex]; execute(); }
});
document.getElementById('font-decrease').addEventListener('click', () => {
    if (sizeIndex > 0) { sizeIndex--; sizeDisplay.textContent = sizes[sizeIndex]; execute(); }
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