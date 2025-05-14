import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);

  const handlePrevious = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const toggleLightbox = () => {
    setShowLightbox(!showLightbox);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[400px] md:h-[500px]">
        <div className="relative h-full">
          <img
            src={images[activeIndex]}
            alt={`${title} - Featured Image`}
            className="w-full h-full object-cover rounded-lg cursor-pointer"
            onClick={toggleLightbox}
          />
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            onClick={handlePrevious}
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
            onClick={handleNext}
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
        </div>
        
        <div className="hidden md:grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <div 
              key={index} 
              className={`relative cursor-pointer ${index + 1 === activeIndex ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={image}
                alt={`${title} - Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              {index === 3 && images.length > 4 && (
                <div 
                  className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLightbox();
                  }}
                >
                  <span className="text-white text-lg font-medium">+{images.length - 4} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {showLightbox && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
            onClick={toggleLightbox}
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <div className="relative w-full max-w-4xl">
            <img
              src={images[activeIndex]}
              alt={`${title} - Lightbox Image`}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              onClick={handlePrevious}
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-white" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;