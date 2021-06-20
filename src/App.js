import React from "react";
import { VariableSizeGrid as Grid } from "react-window";

import "./styles.css";

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
  >
      { columnIndex === 0?rowIndex: 'r'+rowIndex}
      { columnIndex === 0?'' : 'c'+columnIndex}
  </div>
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
