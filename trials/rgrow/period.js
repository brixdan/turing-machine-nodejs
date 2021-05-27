const { tm } = require('../../engine')

// pop from Set
function pop(s) {
    if (s.size === 0) return null;
    let value = s.values().next().value;
    s.delete(value);
    return value;
}

let tape;
(function () {
    tape = [1,1,0,1] // infinity
    tape = [0,0,0,1] // infinity

    // tape = [1,1,1] // stop 4
    // tape = [1,1,0] // infinity
    // tape = [0,1,1,0];
    // tape[-1] = 0;
    tape = [1,0,1].concat([1,0,1]).concat([1,0,1]).concat([1,0,1]).concat([1,0,1]); ; //78

    let step = tm("rgrow", tape, 500, q0, 0, true);
    console.log("step = ", step);
});
let script = require("../../TMs/" + "rgrow");
function step(d) {
    let tape = [...d.tape]; p = d.p; q = d.q; // don't change income!!!
    with (script[q][tape[p] ?? "B"]) {
        tape[p] = w
        q = n
        switch (m) {        // move to next p-position
            case L:
                p = p - 1;
                break;
            case R:
                p = p + 1;
                break;
            default:
                p = m; // or jump -)
        }
        return {tape, p, q}
    }
}
let x = { tape:[1,0,1], p:0, q: q0 }
console.log(x.tape);
// let t = step(x);
function manySteps(d, i= 0, limit = 5) {
     if (i >= limit) return d;
     i++;
     let t = step(d);
    // some check

    return manySteps(t, i, limit);
}

// -------------------------------------------
function checkStep (d) {
    let t = step(d);
    if (d.tape.length !== t.tape.length) return "Goes out right";
    if (t.tape.p === -1) return "Goes out left";
    return t;
}
// let t = checkStep(x);
// console.log("tape = ",t.tape, " p = ", t.p, " q = ", t.q, "x = ", x);

function checkMany(or, d = or, i= 0, limit = 20) {
    if ( typeof d === "string" || i >= limit) return d + " i = " + i;
    i++;
    let t = checkStep(d);
    // some check
    if (or.p === 0 && t.p === d.tape.length - 1) {
        if (or.q === t.q) return t; else return "tape = " + t.tape + " " +
            " p = " + t.p + " " + t.q + "  = " + or.q
    }
    if (or.p === d.tape.length - 1 && t.p === 0) {
        if (or.q === t.q) return t; else return "tape = " + t.tape + " " +
            " p = " + t.p + " " + t.q + "  = " + or.q
    }
    return checkMany(or, t, i, limit);
}
x = { tape:[1,0,1], p:2, q: q2 }
let r =  checkMany(x, d = x, i= 0, limit = 20);
console.log(r);
let s = new Set();
let f = new Set();
x = { tape:[1,0,1], p:0, q: q0 }
s.add(x.tape.join(''));
function checkInterval(s ,f ,i= 0, limit = 20) {
    let str;
    while (s.size !== 0) {
        str = pop(s);
        console.log('str = ',str);


    }
}
checkInterval(s,f);