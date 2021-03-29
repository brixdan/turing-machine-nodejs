// Cloning is basic and simple: just one state identical operation on another type.
// But here's is also implementation on classic one type machine.
// Same tape requires additional though technical states, even for zeros, odd for ones
const program = {
    q0: {
        0: {w:B,m:R,n:q2}, // branch through ones and zeros
        1: {w:B,m:R,n:q1},
        B: {w:B,m:0,n:halt}
    },
    q1: {
        0: {w:0,m:R,n:q1}, // to skip separation B symbol
        1: {w:1,m:R,n:q1},
        B: {w:B,m:R,n:q3}
    },
    q3: {
        0: {w:0,m:R,n:q3},
        1: {w:1,m:R,n:q3},
        B: {w:1,m:L,n:q5}  // turn back for ones
    },
    q5: {
        0: {w:0,m:L,n:q5},
        1: {w:1,m:L,n:q5},
        B: {w:B,m:L,n:q7}
    },
    q7: {
        0: {w:0,m:L,n:q7},
        1: {w:1,m:L,n:q7},
        B: {w:1,m:R,n:q0}
    },
    q2: {
        0: {w:0,m:R,n:q2}, // skip first B
        1: {w:1,m:R,n:q2},
        B: {w:B,m:R,n:q4}
    },
    q4: {
        0: {w:0,m:R,n:q4},
        1: {w:1,m:R,n:q4},
        B: {w:0,m:L,n:q6} // turn around
    },
    q6: {
        0: {w:0,m:L,n:q6},
        1: {w:1,m:L,n:q6},
        B: {w:B,m:L,n:q8}
    },
    q8: {
        0: {w:0,m:L,n:q8},
        1: {w:1,m:L,n:q8},
        B: {w:0,m:R,n:q0}
    },
}
module.exports = program;