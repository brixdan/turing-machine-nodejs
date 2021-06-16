const { tm, tmg } = require('../../engine');
const fs = require('fs');
let tape;

+function () {
    temp = [];
    for (let i = 0; i < 104; i++) {
        temp = temp.concat([1,0,1]);
        tape = i === 100? [...temp,...[0,0]]:[...temp];
    let step = tm("rgrow", tape, 1000, q0, 0, i=== 103? true:false);
    console.log(i + "] step = ", step);
    }
};
+function () {
    tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    let step = tm("rgrow", tape, 55000, q0, 0, false);
    console.log(" step = ", step, typeof tape);
};
function toFile(path,data) {
    try {
        fs.writeFileSync(path, data)
    } catch (err) {
        console.error(err)
    }
}

+function () {
    tape = [1,0,1]//rgrow: stop at step 23595:
    let l = tape.length;
    let it = tmg({ script: "rgrow", tape, p: 0, q: q0 });
    var memo = {}, step = 0;
    memo[0] = tape[0]
    memo[1] = tape[1]
    memo[2] = tape[2]
    var html = '<div align="center"><table>'
    const limit = 5
    while(true) {
        let d = it.next().value;
        memo[d.p] = d.q;
        let str = '<td  align="right">';
        let t = '';
        for (let i = -limit; i < limit ; i++) {
            str += `${(i === d.p)?'<b>'+(d.tape[i]??'')+'</b>':d.tape[i]??''}`
            if (i === -1) str += '</td><td bgcolor="#f0ffff">'
            if (i === l-1) str += '</td><td>'
        }
        str += '</td>'
        html += '<tr>' + str + '</tr>\n'
        if (d.q === 'halt') break;
        step++;
    }
    html +='</table></div>'
    toFile("../../html/index.html",html);
    console.log(html)
}();