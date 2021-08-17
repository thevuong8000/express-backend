export type Language = 'javascript' | 'typescript' | 'cpp' | 'python' | 'java';

/**
 * @swagger
 * components:
 *   schemas:
 *     ITestInput:
 *       properties:
 *         id:
 *           type: string
 *         input:
 *           type: string
 *       required:
 *         - id
 *         - input
 */
export interface ITestInput {
  id: string;
  input: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionMode:
 *       type: string
 *       enum:
 *         - "Regular"
 *         - "Competitive Programming"
 *       example: ["Regular", "Competitive Programming"]
 */
export type ISubmissionMode = 'Compatitive Programming' | 'Regular';

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmission:
 *       properties:
 *         typedCode:
 *           type: string
 *         language:
 *           type: string
 *         inputs:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ITestInput'
 *         mode:
 *           $ref: '#/components/schemas/ISubmissionMode'
 *       required:
 *         - typedCode
 *         - language
 *         - inputs
 *         - mode
 */
export interface ISubmission {
  typedCode: string;
  language: Language;
  inputs: ITestInput[];
  mode: ISubmissionMode;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ICheckSubmission:
 *       properties:
 *         submissionId:
 *           type: string
 *       required:
 *         - submissionId
 */
export interface ICheckSubmission {
  submissionId: string;
}
