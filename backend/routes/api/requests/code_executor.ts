export type Language = 'javascript' | 'typescript' | 'cpp' | 'python' | 'java';

export interface ITestInput {
  id: string;
  input: string;
}

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
 *           type: string
 *       required:
 *         - typedCode
 *         - language
 *         - inputs
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
