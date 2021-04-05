// My compact Turing Machine
// Prepare symbols:
[L, R, halt, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, B, w, m, n] =
    ["L", "R", "halt", "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "B", "w", "m", "n"];

var tm = function (
    script,
    tape,
    limit, // allowed amount of steps/ticks
    q = q0, // inner/tail state
    p = 0 // space/head state
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
        if (limit && step > limit) { tape.limit = true; break }
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
// var tape = [0,1];
// for(let i = 0; i<4;i++){
// tape = tm("increment", tape);
// console.log("out:", ...tape)
// }
//-------------------------------
// var tape = [0,1,B,0,1];
// tape = tm("sum", tape, tape.length);
// console.log("out:", ...tape, "limit = ",tape.limit)
// Task: describe drift-machine from halt-problem point of view

// var tape = [0,1]; // no halt
// //var tape = [0]; // stops at 5
// var tape = [1,0]; // stops at 6
var tape = [1,1,1]; // unstops
var tape = [1,0,0,1]; // unstop
var tape = [1,0,1]; // stops at 4
var tape = [1,0,0,0,1]; // stops at 8
var tape = [1,0,0,0,0,1]; // unstop
var tape = [1]; // stop at 5
var tape = [1,1]; // unstop
var tape = [1,0,0,0,0,0,1]; // stop 12
var tape = [1,0,0,1,0,0,1]; // unstop
var tape = [1,0,0,0,0,0,0,0,0,0,0,0,1]; // stop
var tape = [1,0,0,0,0,0,0,1,0,0,0,0,1]; // unstop
var tape = [1,0,0,0,0,0,1,1,0,0,0,0,1]; // stop

tape = tm("drift", tape,60);
console.log("out:", ...tape, "limit = ",tape.limit)