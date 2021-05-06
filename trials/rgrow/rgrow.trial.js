const { tm } = require('../../engine')
var tape;
(function () {
    tape = [1,1] //
    let step = tm("rgrow", tape, 100, q0, 0, true);
    console.log("step = ", step);
})();