import * as cli from 'commander';

const init = () => {
  cli
    .command('contentica')
    .version('1.0.0')
    .option('-i, --init', 'generate a basic configureation file')
    .option('-c, --config <path>', 'specify path to configuration file')
    .option('--mock-input', 'tell to input processor use mock data instead real if it can')
    .parse(process.argv);
};

const getParams = () => cli.commands[0];

export default { getParams, init };
