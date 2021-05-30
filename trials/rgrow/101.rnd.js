// [1,0,1] for rgrow TM research and development
const { tm } = require('../../engine');

(function () {
    let tape = [1,0,1,0,0,0];
    let res = {}
    let step = tm("rgrow", tape, 1000, q0, 0, true);
    res['A ' + step] = tape.toLeftString(10);
    console.log(tape);
    // tape = [0, 0, 1, 1, 0, 0, 0].left(3);
    step = tm("rgrow", tape, 300, q2, tape.length - 2, true);
    res['B ' + step] = tape.toLeftString();
    console.log(" res = ", res);

})();