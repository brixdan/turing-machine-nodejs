const { tm } = require('../../engine')
const { resolver } = require('../grow/resolver.grow')
let res = {};
let tape = [0];
let temp = [0];

(function () {
    let s = '';
    for (let i = 0; i < 100; i++) {
        s = temp.toString()
        tape = [...temp];
        tape1 = [...temp];
        let total = tm("rgrow", tape, 100, q0, 0, false);
        res[s] = total + "  " + resolver(tape1, 0, q0);
        tm("increment", temp, 1000,q0,0,false);
    }
    console.log("result:", res);
});
(function () {
    let s = '';
    for (let i = 0; i < 100; i++) {
        s = temp.toString()
        tape = [...temp];
        tape1 = [...temp];
        let total = tm("rgrow", tape, 500, q0, 0, false);
        res[s] = total + "  " + resolver(tape1, 0, q0);
        tm("increment", temp, 1000,q0,0,false);
         //temp.push(Math.floor(Math.random() * 2));
    }
    console.log("result:", res);
})();