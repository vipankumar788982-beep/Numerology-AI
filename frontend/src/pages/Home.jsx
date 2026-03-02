import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reportAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी (Hindi)' },
  { code: 'hinglish', name: 'Hinglish' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' }
];

function Home() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: '',
    language: 'en'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await reportAPI.generate(formData);
      navigate(`/report/${response.data.shareId}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Discover Your Life Path
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Get your complete numerology report using the ancient Pythagorean method. 
          Understand your life path, destiny, and hidden potential.
        </p>
      </div>

      {/* Form Section */}
      <div className="max-w-2xl mx-auto">
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Your Report</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Full Name *
              </label>
              <input
                type="text"
                required
                className="input-field"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                className="input-field"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Preferred Language
              </label>
              <select
                className="input-field"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <LoadingSpinner /> : 'Generate My Report'}
            </button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="card text-center">
            <div className="text-4xl mb-3">🔢</div>
            <h3 className="font-bold text-lg mb-2">Pythagorean Method</h3>
            <p className="text-gray-600 text-sm">
              Ancient calculation system used for thousands of years
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-3">🌍</div>
            <h3 className="font-bold text-lg mb-2">Multi-Language</h3>
            <p className="text-gray-600 text-sm">
              Reports available in English, Hindi, Hinglish, and more
            </p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-lg mb-2">Complete Analysis</h3>
            <p className="text-gray-600 text-sm">
              Life path, destiny, soul urge, and karmic debt numbers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
