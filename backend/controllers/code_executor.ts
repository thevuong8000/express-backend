import { FILE_EXTENSIONS } from './../constants/code_executor';
import { RequestHandler } from 'express';
import { ICodeExecutorInput } from '../routes/api/requests/code_executor';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const compileAndExecuteCode: RequestHandler = (req, res, next) => {
  const { typedCode, input, language } = <ICodeExecutorInput>req.body;
  console.log('dummy', input, language);
  console.log('dirname', __dirname);
  const tempFile = path.resolve(__dirname, `../tmp/test.${FILE_EXTENSIONS[language]}`);
  fs.writeFileSync(tempFile, typedCode);

  let data: { code: number; result: any };
  try {
    const result = execSync(`node ${tempFile}`, { encoding: 'utf-8' });
    data = { code: 200, result };
  } catch (err) {
    data = { code: 200, result: err.stderr };
  }
  fs.unlinkSync(tempFile);
  res.status(data.code).json({ result: data.result });
};
