import { FILE_EXTENSIONS } from './../constants/code_executor';
import { RequestHandler } from 'express';
import {
  ISubmission,
  Language,
  ICheckSubmission,
  ISubmissionMode
} from '../routes/api/requests/code_executor';
import { exec, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestError } from '../routes/api/responses/errors';
import { ISubmissionResults } from '../routes/api/responses/code_executor';
import {
  isCompiledLanguage,
  getExecuteScript,
  executeCodeRegularMode,
  getRegularModeOutput
} from '../utils/code-executor';

/**
 * Execute the submitted code.
 * @param dir submission directory
 * @param typedCode The code block to be executed
 * @param language The language of the code
 * @returns status code and result
 */
const executeCode = (
  submissionId: string,
  dir: string,
  typedCode: string,
  language: Language,
  inputDir: string,
  outputDir: string,
  mode: ISubmissionMode
) => {
  const fileName = path.resolve(dir, `test.${FILE_EXTENSIONS[language]}`);
  fs.writeFileSync(fileName, typedCode);

  const executableFile = isCompiledLanguage(language) ? path.resolve(dir, 'test') : fileName;
  if (isCompiledLanguage(language)) {
    try {
      execSync(`g++ -std=c++17 -o ${executableFile} ${fileName}`);
    } catch (err) {
      console.log('Compile Error:', Object.keys(err));
      const errFileName = path.resolve(dir, `compile_error`);
      fs.writeFileSync(errFileName, err.stderr, { encoding: 'utf-8' });
      return;
    }
  }

  if (mode === 'Regular') {
    executeCodeRegularMode(submissionId, executableFile, language);
    return;
  }

  const inputFiles = fs.readdirSync(inputDir);
  const execScript = getExecuteScript(executableFile, language);
  inputFiles.forEach((file) => {
    exec(`${execScript} < ${inputDir}/${file}`, (err, stdout, stderr) => {
      const output = stderr ? stderr : stdout;

      // corresponding output would have the same name
      const outputFile = path.resolve(outputDir, file);
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
const setupInputs = (dir: string, inputs: ISubmission['inputs']) => {
  return Promise.all(
    inputs.map((testCase) => {
      const filename = path.resolve(dir, testCase.id);
      console.log('\tWrite input', testCase.id, 'successfully!');
      return fs.promises.writeFile(filename, testCase.input);
    })
  );
};

/**
 * Process submitted code
 */
export const submitCode: RequestHandler = async (req, res, next) => {
  const { typedCode, inputs, language, mode } = <ISubmission>req.body;
  const submissionId = uuidv4();

  console.log('Working directory:', __dirname);

  const parentDir = path.resolve(__dirname, `../tmp`);
  if (!fs.existsSync(parentDir)) {
    console.log('Creating tmp directory');
    fs.mkdirSync(parentDir);
    console.log('Successfully created tmp directory');
  }

  // working with directory /backend/tmp/{submissionId}
  const targetDir = path.resolve(__dirname, `${parentDir}/${submissionId}`);
  console.log('Creating submission directory:', targetDir);

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
  executeCode(submissionId, targetDir, typedCode, language, inputDir, outputDir, mode);
};

/**
 * Check output of specific submission ID
 */
export const checkCodeResult: RequestHandler = (req, res, next) => {
  const { submissionId, mode } = <ICheckSubmission>req.body;
  if (mode === 'Regular') {
    const output = getRegularModeOutput(submissionId);
    return res.status(200).json({ result: output });
  }

  console.log('Check submission', submissionId);
  const submissionDir = path.resolve(__dirname, `../tmp/${submissionId}`);

  // Check if compilation error
  const compileErrorFile = path.resolve(submissionDir, 'compile_error');
  if (fs.existsSync(compileErrorFile)) {
    const error = fs.readFileSync(compileErrorFile, { encoding: 'utf-8' });
    return res.status(200).json({ result: { error } });
  }

  const outputDir = path.resolve(submissionDir, 'output');

  const result: ISubmissionResults = {};
  if (!fs.existsSync(outputDir)) return res.status(200).json({ result });

  const outputFiles = fs.readdirSync(outputDir);
  outputFiles.forEach((file) => {
    const filePath = path.resolve(outputDir, file);
    result[file] = fs.readFileSync(filePath, { encoding: 'utf-8' });
  });
  res.status(200).json({ result });
};
