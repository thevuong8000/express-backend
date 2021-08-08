import { Language } from '../routes/api/requests/code_executor';

export const getCodeExecuteScript = (language: Language) => {
  switch (language) {
    case 'cpp':
      return (filename: string) => `g++ -std=c++17 -o test ${filename}; ./test; rm ./test`;
    case 'javascript':
      return (filename: string) => `node ${filename}`;
    case 'python':
      return (filename: string) => `python3 ${filename}`;
    default:
      return (filename: string) => `${filename} is not supported or valid.`;
  }
};

/**
 * Check if the language is compiled
 * @param language 
 * @returns 
 */
export const isCompiledLanguage = (language: Language) => {
  return (['java', 'cpp'] as Language[]).includes(language);
};

export const getExecuteScript = (filename: string, language: Language) => {
  switch (language){
    case 'cpp':
    case 'java':
      return filename;
    
    case 'python':
      return `python3 ${filename}`;
    
    case 'javascript':
      return `node ${filename}`;

    default:
      return 'ThisIsNotAValidScript'
  }
}
