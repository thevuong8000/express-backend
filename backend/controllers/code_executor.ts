import { FILE_EXTENSIONS } from './../constants/code_executor';
import { RequestHandler } from 'express';
import { ICodeExecutorInput, Language } from '../routes/api/requests/code_executor';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { getCodeExecuteScript } from '../utils/code-executor';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError } from '../routes/api/responses/errors';

interface ICodeExecutorOutPut {
  code: number;
  result: any;
}

/**
 * Execute the submitted code.
 * @param dir submission directory
 * @param typedCode The code block to be executed
 * @param language The language of the code
 * @returns status code and result
 */
const executeCode = (dir: string, typedCode: string, language: Language): ICodeExecutorOutPut => {
  const fileName = path.resolve(dir, `test.${FILE_EXTENSIONS[language]}`);
  fs.writeFileSync(fileName, typedCode);
  try {
    const script = getCodeExecuteScript(language)(fileName);
    const result = execSync(script, { encoding: 'utf-8' });
    return { code: 200, result };
  } catch (e) {
    return { code: 400, result: e.stderr };
  }
};

/**
 * Create inputs directory with test file inside
 * @param targetDir parent directory of input directory
 * @param inputs
 * @returns
 */
const setupTests = (targetDir: string, inputs: string[]) => {
  const inputsDir = path.resolve(targetDir, 'inputs');

  fs.mkdirSync(inputsDir);
  return Promise.all(
    inputs.map((input, idx) => {
      console.log(input);
      const filename = path.resolve(inputsDir, idx.toString());
      return fs.promises.writeFile(filename, input);
    })
  );
};

export const submitCode: RequestHandler = async (req, res, next) => {
  const { typedCode, inputs, language } = <ICodeExecutorInput>req.body;
  const submissionId = uuidv4();
  console.log('dummy', inputs, language);
  console.log('dirname', __dirname);

  // working with directory /backend/tmp/{submissionId}
  const targetDir = path.resolve(__dirname, `../tmp/${submissionId}`);

  if (fs.existsSync(targetDir))
    next(new BadRequestError('Submission ID duplicated, please try again!'));

  res.status(200).json({ submissionId });

  fs.mkdirSync(targetDir);
  await setupTests(targetDir, inputs);
  executeCode(targetDir, typedCode, language);
};
