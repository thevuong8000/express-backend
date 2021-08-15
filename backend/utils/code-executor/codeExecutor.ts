import { TEMP_SUBMISSION_PARENT_DIRECTORY } from './index';
import { ISubmission, Language, ISubmissionMode } from '../../routes/api/requests/code_executor';
import { SubmissionFileManager } from './submisisonFileManager';
import fs from 'fs';
import { BadRequestError } from '../../routes/api/responses/errors';
import path from 'path';
import { exec, execSync } from 'child_process';
import waitUntil from 'async-wait-until';
import LanguageManager from './languageManager';

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
   * Handle compile error
   */
  private handleCompileError: (error: any) => void;

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
  public setupSubmission: () => Promise<void>;

  /**
   * Execute the user's code
   */
  public execute: () => void;
  storeSubmissionInfo: () => void;

  constructor({ submissionId, typedCode, language, inputs, mode }: ICodeExecutorConstructor) {
    super({ submissionId, language });

    this.storeSubmissionInfo = () => {
      const infoFilePath = this.getPathToSubmissionInfoFile();
      const info: ISubmissionInfo = {
        submissionId,
        language,
        mode
      };
      fs.writeFileSync(infoFilePath, JSON.stringify(info));
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

    this.setupSubmission = async () => {
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
      const fileName = this.getCodeFileName();
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
      const outputFile = this.getRegularModeOutputFileName();
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

    this.executeCodeRegularMode = () => {
      console.log('Executing code in Regular Mode');
      const outputFile = this.getRegularModeOutputFileName();
      const execScript = this.getExecuteScript();

      exec(execScript, (err, stdout, stderr) => {
        if (stderr) {
          console.log('error', stderr);
          return;
        }

        fs.writeFile(outputFile, stdout, (err) => {
          if (err) console.log('Regular Submision Mode: Can not write file');
          else console.log('Output for Regular Mode is ready');
        });
      });
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
          const output = stderr ? stderr : stdout;

          // corresponding output would have the same name
          const outputFilePath = path.resolve(outputDir, file);
          fs.writeFile(outputFilePath, output, (err) => {
            if (err) console.log('\tError write output', file, err);
            else console.log('\tWrite output', file, 'successfully!');
          });
        });
      });
    };

    this.isExecutorReady = () => {
      const userFilePath = this.getCodeFileName();
      return fs.existsSync(userFilePath);
    };

    // TODO: currently only support c++
    this.compileFileIfNeeded = () => {
      if (!LanguageManager.isCompiledLanguage(language)) return;

      const userFilePath = this.getCodeFileName();
      const objectFileName = this.getCompiledCodeFileName();
      execSync(`g++ -std=c++17 -o ${objectFileName} ${userFilePath}`);
    };

    this.handleCompileError = (error) => {
      const compileErrorPath = this.getPathToCompileErrorFile();
      fs.writeFileSync(compileErrorPath, error.stderr, { encoding: 'utf-8' });
    };

    this.execute = async () => {
      await waitUntil(this.isExecutorReady, { timeout: 5000 });
      try {
        this.compileFileIfNeeded();
      } catch (err) {
        this.handleCompileError(err);
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
