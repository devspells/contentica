/**
 * interface of GoogleSheetsParser class
 */
export interface IGoogleSheetsParser {
  init: (facade: IGoogleSheetsParserInitMethodFacade) => any;
  parse: () => any;
}

/**
 * interface of GoogleSheetsParser constructor
 */
export interface IGoogleSheetsParserConstructorFacade {
  dependencies: {
    xlsx: any; // object that provides excel sheets API
  };
}

/**
 * interface of GoogleSheetsParser init method
 */
export interface IGoogleSheetsParserInitMethodFacade {
  dataTree: any;
  filename: string;
}
