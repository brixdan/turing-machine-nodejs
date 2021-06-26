const { tm, tmg } = require("../../engine");
const p1000 = require("../../_data/primes/primes1000.json");

// Reducer for division by 3 is a true algorithm, because it uses only one pure helper function and one
// limited cell of randomly accessible/R&W memory
// Using tape as right growing decimal
let memory = 0; // Cannot be greater than 2
function helper(a,b) { //Pure function, limited by constant in every aspect
    return (a + b) % 3;
}
function reducer(tape, p = 0) {
    if (tape[p] === undefined) {
        return memory === 0;
    }
        memory = helper(memory, tape[p]);
    ++p;
     return reducer(tape, p);
}

exports.reducer = reducer;

// let tape = [2,3,5,0,1];
// let num = +tape.join("").reverse()
// console.log("num",num);
// let res = reducer(tape, 0);
// console.log("res = ", res, "num % 3 = " + (num % 3), " tape = ", tape);
//console.log(+("0b" + tape.join("").reverse()));

for (let i = 1; i < 100; i++) {
    tape = i.toString(10).reverse().split('');
    memory = 0;
    res = reducer(tape, 0);
    console.log("res = ", res, "re%3 = " + (i % 3), ' tape = ',tape);
}
