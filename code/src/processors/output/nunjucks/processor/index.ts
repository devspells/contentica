import {
  INunjucksOutputProcessor,
  INunjucksOutputProcessorConstructorFacade,
  INunjucksOutputProcessorDependencies,
  INunjucksOutputProcessorInitMethodFacade
} from './interfaces';

class NunjucksOutputProcessor implements INunjucksOutputProcessor {
  private dependencies: INunjucksOutputProcessorDependencies;
  private config: any;
  private dataTree: any;

  constructor(facade: INunjucksOutputProcessorConstructorFacade) {
    this.dependencies = facade.dependencies;

    this.run = this.run.bind(this);
  }

  public init(facade: INunjucksOutputProcessorInitMethodFacade) {
    this.dataTree = facade.dataTree;
    this.config = facade.config;

    this.dependencies.nunjucks.configure(`${process.cwd()}/${this.config.templatesDir}`);

    return this;
  }

  public run() {
    // load functions if need
    let functions = null;
    if (this.config.functionsFilePath) {
      functions = require(`${process.cwd()}/${this.config.functionsFilePath}`);
    }

    // clear output dir
    const outputDir = `${process.cwd()}/${this.config.outputDir}`;
    this.dependencies.rimraf.sync(outputDir);
    this.dependencies.fs.mkdirSync(outputDir);

    // create static html
    Object.keys(this.dataTree.pages || {}).forEach(page => {
      const templateName = page.slice(0, -5) + '.njk';
      const data = {...this.dataTree.common, ...this.dataTree.pages[page], functions};
      const html = this.dependencies.nunjucks.render(templateName, data);

      this.dependencies.fs.writeFileSync(`${outputDir}/${page}`, html);
    });

    // create dynamic html
    (this.dataTree.dynamicPages || []).forEach(page => {
      const templateName = page.layout;
      const commonData = this.dataTree.common;

      this.dataTree.common[page.data].forEach(pageData => {
        const data = {common: commonData, page: pageData, functions};
        const html = this.dependencies.nunjucks.render(templateName, data);

        this.dependencies.fs.writeFileSync(
          `${outputDir}/${pageData[page.output_name_key].replace(/ /g, '-')}.html`,
          html
        );
      });
    });

    return this;
  }
}

export default NunjucksOutputProcessor;
