import jsPDF from 'jspdf';

export function generatePDF(report) {
  const doc = new jsPDF();
  const { fullName, dateOfBirth, calculations, interpretations } = report;
  
  let y = 20;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.height;

  const checkPageBreak = () => {
    if (y > pageHeight - 20) {
      doc.addPage();
      y = 20;
    }
  };

  // Title
  doc.setFontSize(20);
  doc.setTextColor(99, 102, 241);
  doc.text('Numerology Report', 105, y, { align: 'center' });
  y += 15;

  // Personal Info
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text(`Name: ${fullName}`, 20, y);
  y += lineHeight;
  doc.text(`Date of Birth: ${new Date(dateOfBirth).toLocaleDateString()}`, 20, y);
  y += 15;

  // Life Path Number
  doc.setFontSize(16);
  doc.setTextColor(99, 102, 241);
  doc.text(`Life Path Number: ${calculations.lifePathNumber.value}`, 20, y);
  y += 10;

  if (interpretations.lifePathNumber) {
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(interpretations.lifePathNumber.title, 20, y);
    y += lineHeight;
    
    const descLines = doc.splitTextToSize(interpretations.lifePathNumber.description, 170);
    descLines.forEach(line => {
      checkPageBreak();
      doc.text(line, 20, y);
      y += lineHeight;
    });
    y += 5;
  }

  // Other Numbers
  const numbers = [
    { name: 'Birthday Number', value: calculations.birthdayNumber.value, interp: interpretations.birthdayNumber?.trait },
    { name: 'Expression Number', value: calculations.expressionNumber.value, interp: interpretations.expressionNumber?.destiny },
    { name: 'Soul Urge Number', value: calculations.soulUrgeNumber.value, interp: interpretations.soulUrgeNumber?.desire },
    { name: 'Personality Number', value: calculations.personalityNumber.value, interp: interpretations.personalityNumber?.impression },
    { name: 'Maturity Number', value: calculations.maturityNumber.value, interp: interpretations.maturityNumber?.later },
    { name: 'Personal Year Number', value: calculations.personalYearNumber.value, interp: interpretations.personalYearNumber?.year }
  ];

  numbers.forEach(num => {
    checkPageBreak();
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241);
    doc.text(`${num.name}: ${num.value}`, 20, y);
    y += 8;
    
    if (num.interp) {
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(num.interp, 170);
      lines.forEach(line => {
        checkPageBreak();
        doc.text(line, 20, y);
        y += lineHeight;
      });
    }
    y += 5;
  });

  // Karmic Debt
  if (calculations.karmicDebtNumbers.length > 0) {
    checkPageBreak();
    doc.setFontSize(14);
    doc.setTextColor(217, 119, 6);
    doc.text('Karmic Debt Numbers', 20, y);
    y += 8;
    
    interpretations.karmicDebt?.forEach(debt => {
      checkPageBreak();
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(debt.number, 20, y);
      y += lineHeight;
      const lines = doc.splitTextToSize(debt.meaning, 170);
      lines.forEach(line => {
        checkPageBreak();
        doc.text(line, 20, y);
        y += lineHeight;
      });
      y += 3;
    });
  }

  doc.save(`numerology-report-${fullName.replace(/\s+/g, '-')}.pdf`);
}
