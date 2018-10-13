import { IInputProcessorInitMethodFacade } from 'core/interfaces';
import {
  IGoogleSheetsInputProcessor,
  IGoogleSheetsInputProcessorConstructorFacade,
  IGoogleSheetsInputProcessorDependencies
} from './interfaces';

class GoogleSheetsInputProcessor implements IGoogleSheetsInputProcessor {
  private dependencies: IGoogleSheetsInputProcessorDependencies;
  private config: any;
  private file: any;
  private onCompleteCallback: any;

  constructor(facade: IGoogleSheetsInputProcessorConstructorFacade) {
    this.dependencies = facade.dependencies;
  }

  public init(facade: IInputProcessorInitMethodFacade) {
    this.config = facade.config;

    this.dependencies.parser.init({
      dataTree: facade.dataTree,
      filename: this.config.filename
    });

    return this;
  }

  public onComplete(callback: any) {
    this.onCompleteCallback = callback;

    return this;
  }

  public run() {
    this.fetchWorkbook().parseWorkbook();

    return this;
  }

  private fetchWorkbook(): this {
    const { fs, https } = this.dependencies;

    this.file = fs.createWriteStream(this.config.filename);
    https.get(this.config.url, response => response.pipe(this.file));

    return this;
  }

  private parseWorkbook(): this {
    this.file.on('finish', () => {
      this.dependencies.parser.parse();
      this.onCompleteCallback();
    });

    return this;
  }
}

export default GoogleSheetsInputProcessor;
