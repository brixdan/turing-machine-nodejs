const { tm } = require('../../engine')
let res = {};
let i = 0;
let temp =[];
let tape = []
let tape1 = []
let seed = [1,0,1]; // +
let total = 0;
let total1 = 0;
let ruler = [1,0,1]; // both stop by eventually diverge
let seed1 = seed.concat(ruler).concat(ruler); // both stop by eventually diverge

(function () {
    while ( i < 100) {

        tape = [...seed.concat(temp)];
        tape1 = [...seed1.concat(temp)];
        // console.log("income tape = ", ...tape);
        total = tm("rgrow", tape, 300, q0, 0, false);
        total1 = tm("rgrow", tape1, 300, q0, 0, false);
        //res[i++] = [...seed.concat(temp)] + "  " + total;
        res[i++] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;

        //temp.push(Math.floor(Math.random() * 2));
        // t = ruler.shift()
        //t = Math.floor(Math.random() * 2);
        // start.push(t);
        // console.log("out tape = ", ...tape, "total = ", total)
        if (temp.length === 0) temp = [0]; else
           // temp = temp.concat(ruler);
        tm("increment", temp, 100,q0,0,false);
           // temp.push(Math.floor(Math.random() * 2));
    }
    console.log("result:", res);
})();