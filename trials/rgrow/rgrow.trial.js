const { tm, tmg } = require('../../engine');
let tape;

+function () {
    temp = [];
    for (let i = 0; i < 104; i++) {
        temp = temp.concat([1,0,1]);
        tape = i === 100? [...temp,...[0,0]]:[...temp];

    let step = tm("rgrow", tape, 1000, q0, 0, i=== 103? true:false);
    console.log(i + "] step = ", step);
    }
};
+function () {
    tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    let step = tm("rgrow", tape, 55000, q0, 0, false);
    console.log(" step = ", step, typeof tape);
}();