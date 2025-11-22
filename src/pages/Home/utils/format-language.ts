import { LANGUAGE_LABEL } from '@constant/language';

export const formatLanguage = (language: string): string => {
  return LANGUAGE_LABEL[language as keyof typeof LANGUAGE_LABEL] ?? language;
};
