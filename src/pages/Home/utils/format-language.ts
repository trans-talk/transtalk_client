export const formatLanguage = (language: string): string => {
  switch (language) {
    case 'ko':
      return 'Korean';
    case 'en-us':
      return 'English';
    case 'ja':
      return 'Japanese';
    case 'zh':
      return 'Chinese';
    case 'es':
      return 'Spanish';
    default:
      return language;
  }
};
