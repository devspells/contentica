/**
 * NunjucksOutputProcessor instance interface
 */
export interface INunjucksOutputProcessor {
  init: (facade: INunjucksOutputProcessorInitMethodFacade) => INunjucksOutputProcessor;
  run: () => INunjucksOutputProcessor;
}

/**
 * NunjucksOutputProcessor instance dependencies interface
 */
export interface INunjucksOutputProcessorDependencies {
  fs: any;
  nunjucks: any;
  rimraf: any;
}

/**
 * NunjucksOutputProcessor constructor facade interface
 */
export interface INunjucksOutputProcessorConstructorFacade {
  dependencies: INunjucksOutputProcessorDependencies;
}

/**
 * NunjucksOutputProcessor init method facade interface
 */
export interface INunjucksOutputProcessorInitMethodFacade {
  config: any;
  dataTree: any;
}

/**
 * Interface for facade of NunjucksOutputProcessor factory
 */
export interface INunjucksOutputProcessorFactoryFacade {
  fs: any;
  nunjucks: any;
  rimraf: any;
}
