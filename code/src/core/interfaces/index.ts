/**
 * a common input processor init method facade interface
 */
export interface IInputProcessorInitMethodFacade {
  config: any; // object that contains contentica config
  cliParams: any; // object that contains runtime params passed via cli interface
  dataTree: any; // object that contains dataTree of current runtime
}
