const { tm } = require('../../engine')
var tape;
(function () {
    tape = [0,0] // infinity
    let step = tm("grow", tape, 100, q0, 0, true);
    console.log("step = ", step);
})();
(function () {
    tape = [0,0,0] // @6
    let step = tm("grow", tape, 100, q0, 0, true);
    console.log("step = ", step);
});