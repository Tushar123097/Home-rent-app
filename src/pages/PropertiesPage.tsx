import React, { useState, useEffect } from 'react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import SearchFiltersComponent from '../components/SearchFilters';
import { Property, SearchFilters } from '../types';
import { ChevronDown, SlidersHorizontal, Grid3X3, List } from 'lucide-react';

const PropertiesPage: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (filters: SearchFilters) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...properties];
      
      // Filter by location
      if (filters.location) {
        const locationLower = filters.location.toLowerCase();
        results = results.filter(property => 
          property.location.toLowerCase().includes(locationLower)
        );
      }
      
      // Filter by price range
      results = results.filter(property => 
        property.price >= filters.priceMin && property.price <= filters.priceMax
      );
      
      // Filter by bedrooms
      if (filters.bedrooms > 0) {
        results = results.filter(property => property.bedrooms >= filters.bedrooms);
      }
      
      // Filter by bathrooms
      if (filters.bathrooms > 0) {
        results = results.filter(property => property.bathrooms >= filters.bathrooms);
      }
      
      setFilteredProperties(results);
      setIsLoading(false);
    }, 800);
  };

  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    
    let sorted = [...filteredProperties];
    
    switch (sortOption) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        // This would normally sort by date added
        // For demo purposes, we'll just use the current sort
        break;
      default:
        // 'recommended' - no specific sort
        break;
    }
    
    setFilteredProperties(sorted);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Find Your Perfect Rental</h1>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <SearchFiltersComponent onSearch={handleSearch} />
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Filters Panel - On larger screens, this could be expanded */}
          <div className="hidden lg:block w-64 bg-white rounded-lg shadow-md p-6 sticky top-24">
            <div className="flex items-center space-x-2 mb-6">
              <SlidersHorizontal className="h-5 w-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
            </div>
            
            {/* Filter categories would go here */}
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Property Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Apartment</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">House</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Condo</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Studio</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-3">Amenities</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Air Conditioning</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Pool</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Gym</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Parking</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-blue-600 focus:ring-blue-500" />
                    <span className="ml-2 text-gray-700">Washer/Dryer</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <p className="text-gray-600 mb-4 sm:mb-0">
                  <span className="font-medium">{filteredProperties.length}</span> properties found
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-700 text-sm">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                        className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-1 px-3 pr-8 rounded focus:outline-none focus:border-blue-500 text-sm"
                      >
                        <option value="recommended">Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rating</option>
                        <option value="newest">Newest</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1.5 h-4 w-4 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-1 border border-gray-300 rounded-md">
                    <button
                      className={`p-1.5 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <Grid3X3 className="h-4 w-4" />
                    </button>
                    <button
                      className={`p-1.5 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                      onClick={() => setViewMode('list')}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
                    <div className="h-56 bg-gray-300"></div>
                    <div className="p-4">
                      <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded"></div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded w-1/3 mt-4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProperties.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProperties.map((property) => (
                    <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-56 md:h-auto relative">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-full object-cover"
                        />
                        {property.featured && (
                          <div className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="flex-1 p-4 md:p-6 flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                          <div className="bg-blue-50 px-3 py-1 rounded-full">
                            <span className="text-blue-600 font-semibold">${property.price}</span>
                            <span className="text-blue-600 text-sm">/mo</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 line-clamp-2">{property.description}</p>
                        <div className="grid grid-cols-3 gap-4 text-gray-600 mb-4">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                            <span className="text-sm">
                              {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} ${property.bedrooms === 1 ? 'Bed' : 'Beds'}`}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4" />
                            </svg>
                            <span className="text-sm">{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                          </div>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                            </svg>
                            <span className="text-sm">{property.area} ft²</span>
                          </div>
                        </div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                            </svg>
                            <span className="ml-1 text-sm font-medium text-gray-700">{property.rating}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span className="text-sm text-gray-600">{property.reviews.length} reviews</span>
                          </div>
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-md">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-800">No properties found</h3>
                <p className="mt-2 text-gray-600">Try adjusting your search filters to find more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;