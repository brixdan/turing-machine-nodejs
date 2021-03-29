// two binaries left to right separated by one Blank, result in second
// first decrement first num then increment second do while zero to decrement
const program = {
    q0: {
        0: {w:1,m:R,n:q0},
        1: {w:0,m:R,n:q10},
        B: {w:B,m:0,n:q1}
    },
    q1: {
        0: {w:0,m:R,n:q1},
        1: {w:0,m:R,n:q1},
        B: {w:B,m:0,n:halt}
    },
    q10: {
        0: {w:0,m:R,n:q10},  // first go to second
        1: {w:1,m:R,n:q10},
        B: {w:B,m:R,n:q11}
    },
    q11: {
        0: {w:1,m:0,n:q0},    // return to start of cycle
        1: {w:0,m:R,n:q11},
        B: {w:1,m:0,n:q0}     // return to start of cycle
    },
}
module.exports = program;
