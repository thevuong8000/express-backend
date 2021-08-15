import { Language } from '../../routes/api/requests/code_executor';

export default class LanguageManager {
  static COMPILED_LANGUAGE: Language[] = ['cpp'];

  static isCompiledLanguage = (language: Language) => {
    return LanguageManager.COMPILED_LANGUAGE.includes(language);
  };
}
