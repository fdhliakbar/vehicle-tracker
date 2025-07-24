import { useState, useEffect } from 'react';

// Icons for the new design
const ArrowRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToVehicles = () => {
    const vehicleListSection = document.getElementById('vehicle-list');
    if (vehicleListSection) {
      vehicleListSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  return (
    <>
      {/* Inject CSS animations directly */}
      <style>{`
        @keyframes carBounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        
        @keyframes dustParticle {
          0% { transform: translateX(0) translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateX(-30px) translateY(-20px) scale(0.8); opacity: 0.8; }
          100% { transform: translateX(-60px) translateY(-40px) scale(0.4); opacity: 0; }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px) rotate(12deg); }
          to { opacity: 1; transform: translateX(0) rotate(0deg); }
        }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .car-bounce {
          animation: carBounce 6s ease-in-out infinite;
        }
      `}</style>

      <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-sky-400 via-blue-500 to-cyan-600">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 1px, transparent 1px),
                               radial-gradient(circle at 80% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '100px 100px, 150px 150px'
            }}
          />
        </div>

        {/* Dust Animation Particles */}
        <div className="absolute bottom-0 right-0 w-full h-full pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-orange-300 rounded-full opacity-60"
              style={{
                right: `${20 + i * 10}%`,
                bottom: `${30 + i * 5}%`,
                animation: `dustParticle 3s infinite ${i * 0.5}s ease-out`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-16 sm:py-20">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-left order-2 lg:order-1">
              {/* Subscription Badge */}
              <div 
                className={`inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full glass-effect text-white text-xs sm:text-sm mb-6 sm:mb-8 transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                Explore Our Features. Sign Up Now.
              </div>

              {/* Main Headline */}
              <h1 
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight text-shadow transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                Master Your Fleet.
                <br />
                <span className="text-orange-300">Drive Smarter.</span>
              </h1>

              {/* Description */}
              <p 
                className={`text-base sm:text-lg text-blue-100 mb-8 max-w-lg leading-relaxed transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'
                }`}
                style={{ animationDelay: '0.6s' }}
              >
                Get full visibility of every vehicle. Monitor real-time location, operational status, and fleet performance for better control and quick decision-making.
              </p>

              {/* CTA Button */}
              <button
                onClick={scrollToVehicles}
                className={`group inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-white text-gray-800 font-semibold rounded-full hover:bg-gray-100 transform hover:scale-105 hover:shadow-2xl transition-all duration-1000 text-sm sm:text-base ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: '0.8s' }}
              >
                <span className="mr-3">Experience now</span>
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors">
                  <ArrowRightIcon className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>

            {/* Right Content - Car Image */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              {/* Car Container with Animation */}
              <div 
                className={`relative transition-all duration-1500 car-bounce ${
                  isVisible ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-20 rotate-12'
                }`}
                style={{ animationDelay: '1s' }}
              >
                {/* Rally Car - Custom CSS Design */}
                <div className="relative w-64 h-48 sm:w-80 sm:h-56 md:w-96 md:h-64 lg:w-[500px] lg:h-80">
                  {/* Car Body */}
                  <img
                  src="/3d-car2.png" 
                  alt="Vehicle" 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='320' viewBox='0 0 500 320'%3E%3Crect width='500' height='320' fill='%23e5e7eb' rx='20'/%3E%3Cg transform='translate(200,100)'%3E%3Crect x='0' y='50' width='100' height='40' fill='%23F97C21' rx='5'/%3E%3Crect x='20' y='30' width='60' height='20' fill='%23374151' rx='3'/%3E%3Ccircle cx='20' cy='100' r='15' fill='%23374151'/%3E%3Ccircle cx='80' cy='100' r='15' fill='%23374151'/%3E%3Ctext x='50' y='130' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle'%3EVehicle%3C/text%3E%3C/g%3E%3C/svg%3E";
                  }}
                  />
                  
                  {/* Wheels */}
                  <div className="absolute bottom-0 left-4 sm:left-6 md:left-8 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-800 rounded-full shadow-lg">
                    <div className="absolute inset-1 sm:inset-2 bg-gray-600 rounded-full">
                      <div className="absolute inset-1 sm:inset-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-4 sm:right-6 md:right-8 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gray-800 rounded-full shadow-lg">
                    <div className="absolute inset-1 sm:inset-2 bg-gray-600 rounded-full">
                      <div className="absolute inset-1 sm:inset-2 bg-gray-400 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desert Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 200" className="w-full h-auto">
            <defs>
              <linearGradient id="desertGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <path
              d="M0,120 C150,200 300,160 450,140 C600,120 750,160 900,140 C1050,120 1200,160 1350,140 L1440,140 L1440,200 L0,200 Z"
              fill="url(#desertGradient)"
            />
            <path
              d="M0,140 C150,180 300,150 450,160 C600,170 750,150 900,160 C1050,170 1200,150 1350,160 L1440,160 L1440,200 L0,200 Z"
              fill="#fed7aa"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Brush Strokes */}
        <div className="absolute bottom-0 left-0 w-full h-32 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-64 h-16 bg-white opacity-70 transform -rotate-12 rounded-full blur-sm"></div>
          <div className="absolute bottom-4 right-20 w-32 h-8 bg-white opacity-50 transform rotate-6 rounded-full blur-sm"></div>
          <div className="absolute bottom-8 left-1/3 w-48 h-6 bg-white opacity-40 transform -rotate-3 rounded-full blur-sm"></div>
        </div>
      </div>
    </>
  );
}
