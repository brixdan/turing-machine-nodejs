// My compact Turing Machine
const colors = require('colors');
const fs = require('fs');
// Prepare symbols:
[L, R, halt, q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, B, w, m, n] =
    ["L", "R", "halt", "q0", "q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10", "q11", "B", "w", "m", "n"];

Array.prototype.left = function(n) {
    let r = [];
    for (i = 0; i < this.length; i++) {
        r[i - n] = this[i];
    }
    return r;
};
Array.prototype.toNumber = function toNumber() {
    return +("0b" + this.join('').reverse());
}
Number.prototype.isPrime = function isPrime() {
    if (isNaN(this) || !isFinite(this) || this%1 || this<2) return false;
    var m=Math.sqrt(this); //returns the square root of the passed value
    for (var i=2;i<=m;i++) if (this%i==0) return false;
    return true;
}
Number.prototype.binaryNext = function binaryNext() {
    return Math.pow(2,this.toString(2).length)
}
Number.prototype.toTape = function toTape() {
    return this.toString(2).reverse().split('').map(Number);
}
Number.prototype.increase = function* increase() {
    const str = this.toString(2).reverse();
    const bn = this.binaryNext();
    var i = 0;
    while(true) {
        // yield +('0b'+(str + i.toString(2).reverse()).reverse());
        // this version just to ensure compatibility with MT
        yield this + i*bn;
        i++;
    }
    return;
}
Array.prototype.toLeftString = function(n = 100) {
    let r = [];
    if ((this['-1'] === undefined || this[-1] ==='B')) return this.join('');
    for (i = 0; i < this.length + n + 1; i++) {
        if (i - n === 0) r[i] = '*';
        else if (i - n < 0) r[i] = this[i - n];
        else if (this[i - n - 1] !== 'B') r[i + 1] = this[i - n - 1];
    }
    return r.join('');
};

String.prototype.toArray = function toArray () {
    let r = [];
    if (this.indexOf('*') > -1) {
        for (let i = 0; i < this.length; i++)
            if (i - this.indexOf('*') < 0)  r[i - this.indexOf('*')] = Number(this[i]);
            else if (i - this.indexOf('*') > 0) r[i - this.indexOf('*') - 1] = Number(this[i]);
        return r;
    }
    return Array.prototype.map.call(this, e => Number(e));
}
String.prototype.reverse = function reverse () {
        return this.split("").reverse().join("");
}
Object.prototype.storeData = function storeData(data,path) {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}

Object.prototype.loadData = function loadData(path) {
    try {
        return fs.readFileSync(path, 'utf8')
    } catch (err) {
        console.error(err)
        return false
    }
}

Array.compareTapes = function compareTapes(x,y) {
    let t = x.length - y.length;
    if (t !== 0) return t; else
    if (x.length > 0) {
        t = x[x.length - 1] - y[y.length - 1];
        if (t !== 0) return t; else {
            x = x.slice(0, x.length - 1);
            y = y.slice(0, y.length - 1);
            return compareTapes(x, y)
        }
    }
    return 0;
}

const tm = function (
    script,
    tape,
    limit = 200, // allowed amount of steps/ticks
    q = q0, // inner/tail state
    p = 0, // space/head state
    v = true // vebose
) {
    let step = 0;
    let name = '';
    tape = (typeof tape === 'string')? tape.toArray():tape;

    if (typeof script === "string") (name = script, script = require("./TMs/" + script));

    while ((step < limit) && (q in script || typeof q === "function")) {
        if (typeof q === "function") {
            tape = q(tape, q0, p)(tm);
            if (tape.halt) break;
            q = q0;
            p = 0; // resume initial process
        }
        with (script[q][tape[p] ?? "B"]) {
            tape.step = step + 1;
            let str = [...show(tape, p)].join(' ');
            if (v) console.log(`${name}:`,`step ${step}:`.padEnd(10," "), str, q, w, m, n);
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
        }
        step++
    }
    const total = `${tape.step >= limit?"infinity".red.bold:tape.step}`;
    if (v) console.log(`${name}: step ${tape.step}:`, ...tape,  "total: " + total);
    return tape.step >= limit?"infinity":tape.step;
}

function show(ar, p, shift = 20) {
    if (p === undefined) {
        console.log(`Position undefined`.red.bold);
        return;
    } else {
        p = p + shift
    }
    let out = []
    for (let i = 0; i < 2 * shift; i++) {
        out[i] = ar[i - shift] ?? '_';
    }
    out = [...out.slice(0, p), `${out[p]}`.red.bold, ...out.slice(p + 1)]
    out = [...out.slice(0, shift), `${out[shift]}`.green.bold, ...out.slice(shift + 1)]

    return out
}

module.exports.tm = tm;

module.exports.tmg = function* tmg(d = {script:"", tape:[0], p:0, q: q0 }) {
    // assert incoming data
    // data = {script:string, tape:array, p:number, q: string }
    function assertType(d) {
        return (typeof d === 'object' &&
            typeof d.script === 'string' &&
            Array.isArray(d.tape) &&
            typeof d.p === 'number' &&
            typeof d.q === 'string');
    }
    if (!assertType(d)) return new Error("TMG type invalid");
    let script = require("./TMs/" + d.script);
    function step(d) {
        let tape = Object.assign([], d.tape); p = d.p; q = d.q; // don't change income!!!
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
    let _d = {}; _d.tape = Object.assign([], d.tape);  _d.p = d.p; _d.q = d.q;
    while (_d.q !== 'halt') {
        yield _d;
        _d = step(_d);
    }
    return _d;
}




