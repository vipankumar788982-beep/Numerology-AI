import { Link } from 'react-router-dom';

function Header({ user, onLogout }) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            ✨ Numerology Insight
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
                  Dashboard
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">
                    Admin
                  </Link>
                )}
                <button
                  onClick={onLogout}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
