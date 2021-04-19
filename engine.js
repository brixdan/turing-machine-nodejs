// My compact Turing Machine
// Prepare symbols:
[L, R, halt, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, B, w, m, n] =
    ["L", "R", "halt", "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "B", "w", "m", "n"];

var tm = function (
    script,
    tape,
    limit, // allowed amount of steps/ticks
    q = q0, // inner/tail state
    p = 0, // space/head state
    v = true // vebose
) {
    let step = 0;
    let name = '';

    if (typeof script === "string") (name = script, script = require("./TMs/" + script));

    while ((step < 200) && (q in script || typeof q === "function")) {
        if (typeof q === "function") {
            tape = q(tape, q0, p)(tm);
            if (tape.halt) break;
            q = q0;
            p = 0; // resume initial process
        }
        if (limit && step > limit) {
            tape.limit = limit;
            break
        }
        with (script[q][tape[p] ?? "B"]) {
            if (v) console.log(`${name}: step ${step}:`, ...show(tape,p),q,w,m,n);
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
    if (v) console.log(`${name}: step ${step}:`, ...tape);
    return tape;
}

function show(ar,p) {
    let out = []
    for (let i = 0; i < 20; i++) {
        out[i] = ar[i - 10] ??'_';
    }
    out = [...out.slice(0,10),'*',...out.slice(10)]
    if (p !== undefined) {
        p = p + 10;
        out.splice(p + 2, 0, "'")
    }
    return out
}
// -----------------MIXIN---------------
// let res = {}
// let tape = [0]
// let temp = [0]
// let s = '';
// for (let i = 0; i < 500; i++) {
//     tape = tm("increment", temp);
//     temp = [...tape];
//     tm("grow", tape,60);
//     s = temp.toString()
//     res[s] = tape.limit;
// }
// console.log("result:",res);

var tape = [0,0,B]; // interest
tape=[0,0,B,0]

tape = tm("mixin", tape,100,q0,0,true);
console.log("out:", ...show(tape), "limit = ",tape.limit)

