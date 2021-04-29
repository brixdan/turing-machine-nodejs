const { tm } = require('../../engine')
const { resolver } = require('./resolver.grow')
let res = {};
let tape = [0];
let temp = [0];

(function () {
    let s = '';
    for (let i = 0; i < 100; i++) {
        s = temp.toString()
        tape = [...temp];
        tape1 = [...temp];
        let total = tm("grow", tape, 100, q0, 0, false);
        res[s] = total + "  " + resolver(tape1, 0, q0);
        tm("increment", temp, 1000,q0,0,false);
    }
    console.log("result:", res);
})()
