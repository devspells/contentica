import { DESCRIPTION, START_COLUMN, TABLE, TYPE } from './constants';

/**
 * check that on next line of sheet starts table block
 *
 * @param row - current row on worksheet
 * @param worksheet - current worksheet
 * @return boolean
 */
export default (row: number, worksheet: any): boolean => {
  const tableCol = worksheet[`A${row + 1}`];
  if (!tableCol || tableCol.v !== TABLE) return false; // table column is not set

  const descriptionCol = worksheet[`B${row + 1}`];
  if (!descriptionCol || descriptionCol.v !== DESCRIPTION) return false; // description column is not set

  const typeCol = worksheet[`C${row + 1}`];
  if (!typeCol || typeCol.v !== TYPE) return false; // type column is not set

  const startColumnCol = worksheet[`D${row + 1}`];
  if (!startColumnCol || startColumnCol.v !== START_COLUMN) return false; // start column column is not set

  return true; // its a table block;
};
