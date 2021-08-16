import { SubmissionFileManagerBase } from '../../../utils/code-executor/submisisonFileManager';
/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionResponse:
 *       properties:
 *         submissionId:
 *           type: string
 *       required:
 *         - submissionId
 */
export interface ISubmissionResponse {
  submissionId: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionResults:
 *       properties:
 *         result:
 *           type: object
 */

export interface IOutput {
  status: 'Success' | 'Error' | 'Pending';

  // For Error
  type?: 'Runtime Error';
  errorDetail?: string;

  // For Success
  output?: string;
}

export interface ISubmissionOutputRegular {
  [SubmissionFileManagerBase.regularOutputFileName]: IOutput;
}

export type ISubmissionOutputCompetitive = Record<string, IOutput>;

export interface ISubmissionOutput {
  status: 'Success' | 'Error';
  error?: string;
  result?: ISubmissionOutputRegular | ISubmissionOutputCompetitive;
}
