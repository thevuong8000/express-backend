import { Language } from '../../routes/api/requests/code_executor';
import { FILE_EXTENSIONS } from '../../constants/code_executor';
import path from 'path';
import { TEMP_SUBMISSION_PARENT_DIRECTORY } from './index';
import LanguageManager from './languageManager';

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
  static inputDirName = 'input';
  static outputDirName = 'output';
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
   * Get final executable file
   */
  protected getRegularModeOutputFileName: () => string;

  /**
   * Get the path to compile error file
   */
  protected getPathToCompileErrorFile: () => string;

  /**
   * Get the path to submission info file
   */
  protected getPathToSubmissionInfoFile: () => string;

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

    this.getRegularModeOutputFileName = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      return path.resolve(outputDir, './output');
    };

    this.getPathToCompileErrorFile = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      return path.resolve(outputDir, SubmissionFileManagerBase.compileErrorFileName);
    };
  }
}

/**
 * File management with specific language
 */
export class SubmissionFileManager extends SubmissionFileManagerBase {
  static userObjectFileName = 'user-object';
  static userFileName = 'user';

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
