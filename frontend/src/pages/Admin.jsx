import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../services/api';

const LANGUAGES = ['en', 'hi', 'hinglish', 'es', 'fr', 'ar'];

function Admin({ user }) {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [interpretations, setInterpretations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }
  }, [user, navigate]);

  const loadInterpretations = async (lang) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await adminAPI.getInterpretations(lang);
      setInterpretations(response.data);
    } catch (err) {
      setMessage('Failed to load interpretations');
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    loadInterpretations(lang);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      await adminAPI.updateInterpretations(selectedLanguage, interpretations);
      setMessage('Interpretations updated successfully!');
    } catch (err) {
      setMessage('Failed to update interpretations');
    } finally {
      setSaving(false);
    }
  };

  if (!user || !user.isAdmin) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage numerology interpretations</p>
      </div>

      <div className="card mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select Language</h2>
        <div className="flex flex-wrap gap-3">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedLanguage === lang
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="card">
          <p className="text-gray-600">Loading interpretations...</p>
        </div>
      )}

      {interpretations && !loading && (
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Edit Interpretations ({selectedLanguage.toUpperCase()})
            </h2>
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>

          {message && (
            <div className={`mb-4 px-4 py-3 rounded-lg ${
              message.includes('success')
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">
              Edit the JSON structure below. Be careful with syntax!
            </p>
            <textarea
              className="w-full h-96 font-mono text-sm p-4 border border-gray-300 rounded-lg"
              value={JSON.stringify(interpretations, null, 2)}
              onChange={(e) => {
                try {
                  setInterpretations(JSON.parse(e.target.value));
                } catch (err) {
                  // Invalid JSON, don't update
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
