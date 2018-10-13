import { IGoogleSheetsInputProcessor, IGoogleSheetsInputProcessorFactoryFacade } from './interfaces';

import GoogleSheetsInputProcessor from './index';

const factory = (facade: IGoogleSheetsInputProcessorFactoryFacade): IGoogleSheetsInputProcessor => {
  const { fs, https, xlsx, Parser } = facade;

  const parser = new Parser({ dependencies: { xlsx } });

  return new GoogleSheetsInputProcessor({
    dependencies: { fs, https, parser }
  });
};

export default factory;
