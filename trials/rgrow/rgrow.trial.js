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
    // '101111100111': 758,
    // '383': '1,1,1,0,1,1,1,1,1,1,0,1  0,0,0,1,0,1,1,1,1,1,1,0,1  2861  infinity'
    let str = '101111100111';
    let tape = [1,1,1,0,1,1,1,1,1,1,0,1]; //12 znakov = 4000 des 2861/12 = 238 !!!!
    tape = [0,1,0,1,0,0,0,1,1,1,1,1,0,1]; // infinity?? NO!!! 14 digits
    // rgrow: step 3165: 0 1 1 1 1 0 0 1 1 1 1 1 0 0 1 0 B total: 3165
    str = '111010000101';// '111010000101': 163
    tape = str.toArray();
    let step = tm("rgrow", tape, 5500, q0, 0, true);
    console.log(" step = ", step, typeof tape);

})();