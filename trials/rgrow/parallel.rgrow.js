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
let seed1 = seed.concat(ruler); // both stop by eventually diverge

function check(seed,seed1) {
    let temp = [0];
    let res = {};
    while ( i < 500) {

        let tape = [...seed.concat(temp)];
        let tape1 = [...seed1.concat(temp)];
        total = tm("rgrow", tape, 500, q0, 0, false);
        total1 = tm("rgrow", tape1, 500, q0, 0, false);
        i++;
        if (typeof total !== typeof total1) {
            res[i] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;
            break;
        }
        tm("increment", temp, 500,q0,0,false);
    }
    return Object.keys(res).length;
}

// console.log(check(seed,seed1));


function checkMany (seed) {
    let tape, tape1;
    let i = 0;
    let r,r1;
    while ( i < 100) {
        i++;
        r = Math.ceil(Math.random()*3) + 1;
        r1 = Math.ceil(Math.random()*3) + 1;
        if (r === r1) r1 + 2;
        r1 =  r + 2;
        console.log(' r = ', r,' r1 = ',r1)
        tape = Array(r).fill(seed).flat();
        tape1 = Array(r1).fill(seed).flat();
        if (check(tape,tape1) === 0) return i + "no diverse! for tape = " + tape +
            " tape1 =  " + tape1; else return i + "Diverse";

    }
    return "All pass";
}
//console.log(checkMany([1,0,1]));
seed = [0];
seed1 = [1];
(function () {
    temp = []
    while ( i < 1000) {

        tape = [...seed.concat(temp)];
        tape1 = [...seed1.concat(temp)];
        // console.log("income tape = ", ...tape);
        total = tm("rgrow", tape, 500, q0, 0, false);
        total1 = tm("rgrow", tape1, 500, q0, 0, false);
        //res[i++] = [...seed.concat(temp)] + "  " + total;
        if (typeof total !== typeof total1) {
            res[i] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;
            break;
        }
        i++;
        //temp.push(Math.floor(Math.random() * 2));
        // t = ruler.shift()
        //t = Math.floor(Math.random() * 2);
        // start.push(t);
        // console.log("out tape = ", ...tape, "total = ", total)
        if (temp.length === 0) temp = [0]; else
           // temp = temp.concat(ruler);
        tm("increment", temp, 1000,q0,0,false);
           // temp.push(Math.floor(Math.random() * 2));
    }
    console.log("result:", res);
})();