// move to the right

// jumps to new iteration
const program = {
    q0: {
        0: {w:1,m:R,n:q1},
        1: {w:0,m:R,n:q1},
        B: {w:1,m:0,n:q0}
    },
    q1: {
        0: {w:0,m:L,n:q0},
        1: {w:1,m:R,n:q0},
        B: {w:B,m:R,n:halt}
    },
}
module.exports = program;