import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-black transition-colors duration-300">
                Vehicle Dashboard
            </a>
            <div className="hidden md:flex space-x-6">
                <a href="#" className="nav-link text-gray-700 hover:text-indigo-800 transition-colors duration-300">Home</a>
                <a href="#" className="nav-link text-gray-700 hover:text-indigo-800 transition-colors duration-300">About</a>
                <a href="#" className="nav-link text-gray-700 hover:text-indigo-800 transition-colors duration-300">Services</a>
                <a href="#" className="nav-link text-gray-700 hover:text-indigo-800 transition-colors duration-300">Contact</a>
            </div>
            <div className="hidden md:flex items-center space-x-4">
                
                <a href="#" className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign Up</a>
            </div>
            <button id="mobileMenuButton" className="md:hidden text-gray-700 hover:text-indigo-800 focus:outline-none transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </nav>
        <div id="mobileMenu" className="mobile-menu md:hidden bg-white dark:bg-gray-800 shadow-lg absolute w-full left-0 transform -translate-y-full opacity-0">
            <div className="container mx-auto px-4 py-4 space-y-4">
                <a href="#" className="block text-gray-700 hover:text-indigo-800 transition-colors duration-300">Home</a>
                <a href="#" className="block text-gray-700 hover:text-indigo-800 transition-colors duration-300">About</a>
                <a href="#" className="block text-gray-700 hover:text-indigo-800 transition-colors duration-300">Services</a>
                <a href="#" className="block text-gray-700 hover:text-indigo-800 transition-colors duration-300">Contact</a>
                <a href="#" className="inline-block bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">Sign Up</a>
            </div>
        </div>
    </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            © 2025 Vehicle Tracker Dashboard. Built for Widya Intern Assignment.
          </p>
        </div>
      </footer>
    </div>
  );
}
