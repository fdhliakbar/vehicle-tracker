import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });

  const { login, register } = useAuthStore();
  const navigate = useNavigate();

  // Email validation function
  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  // Password validation function (only for registration)
  const validatePassword = (password: string, isForRegistration: boolean = false): string => {
    if (!password) return 'Password is required';
    
    // Skip complex validation for login
    if (!isForRegistration) return '';
    
    // Complex validation only for registration
    if (password.length < 8) return 'Password must be at least 8 characters long';
    
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!hasLowercase) return 'Password must contain at least one lowercase letter';
    if (!hasUppercase) return 'Password must contain at least one uppercase letter';
    if (!hasSpecialChar) return 'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)';
    
    return '';
  };

  // Real-time validation on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear previous validation errors and validate in real-time
    const newValidationErrors = { ...validationErrors };
    
    if (name === 'email') {
      newValidationErrors.email = validateEmail(value);
    }
    
    if (name === 'password') {
      newValidationErrors.password = validatePassword(value, !isLogin);
    }
    
    setValidationErrors(newValidationErrors);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate all fields before submission
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password, !isLogin);
    
    if (emailError || passwordError) {
      setValidationErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }
    
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        // Additional validation for registration
        if (!formData.name.trim()) {
          setError('Name is required for registration');
          setLoading(false);
          return;
        }
        result = await register(formData.email, formData.password, formData.name);
      }

      if (result.success) {
        const { user } = useAuthStore.getState();
        if (user?.role === 'ADMIN') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        setError(result.message || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    alert('Google login will be implemented soon!');
  };

  // Handler untuk navigasi ke homepage
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F97C21]/50 via-white to-[#F97C21]/50 flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Logo - Clickable */}
          <div 
            className="flex items-center mb-8 cursor-pointer group transition-all duration-200 hover:transform hover:scale-105"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 bg-[#F97C21] rounded-lg flex items-center justify-center mr-3 group-hover:bg-[#F97C21]/90 transition-colors duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-[#F97C21] transition-colors duration-200">
              Vehicle Tracker
            </span>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-600">
              {isLogin 
                ? 'Enter your email and password to access your account.'
                : 'Enter your details to create your account.'
              }
            </p>
            
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field (Register only) */}
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F97C21]/80 focus:border-[#F97C21]/50 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F97C21]/80 focus:border-[#F97C21]/50 transition-colors ${
                  validationErrors.email ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'
                }`}
                placeholder={isLogin ? "example@gmail.com" : "Enter your email"}
              />
              {validationErrors.email && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#F97C21]/80 focus:border-[#F97C21]/50 transition-colors pr-12 ${
                    validationErrors.password ? 'border-red-300 focus:ring-red-200' : 'border-gray-300'
                  }`}
                  placeholder={isLogin ? "your password." : "Enter your password"}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
              )}
              
              {/* Password Requirements (Show only for registration) */}
              {!isLogin && (
                <div className="mt-2 text-xs text-gray-500">
                  <p className="mb-1">Password must contain:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                      At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                      One lowercase letter (a-z)
                    </li>
                    <li className={/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                      One uppercase letter (A-Z)
                    </li>
                    <li className={/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                      One special character (!@#$%^&*(),.?":{}|&lt;&gt;)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#F97C21]/60 focus:ring-[#F97C21]/80 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember Me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-[#F97C21]/60 hover:text-[#F97C21]/50">
                    Forgot Your Password?
                  </a>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F97C21] text-white py-3 px-4 rounded-lg hover:bg-[#F97C21]/80 focus:ring-2 focus:ring-[#F97C21]/80 focus:ring-offset-2 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                isLogin ? 'Log In' : 'Create Account'
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or Login With</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-[#F97C21]/80 focus:ring-offset-2 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>

            {/* Switch between Login/Register */}
            <div className="text-center">
              <span className="text-gray-600">
                {isLogin ? "Don't Have An Account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setFormData({ email: '', password: '', name: '' });
                  setValidationErrors({ email: '', password: '' });
                }}
                className="font-medium text-[#F97C21]/60 hover:text-[#F97C21]/50"
              >
                {isLogin ? 'Register Now.' : 'Login here.'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#F97C21] to-[#F97C21]/80 items-center justify-center p-12">
        <div className="max-w-lg text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Effortlessly manage your fleet and operations.
          </h2>
          <p className="text-xl text-white-20 mb-8">
            Log in to access your vehicle tracking dashboard and manage your team.
          </p>
          
          {/* Dashboard Preview */}
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
            <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-left">
                  <div className="text-2xl font-bold">$189,374</div>
                  <div className="text-[#e2e2e2] text-sm">Total Revenue</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">00:01:30</div>
                  <div className="text-[#e2e2e2] text-sm">Avg Response</div>
                </div>
              </div>
              <div className="text-left">
                <div className="text-xl font-bold">$25,684</div>
                <div className="text-[#e2e2e2] text-sm">Active Transactions</div>
              </div>
            </div>
            
            <div className="space-y-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-center justify-between bg-white bg-opacity-10 rounded-lg p-3">
                  <div className="flex items-center">
                    
                    <div className="text-left">
                      <div className="font-semibold text-sm">Vehicle {item}</div>
                      <div className="text-[#e2e2e2] text-xs">Active</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm">85%</div>
                    <div className="text-[#e2e2e2] text-xs">Fuel</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}