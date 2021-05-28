const { tm } = require('../../engine')
let tape;
(function () {
    tape = [1,1,0,1] // infinity
    tape = [0,0,0,1] // infinity

    // tape = [1,1,1] // stop 4
    // tape = [1,1,0] // infinity
    // tape = [0,1,1,0];
    // tape[-1] = 0;
    tape = [1,0,1].concat([1,0,1]).concat([1,0,1]).concat([1,0,1]).concat([1,0,1]); ; //78
    tape =  [ 0,1 ];
    let step = tm("rgrow", tape, 500, q0, 0);
    console.log("step = ", step);
})();