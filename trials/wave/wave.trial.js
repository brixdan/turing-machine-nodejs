const { tm } = require('../../engine')
var tape;
(function () {
    tape = [1, 1] // @step 9
    let step = tm("wave", tape, 100, q0, 0, true);
    console.log("step = ", step);
})();