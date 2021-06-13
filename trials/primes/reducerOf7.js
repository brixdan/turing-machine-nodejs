const { tm, tmg } = require("../../engine");
const p1000 = require("../../_data/primes/primes1000.json");

// Reducer for division by 7 doesn't even need to know current state
// of actual divisor TM, it just maintains a tail modulo 7 which is
// a easy job for TM and don't need overflow of memory
// Important notice!!! There is no stratagy other than this. No any
// formula to keep tails of any number if we want to extend for all
// devisors, not just 7!
function reducer(tape, p, tail = 0) {
  // if (p === 0) console.log("tape = " + tape, "p = ", p, "q = ", q)
  let stop = true;
  if (p > 1 && tape[p] === undefined) {
    return tail === 0;
  }
  if (tape[p] === 1) {
    tail = (tail + Math.pow(2, p)) % 7;
  }
  ++p;
  // console.log("tape = " + tape, "p = ", p, "q = ", q)
  return reducer(tape, p, tail);
}

exports.reducer = reducer;

let tape = [1, 1, 1]; // infinity
let num = 21;
tape = num.toTape();
let res = reducer(tape, 0);
console.log("res = ", res, "n%7 = " + (num % 7), " tape = ", tape);
console.log(+("0b" + tape.join("").reverse()));
console.log(+tape.join("").reverse());
// for (const re of p1000) {
//     tape = re.toTape();
//     res = reducer(tape, 0)
//     console.log("res = ", res, "re%7 = " + re%7);
// }
for (let i = 1; i < 100; i++) {
  tape = i.toTape();
  res = reducer(tape, 0);
  console.log("res = ", res, "re%7 = " + (i % 7));
}
