// past revisiting grow

const program = {
    q0: {
        0: {w:0,m:R,n:q1},
        1: {w:1,m:R,n:q0},
        B: {w:1,m:L,n:q1} // revisit start
    },
    q1: {
        0: {w:1,m:R,n:q2},
        1: {w:0,m:R,n:q0},
        B: {w:B,m:R,n:halt}
    },
    q2: {
        0: {w:1,m:L,n:q2},
        1: {w:0,m:L,n:q2},
        B: {w:0,m:R,n:q1}
    },
}
module.exports = program;
// Oscillates well over some special seeds, not all