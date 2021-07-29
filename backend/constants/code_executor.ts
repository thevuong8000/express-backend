import { Language } from '../routes/api/requests/code_executor';

export const FILE_EXTENSIONS: Record<Language, string> = {
  cpp: 'cpp',
  java: 'java',
  javascript: 'js',
  typescript: 'ts',
  python: 'py'
};
