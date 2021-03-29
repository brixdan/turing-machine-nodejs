// increment by 1 left to right number, in fact simply change of bits

const program = {
    q0: {
        0: {w:1,m:0,n:halt},
        1: {w:0,m:R,n:q0},
        B: {w:1,m:0,n:halt}
    },
}
module.exports = program;
