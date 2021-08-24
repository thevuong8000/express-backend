import { SubmissionFileManagerBase } from './submisisonFileManager';
import fs from 'fs';
import waitUntil from 'async-wait-until';
import { ISubmissionInfo } from './codeExecutor';
import path from 'path';
import { IOutput } from '../../routes/api/responses/code_executor';
import {
  ISubmissionOutput,
  ISubmissionOutputRegular,
  ISubmissionOutputCompetitiveResult
} from '../../routes/api/responses/code_executor';

interface IResultCheckerConstructor {
  submissionId: string;
}

export default class ResultChecker extends SubmissionFileManagerBase {
  /**
   * Get the result in Regular Mode
   * @returns submission result in Regular Mode
   */
  private getResultRegularMode: () => ISubmissionOutputRegular;

  /**
   * Get the result in Competitive Programming Mode
   * @returns submission result in Competitive Programming Mode
   */
  private getResultCompetitiveMode: () => ISubmissionOutputCompetitiveResult;

  /**
   * Get submission information
   * @returns information of the submission
   */
  private getSubmissionInfo: () => Promise<ISubmissionInfo>;

  /**
   * Read data from output file
   * @param path the path to output path
   * @returns empty string if file not exist or exist but not written yet
   */
  private readOutputFromFile: (path: string) => string;

  /**
   * Get compile error content
   * @throws error if no compile error
   * @returns content of compile error
   */
  private getCompileErrorContent: () => any;

  /**
   * Get the result for submission
   */
  public getResult: () => Promise<ISubmissionOutput>;

  constructor({ submissionId }: IResultCheckerConstructor) {
    super({ submissionId });

    this.getSubmissionInfo = async () => {
      const infoFilePath = this.getPathToSubmissionInfoFile();
      await waitUntil(() => fs.existsSync(infoFilePath));
      const info = fs.readFileSync(infoFilePath, { encoding: 'utf-8' });
      return <ISubmissionInfo>JSON.parse(info);
    };

    this.readOutputFromFile = (path: string) => {
      if (!fs.existsSync(path)) return '';
      return fs.readFileSync(path, { encoding: 'utf-8' });
    };

    this.getCompileErrorContent = () => {
      if (!this.isCompileError()) throw new Error('No compile error');
      const compileErrorPath = this.getPathToCompileErrorFile();
      const error = fs.readFileSync(compileErrorPath, { encoding: 'utf-8' });
      return JSON.parse(error);
    };

    this.getResultRegularMode = () => {
      const outputFilePath = this.getPathToRegularOutputFile();
      const output = this.readOutputFromFile(outputFilePath);
      const result: IOutput = output ? JSON.parse(output) : { status: 'Pending' };
      return { [SubmissionFileManagerBase.regularOutputFileName]: result };
    };

    this.getResultCompetitiveMode = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      if (!fs.existsSync(outputDir)) return {};

      const result: ISubmissionOutputCompetitiveResult = {};
      const outputFiles = fs.readdirSync(outputDir);
      outputFiles.forEach((file) => {
        const filePath = path.resolve(outputDir, file);
        const output = this.readOutputFromFile(filePath);
        const testId = path.parse(file).name;
        result[testId] = JSON.parse(output);
      });
      return result;
    };

    this.getResult = async () => {
      if (this.isCompileError()) {
        const error = this.getCompileErrorContent();
        return { status: 'Error', ...error };
      }
      const { mode } = await this.getSubmissionInfo();
      const result =
        mode === 'Regular' ? this.getResultRegularMode() : this.getResultCompetitiveMode();
      return { status: 'Success', result };
    };
  }
}
