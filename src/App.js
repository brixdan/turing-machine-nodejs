import React from "react";
import { VariableSizeGrid as Grid } from "react-window";
import "./styles.css";
const { tmg } = require('./engine');

function visual () {
    let data = [];
    let tape = [1,1,0,0,0,0,0,1,1]//rgrow: infinite
    tape = [1,0,1]//rgrow: halt@46
    tape = [1,0,1,1,0,1,1,0,1,0,1,1,1,0,1]//rgrow: stop at step 23595:
    let l = tape.length;
    let d = { script: "rgrow", tape, p: 0, q: 'q0' };
    let it = tmg(d);
    var memo = {}, step = 0;
    memo[d.p] = d.q;
    var html = '';
    const limit = 200;
    const infin = 30000;
    while(step < infin) {
        data[step] = [];
        let d = it.next().value;
        memo[d.p] = d.q;
        let str = '';
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
            if (i === -1) {
                data[step][1] = str; str = '';
            }
            if (i === l-1) {
                data[step][2] = str; str = '';
            }
        }
        data[step][3] = str;
        if (d.q === 'halt') {
            break;
        }
        step++;
    }
    return data;
}
let data = visual();
// These cell sizes are arbitrary.
// Yours should be based on the content of the cell.
// const columnWidths = new Array(1000)
//     .fill(true)
//     // .map(() => 75 + Math.round(Math.random() * 50));
const columnWidths = (index) => {
    return index === 0?20:index === 2?data[1][2].length*0.80:index === 1? 1100:100;
}
const rowHeights = new Array(30000)
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
    dangerouslySetInnerHTML={{ __html: columnIndex === 0?rowIndex:
            columnIndex === 1?data[rowIndex][1]:columnIndex === 2?
            data[rowIndex][2]:columnIndex === 3?data[rowIndex][3]:''}}
  />
);

const App = () => (
    <div className="wrapper">

    <Grid
      className="Grid"
      columnCount={4}
      columnWidth={(index) => columnWidths(index)}
      height={800}
      rowCount={data.length}
      rowHeight={(index) => rowHeights[index]}
      width={1300}
    >
      {Cell}
    </Grid>
  </div>
);

export default App;
