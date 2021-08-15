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
  output?: string;
  error?: string;
}

export interface ISubmissionOutputRegular {
  regular_mode_output: IOutput;
}

export type ISubmissionOutputCompetitive = Record<string, IOutput>;

export type ISubmissionOutput = ISubmissionOutputRegular | ISubmissionOutputCompetitive;
