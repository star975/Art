
import React from 'react';
import { Icon } from './Icon';

interface ImageGalleryProps {
  images: string[];
}

const ImageCard: React.FC<{ src: string }> = ({ src }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = src;
        link.download = `concept-art-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg aspect-w-1 aspect-h-1">
      <img src={src} alt="Generated concept art" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <button onClick={handleDownload} className="p-3 bg-white/20 rounded-full hover:bg-white/40 backdrop-blur-sm transition-colors">
            <Icon name="download" className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};


export const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {images.map((image, index) => (
        <ImageCard key={index} src={image} />
      ))}
    </div>
  );
};
