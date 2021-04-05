// move to the right

// never halts
const program = {
    q0: {
        0: {w:B,m:R,n:q0},
        1: {w:1,m:R,n:q0},
        B: {w:0,m:L,n:q1}
    },
    q1: {
        0: {w:0,m:L,n:q1},
        1: {w:1,m:R,n:q1},
        B: {w:B,m:R,n:halt}
    },
}
module.exports = program;