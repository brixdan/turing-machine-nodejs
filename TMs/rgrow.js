// past revisiting grow

const program = {
    q0: {
        0: {w:0,m:R,n:q0},
        1: {w:1,m:R,n:q1},
        B: {w:0,m:L,n:q2} // revisit start
    },
    q1: {
        0: {w:0,m:R,n:q0},
        1: {w:1,m:R,n:q0},
        B: {w:B,m:R,n:halt}
    },
    q2: {
        0: {w:1,m:L,n:q2},
        1: {w:0,m:L,n:q2},
        B: {w:0,m:R,n:q0}
    },
}
module.exports = program;
// for [1,1] infinity in p=1 oscillates internaly
// switching q-s and input's. If resolver choice
// is q1/halt, next digit 0 gives infinity. If it's q0,
// next 1 will stop process at 4. Rule is capable to defy
// any resolvers choice.