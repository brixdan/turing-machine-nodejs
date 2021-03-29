// decrement by 1 left to right positive number (0 and negatives excluded)

const program = {
    q0: {
        0: {w:1,m:R,n:q0},
        1: {w:0,m:0,n:halt},
        B: {w:B,m:0,n:(x,y,z) => (fn) => (t = fn("const_0",x,y,z), t[halt] = true, t)}
    },
}
module.exports = program;
