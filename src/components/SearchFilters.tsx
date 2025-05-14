import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { SearchFilters } from '../types';

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchFiltersComponent: React.FC<SearchFiltersProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearch = () => {
    onSearch({
      location,
      priceMin: priceRange[0],
      priceMax: priceRange[1],
      bedrooms,
      bathrooms
    });
  };

  const resetFilters = () => {
    setLocation('');
    setPriceRange([0, 5000]);
    setBedrooms(0);
    setBathrooms(0);
    onSearch({
      location: '',
      priceMin: 0,
      priceMax: 5000,
      bedrooms: 0,
      bathrooms: 0
    });
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4 sm:p-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <div className="relative">
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City, neighborhood, or address"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        <div className="w-full md:w-1/4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Price Range
          </label>
          <div className="relative">
            <select 
              id="price"
              value={`${priceRange[0]}-${priceRange[1]}`}
              onChange={(e) => {
                const [min, max] = e.target.value.split('-').map(Number);
                setPriceRange([min, max]);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
            >
              <option value="0-5000">Any Price</option>
              <option value="0-1000">$0 - $1,000</option>
              <option value="1000-2000">$1,000 - $2,000</option>
              <option value="2000-3000">$2,000 - $3,000</option>
              <option value="3000-5000">$3,000 - $5,000</option>
              <option value="5000-10000">$5,000+</option>
            </select>
            <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-md px-6 py-2 transition-colors duration-200 h-10 self-end flex items-center justify-center"
        >
          <Search className="h-5 w-5 inline mr-1" />
          <span>Search</span>
        </button>
      </div>
      
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-600 text-sm font-medium flex items-center mb-2 sm:mb-0"
        >
          <ChevronDown className={`h-4 w-4 mr-1 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
          Advanced Filters
        </button>
        
        {(location || priceRange[0] > 0 || priceRange[1] < 5000 || bedrooms > 0 || bathrooms > 0) && (
          <button
            onClick={resetFilters}
            className="text-gray-600 text-sm font-medium flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Reset Filters
          </button>
        )}
      </div>
      
      {showAdvanced && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fadeIn">
          <div>
            <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Bedrooms
            </label>
            <div className="relative">
              <select
                id="bedrooms"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="0">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
              Bathrooms
            </label>
            <div className="relative">
              <select
                id="bathrooms"
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="0">Any</option>
                <option value="1">1+</option>
                <option value="1.5">1.5+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label htmlFor="property-type" className="block text-sm font-medium text-gray-700 mb-1">
              Property Type
            </label>
            <div className="relative">
              <select
                id="property-type"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Any</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="studio">Studio</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 mb-1">
              Amenities
            </label>
            <div className="relative">
              <select
                id="amenities"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="">Select Amenity</option>
                <option value="pool">Pool</option>
                <option value="gym">Gym</option>
                <option value="parking">Parking</option>
                <option value="pet-friendly">Pet Friendly</option>
                <option value="furnished">Furnished</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFiltersComponent;