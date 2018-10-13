import { INunjucksOutputProcessor, INunjucksOutputProcessorFactoryFacade } from './interfaces';

import NunjucksOutputProcessor from './index';

const factory = (facade: INunjucksOutputProcessorFactoryFacade): INunjucksOutputProcessor => {
  const { fs, nunjucks, rimraf } = facade;

  return new NunjucksOutputProcessor({
    dependencies: { fs, nunjucks, rimraf }
  });
};

export default factory;
