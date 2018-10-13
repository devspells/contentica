import { IInputProcessorInitMethodFacade } from 'core/interfaces';
import { IGoogleSheetsParser } from 'processors/input/google-sheets/parser/interfaces';

/**
 * GoogleSheetsInputProcessor instance interface
 */
export interface IGoogleSheetsInputProcessor {
  init: (facade: IInputProcessorInitMethodFacade) => IGoogleSheetsInputProcessor;
  run: () => IGoogleSheetsInputProcessor;
  onComplete: (callback: any) => IGoogleSheetsInputProcessor;
}

/**
 * interface for GoogleSheetsInputProcessor constructor facade
 */
export interface IGoogleSheetsInputProcessorConstructorFacade {
  dependencies: IGoogleSheetsInputProcessorDependencies;
}

/**
 * dependencies interface for GoogleSheetsInputProcessor instance
 */
export interface IGoogleSheetsInputProcessorDependencies {
  fs: any; // object that provides file system API
  https: any; // object that provides excel sheets API
  parser: IGoogleSheetsParser; // instance of GoogleSheetsParser that provides parsing features for content in xlsx
}

/**
 * Interface for facade of GoogleSheetsInputProcessor factory
 */
export interface IGoogleSheetsInputProcessorFactoryFacade {
  fs: any;
  xlsx: any;
  https: any;
  Parser: any;
}
