import {
  IGoogleSheetsParser,
  IGoogleSheetsParserConstructorFacade,
  IGoogleSheetsParserInitMethodFacade
} from './interfaces';

import { ACTIVE_PAGE, HTML_PAGE_EXSTENSION, SYSTEM_SHEET_NAME, COMMON_SHEET_NAME } from './utils/constants';

import isSheetEnd from './utils/is-sheet-end';
import isKeyValueBlockNext from './utils/key-value-block-parser/is-key-value-block-next';
import isTableBlockNext from './utils/table-block-parser/is-table-block-next';

import parseKeyValueBlock from './utils/key-value-block-parser';
import parseSystemInfoBlock from './utils/system-info-block-parser';
import parseTableBlock from './utils/table-block-parser';

class GoogleSheetsParser implements IGoogleSheetsParser {
  private dependencies: any;
  private dataTree: any;
  private filename: string;

  constructor(facade: IGoogleSheetsParserConstructorFacade) {
    this.dependencies = facade.dependencies;

    this.parse = this.parse.bind(this);
  }

  public init(facade: IGoogleSheetsParserInitMethodFacade) {
    this.filename = facade.filename;
    this.dataTree = facade.dataTree;
  }

  public parse() {
    const workbook = this.dependencies.xlsx.readFile(this.filename);

    // parse content
    workbook.SheetNames.forEach(name => {
      const worksheet = workbook.Sheets[name];

      // parse system sheet
      if (name === SYSTEM_SHEET_NAME) return this.parseSystemSheet(worksheet);

      // parse page sheet
      if (name.slice(-5) === HTML_PAGE_EXSTENSION) return this.parsePageSheet(name, worksheet);

      // parse common data sheet
      if (name === COMMON_SHEET_NAME) return this.parseCommonSheet(worksheet);
    });
  }

  private parseSystemSheet(worksheet: any): void {
    this.dataTree[SYSTEM_SHEET_NAME] = parseSystemInfoBlock({ currentRow: 1, worksheet }).parsedData;
  }

  private parsePageSheet(worksheetName: string, worksheet: any): void {
    this.dataTree.pages = this.dataTree.pages || {};
    this.dataTree.pages[worksheetName] = {};

    const { currentRow, parsedData } = parseSystemInfoBlock({ currentRow: 2, worksheet });

    if (parsedData.status !== ACTIVE_PAGE) return;

    for (let row = currentRow; !isSheetEnd(row, worksheet); ) {
      let result = null;

      if (isKeyValueBlockNext(row, worksheet)) result = parseKeyValueBlock({ currentRow: row, worksheet });

      if (isTableBlockNext(row, worksheet)) result = parseTableBlock({ currentRow: row, worksheet });

      Object.assign(this.dataTree.pages[worksheetName], result.parsedData);
      row = result.currentRow;
    }
  }

  private parseCommonSheet(worksheet: any): void {
    this.dataTree.common = this.dataTree.common || {};

    for (let row = 2; !isSheetEnd(row, worksheet); ) {
      let result = null;

      if (isKeyValueBlockNext(row, worksheet)) result = parseKeyValueBlock({ currentRow: row, worksheet });

      if (isTableBlockNext(row, worksheet)) result = parseTableBlock({ currentRow: row, worksheet });

      Object.assign(this.dataTree.common, result.parsedData);
      row = result.currentRow;
    }
  }
}

export default GoogleSheetsParser;
