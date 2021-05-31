const { tm } = require('../../engine')
// Only work with strings

function compare(seed,seed1,L = 100) {
    let temp = [0];
    let res = {};
    let total = 0;
    let total1 = 0;
    let i = 0;
    while ( i < L) {
        let tape = [...seed.concat(temp)];
        let tape1 = [...seed1.concat(temp)];
        total = tm("rgrow", tape, L*3, q0, 0, false);
        total1 = tm("rgrow", tape1, L*3, q0, 0, false);
        i++;
        if (typeof total !== typeof total1) {
            res[i] = [...seed.concat(temp)] + "  " + [...seed1.concat(temp)] + "  " + total + "  " + total1;
            break;
        }
        tm("increment", temp, L, q0,0,false);
    }
    return Object.keys(res).length;
}
let seed = Array(1).fill([1,0,1]).flat(); // +
let seed1 = seed.concat([]); // both stop by eventually diverge
// console.log(compare(seed,seed1));

function compareMany (arr = [[0]], nuvo, L = 100) {
    for (let item of arr) {
        if (compare(item, nuvo, L) === 0) return item;
    }
    return 'OK';
}
// console.log(compareMany([[0], [1], [0,1], [1,0,1]], [1,0,1,1], 40));

function buildRow (arr = [[0]], L = 10) {
    let nuvo = [0], t;
    let i = 0;
    let res = {}
    while ( i < L ) {
        //if (temp.length > 3) break;
        i++;
        tm("increment", nuvo, 500,q0,0,false);
        if (nuvo in arr) continue;
        t = compareMany(arr, nuvo);
        res[i] = "nuvo = " + nuvo + " t = " + t + " temp = " + temp + " arr = " + arr;
        if (t === 'string') arr.push(nuvo);


    };
    return res;
}

// console.log(buildRow([[1]],5));
// console.log([1].toLeftString());
