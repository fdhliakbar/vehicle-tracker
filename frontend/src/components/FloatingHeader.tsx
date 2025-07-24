import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

export function FloatingHeader() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate('/');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white transition-colors duration-300 flex items-center">
          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center mr-3 border border-white/30">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
          </div>
          Vehicle Tracker
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated && user && (
            <span className="block text-sm text-white/90 px-2 bg-white/10 backdrop-blur-sm rounded-full py-1 border border-white/20">
              Welcome, {user.name}
            </span>
          )}
          <button
            onClick={handleAuthAction}
            className="inline-block bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full hover:bg-white/30 transition-all duration-300 border border-white/30 hover:scale-105"
          >
            {isAuthenticated ? 'Logout' : 'Sign Up'}
          </button>
        </div>
      </nav>
    </header>
  );
}
