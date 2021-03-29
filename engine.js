// My compact Turing Machine
// Prepare symbols:
[L, R, halt, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, B, w, m, n] =
    ["L", "R", "halt", "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "B", "w", "m", "n"];

var tm = function (
    script,
    tape,
    q = q0, // dimension state
    p = 0 // position state
) {
    let step = 0;
    let name = '';

    if (typeof script === "string") (name = script,script = require("./TMs/" + script));

    while ((step < 100) && (q in script || typeof q === "function")) {
        console.log(`${name}: step ${step}:`, ...tape);
        if (typeof q === "function")
        {
            tape = q(tape,q0,p)(tm);
            if (tape.halt) break;
            q = q0;
            p = 0; // resume initial process
        }
        with (script[q][tape[p]??"B"]) {
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
    console.log(`${name}: step ${step}:`, ...tape);
    return tape;
}
//-------------------------------
// First task
var tape = [0,1];
for(let i = 0; i<4;i++){
tape = tm("increment", tape);
console.log("out:", ...tape)
}
//-------------------------------
// var tape = [0,1,B,0,1];
// tape = tm("sum", tape);
// console.log("out:", ...tape)