const { tm } = require('../../engine')

var tape;
tape=[1,B,0,B,1] // stops at 23

// tape=[1,0,B,1] // non
// tape=[1,0,B,1,0] // non
// tape=[1,B,0,B,0] // non
// tape=[1,B,0,B,1] // 22

let step = tm("mixin", tape,22,q0,0,true);
console.log("step = ", step)