// Pythagorean numerology chart
const PYTHAGOREAN_CHART = {
  'A': 1, 'J': 1, 'S': 1,
  'B': 2, 'K': 2, 'T': 2,
  'C': 3, 'L': 3, 'U': 3,
  'D': 4, 'M': 4, 'V': 4,
  'E': 5, 'N': 5, 'W': 5,
  'F': 6, 'O': 6, 'X': 6,
  'G': 7, 'P': 7, 'Y': 7,
  'H': 8, 'Q': 8, 'Z': 8,
  'I': 9, 'R': 9
};

const VOWELS = ['A', 'E', 'I', 'O', 'U'];
const KARMIC_DEBT = [13, 14, 16, 19];
const MASTER_NUMBERS = [11, 22, 33];

// Reduce number to single digit unless master number
function reduceNumber(num, trackKarmic = false) {
  const steps = [];
  let current = num;
  let karmicDebt = null;

  while (current > 9 && !MASTER_NUMBERS.includes(current)) {
    if (trackKarmic && KARMIC_DEBT.includes(current)) {
      karmicDebt = current;
    }
    const digits = current.toString().split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    steps.push(`${current} = ${digits.join(' + ')} = ${sum}`);
    current = sum;
  }

  return { value: current, steps: steps.join(' → '), karmicDebt };
}

// Calculate Life Path Number
export function calculateLifePath(dateOfBirth) {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayReduced = reduceNumber(day, true);
  const monthReduced = reduceNumber(month, true);
  const yearReduced = reduceNumber(year, true);

  const total = dayReduced.value + monthReduced.value + yearReduced.value;
  const result = reduceNumber(total, true);

  const steps = `Day: ${day} → ${dayReduced.value}, Month: ${month} → ${monthReduced.value}, Year: ${year} → ${yearReduced.value} | Total: ${dayReduced.value} + ${monthReduced.value} + ${yearReduced.value} = ${total} → ${result.value}`;

  return {
    value: result.value,
    steps,
    karmicDebt: result.karmicDebt || dayReduced.karmicDebt || monthReduced.karmicDebt || yearReduced.karmicDebt
  };
}

// Calculate Birthday Number
export function calculateBirthday(dateOfBirth) {
  const date = new Date(dateOfBirth);
  const day = date.getDate();
  return reduceNumber(day).value;
}

// Calculate Expression/Destiny Number
export function calculateExpression(fullName) {
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  const letterValues = [];

  for (const letter of name) {
    const value = PYTHAGOREAN_CHART[letter] || 0;
    if (value) {
      letterValues.push(`${letter}=${value}`);
      sum += value;
    }
  }

  const result = reduceNumber(sum, true);
  const steps = `${letterValues.join(', ')} | Sum: ${sum} → ${result.value}`;

  return { value: result.value, steps, karmicDebt: result.karmicDebt };
}

// Calculate Soul Urge Number (vowels only)
export function calculateSoulUrge(fullName) {
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  const letterValues = [];

  for (const letter of name) {
    if (VOWELS.includes(letter)) {
      const value = PYTHAGOREAN_CHART[letter];
      letterValues.push(`${letter}=${value}`);
      sum += value;
    }
  }

  const result = reduceNumber(sum, true);
  const steps = `Vowels: ${letterValues.join(', ')} | Sum: ${sum} → ${result.value}`;

  return { value: result.value, steps, karmicDebt: result.karmicDebt };
}

// Calculate Personality Number (consonants only)
export function calculatePersonality(fullName) {
  const name = fullName.toUpperCase().replace(/[^A-Z]/g, '');
  let sum = 0;
  const letterValues = [];

  for (const letter of name) {
    if (!VOWELS.includes(letter)) {
      const value = PYTHAGOREAN_CHART[letter];
      letterValues.push(`${letter}=${value}`);
      sum += value;
    }
  }

  const result = reduceNumber(sum, true);
  const steps = `Consonants: ${letterValues.join(', ')} | Sum: ${sum} → ${result.value}`;

  return { value: result.value, steps, karmicDebt: result.karmicDebt };
}

// Calculate Maturity Number
export function calculateMaturity(lifePath, expression) {
  const sum = lifePath + expression;
  return reduceNumber(sum).value;
}

// Calculate Personal Year Number
export function calculatePersonalYear(dateOfBirth) {
  const date = new Date(dateOfBirth);
  const currentYear = new Date().getFullYear();
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const dayReduced = reduceNumber(day).value;
  const monthReduced = reduceNumber(month).value;
  const yearReduced = reduceNumber(currentYear).value;

  const total = dayReduced + monthReduced + yearReduced;
  return reduceNumber(total).value;
}

// Generate lucky dates for the week
export function generateLuckyDates(lifePathNumber) {
  const today = new Date();
  const luckyDates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const dayNumber = reduceNumber(date.getDate()).value;

    if (dayNumber === lifePathNumber || (dayNumber + lifePathNumber) % 9 === 0) {
      luckyDates.push(date.toISOString().split('T')[0]);
    }
  }

  return luckyDates;
}

// Complete numerology calculation
export function calculateNumerology(fullName, dateOfBirth) {
  const lifePath = calculateLifePath(dateOfBirth);
  const birthday = calculateBirthday(dateOfBirth);
  const expression = calculateExpression(fullName);
  const soulUrge = calculateSoulUrge(fullName);
  const personality = calculatePersonality(fullName);
  const maturity = calculateMaturity(lifePath.value, expression.value);
  const personalYear = calculatePersonalYear(dateOfBirth);

  const karmicDebtNumbers = [
    lifePath.karmicDebt,
    expression.karmicDebt,
    soulUrge.karmicDebt,
    personality.karmicDebt
  ].filter(Boolean);

  return {
    lifePathNumber: { value: lifePath.value, steps: lifePath.steps },
    birthdayNumber: { value: birthday },
    expressionNumber: { value: expression.value, steps: expression.steps },
    soulUrgeNumber: { value: soulUrge.value, steps: soulUrge.steps },
    personalityNumber: { value: personality.value, steps: personality.steps },
    maturityNumber: { value: maturity },
    personalYearNumber: { value: personalYear },
    karmicDebtNumbers: [...new Set(karmicDebtNumbers)]
  };
}
