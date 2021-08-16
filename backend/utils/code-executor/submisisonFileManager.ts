import { Language } from '../../routes/api/requests/code_executor';
import { FILE_EXTENSIONS } from '../../constants/code_executor';
import path from 'path';
import { TEMP_SUBMISSION_PARENT_DIRECTORY } from './index';
import LanguageManager from './languageManager';
import fs from 'fs';

interface ISubmissionFileManagerBaseConstructor {
  submissionId: string;
}
interface ISubmissionFileManagerConstructor extends ISubmissionFileManagerBaseConstructor {
  language: Language;
}

/**
 * File Management without language
 */
export class SubmissionFileManagerBase {
  static readonly inputDirName = 'input';
  static readonly outputDirName = 'output';
  static readonly regularOutputFileName = 'regular_output';
  static readonly submissionInfoFileName = 'info.json';
  static readonly compileErrorFileName = 'compile-error.json';

  /**
   * Get the path to target submission directory
   * @returns the path to target submission directory
   */
  protected getSubmissionDirectory: () => string;

  /**
   * Get the path to input directory
   * @returns the path to target input directory
   */
  protected getSubmissionInputDirectory: () => string;

  /**
   * Get the path to output directory
   * @returns the path to target output directory
   */
  protected getSubmissionOutputDirectory: () => string;

  /**
   * Get the path to output file Regular Mode
   * @returns the path to output file Regular Mode
   */
  protected getPathToRegularOutputFile: () => string;

  /**
   * Get the path to submission info file
   * @returns the path to submission information file
   */
  protected getPathToSubmissionInfoFile: () => string;

  /**
   * Get the path to Compile Error file
   */
  protected getPathToCompileErrorFile: () => string;

  /**
   * Get the path to output file by test id
   */
  protected getPathToOutputFileById: (id: string) => string;

  /**
   * Check if submission is compiled error
   * @return true if user's code is Compile Error
   */
  protected isCompileError: () => boolean;

  constructor({ submissionId }: ISubmissionFileManagerBaseConstructor) {
    this.getSubmissionDirectory = () => {
      return path.resolve(TEMP_SUBMISSION_PARENT_DIRECTORY, submissionId);
    };

    this.getSubmissionInputDirectory = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManagerBase.inputDirName);
    };

    this.getSubmissionOutputDirectory = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManagerBase.outputDirName);
    };

    this.getPathToSubmissionInfoFile = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManagerBase.submissionInfoFileName);
    };

    this.getPathToRegularOutputFile = () => {
      return this.getPathToOutputFileById(SubmissionFileManagerBase.regularOutputFileName);
    };

    this.getPathToCompileErrorFile = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManagerBase.compileErrorFileName);
    };

    this.getPathToOutputFileById = (id) => {
      const outputDir = this.getSubmissionOutputDirectory();
      return path.resolve(outputDir, `${id}.json`);
    };

    this.isCompileError = () => {
      const compileErrorFilePath = this.getPathToCompileErrorFile();
      return fs.existsSync(compileErrorFilePath);
    };
  }
}

/**
 * File management with specific language
 */
export class SubmissionFileManager extends SubmissionFileManagerBase {
  static readonly userObjectFileName = 'user-object';
  static readonly userFileName = 'user';

  /**
   * Get the user's code file name
   */
  protected getCodeFileName: () => string;

  /**
   * Get the path to object file (only if code in compiled language)
   */
  protected getCompiledCodeFileName: () => string;

  /**
   * Get the path to output result of submission in Regular Mode
   * @returns the path to output file Regular Mode
   */
  protected getPathToExecutableFile: () => string;

  /**
   * Get the full user file name with file extension
   */
  protected getFullUserFileName: () => string;

  constructor({ submissionId, language }: ISubmissionFileManagerConstructor) {
    super({ submissionId });

    this.getCodeFileName = () => {
      const submissionDir = this.getSubmissionDirectory();
      const fileName = this.getFullUserFileName();
      return path.resolve(submissionDir, fileName);
    };

    this.getCompiledCodeFileName = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManager.userObjectFileName);
    };

    this.getFullUserFileName = () => {
      return `${SubmissionFileManager.userFileName}.${FILE_EXTENSIONS[language]}`;
    };

    this.getPathToExecutableFile = () => {
      return LanguageManager.isCompiledLanguage(language)
        ? this.getCompiledCodeFileName()
        : this.getCodeFileName();
    };
  }
}
