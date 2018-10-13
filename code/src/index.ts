import * as extend from 'extend';
import * as fs from 'fs';

import cli from './core/cli';

// ====================================================================================================================
// init
// ====================================================================================================================
const dataTree: any = {};

// init cli
cli.init();

// if init run (create configuration file)
if (cli.getParams().init) {
  const newConfig = { inputProcessor: { name: 'default:google-sheets', config: { url: '' } } };
  const serializedConfig = JSON.stringify(newConfig, null, 2);

  fs.writeFileSync(`${process.cwd()}/contenticarc.json`, serializedConfig);
  process.exit(0);
}

// read default config
const defaultConfig = JSON.parse(fs.readFileSync(__dirname + '/contenticarc.json', 'utf-8'));

// read user config
const userConfigPath = cli.getParams().config
  ? `${process.cwd()}/${cli.getParams().config}`
  : `${process.cwd()}/contenticarc.json`;
const userConfig = JSON.parse(fs.readFileSync(userConfigPath, 'utf-8'));

// calculate runtime config
const config = extend(true, {}, defaultConfig, userConfig);

// require processors
if (config.inputProcessor.name !== 'default:google-sheets') throw new Error('unknown input processor');

if (config.outputProcessor.name !== 'default:nunjucks') throw new Error('unknown output processor');

const inputProcessor = require('./processors/input/google-sheets').default;
const outputProcessor = require('./processors/output/nunjucks').default;

// ====================================================================================================================
// run
// ====================================================================================================================
outputProcessor.init({ config: config.outputProcessor.config, dataTree });

inputProcessor
  .init({ config: config.inputProcessor.config, dataTree })
  .onComplete(outputProcessor.run)
  .run();
