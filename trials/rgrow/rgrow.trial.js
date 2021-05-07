const { tm } = require('../../engine')
let tape;
(function () {
    tape = [1,1,0] // infinity
    // tape = [1,1,1] // stop 4
    // tape = [1,1,0] // infinity

    let step = tm("rgrow", tape, 500, q0, 0, true);
    console.log("step = ", step);
})();