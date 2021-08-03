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
export type ISubmissionResults = Record<string, string>;
