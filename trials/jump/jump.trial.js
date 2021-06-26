const { tm } = require('../../engine')
var tape;
(function () {
    tape = [1,0,1,1,0,1] // @step 15
    let step = tm("jump", tape, 500, q0, 0, true);
    console.log("step = ", step);
})();