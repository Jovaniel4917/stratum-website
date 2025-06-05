
export type Language = 'en' | 'es';

export type TranslationValue = string | Record<string, TranslationValue>;

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}
