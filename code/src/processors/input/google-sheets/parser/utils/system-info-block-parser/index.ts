import { ISystemInfoBlockParserFacade, ISystemInfoBlockParserResult } from './interfaces';

import getCellName from './../get-cell-name';

/**
 * parse system info block
 */
export default (facade: ISystemInfoBlockParserFacade): ISystemInfoBlockParserResult => {
  const KEY_COL = 1;
  const VALUE_COL = 2;
  const parsedData = {};

  let currentRow = facade.currentRow;
  for (let completed = false; !completed; currentRow++) {
    const key = facade.worksheet[getCellName(KEY_COL, currentRow)];
    const value = facade.worksheet[getCellName(VALUE_COL, currentRow)];

    if (!key || !value) {
      completed = true;
      break;
    }

    parsedData[key.v] = value.v;
  }

  return { currentRow, parsedData };
};
