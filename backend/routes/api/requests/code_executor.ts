export type Language = 'javascript' | 'typescript' | 'cpp' | 'python' | 'java';

export interface ICodeExecutorInput {
  typedCode: string;
  language: Language;
  input: string;
}

