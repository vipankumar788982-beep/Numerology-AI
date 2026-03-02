import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { reportAPI } from '../services/api';

function Dashboard({ user }) {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadReports();
  }, [user, navigate]);

  const loadReports = async () => {
    try {
      const response = await reportAPI.getUserReports();
      setReports(response.data);
    } catch (err) {
      console.error('Failed to load reports', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome, {user.fullName}!
        </h1>
        <p className="text-gray-600">View and manage your numerology reports</p>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Reports</h2>
        
        {loading ? (
          <p className="text-gray-600">Loading reports...</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't generated any reports yet.</p>
            <Link to="/" className="btn-primary">
              Generate Your First Report
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.map((report) => (
              <div
                key={report._id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{report.fullName}</h3>
                    <p className="text-gray-600 text-sm">
                      {new Date(report.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Created: {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/report/${report.shareId}`}
                    className="btn-primary text-sm"
                  >
                    View Report
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
