import { useState, useEffect } from 'react';

// Simple icons without heroicons dependency
const TruckIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MapPinIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BoltIcon = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export function HeroSection() {
  const [currentStat, setCurrentStat] = useState(0);
  
  const stats = [
    { label: 'Active Vehicles', value: '150+', icon: TruckIcon },
    { label: 'Cities Covered', value: '25+', icon: MapPinIcon },
    { label: 'Real-time Updates', value: '24/7', icon: BoltIcon },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  const scrollToVehicles = () => {
    const vehiclesSection = document.getElementById('vehicles-section');
    vehiclesSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            {/* Main Hero Content */}
            <div className="mb-8 animate-fade-in opacity-0 animate-delay-0" style={{ animation: 'fadeInUp 1s ease-out forwards' }}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Real-Time
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Vehicle Tracking
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed opacity-0" style={{ animation: 'fadeInUp 1s ease-out 0.3s forwards' }}>
                Monitor your entire fleet in real-time with our advanced tracking system. 
                Get insights on vehicle status, fuel levels, and location data instantly.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 opacity-0" style={{ animation: 'fadeInUp 1s ease-out 0.6s forwards' }}>
              <button
                onClick={scrollToVehicles}
                className="group relative px-8 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                <span className="flex items-center justify-center">
                  View Fleet Status
                  <ChevronRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </button>
              
              
            </div>

            {/* Animated Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto opacity-0" style={{ animation: 'fadeInUp 1s ease-out 0.9s forwards' }}>
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isActive = currentStat === index;
                
                return (
                  <div
                    key={index}
                    className={`relative p-6 rounded-2xl backdrop-blur-sm transition-all duration-500 transform ${
                      isActive 
                        ? 'bg-white/20 scale-105 shadow-2xl' 
                        : 'bg-white/10 hover:bg-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-4">
                      <div className={`p-3 rounded-full transition-all duration-500 ${
                        isActive ? 'bg-blue-400 scale-110' : 'bg-white/20'
                      }`}>
                        <Icon />
                      </div>
                    </div>
                    <div className={`text-3xl font-bold mb-2 transition-all duration-500 ${
                      isActive ? 'text-white scale-110' : 'text-blue-100'
                    }`}>
                      {stat.value}
                    </div>
                    <div className={`text-sm font-medium transition-colors duration-500 ${
                      isActive ? 'text-blue-100' : 'text-blue-200'
                    }`}>
                      {stat.label}
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="flex flex-col items-center text-white/60">
                <span className="text-sm mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                  <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgb(249 250 251)"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
