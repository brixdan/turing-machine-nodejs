const { tm, tmg } = require('../../engine');
const fs = require('fs');
let tape;
function toFile(path,data) {
    try {
        fs.writeFileSync(path, data)
    } catch (err) {
        console.error(err)
    }
}
+function () {
    temp = [];
    for (let i = 0; i < 104; i++) {
        temp = temp.concat([1,0,1]);
        tape = i === 100? [...temp,...[0,0]]:[...temp];
        let step = tm("rgrowim", tape, 1000, q0, 0, i=== 103? true:false);
        console.log(i + "] step = ", step);
    }
};
+function () {
    tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    tape =     [1,1,0,0,0,0,0,1,1]
    let step = tm("rgrowim", tape, 55000, q0, 0, false);
    console.log(" step = ", step, typeof tape);
};


+function visual () {
    tape = [1,1,0,0,0,0,0,1,1]//rgrow: infinite
    tape = [0,0,0,1]//rgrow: halt@46
    //tape = [1,0,1,1,0,1,1,0,1]//rgrow: stop at step 23595:
    //tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    let l = tape.length;
    // let d = { script: "rgrow", tape, p: 0, q: q0 };
    let d = { script: "rgrowim", tape, p: 0, q: q0 };
    let it = tmg(d);
    var memo = {}, step = 0;
    memo[d.p] = d.q;
    var html = '<link href="index.css" rel="stylesheet">' +
        '<div align="center"><table><th>Negative</th>' +
        '<td>Original</td><td>Positive</td><tbody>'
    const limit = 200;
    const infin = 20;
    while(step < infin) {
        let d = it.next().value;
        memo[d.p] = d.q;
        let str = '<th>';
        let t = '';
        let color = '';
        for (let i = -limit; i < limit ; i++) {
            t = `${i === d.p?'<u>'+(d.tape[i]??'*')+'</u>':d.tape[i]??''}`
            let temp = {};
            temp[q0] ='<b0>' + t + '</b0>';
            temp[q1] ='<b1>' + t + '</b1>';
            temp[q2] ='<b2>' + t + '</b2>';

            color = temp[memo[i]]||'<b>' + t + '</b>';
            str += (d.tape[i] !== undefined||i===d.p)? color:'';
            if (i === -1) str += '</th><td>'
            if (i === l-1) str += '</td><td>'
        }
        str += '</td>'
        html += '<tr>' + str + '</tr>'
        if (d.q === 'halt') {
            break;
        }
        step++;
    }
    html +=`</tbody></table>

            step = ${step}</div>`
    toFile("../../_html/index.html",html);
    console.log(html)
    console.log("step = ", step === infin?'infinity':step)
}();

+function enumerate () {
    let s = '';
    let t = 0;
    let temp = [0];
    let res = {}
    while (t < 100) {
        s = temp.toString()
        tape = [...temp];
        let total = tm("rgrowim", tape, 500, q0, 0, false);
        res[s] = total;
        tm("increment", temp, 1000,q0,0,false);
        t++;
    }
    console.log("result:", res);
};
// Conclusion: impossible to make a serious halt problem if TM doesn't change the very tape itself!
// Switching directions and states is not enough for creativity
// Immutability of tape is very strong enemy of creativity!