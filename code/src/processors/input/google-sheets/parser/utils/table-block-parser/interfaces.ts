export interface ITableBlockParserFacade {
  currentRow: number;
  worksheet: any;
}

export interface ITableBlockParserResult {
  currentRow: number;
  parsedData: any;
}
