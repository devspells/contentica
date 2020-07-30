import * as fs from 'fs';
import { https } from 'follow-redirects';
import * as xlsx from 'xlsx';

import GoogleSheetsParser from './parser';
import googleSheetsInputProcessorFactory from './processor/factory';

export default googleSheetsInputProcessorFactory({
  Parser: GoogleSheetsParser,
  fs,
  https,
  xlsx
});
