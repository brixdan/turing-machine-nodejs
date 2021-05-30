const { tm } = require('../../engine');
let tape;
(function () {
    tape = [1,1,0,1] // infinity
    tape = [0,0,0,1] // infinity

    // tape = [1,1,1] // stop 4
    // tape = [1,1,0] // infinity
    // tape = [0,1,1,0];
    // tape[-1] = 0;
    tape = [1,0,1].concat([1,0,1]).concat([1,0,1]).concat([1,0,1]).concat([1,0,1]); ; //78
    tape = [1,0,1];
    let step = tm("rgrow", tape, 1000, q0, 0);
    console.log("1) step = ", step);
});
(function () {
    temp = [];
    for (let i = 0; i < 104; i++) {
        temp = temp.concat([1,0,1]);
        tape = i === 100? [...temp,...[0,0]]:[...temp];

    let step = tm("rgrow", tape, 1000, q0, 0, i=== 103? true:false);
    console.log(i + "] step = ", step);
    }
});
(function () {
    let tape = [0, 0, 1, 1, 0, 0, 0].left(3);
        let step = tm("rgrow", tape, 1000, q0, 0, true);
        console.log(i + "] step = ", step);

})();