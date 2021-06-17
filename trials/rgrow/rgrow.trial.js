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
    tape = [1,0,1]//rgrow: stop at step 31
    tape = [1,0,1,1,0,1,1,0,1]//rgrow: stop at step 23595:
    tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    let l = tape.length;
    let d = { script: "rgrow", tape, p: 0, q: q0 };
    let it = tmg(d);
    var memo = {}, step = 0;
    memo[d.p] = d.q;
    var html = '<link href="index.css" rel="stylesheet">' +
        '<div align="center"><table><th align="right">Negative</th>' +
        '<td>Original</td><td>Positive</td><tbody>'
    const limit = 50
    while(true) {
        let d = it.next().value;
        memo[d.p] = d.q;
        let str = '<th>';
        let t = '';
        let color = '';
        for (let i = -limit; i < limit ; i++) {
            t = `${i === d.p?'<u>'+(d.tape[i]??'*')+'</u>':d.tape[i]??''}`
            color = memo[i] === q0? '<b0>' + t + '</b0>':
                    memo[i] === q1?'<b1>' + t + '</b1>':
                    memo[i] === q2?'<b2>' + t + '</b2>':
                                   '<b>' + t + '</b>';
            str += (d.tape[i] !== undefined||i===d.p)? color:' ';
            if (i === -1) str += '</th><td bgcolor="#f5f5f5">'
            if (i === l-1) str += '</td><td>'
        }
        str += '</td>'
        html += '<tr>' + str + '</tr>\n'
        if (d.q === 'halt') {
            html += `<tr><td></td><td>step = ${step}</td><td></td></tr>`;
            break;
        }
        step++;
    }
    html +='</tbody></table></div>'
    toFile("../../html/index.html",html);
    console.log(html)
    console.log("step = ", step)
}();