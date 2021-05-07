const { tm } = require('../../engine')
const { resolver } = require('../grow/resolver.grow')
let res = {};
let tape;
let ruler = [];

(function () {

    let t = 0;
    let i = 0;
    let tape1 =[0];
    let start = [1,1,0]
    let start1 = [0,0,1,0];
    ruler = [1,0,1,0,1,1,1,1,0,1,0,1,0,0,1,1,0,0,0,1,1,1] // oscillates halt result
    while ( t !== undefined && i < 100) {

        tape = [...start];
        tape1 = [...start1];
        let total = tm("rgrow", tape, 100, q0, 0, false);
        let total1 = tm("rgrow", tape1, 100, q0, 0, false);
        res[i++] = total + "  " + total1;
        // tm("increment", temp, 100,q0,0,false);
        // t++;
        //temp.push(Math.floor(Math.random() * 2));
        //t = ruler.shift()
        t = Math.floor(Math.random() * 2);
        start.push(t);
        start1.push(t);
    }
    console.log("result:", res);
})();