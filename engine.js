// My compact Turing Machine
const colors = require('colors');
// Prepare symbols:
[L, R, halt, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, B, w, m, n] =
    ["L", "R", "halt", "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "B", "w", "m", "n"];

const tm = function (
    script,
    tape,
    limit = 200, // allowed amount of steps/ticks
    q = q0, // inner/tail state
    p = 0, // space/head state
    v = true // vebose
) {
    let step = 0;
    let name = '';

    if (typeof script === "string") (name = script, script = require("./TMs/" + script));

    while ((step < limit) && (q in script || typeof q === "function")) {
        if (typeof q === "function") {
            tape = q(tape, q0, p)(tm);
            if (tape.halt) break;
            q = q0;
            p = 0; // resume initial process
        }
        with (script[q][tape[p] ?? "B"]) {
            tape.step = step + 1;
            let str = [...show(tape, p)].join(' ');
            if (v) console.log(`${name}:`,`step ${step}:`.padEnd(10," "), str, q, w, m, n);
            tape[p] = w
            q = n
            switch (m) {        // move to next p-position
                case L:
                    p = p - 1;
                    break;
                case R:
                    p = p + 1;
                    break;
                default:
                    p = m; // or jump -)
            }
        }
        step++
    }
    if (v) console.log(`${name}: step ${step}:`, ...tape, ` total:${tape.step}`);
    return tape;
}

function show(ar, p, shift = 20) {
    if (p === undefined) {
        console.log(`Position undefined`.red.bold);
        return;
    } else {
        p = p + shift
    }
    let out = []
    for (let i = 0; i < 2 * shift; i++) {
        out[i] = ar[i - shift] ?? '_';
    }
    out = [...out.slice(0, p), `${out[p]}`.red.bold, ...out.slice(p + 1)]
    out = [...out.slice(0, shift), `${out[shift]}`.green.bold, ...out.slice(shift + 1)]

    return out
}

module.exports.tm = tm;




