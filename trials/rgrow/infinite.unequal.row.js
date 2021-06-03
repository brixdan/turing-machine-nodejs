const { tm } = require('../../engine');
// Only deal with strings

let memo = {}; // to remember results

function compare(seed,seed1, depth, aheads) {
    let temp = [];
    let res = {};
    let total = 0;
    let total1 = 0;
    let i = 0;
    let cycles = aheads * Math.max(seed.length,seed1.length);

    while ( i < cycles) {
        let t = temp?seed.toArray().concat(temp):seed.toArray();
        let t1 = temp?seed1.toArray().concat(temp):seed1.toArray();

        let tape = [...t];
        total = (memo[tape.toLeftString()]) ??
        tm("rgrow", tape, depth * tape.length, q0, 0, false);
        memo[[...t].toLeftString()] = total;
        if (typeof total === 'number' && total > memo['champ'].steps) {
            memo['champ'].steps = total;
            memo['champ'].tape = t;
        }
        let tape1 = [...t1];
        total1 = (memo[tape1.toLeftString()]) ??
        tm("rgrow", tape1, depth * tape.length, q0, 0, false);
        memo[[...t1].toLeftString()] = total1;
        if (typeof total1 === 'number' && total1 > memo['champ'].steps) {
            memo['champ'].steps = total1;
            memo['champ'].tape = t1;
        }
        i++;
        if (typeof total !== typeof total1) {
            res[i] = [...t] + "  " + [...t1] + "  " + total + "  " + total1;
            break;
        }
        temp = temp ?? [0];
        tm("increment", temp, 100, q0,0,false);
    }
    console.log("res = ", res);
    return Object.keys(res).length;
}
// let seed = '0' // Array(1).fill([1,0,1]).flat(); // +
// let seed1 = "101"; // seed.concat([]); // both stop by eventually diverge
// console.log(compare(seed,seed1));

function compareMany (arr = ["0"], nuvo, depth, aheads) {
    for (let item of arr) {
        if (arr.indexOf(nuvo) > -1) return 0;
        if (compare(item, nuvo, depth, aheads) === 0) {
            return item;
        }
    }
    return 1;
}
// console.log(compareMany(["0", "1", "01", "101"], "101101", 40));

// Size is a gauge for lookup of a new candidates for divergent group.
// Some of them will not pass a test, so it must be about two times the desired
// size of a group
// Depth is a gauge for a number of steps, required to identify that process
// went into loop. Must depend on number size.
// Aheads is a gauge for a number of lookups in the future to identify
// divergency in the process of parallel growth. Fraction to number size.
function buildDivGroup (arr = ['0'], size = 10,
    depth = 500, aheads = 2 ) {
    let nuvo = [0], t, nuvoStr;
    let i = 0;
    let res = {}
    while ( i < size*2 ) {
        //if (temp.length > 3) break;
        i++;
        tm("increment", nuvo, 100,q0,0,false);
        nuvoStr = nuvo.toLeftString();
        if (nuvoStr in arr) continue;
        t = compareMany(arr, nuvoStr, depth, aheads);
        if (t === 1) {
            arr.push(nuvoStr);
        }
        else // nuvo fails, log the cause
        res[i] = "!!!Failed nuvo = " + nuvoStr + " caused by " + t;
    }
    console.log("buildDivGroup problems:", res);
    arr.push(memo['champ']);
    return [...arr];
}
//------------------------------------
try {
    memo = require("../../_data/base1_size10_depth200.json");
}
catch {
    memo = {}
}
memo['champ'] = memo['champ'] ?? {steps:0, tape:""};

let divGroup = buildDivGroup(['0', '1'],10, depth = 200, aheads = 10);// base1_l10.txt
let memoSorted = Object.keys(memo).sort(Array.compareTapes).map(val => val + ":" + memo[val]);
memo.storeData(memo,"../../_data/base1_size10_depth200.json");
memo.storeData(memoSorted,"../../_data/sorted-base1_size10_depth200.json");
divGroup['champ'] = memo['champ'];
memo.storeData(divGroup,"../../_data/divGroup-base1_size10_depth200.json");
console.log('champ = ',memo['champ'])

// console.log("Div group = ", divGroup, divGroup.length);

// Result: Array(30), starting of '101' for 5 minutes work:
arr =   ['101','1','01','11','001','011','111','1001','1101','0011','1011','1111',
        '10001','11001','00101','11101','11011','10111','11111','100001','110001',
        '101001','111001','000101','110101','101101','011101','111101','000011'];
        nuvo = '100011';