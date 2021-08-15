import { Language } from '../../routes/api/requests/code_executor';
import { FILE_EXTENSIONS } from '../../constants/code_executor';
import path from 'path';
import { TEMP_SUBMISSION_PARENT_DIRECTORY } from './index';
import LanguageManager from './languageManager';

interface ISubmissionFileManagerConstructor {
  submissionId: string;
  language: Language;
}

export class SubmissionFileManager {
  static inputDirName = 'input';
  static outputDirName = 'output';
  static userFileName = 'user';
  static userObjectFileName = 'user-object';
  static compileErrorFileName = 'compile-error';
  static submissionInfoFileName = 'info.json';

  /**
   * Get the path to target submission directory
   * @returns the path to target submission directory
   */
  protected getSubmissionDirectory: () => string;

  /**
   * Get the input directory of target submission
   * @returns the path to target input directory
   */
  protected getSubmissionInputDirectory: () => string;

  /**
   * Get the output directory of target submission
   * @returns the path to target output directory
   */
  protected getSubmissionOutputDirectory: () => string;

  /**
   * Get the user's code file name
   */
  protected getCodeFileName: () => string;

  /**
   * Get the path to object file (only if code in compiled language)
   */
  protected getCompiledCodeFileName: () => string;

  /**
   * Get final executable file
   */
  protected getRegularModeOutputFileName: () => string;

  /**
   * Get the path to output result of submission in Regular Mode
   * @returns the path to output file Regular Mode
   */
  protected getPathToExecutableFile: () => string;

  /**
   * Get the full user file name with file extension
   */
  protected getFullUserFileName: () => string;

  /**
   * Get the path to compile error file
   */
  protected getPathToCompileErrorFile: () => string;

  /**
   * Get the path to submission info file
   */
  protected getPathToSubmissionInfoFile: () => string;

  constructor({ submissionId, language }: ISubmissionFileManagerConstructor) {
    this.getSubmissionDirectory = () => {
      return path.resolve(TEMP_SUBMISSION_PARENT_DIRECTORY, submissionId);
    };

    this.getSubmissionInputDirectory = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManager.inputDirName);
    };

    this.getSubmissionOutputDirectory = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManager.outputDirName);
    };

    this.getPathToSubmissionInfoFile = () => {
      const submissionDir = this.getSubmissionDirectory();
      return path.resolve(submissionDir, SubmissionFileManager.submissionInfoFileName);
    };

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

    this.getRegularModeOutputFileName = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      return path.resolve(outputDir, './output');
    };

    this.getPathToCompileErrorFile = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      return path.resolve(outputDir, SubmissionFileManager.compileErrorFileName);
    };
  }
}
