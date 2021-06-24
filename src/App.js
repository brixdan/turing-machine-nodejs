import React from "react";
import { VariableSizeGrid as Grid } from "react-window";
//import { tmg } from './engine'
import "./styles.css";

const { tmg } = require('./engine');
function visual () {
    let tape = [1,1,0,0,0,0,0,1,1]//rgrow: infinite
    tape = [0,0,0,1]//rgrow: halt@46
    //tape = [1,0,1,1,0,1,1,0,1]//rgrow: stop at step 23595:
    //tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    let l = tape.length;
    // let d = { script: "rgrow", tape, p: 0, q: q0 };
    let d = { script: "rgrowim", tape, p: 0, q: 'q0' };
    let it = tmg(d);
    var memo = {}, step = 0;
    memo[d.p] = d.q;
    var html = '';
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
            temp['q0'] ='<b0>' + t + '</b0>';
            temp['q1'] ='<b1>' + t + '</b1>';
            temp['q2'] ='<b2>' + t + '</b2>';

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
    console.log(html)
    console.log("step = ", step === infin?'infinity':step)
}
visual();
// These cell sizes are arbitrary.
// Yours should be based on the content of the cell.
// const columnWidths = new Array(1000)
//     .fill(true)
//     // .map(() => 75 + Math.round(Math.random() * 50));
const columnWidths = (index) => {
    return index === 0?10:60*(index + 1);
}
const rowHeights = new Array(1000)
  .fill(true)
  .map(() => 14);

const Cell = ({ columnIndex, rowIndex, style }) => (
  <div
    className={
      "GridColumn" + columnIndex
        // : rowIndex % 2
        // ? "GridItemOdd"
        // : "GridItemEven"
    }
    style={style}
    dangerouslySetInnerHTML={{ __html: columnIndex === 0?rowIndex:'<b1>Why</b1>' }}
  ></div>
);

const App = () => (
    <div className="wrapper">
     <div align="center"><table><th>Negative</th>
       <td>Original</td><td>Positive</td></table>
    </div>
    <Grid
      className="Grid"
      columnCount={4}
      columnWidth={(index) => columnWidths(index)}
      height={400}
      rowCount={1000}
      rowHeight={(index) => rowHeights[index]}
      width={800}
    >
      {Cell}
    </Grid>
  </div>
);

export default App;
