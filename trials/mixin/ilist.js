const { tm } = require('../../engine')


let res = {}
let tape = [0]
let temp = [1,1,1]
// let s = '';
// for (let i = 0; i < 10; i++) {
//     tape = tm("increment", temp);
//     temp = [...tape];
//     tm("grow", tape,60);
//     s = temp.toString()
//     res[s] = tape.limit;
// }
// console.log("result:",res);

tape = tm("increment", temp);
console.log(tape)