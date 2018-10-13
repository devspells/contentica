/**
 * check that sheet is end
 *
 * @param row - current row on worksheet
 * @param worksheet - current worksheet
 * @return boolean
 */
export default (row: number, worksheet: any): boolean => {
  if (!worksheet[`A${row}`] && !worksheet[`A${row + 1}`]) return true; // 2 lines in a row is empty

  return false; // sheet not end;
};
