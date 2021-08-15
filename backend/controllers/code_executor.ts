import { RequestHandler } from 'express';
import { ICheckSubmission, ISubmission } from '../routes/api/requests/code_executor';
import { v4 as uuidv4 } from 'uuid';
import { CodeExecutor, ResultChecker } from '../utils/code-executor/index';
import { ISubmissionOutput } from '../routes/api/responses/code_executor';

/**
 * Process submitted code
 */
export const submitCode: RequestHandler = async (req, res, next) => {
  const { typedCode, inputs, language, mode } = <ISubmission>req.body;
  const submissionId = uuidv4();

  const executor = new CodeExecutor({ submissionId, typedCode, inputs, language, mode });

  try {
    executor.setupSubmission();
  } catch (err) {
    return next(err);
  }

  res.status(200).json({ submissionId });
  executor.execute();
};

/**
 * Check output of specific submission ID
 */
export const checkCodeResult: RequestHandler = async (req, res, next) => {
  const { submissionId } = <ICheckSubmission>req.body;
  const checker = new ResultChecker({ submissionId });

  console.info('Check submission', submissionId);

  const result = await checker.getResult();
  res.status(200).json({ result });
};
