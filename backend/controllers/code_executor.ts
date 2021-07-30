import { FILE_EXTENSIONS } from './../constants/code_executor';
import { RequestHandler } from 'express';
import { ICodeExecutorInput, Language } from '../routes/api/requests/code_executor';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getCodeExecuteScript } from '../utils/code-executor';

interface ICodeExecutorOutPut {
  code: number;
  result: any;
}

const helperExecuteCode = (
  filename: string,
  input: string,
  language: Language
): ICodeExecutorOutPut => {
  try {
    const script = getCodeExecuteScript(language)(filename);
    const result = execSync(script, { encoding: 'utf-8' });
    return { code: 200, result };
  } catch (e) {
    return { code: 400, result: e.stderr };
  }
};

export const compileAndExecuteCode: RequestHandler = (req, res, next) => {
  const { typedCode, input, language } = <ICodeExecutorInput>req.body;
  console.log('dummy', input, language);
  console.log('dirname', __dirname);
  const parentDir = path.resolve(__dirname, '../tmp');
  const tempFile = path.resolve(parentDir, `test.${FILE_EXTENSIONS[language]}`);

  fs.writeFileSync(tempFile, typedCode);
  const data = helperExecuteCode(tempFile, input, language);
  fs.unlink(tempFile, (err) => { if (err) console.log(err); });

  res.status(data.code).json({ result: data.result });
};
