// two binaries left to right separated by one Blank, result in second
// first decrement first num then increment second do while zero to decrement
const program = {
    q0: {
        0: {w:1,m:R,n:q0},
        1: {w:0,m:R,n:q2},
        B: {w:B,m:L,n:q1}
    },
    q1: {
        0: {w:0,m:L,n:q1},
        1: {w:0,m:L,n:q1},
        B: {w:B,m:0,n:halt}
    },
    q2: {
        0: {w:0,m:R,n:q2},  // go to second and call increment
        1: {w:1,m:R,n:q2},
        B: {w:B,m:R,n:(x,y,z) => (fn) => fn("increment",x,y,z)}
    },
}
module.exports = program;
