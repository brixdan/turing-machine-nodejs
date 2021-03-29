// only doubles ones through zero
// practically same idea of one symbol transfer
var program = {
    q0: {
        1: {w:B,m:R,n:q1}
    },
    q1: {
        0: {w:0,m:R,n:q2},
        1: {w:1,m:R,n:q1},
        B: {w:0,m:R,n:q2}
    },
    q2: {
        1: {w:1,m:R,n:q2},
        B: {w:1,m:L,n:q3}
    },
    q3: {
        0: {w:0,m:L,n:q3},
        1: {w:1,m:L,n:q3},
        B: {w:1,m:R,n:q4}
    },
    q4: {
        0: {w:0,m:R,n:q5},
        1: {w:B,m:R,n:q1}
    }
};
module.exports = program;
