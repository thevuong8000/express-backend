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
 *     IOutputSuccess:
 *       properties:
 *         status:
 *           type: string
 *           example: "Success"
 *         output:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     IOutputFailure:
 *       properties:
 *         status:
 *           type: string
 *           example: "Error"
 *         errorDetail:
 *           type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     IOutput:
 *       oneOf:
 *         - $ref: '#/components/schemas/IOutputSuccess'
 *         - $ref: '#/components/schemas/IOutputFailure'
 */
export interface IOutput {
  readonly status: 'Success' | 'Error' | 'Pending';

  // For Error
  readonly type?: 'Runtime Error';
  readonly errorDetail?: string;

  // For Success
  readonly output?: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionOutputRegular:
 *       properties:
 *         regular_output:
 *           $ref: '#/components/schemas/IOutput'
 */
export interface ISubmissionOutputRegular {
  readonly [SubmissionFileManagerBase.regularOutputFileName]: IOutput;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionOutputCompetitiveResult:
 *       properties:
 *         {test_id}:
 *           $ref: '#/components/schemas/IOutput'
 */
export type ISubmissionOutputCompetitiveResult = Record<string, IOutput>;

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionOutputCompetitiveSuccess:
 *       properties:
 *         status:
 *           type: string
 *           example: "Success"
 *         result:
 *           $ref: '#/components/schemas/ISubmissionOutputCompetitiveResult'
 */
export interface ISubmissionOutputCompetitiveSuccess {
  readonly status: 'Success';
  readonly result: ISubmissionOutputCompetitiveResult;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionOutputCompileError:
 *       properties:
 *         status:
 *           type: string
 *           example: "Error"
 *         type:
 *           type: string
 *           example: "Compile Error"
 *         detail:
 *           type: string
 */
export interface ISubmissionOutputCompileError {
  readonly status: 'Error';
  readonly type: 'Compile Error';
  readonly detail: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionOutputRegularSuccess:
 *       properties:
 *         status:
 *           type: string
 *           example: "Success"
 *         result:
 *           $ref: '#/components/schemas/ISubmissionOutputRegular'
 */
export interface ISubmissionOutputRegularSuccess {
  readonly status: 'Success';
  readonly result: ISubmissionOutputRegular;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ISubmissionOutput:
 *       oneOf:
 *         - $ref: '#/components/schemas/ISubmissionOutputCompetitiveSuccess'
 *         - $ref: '#/components/schemas/ISubmissionOutputRegularSuccess'
 *         - $ref: '#/components/schemas/ISubmissionOutputCompileError'
 */
export interface ISubmissionOutput {
  readonly status: 'Success' | 'Error';
  readonly isFinished?: boolean;
  readonly error?: string;
  readonly result?: ISubmissionOutputRegular | ISubmissionOutputCompetitiveResult;
}
