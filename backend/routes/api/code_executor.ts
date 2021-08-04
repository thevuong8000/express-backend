import { Router } from 'express';
import { submitCode, checkCodeResult } from '../../controllers/code_executor';

/**
 * @swagger
 * tags:
 *   name: Code Executor
 *   description: Code Executor
 */
const router = Router();

/**
 * @swagger
 * /code-executor:
 *  post:
 *   summary: Submit code, language, and tests to execute.
 *   description: Execute code with some languages, return the output to every test case
 *   tags:
 *     - Code Executor
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/ISubmission'
 *   responses:
 *     201:
 *       description: A list of users
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ISubmissionResponse'
 *     400:
 *       description: Can not execute code block.
 */
router.post('/', submitCode);

/**
 * @swagger
 * /code-executor/check-result:
 *  post:
 *   summary: Check code execution process.
 *   description: Request the process of the result of specific sumission.
 *   tags:
 *     - Code Executor
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/ICheckSubmission'
 *   responses:
 *     201:
 *       description: Object with keys are test-id and values are corresponding output.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ISubmissionResults'
 *     400:
 *       description: Can not achieve output.
 */
router.post('/check-result', checkCodeResult);

export default router;
