const { tm } = require('../../engine')
// Only work with strings

function compare(seed,seed1,L = 100) {
    let temp = [0];
    let res = {};
    let total = 0;
    let total1 = 0;
    let i = 0;
    while ( i < L) {
        let tape = [...seed.toArray().concat(temp)];
        let tape1 = [...seed1.toArray().concat(temp)];
        total = tm("rgrow", tape, L*3, q0, 0, false);
        total1 = tm("rgrow", tape1, L*3, q0, 0, false);
        // console.log("i = " + i + " compare:total1 = " + total1);
        i++;
        if (typeof total !== typeof total1) {
            res[i] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;
            break;
        }
        tm("increment", temp, L, q0,0,false);
    }
    return Object.keys(res).length;
}
let seed = '0' // Array(1).fill([1,0,1]).flat(); // +
let seed1 = "101"; // seed.concat([]); // both stop by eventually diverge
// console.log(compare(seed,seed1));

function compareMany (arr = ["0"], nuvo, L = 100) {
    for (let item of arr) {
        if (arr.indexOf(nuvo) > -1) return 0;
        if (compare(item, nuvo, L*3) === 0) {
            console.log("compareMany: arr.length = " + arr.length + " nuvo = " + nuvo)
            return item;
        }
    }
    return 1;
}
// console.log(compareMany(["0", "1", "01", "101"], "101101", 40));

function buildRow (arr = ['0'], L = 10) {
    let nuvo = [0], t, nuvoStr;
    let i = 0;
    let res = {}
    while ( i < L ) {
        //if (temp.length > 3) break;
        i++;
        tm("increment", nuvo, 500,q0,0,false);
        nuvoStr = nuvo.toLeftString();
        if (nuvo in arr) continue;
        t = compareMany(arr, nuvoStr);
        if (t === 1) arr.push(nuvoStr);
        res[i] = "nuvoStr = " + nuvoStr + " t = " + t + " arr = " + arr;



    };
    return res;
}

console.log(buildRow(['101'],50));
// console.log([1].toLeftString());
