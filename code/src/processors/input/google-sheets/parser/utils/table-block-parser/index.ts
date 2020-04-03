import { ITableBlockParserFacade, ITableBlockParserResult } from './interfaces';

import getCellName from './../get-cell-name';

const columnNameToNumber = (name: string): number => {
  // if its already number
  if (parseInt(name)) return +name; 

  const digits = name.toUpperCase().split('');
  let columnNumber = 0;

  for (let i = 0; i < digits.length; i++) {
    columnNumber += (digits[i].charCodeAt(0) - 64) * Math.pow(26, digits.length - i - 1);
  }

  return columnNumber;
};

const getEndTableColumn = (row: number, startCol: number, worksheet: any): number => {
  let col: any = null;
  let endCol: number = startCol - 1;

  do col = worksheet[getCellName(++endCol, row)];
  while (col);

  return --endCol;
};

const generateTableKeysHash = (row: number, startCol: number, endCol: number, worksheet: any): any => {
  const hash = {};

  for (let i = startCol; i <= endCol; i++) hash[i] = worksheet[getCellName(i, row)].v;

  return hash;
};

/**
 * parse table block
 */
export default (facade: ITableBlockParserFacade): ITableBlockParserResult => {
  const NAME_COL = 1;
  const TYPE_COL = 3;
  const START_COLUMN_COL = 4;
  const parsedData = [];

  let currentRow = facade.currentRow + 2;

  const tableName = facade.worksheet[getCellName(NAME_COL, currentRow)];
  const tableType = facade.worksheet[getCellName(TYPE_COL, currentRow)];
  const startTableColumn = facade.worksheet[getCellName(START_COLUMN_COL, currentRow)];

  if (!tableName) throw new Error('please set table name');
  if (!tableType || tableType.v !== 'basic') throw new Error('unknown table type');
  if (!startTableColumn) throw new Error('please set starting column for table');

  currentRow--;

  const startTableColumnNumber = columnNameToNumber(startTableColumn.v);
  const endTableColumnNumber = getEndTableColumn(currentRow, startTableColumnNumber, facade.worksheet);
  const tableKeysHash = generateTableKeysHash(
    currentRow,
    startTableColumnNumber,
    endTableColumnNumber,
    facade.worksheet
  );

  currentRow++;

  // parse table
  for (let currentTableRow = currentRow, isWholeRowEmpty = false; !isWholeRowEmpty; currentTableRow++) {
    const tableRow = {};

    isWholeRowEmpty = true;

    // parse table row
    for (let i = startTableColumnNumber; i <= endTableColumnNumber; i++) {
      const rowItem = facade.worksheet[getCellName(i, currentTableRow)];

      if (rowItem) isWholeRowEmpty = false;

      tableRow[tableKeysHash[i]] = rowItem ? rowItem.v : '';
    }

    if (!isWholeRowEmpty) parsedData.push(tableRow);
  }

  currentRow++;

  return { currentRow, parsedData: { [tableName.v]: parsedData } };
};
