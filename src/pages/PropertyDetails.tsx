import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Phone, Share2, Heart, BedDouble, Bath, Move, Wifi, Fan, Tv, DollarSign, Car } from 'lucide-react';
import { properties } from '../data/properties';
import { Property } from '../types';
import ImageGallery from '../components/ImageGallery';
import ReviewItem from '../components/ReviewItem';
import BookingForm from '../components/BookingForm';
import { useAuth } from '../context/AuthContext';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'reviews'>('overview');
  const { isAuthenticated, addToWishlist, removeFromWishlist, isInWishlist } = useAuth();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate API call
    setTimeout(() => {
      const foundProperty = properties.find(p => p.id === id);
      setProperty(foundProperty || null);
      setIsLoading(false);
    }, 800);
  }, [id]);

  const toggleWishlist = () => {
    if (!property) return;
    
    if (isInWishlist(property.id)) {
      removeFromWishlist(property.id);
    } else {
      addToWishlist(property.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="animate-pulse">
            <div className="h-[500px] bg-gray-300 rounded-lg mb-8"></div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
                <div className="h-6 bg-gray-300 rounded"></div>
              </div>
              <div className="h-24 bg-gray-300 rounded mb-6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 text-center py-16">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h2 className="mt-4 text-2xl font-bold text-gray-800">Property Not Found</h2>
          <p className="mt-2 text-lg text-gray-600">The property you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/properties"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Browse All Properties
          </Link>
        </div>
      </div>
    );
  }

  // Get average rating
  const averageRating = property.reviews.reduce((acc, review) => acc + review.rating, 0) / property.reviews.length;

  // Group amenities into categories for better organization
  const amenityCategories = {
    'Home Features': ['Backyard', 'Balcony', 'Patio', 'Fireplace', 'Pool', 'Hot Tub', 'Deck'],
    'Electronics': ['Wi-Fi', 'TV', 'Cable', 'Smart Home'],
    'Kitchen': ['Fully Equipped Kitchen', 'Dishwasher', 'Coffee Maker', 'Microwave'],
    'Climate Control': ['Air Conditioning', 'Heating', 'Ceiling Fan', 'Central Air'],
    'Other': ['Parking', 'Gym', 'Laundry', 'Washer/Dryer', 'Doorman', 'Elevator', 'Storage']
  };

  // Categorize amenities
  const categorizedAmenities: Record<string, string[]> = {};
  
  Object.entries(amenityCategories).forEach(([category, keywords]) => {
    const matchedAmenities = property.amenities.filter(amenity => 
      keywords.some(keyword => amenity.includes(keyword))
    );
    
    if (matchedAmenities.length > 0) {
      categorizedAmenities[category] = matchedAmenities;
    }
  });
  
  // Add remaining amenities to Other
  const uncategorizedAmenities = property.amenities.filter(amenity => 
    !Object.values(categorizedAmenities).flat().includes(amenity)
  );
  
  if (uncategorizedAmenities.length > 0) {
    categorizedAmenities['Other'] = [
      ...(categorizedAmenities['Other'] || []),
      ...uncategorizedAmenities
    ];
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center">
                <svg className="h-4 w-4 text-yellow-400 fill-current mr-1" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span>{averageRating.toFixed(1)}</span>
                <span className="ml-1">({property.reviews.length} reviews)</span>
              </div>
            </div>
          </div>
          
          <div className="flex mt-4 md:mt-0 space-x-3">
            {isAuthenticated && (
              <button
                onClick={toggleWishlist}
                className={`flex items-center px-3 py-2 rounded-md border ${
                  isInWishlist(property.id)
                    ? 'border-red-500 text-red-500 bg-red-50'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                } transition-colors`}
                aria-label={isInWishlist(property.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-5 w-5 mr-2 ${
                    isInWishlist(property.id) 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-gray-500'
                  }`} 
                />
                <span>{isInWishlist(property.id) ? 'Saved' : 'Save'}</span>
              </button>
            )}
            
            <button
              className="flex items-center px-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Share this property"
            >
              <Share2 className="h-5 w-5 mr-2 text-gray-500" />
              <span>Share</span>
            </button>
          </div>
        </div>
        
        <div className="mb-8">
          <ImageGallery images={property.images} title={property.title} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'overview'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    Overview
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'amenities'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab('amenities')}
                  >
                    Amenities
                  </button>
                  <button
                    className={`px-4 py-3 text-sm font-medium ${
                      activeTab === 'reviews'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Reviews ({property.reviews.length})
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <BedDouble className="h-6 w-6 text-blue-600 mb-2" />
                        <span className="text-gray-800 font-medium">
                          {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <Bath className="h-6 w-6 text-blue-600 mb-2" />
                        <span className="text-gray-800 font-medium">
                          {property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}
                        </span>
                      </div>
                      <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                        <Move className="h-6 w-6 text-blue-600 mb-2" />
                        <span className="text-gray-800 font-medium">{property.area} sq ft</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">About this property</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{property.description}</p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Property highlights</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                      {property.amenities.slice(0, 6).map((amenity, index) => (
                        <div key={index} className="flex items-center">
                          {amenity.includes('Wi-Fi') || amenity.includes('WiFi') ? (
                            <Wifi className="h-5 w-5 text-blue-600 mr-2" />
                          ) : amenity.includes('Air Conditioning') ? (
                            <Fan className="h-5 w-5 text-blue-600 mr-2" />
                          ) : amenity.includes('TV') ? (
                            <Tv className="h-5 w-5 text-blue-600 mr-2" />
                          ) : amenity.includes('Parking') || amenity.includes('Garage') ? (
                            <Car className="h-5 w-5 text-blue-600 mr-2" />
                          ) : (
                            <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <span className="text-blue-600 text-xs">✓</span>
                            </div>
                          )}
                          <span className="text-gray-700">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6">
                      <a
                        href="#"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <MapPin className="h-5 w-5 mr-2" />
                        View on map
                      </a>
                    </div>
                  </div>
                )}
                
                {activeTab === 'amenities' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">What this place offers</h3>
                    
                    {Object.entries(categorizedAmenities).map(([category, amenities]) => (
                      <div key={category} className="mb-8 last:mb-0">
                        <h4 className="text-lg font-medium text-gray-800 mb-4">{category}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                          {amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-5 w-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-600 text-xs">✓</span>
                              </div>
                              <span className="text-gray-700">{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex items-center mb-6">
                      <div className="flex items-center mr-4">
                        <svg className="h-6 w-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="ml-2 text-2xl font-bold text-gray-800">{averageRating.toFixed(1)}</span>
                      </div>
                      <span className="text-gray-600">
                        {property.reviews.length} {property.reviews.length === 1 ? 'review' : 'reviews'}
                      </span>
                    </div>
                    
                    {property.reviews.length > 0 ? (
                      <div>
                        {property.reviews.map((review) => (
                          <ReviewItem key={review.id} review={review} />
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No reviews yet for this property.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact the host</h3>
              <div className="flex flex-col sm:flex-row items-start gap-4 mb-6">
                <div className="sm:w-1/2 flex flex-col items-center sm:items-start">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold mb-2">
                    {property.landlordId.slice(0, 1).toUpperCase()}
                  </div>
                  <h4 className="font-medium text-gray-800">Property Manager</h4>
                  <p className="text-gray-600 text-sm">Response rate: 98%</p>
                  <p className="text-gray-600 text-sm">Response time: within an hour</p>
                </div>
                
                <div className="sm:w-1/2 w-full">
                  <div className="flex flex-col space-y-3">
                    <a
                      href="tel:+11234567890"
                      className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Call Host</span>
                    </a>
                    
                    <button
                      className="flex items-center justify-center sm:justify-start px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <Calendar className="h-5 w-5 mr-2 text-gray-500" />
                      <span>Request Tour</span>
                    </button>
                    
                    <button
                      className="flex items-center justify-center sm:justify-start px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition-colors"
                    >
                      <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingForm property={property} />
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <DollarSign className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Flexible cancellation</h4>
                    <p className="text-sm text-gray-600">
                      Cancel up to 24 hours before check-in for a partial refund.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Similar Properties Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Properties</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties
              .filter(p => p.id !== property.id && p.bedrooms === property.bedrooms)
              .slice(0, 3)
              .map(similarProperty => (
                <Link 
                  key={similarProperty.id} 
                  to={`/property/${similarProperty.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-48">
                    <img
                      src={similarProperty.images[0]}
                      alt={similarProperty.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <h3 className="text-white font-semibold">{similarProperty.title}</h3>
                      <p className="text-white/90 text-sm">{similarProperty.location}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <span className="ml-1 text-sm font-medium text-gray-700">{similarProperty.rating}</span>
                      </div>
                      <span className="text-blue-600 font-semibold">${similarProperty.price}/mo</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <BedDouble className="h-4 w-4 mr-1" />
                      <span className="mr-3">
                        {similarProperty.bedrooms === 0 ? 'Studio' : `${similarProperty.bedrooms} Bed${similarProperty.bedrooms > 1 ? 's' : ''}`}
                      </span>
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{similarProperty.bathrooms} Bath{similarProperty.bathrooms > 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;