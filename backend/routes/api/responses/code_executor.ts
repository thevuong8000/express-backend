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
  status: 'Success' | 'Error';

  // For Error
  type?: 'Runtime Error';
  errorDetail?: string;

  // For Success
  output?: string;
}

export interface ISubmissionOutputRegular {
  regular_mode_output: IOutput;
}

export type ISubmissionOutputCompetitive = Record<string, IOutput>;

export type ISubmissionOutput = ISubmissionOutputRegular | ISubmissionOutputCompetitive;
