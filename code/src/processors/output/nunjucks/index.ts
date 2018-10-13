import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as rimraf from 'rimraf';

import nunjucksOutputProcessorFactory from './processor/factory';

export default nunjucksOutputProcessorFactory({
  fs,
  nunjucks,
  rimraf
});
