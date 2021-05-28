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
    while ( i < 300) {

        let tape = [...seed.concat(temp)];
        let tape1 = [...seed1.concat(temp)];
        total = tm("rgrow", tape, 300, q0, 0, false);
        total1 = tm("rgrow", tape1, 300, q0, 0, false);
        i++;
        if (typeof total !== typeof total1) {
            res[i] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;
            break;
        }
        tm("increment", temp, 300,q0,0,false);
    }
    return Object.keys(res).length;
}

// console.log(check(seed,seed1));


function checkMany (seed,seed1) {
    let tape = [...seed];
    let tape1 = [...seed1];
    while ( i < 100) {

        tape1 = [...tape1.concat(seed)]
        if (check(tape,tape1) === 0) return i + " tape = " + tape +
            " tape1 =  " + tape1;

    };
    return "All pass";
}
console.log(checkMany(seed,seed1));

(function () {
    while ( i < 100) {

        tape = [...seed.concat(temp)];
        tape1 = [...seed1.concat(temp)];
        // console.log("income tape = ", ...tape);
        total = tm("rgrow", tape, 300, q0, 0, false);
        total1 = tm("rgrow", tape1, 300, q0, 0, false);
        //res[i++] = [...seed.concat(temp)] + "  " + total;
        i++;
        if (typeof total !== typeof total1) {
            res[i] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;
            break;
        }
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
});