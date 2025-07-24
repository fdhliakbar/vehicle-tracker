import type { ReactNode } from 'react';
import { useAuthStore } from '../store/authStore';
import { Link, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-black transition-colors duration-300 flex items-center">
                <div className="w-8 h-8 bg-[#F97C21]/80 rounded-lg flex items-center justify-center mr-3">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
                <span>Vehicle Tracker</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4">
                {isAuthenticated && user && (
                  <span className="text-sm text-gray-600">
                    Welcome, {user.name}
                  </span>
                )}
                <button
                  onClick={handleAuthAction}
                  className="bg-[#F97C21] text-white px-4 py-2 rounded-lg hover:bg-[#F97C21]/80 transition-colors duration-300"
                >
                  {isAuthenticated ? 'Logout' : 'Sign Up'}
                </button>
            </div>
            <button 
              id="mobileMenuButton" 
              className="md:hidden text-gray-700 hover:text-[#F97C21] focus:outline-none transition-colors duration-300"
              onClick={() => {
                const menu = document.getElementById('mobileMenu');
                if (menu) {
                  menu.classList.toggle('mobile-menu-show');
                }
              }}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>
        <div id="mobileMenu" className="mobile-menu md:hidden bg-white shadow-lg absolute w-full left-0 transform -translate-y-full opacity-0 transition-all duration-300">
            <div className="container mx-auto px-4 py-4 space-y-4">
                <Link to="/" className="block text-gray-700 hover:text-[#F97C21] transition-colors duration-300">Home</Link>
                <a href="#about" className="block text-gray-700 hover:text-[#F97C21] transition-colors duration-300">About</a>
                <a href="#services" className="block text-gray-700 hover:text-[#F97C21] transition-colors duration-300">Services</a>
                <a href="#contact" className="block text-gray-700 hover:text-[#F97C21] transition-colors duration-300">Contact</a>
                {isAuthenticated && user && (
                  <span className="block text-sm text-gray-600 px-2">
                    Welcome, {user.name}
                  </span>
                )}
                <button
                  onClick={handleAuthAction}
                  className="inline-block bg-[#F97C21] text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                >
                  {isAuthenticated ? 'Logout' : 'Sign Up'}
                </button>
            </div>
        </div>
    </header>

      {/* Main Content */}
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
