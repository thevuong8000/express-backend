export type Language = 'javascript' | 'typescript' | 'cpp' | 'python' | 'java';

export interface ITestInput {
  testId: string;
  input: string;
}

export interface ISubmission {
  typedCode: string;
  language: Language;
  inputs: ITestInput[];
}

