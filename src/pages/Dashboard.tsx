import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { properties } from '../data/properties';
import { Property, Booking } from '../types';
import { CalendarDays, ArrowRight, Check, Clock, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'bookings' | 'favorites' | 'listings'>('bookings');
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6 text-center py-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to view your dashboard</h2>
          <Link
            to="/login"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  const userProperties = user.role === 'landlord' && user.listings 
    ? properties.filter(property => user.listings?.includes(property.id))
    : [];
  
  const favoriteProperties = properties.filter(property => 
    user.wishlist.includes(property.id)
  );
  
  const bookingProperties = user.bookings.map(booking => {
    const property = properties.find(p => p.id === booking.propertyId);
    return {
      booking,
      property
    };
  });

  // Get upcoming and past bookings
  const now = new Date();
  const upcomingBookings = bookingProperties.filter(
    ({ booking }) => new Date(booking.endDate) >= now
  );
  
  const pastBookings = bookingProperties.filter(
    ({ booking }) => new Date(booking.endDate) < now
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl mr-4">
                  {user.name.slice(0, 1)}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">{user.name}</h2>
                  <p className="text-sm text-gray-600">{user.role === 'tenant' ? 'Tenant' : 'Landlord'}</p>
                </div>
              </div>
            </div>
            
            <div>
              <button
                className={`w-full text-left px-6 py-3 flex items-center ${
                  activeTab === 'bookings'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('bookings')}
              >
                <CalendarDays className={`h-5 w-5 mr-3 ${activeTab === 'bookings' ? 'text-blue-600' : 'text-gray-500'}`} />
                <span>My Bookings</span>
              </button>
              
              <button
                className={`w-full text-left px-6 py-3 flex items-center ${
                  activeTab === 'favorites'
                    ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={() => setActiveTab('favorites')}
              >
                <svg
                  className={`h-5 w-5 mr-3 ${activeTab === 'favorites' ? 'text-blue-600' : 'text-gray-500'}`}
                  fill={activeTab === 'favorites' ? 'currentColor' : 'none'}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Favorites</span>
              </button>
              
              {user.role === 'landlord' && (
                <button
                  className={`w-full text-left px-6 py-3 flex items-center ${
                    activeTab === 'listings'
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab('listings')}
                >
                  <svg
                    className={`h-5 w-5 mr-3 ${activeTab === 'listings' ? 'text-blue-600' : 'text-gray-500'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <span>My Listings</span>
                </button>
              )}
            </div>
          </div>
          
          {/* Main Content */}
          <div className="flex-1 w-full">
            {activeTab === 'bookings' && (
              <div>
                {upcomingBookings.length === 0 && pastBookings.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <CalendarDays className="h-8 w-8 text-blue-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No bookings yet</h2>
                    <p className="text-gray-600 mb-6">
                      Start exploring properties and book your next stay!
                    </p>
                    <Link
                      to="/properties"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  <>
                    {upcomingBookings.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Bookings</h2>
                        <div className="space-y-6 mb-8">
                          {upcomingBookings.map(({ booking, property }) => (
                            property && (
                              <div
                                key={booking.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                              >
                                <div className="md:w-1/3 h-48 md:h-auto relative">
                                  <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-6 flex-1">
                                  <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <div>
                                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                        {property.title}
                                      </h3>
                                      <p className="text-gray-600 mb-2">{property.location}</p>
                                    </div>
                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      booking.status === 'confirmed'
                                        ? 'bg-green-100 text-green-800'
                                        : booking.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                    }`}>
                                      {booking.status === 'confirmed' ? (
                                        <Check className="h-4 w-4 mr-1" />
                                      ) : booking.status === 'pending' ? (
                                        <Clock className="h-4 w-4 mr-1" />
                                      ) : (
                                        <X className="h-4 w-4 mr-1" />
                                      )}
                                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-col sm:flex-row gap-4 mb-4">
                                    <div className="flex items-center text-gray-600">
                                      <CalendarDays className="h-5 w-5 mr-2 text-gray-500" />
                                      <div>
                                        <p className="text-sm">Check-in</p>
                                        <p className="font-medium">{new Date(booking.startDate).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                      <CalendarDays className="h-5 w-5 mr-2 text-gray-500" />
                                      <div>
                                        <p className="text-sm">Check-out</p>
                                        <p className="font-medium">{new Date(booking.endDate).toLocaleDateString()}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                      <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                                      <div>
                                        <p className="text-sm">Total</p>
                                        <p className="font-medium">${booking.totalPrice.toLocaleString()}</p>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="flex flex-wrap gap-3">
                                    <Link
                                      to={`/property/${property.id}`}
                                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                                    >
                                      View Property
                                      <ArrowRight className="h-4 w-4 ml-1" />
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </>
                    )}
                    
                    {pastBookings.length > 0 && (
                      <>
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Past Stays</h2>
                        <div className="space-y-6">
                          {pastBookings.map(({ booking, property }) => (
                            property && (
                              <div
                                key={booking.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                              >
                                <div className="md:w-1/4 h-32 md:h-auto relative">
                                  <img
                                    src={property.images[0]}
                                    alt={property.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="p-4 flex-1">
                                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {property.title}
                                  </h3>
                                  <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                                  
                                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                    <div>
                                      <span className="font-medium">Stay period:</span>{' '}
                                      {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Amount paid:</span> ${booking.totalPrice.toLocaleString()}
                                    </div>
                                  </div>
                                  
                                  <div className="mt-3 flex items-center">
                                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                                      Write a Review
                                    </button>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <Link
                                      to={`/property/${property.id}`}
                                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                                    >
                                      Book Again
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            )
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Your Favorites</h2>
                
                {favoriteProperties.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                      <svg
                        className="h-8 w-8 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No favorites yet</h2>
                    <p className="text-gray-600 mb-6">
                      Start saving properties you love by clicking the heart icon.
                    </p>
                    <Link
                      to="/properties"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                      Browse Properties
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProperties.map(property => (
                      <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <Link to={`/property/${property.id}`} className="block relative">
                          <img
                            src={property.images[0]}
                            alt={property.title}
                            className="w-full h-48 object-cover"
                          />
                          <button
                            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md"
                            aria-label="Remove from favorites"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              // Use the context to remove from wishlist
                            }}
                          >
                            <svg
                              className="h-5 w-5 text-red-500 fill-current"
                              viewBox="0 0 24 24"
                              stroke="none"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                              />
                            </svg>
                          </button>
                        </Link>
                        <div className="p-4">
                          <Link to={`/property/${property.id}`} className="block">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">{property.title}</h3>
                            <p className="text-gray-600 text-sm mb-2">{property.location}</p>
                            
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center">
                                <svg className="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                                </svg>
                                <span className="ml-1 text-sm text-gray-700">{property.rating}</span>
                              </div>
                              <span className="text-blue-600 font-semibold">${property.price}/mo</span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'listings' && user.role === 'landlord' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-800">Your Properties</h2>
                  <Link
                    to="/add-property"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Add New Property
                  </Link>
                </div>
                
                {userProperties.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">No properties listed yet</h2>
                    <p className="text-gray-600 mb-6">
                      Start listing your properties to reach potential tenants.
                    </p>
                    <Link
                      to="/add-property"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
                    >
                      Add Your First Property
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {userProperties.map(property => (
                      <div
                        key={property.id}
                        className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row"
                      >
                        <div className="md:w-1/4 h-48 md:h-auto relative">
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
                        <div className="p-6 flex-1">
                          <div className="flex flex-col md:flex-row justify-between mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                {property.title}
                              </h3>
                              <p className="text-gray-600 mb-2">{property.location}</p>
                            </div>
                            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                              property.available
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {property.available ? (
                                <Check className="h-4 w-4 mr-1" />
                              ) : (
                                <X className="h-4 w-4 mr-1" />
                              )}
                              {property.available ? 'Available' : 'Unavailable'}
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center text-gray-600">
                              <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                              <span>
                                {property.bedrooms === 0 ? 'Studio' : `${property.bedrooms} ${property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v16a2 2 0 002 2h12a2 2 0 002-2V4" />
                              </svg>
                              <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                              <DollarSign className="h-5 w-5 mr-2 text-gray-500" />
                              <span>${property.price}/month</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center mb-4 sm:mb-0">
                              <Info className="h-5 w-5 text-blue-600 mr-2" />
                              <span className="text-sm text-gray-600">
                                Last updated 3 days ago
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-3">
                              <Link
                                to={`/property/${property.id}`}
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                View
                              </Link>
                              <Link
                                to={`/edit-property/${property.id}`}
                                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm"
                              >
                                Edit
                              </Link>
                              <button className="inline-flex items-center text-red-600 hover:text-red-800 font-medium text-sm">
                                Deactivate
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;