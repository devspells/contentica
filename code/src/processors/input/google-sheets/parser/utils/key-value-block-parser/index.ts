import { IKeyValueBlockParserFacade, IKeyValueBlockParserResult } from './interfaces';

import getCellName from './../get-cell-name';

/**
 * parse key-value block
 */
export default (facade: IKeyValueBlockParserFacade): IKeyValueBlockParserResult => {
  const KEY_COL = 1;
  const VALUE_COL = 2;
  const TYPE_COL = 3;
  const parsedData = {};

  let currentRow = facade.currentRow + 3;
  for (let completed = false; !completed; currentRow++) {
    const key = facade.worksheet[getCellName(KEY_COL, currentRow)];
    const value = facade.worksheet[getCellName(VALUE_COL, currentRow)];
    const valueType = facade.worksheet[getCellName(TYPE_COL, currentRow)];

    if (!key || !value || (valueType && valueType.v !== 'string')) {
      completed = true;
      break;
    }

    parsedData[key.v] = value.v;
  }

  return { currentRow, parsedData };
};
