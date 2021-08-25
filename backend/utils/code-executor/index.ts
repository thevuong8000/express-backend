import path from 'path';

export const TEMP_SUBMISSION_PARENT_DIRECTORY = path.resolve(__dirname, '../../tmp');

export { default as CodeExecutor } from './codeExecutor';
export { default as ResultChecker } from './resultChecker';
