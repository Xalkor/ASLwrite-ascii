import { createEditor, getEditorContent, highlightError, clearErrors } from './text-editor.js';

import { parse } from "./parser.js";
import { Visitor } from "./visitor.js";

const stdLib = `num_1 = {
  # vertical line
  goto 0 -100
  pendown
  face -90
  forward 200
  # cross
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
num_5 = {
  draw _big_v
  draw _small_v
  draw _thumb
}

claw_5 = {
  # outer handshape
  goto -66 100
  pendown
  goto 66 100
  goto 0 -100
  penup
  # vertical line
  goto 0 -100
  pendown
  face -90
  forward 133
  turn -90
  forward 66
  # thumb
  penup
  goto 0 -33
  pendown
  face 180
  forward 33
  # extra finger
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

_dot = {
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
~ = {
  penup
  goto -100 120
  pendown
  curveto -50 120 -90 140 -60 140
  curveto   0 120 -40 140 -10 140
  curveto  50 120  10 140  40 140
  curveto 100 120  60 140  90 140
}
`;

const initialSource = `
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
---
_big_v _small_v _thumb _big_u _dot _arrow_to_me ~
num_1 num_5 claw_5 close_5
I want study`;

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
        console.log("[ROW]", row);
        const rowContainer = document.createElement('div');
        rowContainer.style.display = 'flex';
        rowContainer.style.flexWrap = 'wrap';
        rowContainer.style.gap = '8px'; // space between SVGs

        renderRow(rowContainer, row);

        out.appendChild(rowContainer);
    }
}

function execute() {
    const source = stdLib+getEditorContent(editor);
    const out = document.getElementById('output');
    out.innerHTML = '';

    const selected = document.querySelector('input[name="compiler-type"]:checked');
    const chosenFormat = selected.value;
    
    const visitor = new Visitor();

    // ;
    // console.log("Result:", result);
    
    try {
        const ast = parse(source);
        console.log("AST:", JSON.stringify(ast, null, 2));

        switch(chosenFormat) {
            case "AST":
                const lines = JSON.stringify(ast, null, 2).split('\n');
                writeLines(out, lines);
                break;
            case "SVG-text":
                const result = visitor.visit(ast)
                writeLines(out, result);
                break;
            case "SVG":
                const svgGrid = visitor.visit(ast);
                renderGrid(out, svgGrid);
                break;
            default:
                throw new Error(`no compiler type selected chosenFormat=${chosenFormat}`);
        }

        
    } catch(e) {
        const out = document.getElementById('output');

        if (e.location) {
            const { start, end } = e.location;
            const msg = `Error at line ${start.line}, column ${start.column}: ${e.message}`;
            const pre = document.createElement('div');
            pre.className = 'err-line';
            pre.textContent = msg;
            out.appendChild(pre);

            highlightError(editor, start, end);
        } else {
            const pre = document.createElement('div');
            pre.className = 'err-line';
            pre.textContent = e.message;
            out.appendChild(pre);
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