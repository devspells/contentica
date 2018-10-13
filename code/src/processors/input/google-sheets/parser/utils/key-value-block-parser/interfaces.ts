export interface IKeyValueBlockParserFacade {
  currentRow: number;
  worksheet: any;
}

export interface IKeyValueBlockParserResult {
  currentRow: number;
  parsedData: any;
}
