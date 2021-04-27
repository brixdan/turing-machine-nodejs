const { tm } = require('../../engine')


// let res = {}
// let tape = [0]
// let temp = [0]
// let s = '';
// for (let i = 0; i < 50; i++) {
//     s = temp.toString()
//     tape = tm("increment", temp);
//     temp = [...tape];
//     tm("mixin", tape,300,q0,0,true);
//     res[s] = tape.step;
// }
// console.log("result:",res);

tape =[1,1,0,1,0,1] // 18
//
tape = tm("mixin", tape,100,q0,0,true);
console.log(tape)