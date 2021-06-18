const { tm, tmg } = require("../../engine");

// pop from Set
function pop(s) {
  if (s.size === 0) return null;
  let value = s.values().next().value;
  s.delete(value);
  return value;
}

let tape;
let script = require("../../TMs/" + "rgrow");

let res = {};
// let it = tmg({script:"rgrow",tape:[1,0,1,1,0,1,1,0,1,0,1,1,1,0,1] , p:0, q:q0});
let it = tmg({ script: "rgrow", tape: [1, 0, 1], p: 0, q: q0 });
// let it = tmg({script:"rgrow",tape:[1,0,1,1,0,1,1,0,1,1,0,1,1,0,1] , p:0, q:q0});
for (let i = 0; i < 40000; i++) {
  let t = it.next();
  //console.log(i,t);
  // if (t.value.p === 3) console.log(i,t.value.q);
  console.log(i, t.value.tape.toLeftString(1000));
  if (t.done) {
    console.log(i, t);
    break;
  }
}

// ---------------------------------
function manySteps(d, i = 0, limit = 5) {
  if (i >= limit) return d;
  i++;
  let t = step(d);
  // some check

  return manySteps(t, i, limit);
}

// -------------------------------------------
function checkStep(d) {
  let t = step(d);
  if (t.p > d.tape.length) return "Goes out right"; // one to the right OK
  if (t.p <= -1) return "Goes out left";
  return t;
}
// let t = checkStep(x);
// console.log("tape = ",t.tape, " p = ", t.p, " q = ", t.q, "x = ", x);

function checkMany(or, d = or, i = 0, limit = 200) {
  if (typeof d === "string" || i >= limit) return d + " i = " + i;
  i++;
  let t = checkStep(d);
  // some check
  if (or.p === 0 && t.p === d.tape.length) {
    if (checkStep(or).q === t.q) return t;
    else
      t = "tape = " + t.tape + " " + " p = " + t.p + " " + t.q + "  = " + or.q;
  }

  return checkMany(or, t, i, limit);
}
//----------------------------------------
let s = new Set();
let f = new Set();
x = { tape: [0, 0, 0], p: 0, q: q0 };
s.add(x.tape.join(""));
function checkInterval(q, s, f, i = 0, limit = 200) {
  let str;
  let ar;
  let x;
  let r;
  while (s.size !== 0) {
    str = pop(s);
    console.log("str = ", str, " s.size = ", s.size, " f.size = ", f.size);
    ar = Array.prototype.map.call(str, (e) => Number(e));
    x = { tape: ar, p: 0, q };
    r = checkMany(x);
    console.log("1) r = ", r);
    if (typeof r === "string") {
      return r;
    }
    f.add(str);
    r = r.tape.join("");
    if (!f.has(r)) s.add(r);
  }
  return f;
}
//console.log(checkInterval(q0,s,f));

//-----------------------------
let temp = [0];
s = new Set();
s.add(x.tape.join(""));
(function () {
  let i = 0;
  let res;
  let tt = new Set();
  while (i < 100) {
    i++;
    let tape = [...temp];
    f = new Set();
    s = new Set();
    s.add(tape.join(""));
    res = checkInterval(q1, s, f);
    console.log("rgrowim res = ", res);
    if (res) tt.add(res);
    if (temp.length === 0) temp = [0];
    // temp = temp.concat(ruler);
    else tm("increment", temp, 100, q0, 0, false);
    // temp.push(Math.floor(Math.random() * 2));
  }
  console.log("result:", tt);
});
