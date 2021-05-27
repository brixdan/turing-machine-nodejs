const { tm } = require('../../engine')

// pop from Set
function pop(s) {
    if (s.size === 0) return null;
    let value = s.values().next().value;
    s.delete(value);
    return value;
}

let tape;
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
    if (t.p <= -1) return "Goes out left";
    return t;
}
// let t = checkStep(x);
// console.log("tape = ",t.tape, " p = ", t.p, " q = ", t.q, "x = ", x);

function checkMany(or, d = or, i= 0, limit = 200) {
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
//----------------------------------------
let s = new Set();
let f = new Set();
x = { tape:[1,0,0,1,1], p:0, q: q0 }
s.add(x.tape.join(''));
function checkInterval(q ,s ,f ,i= 0, limit = 200) {
    let str;
    let ar;
    let x;
    let r;
    while (s.size !== 0) {
        str = pop(s);
        console.log('str = ',str);
        ar = Array.prototype.map.call(str, e => Number(e));
        x = { tape:ar, p:0, q};
        r =  checkMany(x);
        console.log('1) r = ',r);
        if (typeof r === 'string') {
            x.p = ar.length - 1;
            r =  checkMany(x);
            if (typeof r === 'string') {
                console.log('2) r = ',r);
                return null;
             }
        }
        f.add(str);
        if (!f.has(r.join(''))) s.add(r.join(''));
    }
    return f;
}
console.log(checkInterval(q0,s,f));

