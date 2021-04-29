const {tm} = require('../../engine')
var tape;
// (function () {
//     tape = [1,0,0,1] //
//     let step = tm("grow", tape, 100, q0, 0, true);
//     console.log("step = ", step);
// });
tape = [1,0,0,1] // infinity
function resolve(tape, p, q) {
    let stop = "stop";
    if ((p > 1) && (tape[p] === undefined)) {
        if (q === q0) {
            switch (tape[p - 2] + "" + tape[p - 1]) {
                case "00":
                    stop = "infinity" // check
                    break;
                case "10":
                    stop = "stop" // check
                    break;
                case "01":
                    stop = "infinity" // check
                    break;
                case "11":
                    stop = "infinity"
                    break;
            }
        }
        if (q === q1) {
            stop = "stop"
        }
    }
    if (tape[p] === undefined)
        return stop;
    switch (q) {
        case q0:
            switch (tape[p]) {
                case 0:
                    q = q1;
                    tape[p] = 1;
                    break;
                case 1:
                    q = q0;
                    tape[p] = 0;
                    break
            }
            ;
            break;
        case q1:
            switch (tape[p]) {
                case 0:
                    q = q0;
                    tape[p] = 1;
                    break;
                case 1:
                    q = q1;
                    tape[p] = 1;
                    break
            }
            ;
            break;
    }
    console.log("tape = " + tape, "p = ", ++p, "q = ", q)
    return resolve(tape, p, q);
}

let res = resolve(tape, 0, q0)

//    let step = tm("grow", tape, 100, q0, 0, true);
console.log("res = ", res, "tape = ", tape);

