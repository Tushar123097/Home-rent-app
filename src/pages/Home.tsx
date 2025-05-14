import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Check } from 'lucide-react';
import { properties } from '../data/properties';
import PropertyCard from '../components/PropertyCard';
import SearchFiltersComponent from '../components/SearchFilters';
import { SearchFilters } from '../types';

const Home: React.FC = () => {
  const featuredProperties = properties.filter(property => property.featured).slice(0, 3);
  
  const handleSearch = (filters: SearchFilters) => {
    // In a real app, this would navigate to the search results page with query params
    console.log('Search filters:', filters);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 min-h-[600px] flex items-center">
        <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Find Your Perfect Home Away From Home
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover the perfect rental property that fits your lifestyle and budget
            </p>
            
            <div className="bg-white p-5 rounded-lg shadow-lg mb-8 animate-fadeIn">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Find Your Next Home
              </h2>
              <SearchFiltersComponent onSearch={handleSearch} />
            </div>
          </div>
        </div>
        
        {/* Background Image */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
            alt="Modern apartment living room"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      
      {/* Featured Properties Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Featured Properties</h2>
            <p className="text-gray-600 mt-2">Handpicked properties for your consideration</p>
          </div>
          <Link
            to="/properties"
            className="flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Properties
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find and book your perfect rental in just a few simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Search</h3>
              <p className="text-gray-600">
                Browse our extensive selection of rental properties with detailed filters to find your ideal match.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Book</h3>
              <p className="text-gray-600">
                Reserve your stay by selecting your dates and submitting a booking request to the property owner.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Stay</h3>
              <p className="text-gray-600">
                Enjoy your new home with all the amenities and comfort you need for a perfect stay.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose HomeRent?</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're committed to finding you the perfect rental property with a simple, secure, and satisfying experience.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-blue-600" />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Verified Properties</h3>
                  <p className="text-gray-600">All listings undergo a thorough verification process.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-blue-600" />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">Secure Payments</h3>
                  <p className="text-gray-600">Your transactions are protected with our secure payment system.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-blue-600" />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">24/7 Support</h3>
                  <p className="text-gray-600">Our customer service team is available around the clock.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <Check className="h-4 w-4 text-blue-600" />
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">No Hidden Fees</h3>
                  <p className="text-gray-600">Transparent pricing with no surprise charges.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="relative overflow-hidden rounded-lg shadow-xl h-[400px] md:h-[500px]">
              <img
                src="https://images.pexels.com/photos/2079249/pexels-photo-2079249.jpeg"
                alt="Happy family in new home"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <div className="text-white max-w-md">
                  <h3 className="text-2xl font-bold mb-2">Join thousands of satisfied renters</h3>
                  <p className="text-white/90">
                    "HomeRent made finding our dream apartment so easy! The platform is intuitive and the customer service is outstanding."
                  </p>
                  <p className="mt-2 font-medium">- Sarah Johnson</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Find Your Next Home?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse thousands of properties and find the perfect place to call home today.
          </p>
          <Link
            to="/properties"
            className="inline-block bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-md shadow-md transition-colors"
          >
            Explore Properties
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;