import fs from 'fs';
import path from 'path';

const languageCache = {};

function loadLanguage(lang) {
  if (languageCache[lang]) {
    return languageCache[lang];
  }

  try {
    const filePath = path.join(process.cwd(), 'languages', `${lang}.json`);
    const data = fs.readFileSync(filePath, 'utf-8');
    languageCache[lang] = JSON.parse(data);
    return languageCache[lang];
  } catch (error) {
    // Fallback to English
    if (lang !== 'en') {
      return loadLanguage('en');
    }
    return null;
  }
}

export function getInterpretations(calculations, language = 'en') {
  const lang = loadLanguage(language);

  if (!lang) {
    return { error: 'Language not found' };
  }

  return {
    lifePathNumber: lang.lifePathNumber[calculations.lifePathNumber.value] || {},
    birthdayNumber: lang.birthdayNumber[calculations.birthdayNumber.value] || {},
    expressionNumber: lang.expressionNumber[calculations.expressionNumber.value] || {},
    soulUrgeNumber: lang.soulUrgeNumber[calculations.soulUrgeNumber.value] || {},
    personalityNumber: lang.personalityNumber[calculations.personalityNumber.value] || {},
    maturityNumber: lang.maturityNumber[calculations.maturityNumber.value] || {},
    personalYearNumber: lang.personalYearNumber[calculations.personalYearNumber.value] || {},
    karmicDebt: calculations.karmicDebtNumbers.map(num => lang.karmicDebt[num] || {})
  };
}
