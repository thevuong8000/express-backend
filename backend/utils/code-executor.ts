import path from 'path';
import { Language } from '../routes/api/requests/code_executor';

export const TEMP_SUBMISSION_PARENT_DIRECTORY = path.resolve(__dirname, '../tmp');

/**
 * Check if the language is compiled
 * @param language
 * @returns
 */
export const isCompiledLanguage = (language: Language) => {
  return (['cpp'] as Language[]).includes(language);
};

/**
 * Get script to execute the file (without input)
 * @param filename name of file to execute
 * @param language language of the file
 * @returns the script
 */
export const getExecuteScript = (filename: string, language: Language) => {
  switch (language) {
    case 'cpp':
      return filename;

    case 'java':
      return `java ${filename}`;

    case 'python':
      return `python3 ${filename}`;

    case 'javascript':
      return `node ${filename}`;

    default:
      return 'ThisIsNotAValidScript';
  }
};

/**
 * Get the path to target submission directory
 * @param submissionId submission id
 * @returns the path to target submission directory
 */
export const getSubmissionDirectory = (submissionId: string) => {
  return path.resolve(TEMP_SUBMISSION_PARENT_DIRECTORY, `../tmp/${submissionId}`);
};

/**
 * Get the input directory of target submission
 * @param submissionId submission id
 * @returns the path to target input directory
 */
export const getSubmissionInputDirectory = (submissionId: string) => {
  const submissionDir = getSubmissionDirectory(submissionId);
  return path.resolve(submissionDir, './input');
};

/**
 * Get the output directory of target submission
 * @param submissionId submission id
 * @returns the path to target output directory
 */
export const getSubmissionOutputDirectory = (submissionId: string) => {
  const submissionDir = getSubmissionDirectory(submissionId);
  return path.resolve(submissionDir, './output');
};

/**
 * Get the output result of submission in Regular Mode
 * @param submissionId submission id
 * @returns the result of the code
 */
export const getRegularModeOutputFileName = (submissionId: string) => {
  const outputDir = getSubmissionOutputDirectory(submissionId);
  return path.resolve(outputDir, './output');
};
