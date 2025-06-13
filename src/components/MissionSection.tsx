import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const MissionSection: React.FC = () => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const images = [
    "/img/IMG_6762.jpg",
    "/img/IMG_6832.jpg",
    "/img/IMG_6873.jpg",
    "/img/IMG_6825.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFade(true);
      }, 500); // fade out duration
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    if (index !== currentImageIndex) {
      setFade(false);
      setTimeout(() => {
        setCurrentImageIndex(index);
        setFade(true);
      }, 500);
    }
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-telegraf font-bold text-4xl text-primary mb-6">
              {t('about.mission.title')}
            </h2>
            <p className="font-telegraf text-lg text-gray-600 mb-8 leading-relaxed">
              {t('about.mission.description1')}
            </p>
            <p className="font-telegraf text-lg text-gray-600 leading-relaxed">
              {t('about.mission.description2')}
            </p>
          </div>
          <div className="relative">
            <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={images[currentImageIndex]}
                alt="Team collaboration"
                className={`w-full h-full object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
              />
            </div>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
