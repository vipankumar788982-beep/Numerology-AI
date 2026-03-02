import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { reportAPI } from '../services/api';
import { generatePDF } from '../utils/pdfGenerator';
import LoadingSpinner from '../components/LoadingSpinner';

function Report() {
  const { shareId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReport();
  }, [shareId]);

  const loadReport = async () => {
    try {
      const response = await reportAPI.getByShareId(shareId);
      setReport(response.data);
    } catch (err) {
      setError('Report not found');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    if (report) {
      generatePDF(report);
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="card max-w-md mx-auto text-center">
          <p className="text-red-600 text-xl">{error}</p>
        </div>
      </div>
    );
  }

  const { fullName, dateOfBirth, calculations, interpretations, luckyDates } = report;

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="card mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Numerology Report for {fullName}
            </h1>
            <p className="text-gray-600">
              Date of Birth: {new Date(dateOfBirth).toLocaleDateString()}
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={handleShare} className="btn-secondary">
              📤 Share
            </button>
            <button onClick={handleDownloadPDF} className="btn-primary">
              📄 Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Life Path Number */}
      <div className="card mb-6">
        <h2 className="text-2xl font-bold text-primary mb-4">
          Life Path Number: {calculations.lifePathNumber.value}
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <p className="text-sm text-gray-600 font-mono">{calculations.lifePathNumber.steps}</p>
        </div>
        {interpretations.lifePathNumber && (
          <>
            <h3 className="text-xl font-bold mb-2">{interpretations.lifePathNumber.title}</h3>
            <p className="text-gray-700 mb-4">{interpretations.lifePathNumber.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-bold text-green-700 mb-2">Strengths</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {interpretations.lifePathNumber.strengths?.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-700 mb-2">Weaknesses</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {interpretations.lifePathNumber.weaknesses?.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold mb-2">Career Suggestions</h4>
              <div className="flex flex-wrap gap-2">
                {interpretations.lifePathNumber.career?.map((c, i) => (
                  <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-bold mb-2">Relationships</h4>
              <p className="text-gray-700">{interpretations.lifePathNumber.relationships}</p>
            </div>

            <div>
              <h4 className="font-bold mb-2">Lucky Numbers</h4>
              <div className="flex gap-2">
                {interpretations.lifePathNumber.luckyNumbers?.map((n, i) => (
                  <span key={i} className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Other Numbers Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Birthday Number */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-3">
            Birthday Number: {calculations.birthdayNumber.value}
          </h3>
          <p className="text-gray-700">{interpretations.birthdayNumber?.trait}</p>
        </div>

        {/* Expression Number */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-3">
            Expression Number: {calculations.expressionNumber.value}
          </h3>
          <div className="bg-gray-50 p-3 rounded-lg mb-3 text-xs text-gray-600 font-mono">
            {calculations.expressionNumber.steps}
          </div>
          <p className="text-gray-700">{interpretations.expressionNumber?.destiny}</p>
        </div>

        {/* Soul Urge Number */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-3">
            Soul Urge Number: {calculations.soulUrgeNumber.value}
          </h3>
          <div className="bg-gray-50 p-3 rounded-lg mb-3 text-xs text-gray-600 font-mono">
            {calculations.soulUrgeNumber.steps}
          </div>
          <p className="text-gray-700">{interpretations.soulUrgeNumber?.desire}</p>
        </div>

        {/* Personality Number */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-3">
            Personality Number: {calculations.personalityNumber.value}
          </h3>
          <div className="bg-gray-50 p-3 rounded-lg mb-3 text-xs text-gray-600 font-mono">
            {calculations.personalityNumber.steps}
          </div>
          <p className="text-gray-700">{interpretations.personalityNumber?.impression}</p>
        </div>

        {/* Maturity Number */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-3">
            Maturity Number: {calculations.maturityNumber.value}
          </h3>
          <p className="text-gray-700">{interpretations.maturityNumber?.later}</p>
        </div>

        {/* Personal Year Number */}
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-3">
            Personal Year Number: {calculations.personalYearNumber.value}
          </h3>
          <p className="text-gray-700">{interpretations.personalYearNumber?.year}</p>
        </div>
      </div>

      {/* Karmic Debt */}
      {calculations.karmicDebtNumbers.length > 0 && (
        <div className="card mb-6 bg-amber-50 border-2 border-amber-200">
          <h3 className="text-xl font-bold text-amber-800 mb-4">⚠️ Karmic Debt Numbers</h3>
          {interpretations.karmicDebt?.map((debt, i) => (
            <div key={i} className="mb-3">
              <h4 className="font-bold text-amber-700">{debt.number}</h4>
              <p className="text-gray-700">{debt.meaning}</p>
            </div>
          ))}
        </div>
      )}

      {/* Lucky Dates */}
      {luckyDates.length > 0 && (
        <div className="card">
          <h3 className="text-xl font-bold text-primary mb-4">🍀 Lucky Dates This Week</h3>
          <div className="flex flex-wrap gap-3">
            {luckyDates.map((date, i) => (
              <span key={i} className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
                {new Date(date).toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Report;
