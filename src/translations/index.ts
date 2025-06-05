
import { enTranslations } from './en';
import { esTranslations } from './es';
import type { Language, TranslationValue } from '@/types/language';

export const translations: Record<Language, Record<string, TranslationValue>> = {
  en: enTranslations,
  es: esTranslations,
};
