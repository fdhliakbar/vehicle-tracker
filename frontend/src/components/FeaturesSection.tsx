import { useState, useEffect } from 'react';

// Icons untuk features
const LocationIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const TrackingIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const FuelIcon = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, color, delay }: FeatureCardProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`relative group transition-all duration-700 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Background Card */}
      <div className={`relative p-8 rounded-2xl ${color} transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl`}>
        {/* Glowing effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Icon container */}
        <div className="relative z-10 mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm transition-all duration-300 group-hover:bg-white/30 group-hover:scale-110">
            <div className="text-white">
              {icon}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-4 group-hover:translate-x-2 transition-transform duration-300">
            {title}
          </h3>
          <p className="text-white/90 leading-relaxed group-hover:text-white transition-colors duration-300">
            {description}
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </div>
  );
};

export function FeaturesSection() {
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('features-section');
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <LocationIcon />,
      title: "Real-time Vehicle Tracking",
      description: "Track your entire fleet in real-time with precise GPS coordinates. Monitor vehicle movements, routes, and current locations with pinpoint accuracy.",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      delay: 200
    },
    {
      icon: <TrackingIcon />,
      title: "Advanced Fleet Analytics",
      description: "Get comprehensive insights into your fleet performance with detailed analytics, reporting, and data visualization for better decision making.",
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      delay: 400
    },
    {
      icon: <FuelIcon />,
      title: "Fuel & Maintenance Monitor",
      description: "Monitor fuel consumption, track maintenance schedules, and receive alerts for optimal vehicle performance and cost management.",
      color: "bg-gradient-to-br from-orange-500 to-orange-700",
      delay: 600
    }
  ];

  return (
    <section id="features-section" className="relative py-20 bg-gray-50 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div 
          className={`text-center mb-16 transition-all duration-1000 ${
            sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Extra features you
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              will have with vehicles
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna tellus pharetra id 
            molestie sapien, diam. Senectus viverra tellus viverra at purus tincidunt tortor.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
