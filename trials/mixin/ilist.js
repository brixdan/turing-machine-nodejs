const { tm } = require('../../engine')
let res = {};
let tape = [0];
let temp = [0];

(function () {
    tape = [1, B, 0, B, 1] // stops at 23
    let step = tm("mixin", tape, 100, q0, 0, true);
    console.log("step = ", step);
});
(function () {
    let s = '';
    for (let i = 0; i < 300; i++) {
        s = temp.toString()
        tape = [...temp];
        let total = tm("mixin", tape, 50, q0, 0, false);
        res[s] = total;
        tm("increment", temp, 1000,q0,0,false);
    }
    console.log("result:", res);
})()

// tape =[1,1,0,1,0,1] // 8?18
// tape =[1,1,1,1,1] // 8?18
// //
// tm("mixin", tape,100,q0,0,true);
//console.log(tape)