import { TEMP_SUBMISSION_PARENT_DIRECTORY } from './index';
import { ISubmission, Language, ISubmissionMode } from '../../routes/api/requests/code_executor';
import { SubmissionFileManager } from './submisisonFileManager';
import fs from 'fs';
import { BadRequestError } from '../../routes/api/responses/errors';
import path from 'path';
import { exec, execSync } from 'child_process';
import waitUntil from 'async-wait-until';
import LanguageManager from './languageManager';
import { IOutput } from '../../routes/api/responses/code_executor';

/**
 * Create {tmp} submisison directory if not exist
 */
const createTempSubmissionParentDirectoryIfNotExist = () => {
  if (!fs.existsSync(TEMP_SUBMISSION_PARENT_DIRECTORY)) {
    console.log('Creating tmp directory');
    fs.mkdirSync(TEMP_SUBMISSION_PARENT_DIRECTORY);
    console.log('Successfully created tmp directory');
  }
};

export interface ISubmissionInfo {
  submissionId: string;
  language: Language;
  mode: ISubmissionMode;
}

interface ICodeExecutorConstructor extends ISubmission {
  submissionId: string;
}

export default class CodeExecutor extends SubmissionFileManager {
  /**
   * Setup submission input directory
   */
  private setupSubmissionInputDirectory: () => void;

  /**
   * Setup submission output directory
   */
  private setupSubmissionOutputDirectory: () => void;

  /**
   * Write user's inputs into separated files
   */
  private writeInputsIntoFiles: () => void;

  /**
   * Get the output for user's code in Regular Mode
   */
  private getRegularModeOutput: () => string;

  /**
   * Execute user's code in Competitive Programming Mode
   */
  private executeCodeCompetitiveProgrammingMode: () => void;

  /**
   * Execute user's code in Regular Mode
   */
  private executeCodeRegularMode: () => void;

  /**
   * Compile file if the language is compiled language
   * Do nothing if the language is not compiled language
   */
  private compileFileIfNeeded: () => void;

  /**
   * Get general execute script
   * For example:
   * 1) python      => python3 user.py
   * 2) javascript  => node user.js
   * 3) cpp         => g++ --std=c++14 -o objectFile user.cpp
   */
  private getExecuteScript: () => string;

  /**
   * Write user's code into file synchronous
   * Write file sync is necessary since code needs to be written before being executed
   */
  private writeUserCodeIntoFile: () => void;

  /**
   * Check if executor is ready to execute user's code
   */
  private isExecutorReady: () => boolean;

  /**
   * Set up submission
   * 1) Set up directory for submission, input, output
   * 2) Write data into files
   */
  public setupSubmission: () => void;

  /**
   * Execute the user's code
   */
  public execute: () => void;

  /**
   * Store submission information into json file
   */
  private storeSubmissionInfo: () => void;

  /**
   * Execute user's code without any test
   */
  private executeCodeStandalone: () => string;

  /**
   * Write CE or RTE into error.json file
   */
  private handleCodeError: (error: any) => void;

  /**
   * Write Runtime Error into output file
   * @param outputPath the path to output file
   * @param errorDetail the detail of the error
   */
  private handleWriteRuntimeErrorIntoFile: (outputPath: string, errorDetail: string) => void;

  /**
   * Write the result into output file
   * @param outputPath the path to output file
   * @param output the result to be written
   */
  private handleWriteOutputIntoFile: (outputPath: string, output: string) => void;

  constructor({ submissionId, typedCode, language, inputs, mode }: ICodeExecutorConstructor) {
    super({ submissionId, language });

    this.storeSubmissionInfo = () => {
      const infoFilePath = this.getPathToSubmissionInfoFile();
      console.info(`Writing submission information into ${infoFilePath}`);
      const info: ISubmissionInfo = {
        submissionId,
        language,
        mode
      };
      fs.writeFile(infoFilePath, JSON.stringify(info), (err) => {
        if (err) console.error('Can not write submission information', err);
        else console.info(`Write submission ${submissionId} information successfully`);
      });
    };

    this.setupSubmissionInputDirectory = () => {
      const inputDir = this.getSubmissionInputDirectory();
      console.log('Creating input directory...');
      fs.mkdir(inputDir, (err) => {
        if (err) console.log('Create submission directory error:', err);
        this.writeInputsIntoFiles();
      });
      console.log('Create input directory successfully:', inputDir);
    };

    this.setupSubmissionOutputDirectory = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      console.log('Creating output directory...');
      fs.mkdirSync(outputDir);
      console.log('Create output directory successfully:', outputDir);
    };

    this.setupSubmission = () => {
      createTempSubmissionParentDirectoryIfNotExist();

      const submissionDir = this.getSubmissionDirectory();

      console.log('Creating submission directory:', submissionDir);
      if (fs.existsSync(submissionDir)) {
        throw new BadRequestError('Submission ID duplicated, please try again!');
      }
      fs.mkdir(submissionDir, (err) => {
        if (err) {
          console.log('Create submission directory error:', err);
          return;
        }
        this.storeSubmissionInfo();
        this.writeUserCodeIntoFile();
        this.setupSubmissionInputDirectory();
        this.setupSubmissionOutputDirectory();
      });
    };

    this.writeUserCodeIntoFile = () => {
      const fileName = this.getPathToUserFile();
      fs.writeFile(fileName, typedCode, (err) => {
        if (err) console.log("Cannot write user's code into file");
      });
    };

    this.writeInputsIntoFiles = () => {
      const inputDir = this.getSubmissionInputDirectory();
      inputs.map((testCase) => {
        const filename = path.resolve(inputDir, testCase.id);
        fs.writeFile(filename, testCase.input, (err) => {
          if (err) console.log(`\tCan not write ${testCase.id}`);
          else console.log(`\tWrite input ${testCase.id} successfully into ${filename}`);
        });
      });
    };

    this.getRegularModeOutput = () => {
      const outputFile = this.getPathToRegularOutputFile();
      return fs.readFileSync(outputFile, { encoding: 'utf-8' });
    };

    this.getExecuteScript = () => {
      const filePath = this.getPathToExecutableFile();
      switch (language) {
        case 'cpp':
          return filePath;

        case 'java':
          return `java ${filePath}`;

        case 'python':
          return `python3 ${filePath}`;

        case 'javascript':
          return `node ${filePath}`;

        default:
          return 'ThisIsNotAValidScript';
      }
    };

    this.handleWriteOutputIntoFile = (outputPath: string, output: string) => {
      console.info(`Writing output into ${outputPath}`);
      const obj: IOutput = {
        status: 'Success',
        output
      };
      fs.writeFile(outputPath, JSON.stringify(obj), (err) => {
        if (err) console.log(`Can not write file into ${outputPath}`);
        else console.log(`Successfully write output into ${outputPath}`);
      });
    };

    this.handleWriteRuntimeErrorIntoFile = (outputPath: string, errorDetail: string) => {
      console.info(`Writing runtime error into ${outputPath}`);
      const obj: IOutput = {
        status: 'Error',
        type: 'Runtime Error',
        errorDetail
      };
      fs.writeFile(outputPath, JSON.stringify(obj), (err) => {
        if (err) console.error(`Can not write error information into ${outputPath}`);
        else console.info(`Successfully write error into ${outputPath}`);
      });
    };

    this.executeCodeRegularMode = () => {
      console.log('Executing code in Regular Mode');
      const outputFile = this.getPathToRegularOutputFile();
      const execScript = this.getExecuteScript();

      try {
        const output = execSync(execScript, { encoding: 'utf-8' });
        this.handleWriteOutputIntoFile(outputFile, output);
      } catch (err) {
        this.handleWriteRuntimeErrorIntoFile(outputFile, err.stderr);
      }
    };

    this.executeCodeCompetitiveProgrammingMode = () => {
      console.log('Executing code in Competitive Programming Mode');
      const outputDir = this.getSubmissionOutputDirectory();
      const inputDir = this.getSubmissionInputDirectory();
      const inputFiles = fs.readdirSync(inputDir);
      const execScript = this.getExecuteScript();

      inputFiles.forEach((file) => {
        const inputFilePath = path.resolve(inputDir, file);
        exec(`${execScript} < ${inputFilePath}`, (err, stdout, stderr) => {
          const outputFilePath = this.getPathToOutputFileById(file);
          if (stderr) this.handleWriteRuntimeErrorIntoFile(outputFilePath, stderr);
          else this.handleWriteOutputIntoFile(outputFilePath, stdout);
        });
      });
    };

    this.isExecutorReady = () => {
      const userFilePath = this.getPathToUserFile();
      return fs.existsSync(userFilePath);
    };

    // TODO: currently only support c++
    this.compileFileIfNeeded = () => {
      if (!LanguageManager.isCompiledLanguage(language)) return;

      const userFilePath = this.getPathToUserFile();
      const objectFileName = this.getPathToObjectFile();
      try {
        execSync(`g++ -std=c++17 -o ${objectFileName} ${userFilePath}`);
      } catch (err) {
        throw Object.assign(new Error(), err, { name: 'Compile Error' });
      }
    };

    this.handleCodeError = (error) => {
      console.error(`${error.name} found`);
      const codeErrorPath = this.getPathToCompileErrorFile();
      const obj = {
        type: error.name,
        detail: (error.stderr as Buffer).toString()
      };
      fs.writeFileSync(codeErrorPath, JSON.stringify(obj), { encoding: 'utf-8' });
    };

    this.execute = async () => {
      await waitUntil(this.isExecutorReady, { timeout: 5000 });
      try {
        this.compileFileIfNeeded();
      } catch (err) {
        this.handleCodeError(err);
        return;
      }

      switch (mode) {
        case 'Regular':
          return this.executeCodeRegularMode();

        case 'Compatitive Programming':
          return this.executeCodeCompetitiveProgrammingMode();

        default:
          break;
      }
    };
  }
}
