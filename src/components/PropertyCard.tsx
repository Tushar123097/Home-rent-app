import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Bath, BedDouble, Move, Star } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { isAuthenticated, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property.id);
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.title}
            className="w-full h-56 object-cover"
          />
          {property.featured && (
            <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Featured
            </div>
          )}
          {isAuthenticated && (
            <button
              onClick={toggleWishlist}
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md transition-colors duration-200"
              aria-label={isInWishlist(property.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                className={`h-5 w-5 ${
                  isInWishlist(property.id) 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-400'
                }`} 
              />
            </button>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold line-clamp-1 text-gray-800">{property.title}</h3>
              <div className="flex items-center mt-1 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{property.location}</span>
              </div>
            </div>
            <div className="bg-blue-50 px-3 py-1 rounded-full">
              <span className="text-blue-600 font-semibold">${property.price}</span>
              <span className="text-blue-600 text-sm">/mo</span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-gray-600">
            <div className="flex items-center">
              <BedDouble className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} ${property.bedrooms === 1 ? 'Bed' : 'Beds'}`}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-2" />
              <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
            </div>
            <div className="flex items-center">
              <Move className="h-4 w-4 mr-2" />
              <span className="text-sm">{property.area} ft²</span>
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              <span className="ml-1 text-sm font-medium text-gray-700">{property.rating}</span>
            </div>
            <span className="mx-2 text-gray-400">•</span>
            <span className="text-sm text-gray-600">{property.reviews.length} reviews</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;