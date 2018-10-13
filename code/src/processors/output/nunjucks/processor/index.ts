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
    // clear output dir
    const outputDir = `${process.cwd()}/${this.config.outputDir}`;
    this.dependencies.rimraf.sync(outputDir);
    this.dependencies.fs.mkdirSync(outputDir);

    // create html
    Object.keys(this.dataTree.pages || {}).forEach(page => {
      const templateName = page.slice(0, -5) + '.njk';
      const html = this.dependencies.nunjucks.render(templateName, this.dataTree.pages[page]);

      this.dependencies.fs.writeFileSync(`${outputDir}/${page}`, html);
    });

    return this;
  }
}

export default NunjucksOutputProcessor;
