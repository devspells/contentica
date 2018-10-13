import { DESCRIPTION, KEY, TYPE, VALUE } from './constants';

/**
 * check that on next line of sheet starts key-value block
 *
 * @param row - current row on worksheet
 * @param worksheet - current worksheet
 * @return boolean
 */
export default (row: number, worksheet: any): boolean => {
  if (!worksheet[`A${row + 1}`]) return false; // block description is not set

  const keyCol = worksheet[`A${row + 2}`];
  if (!keyCol || keyCol.v !== KEY) return false; // key column is not set

  const valueCol = worksheet[`B${row + 2}`];
  if (!valueCol || valueCol.v !== VALUE) return false; // value column is not set

  const typeCol = worksheet[`C${row + 2}`];
  if (!typeCol || typeCol.v !== TYPE) return false; // type column is not set

  const descriptionCol = worksheet[`D${row + 2}`];
  if (!descriptionCol || descriptionCol.v !== DESCRIPTION) return false; // description column is not set

  return true; // its a key-value-block;
};
