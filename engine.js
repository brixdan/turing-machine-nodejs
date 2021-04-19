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
        if (v) console.log(`${name}: step ${step}:`, ...tape.slice(0, p), tape[p] + '\'' + tape.slice(p + 1), q);
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
// Task: describe grow-machine from halt-problem point of view

// var tape = [0,1]; // stop at 3
// //var tape = [0]; // stops at 5
// var tape = [1,0]; // stops at 6
// var tape = [1,1,1]; // unstops
// var tape = [1,0,0,1]; // unstop
// var tape = [1,0,1]; // stops at 4
// var tape = [1,0,0,0,1]; // stops at 8
// var tape = [1,0,0,0,0,1]; // unstop
// var tape = [1]; // stop at 5
// var tape = [1,1]; // unstop
// var tape = [1,0,0,0,0,0,1]; // stop 12
// var tape = [1,0,0,1,0,0,1]; // unstop
// var tape = [1,0,0,0,0,0,0,0,0,0,0,0,1]; // stop
// var tape = [1,0,0,0,0,0,0,1,0,0,0,0,1]; // unstop
// var tape = [1,0,0,0,0,0,1,1,0,0,0,0,1]; // unstop
// var tape = [0,0,0,0,0,0,0,0,0,0,1]; // unstop
// tape = tm("grow", tape,60);
// console.log("out:", ...tape, "limit = ",tape.limit)
//----------------- Drift -------------
// var tape = [1,0,1,1,0];
// tape = tm("drift", tape);
// console.log("out:", ...tape, "limit = ", tape.limit)
// --------------------------------
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
//-------------------------------
// Допустим существует алгоритм, как угодно много состояний, который может лишь "поглядев"
// на число, сказать кончит на нём или нет. Тогда можно предположть, что он будет идти
// только вперёд и проходить каждый бит.
// Идея - такого не может быть. Возьмем первое совпадение состояний на конце супербольшого
// числа. Допустим что grow даёт одинаковый на них результат ибо если разный, то умник-то
// в одном состоянии при одном входе должен дать одно и то же. Однако мы можем "вырастить"
// оба числа так, что они разойдуться. Пример: ускользает пока
var tape1 = [1,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,0,0,0]; // initial совпадение stop
var tape2 = [1,0,1,1,0,0,1]; //

tape1 = [1,0,0,0,0,0,0]; // initial совпадение stop
tape2 = [1,0,0,0,0,0,1]; // ускользает

tape = tm("grow", tape1,60,q0,0,false);
console.log("out1:", ...tape1, "limit = ",tape1.limit)
tape = tm("grow", tape2,60,q0,0,false);
console.log("out1:", ...tape2, "limit = ",tape2.limit)
