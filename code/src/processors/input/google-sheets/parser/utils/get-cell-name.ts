/**
 * convert number to excel-style column name
 *
 * @param inputNumber - number that need to convert
 * @return column - name of column in excel-style
 */
const numberToColumnName = (inputNumber: number): string => {
  let output: string = '';

  while (inputNumber > 0) {
    const rest: number = (inputNumber - 1) % 26;

    output = String.fromCharCode(65 + rest) + output;

    inputNumber = Math.floor((inputNumber - rest) / 26);
  }

  return output;
};

/**
 * convert col number and row number to excel-style cell name
 *
 * @param col - column number
 * @param row - row number
 * @return column - excel-style cell name
 */
export default (col: number, row: number): string => `${numberToColumnName(col)}${row}`;
