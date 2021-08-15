import { SubmissionFileManagerBase } from './submisisonFileManager';
import fs from 'fs';
import waitUntil from 'async-wait-until';
import { ISubmissionInfo } from './codeExecutor';
import path from 'path';
import {
  ISubmissionOutput,
  ISubmissionOutputRegular,
  ISubmissionOutputCompetitive
} from '../../routes/api/responses/code_executor';

interface IResultCheckerConstructor {
  submissionId: string;
}

const EMPTY_RESULT = { result: {} };

export default class ResultChecker extends SubmissionFileManagerBase {
  /**
   * Get the result for submission
   */
  public getResult: () => Promise<ISubmissionOutput>;
  private getResultRegularMode: () => ISubmissionOutputRegular;
  private getResultCompetitiveMode: () => ISubmissionOutputCompetitive;

  constructor({ submissionId }: IResultCheckerConstructor) {
    super({ submissionId });

    const getSubmissionInfo = async () => {
      const infoFilePath = this.getPathToSubmissionInfoFile();
      await waitUntil(() => fs.existsSync(infoFilePath));
      const info = fs.readFileSync(infoFilePath, { encoding: 'utf-8' });
      return <ISubmissionInfo>JSON.parse(info);
    };

    this.getResultRegularMode = () => {
      const outputFilePath = this.getRegularModeOutputFileName();
      if (!fs.existsSync(outputFilePath)) return { regular_mode_output: {} };
      const output = fs.readFileSync(outputFilePath, { encoding: 'utf-8' });
      return { regular_mode_output: { output } };
    };

    this.getResultCompetitiveMode = () => {
      const outputDir = this.getSubmissionOutputDirectory();
      if (!fs.existsSync(outputDir)) return EMPTY_RESULT;

      const result: ISubmissionOutputCompetitive = {};
      const outputFiles = fs.readdirSync(outputDir);
      outputFiles.forEach((file) => {
        const filePath = path.resolve(outputDir, file);
        const output = fs.readFileSync(filePath, { encoding: 'utf-8' });
        result[file] = { output };
      });
      return result;
    };

    this.getResult = async () => {
      const { mode } = await getSubmissionInfo();
      return mode === 'Regular' ? this.getResultRegularMode() : this.getResultCompetitiveMode();
    };
  }
}
