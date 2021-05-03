const { tm } = require('../../engine')
var tape;
(function () {
    tape = [1,1,1] // infinity
    let step = tm("grow", tape, 100, q0, 0, true);
    console.log("step = ", step);
});
(function () {
    tape = [0,0,0] // @6
    let step = tm("grow", tape, 100, q0, 0, true);
    console.log("step = ", step);
});
(function () {
    tape = [0,0] // Problem!!!
    tape = [0,1,1,0,0,0,0,0,0,1,0,0,0,1,1,0,1,1,0,1,1,1,1,0,1,0,1,1,0,0,1,1,0,1,0,1,0,1,0,0,1,1,0,1,1,1,1,0,0,1,1,1,1,1,0,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1]
    // 'infinity  stop',

    let step = tm("grow", tape, 500, q1, 1, true);
    console.log("step = ", step);
})();