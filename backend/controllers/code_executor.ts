import { FILE_EXTENSIONS } from './../constants/code_executor';
import { RequestHandler } from 'express';
import { ICodeExecutorInput, Language } from '../routes/api/requests/code_executor';
import { exec, execSync } from 'child_process';
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
const executeCode = (
  dir: string,
  typedCode: string,
  language: Language,
  inputDir: string,
  outputDir: string
) => {
  const fileName = path.resolve(dir, `test.${FILE_EXTENSIONS[language]}`);
  fs.writeFileSync(fileName, typedCode);

  // Only for c++
  const executableFile = path.resolve(dir, 'test');
  execSync(`g++ -std=c++17 -o ${executableFile} ${fileName}`);
  const files = fs.readdirSync(inputDir);
  files.forEach((file) => {
    exec(`${executableFile} < ${inputDir}/${file}`, (err, stdout, stderr) => {
      const output = stderr ? stderr : stdout;
      const outputFile = path.resolve(outputDir, file.toString());
      fs.writeFile(outputFile, output, (err) => {
        if (err) console.log('\tError write output', file, err);
        else console.log('\tWrite output', file, 'successfully!');
      });
    });
  });
};

/**
 * Create inputs directory with test file inside
 * @param targetDir parent directory of input directory
 * @param inputs
 * @returns
 */
const setupInputs = (dir: string, inputs: string[]) => {
  return Promise.all(
    inputs.map((input, idx) => {
      const filename = path.resolve(dir, idx.toString());
      console.log('\tWrite input', idx, 'successfully!');
      return fs.promises.writeFile(filename, input);
    })
  );
};

/**
 * Process submitted code
 */
export const submitCode: RequestHandler = async (req, res, next) => {
  const { typedCode, inputs, language } = <ICodeExecutorInput>req.body;
  const submissionId = uuidv4();

  // working with directory /backend/tmp/{submissionId}
  const targetDir = path.resolve(__dirname, `../tmp/${submissionId}`);

  if (fs.existsSync(targetDir))
    next(new BadRequestError('Submission ID duplicated, please try again!'));

  res.status(200).json({ submissionId });

  fs.mkdirSync(targetDir);
  console.log('Create submission directory:', targetDir);

  const inputDir = path.resolve(targetDir, 'input');
  fs.mkdirSync(inputDir);
  console.log('Create input directory:', inputDir);
  await setupInputs(inputDir, inputs);

  const outputDir = path.resolve(targetDir, 'output');
  fs.mkdirSync(outputDir);
  console.log('Create output directory:', outputDir);
  executeCode(targetDir, typedCode, language, inputDir, outputDir);
};

/**
 * Check output of specific submission ID
 */
export const checkCodeResult: RequestHandler = (req, res, next) => {
  const { submissionId, numTests } = req.body;
  console.log('Check submission', submissionId);
  const submissionDir = path.resolve(__dirname, `../tmp/${submissionId}`);
  const outputDir = path.resolve(submissionDir, 'output');

  const result = Array(numTests);
  if (!fs.existsSync(outputDir)) return res.status(200).json({ result });

  const files = fs.readdirSync(outputDir);
  files.forEach((file) => {
    const filePath = path.resolve(outputDir, file);
    const idx = parseInt(file);
    result[idx] = fs.readFileSync(filePath, { encoding: 'utf-8' });
  });
  res.status(200).json({ result });
};
