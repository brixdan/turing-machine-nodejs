const { tm } = require('../../engine')
var tape;

(function () {
    tape = [1, B, 0, B, 1] // stops at 23
    let step = tm("mixin", tape, 100, q0, 0, true);
    console.log("step = ", step);
});

(function () {
    tape = [1,0,B,1] // non stop cycle at step 9
    let step = tm("mixin", tape, 100, q0, 0, true);
    console.log("step = ", step);
});
(function () {
    tape = [0,0,0,1] // stop in 12
    let step = tm("mixin", tape, 100, q0, 0, true);
    console.log("step = ", step);
});
(function () {
    tape = [0,0,0,0,0,1] // stop in 34 step interest!
    let step = tm("mixin", tape, 100, q0, 0, true);
    console.log("step = ", step);
})();