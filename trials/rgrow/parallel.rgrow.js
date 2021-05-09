const { tm } = require('../../engine')
let res = {};
let i = 0;
let temp =[];
let tape = []
let seed = [1,0,1]; // +
seed = [1,1]; // +
seed = [0,1,0,1,1,1,0,0,1];// +
let total = 0;

(function () {
    while ( i < 100) {

        tape = [...seed.concat(temp)];
        console.log("income tape = ", ...tape);
        total = tm("rgrow", tape, 300, q0, 0, true);
        res[i++] = [...seed.concat(temp)] + "  " + total;

        //temp.push(Math.floor(Math.random() * 2));
        // t = ruler.shift()
        //t = Math.floor(Math.random() * 2);
        // start.push(t);
        console.log("out tape = ", ...tape, "total = ", total)
        if (temp.length === 0) temp = [0]; else
           tm("increment", temp, 100,q0,0,false);
           // temp.push(Math.floor(Math.random() * 2));
    }
    console.log("result:", res);
})();