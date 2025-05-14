import React, { useState } from 'react';
import { CalendarDays, DollarSign } from 'lucide-react';
import { Property } from '../types';
import { useAuth } from '../context/AuthContext';

interface BookingFormProps {
  property: Property;
}

const BookingForm: React.FC<BookingFormProps> = ({ property }) => {
  const { isAuthenticated, user } = useAuth();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  // Calculate number of days between two dates
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const days = calculateDays();
  const totalPrice = days * property.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      return;
    }
    
    if (!startDate || !endDate) {
      setMessage('Please select both check-in and check-out dates.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingComplete(true);
      setMessage('Your booking request has been submitted successfully!');
    }, 1500);
  };

  if (bookingComplete) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Request Sent!</h3>
          <p className="text-gray-600 mb-6">The property owner will contact you shortly to confirm your booking.</p>
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Check-in:</span>
              <span className="font-medium">{new Date(startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Check-out:</span>
              <span className="font-medium">{new Date(endDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Length of stay:</span>
              <span className="font-medium">{days} days</span>
            </div>
            <div className="flex justify-between text-lg font-semibold mt-2 pt-2 border-t border-gray-200">
              <span>Total:</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Book this property</h3>
      
      {!isAuthenticated ? (
        <div className="text-center p-4 border border-gray-200 rounded-md bg-gray-50">
          <p className="text-gray-600 mb-4">Please log in to book this property.</p>
          <a 
            href="/login" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            Log In / Sign Up
          </a>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate || new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <CalendarDays className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          {startDate && endDate && (
            <div className="mb-6 rounded-md bg-gray-50 p-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">${property.price} × {days} days</span>
                <span className="font-medium">${totalPrice}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Service fee</span>
                <span className="font-medium">$49</span>
              </div>
              <div className="flex justify-between font-semibold mt-2 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>${(totalPrice + 49).toLocaleString()}</span>
              </div>
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Book Now
              </span>
            )}
          </button>
          
          {message && (
            <p className={`mt-4 text-sm text-center ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {message}
            </p>
          )}
          
          <p className="mt-4 text-xs text-gray-500 text-center">
            You won't be charged yet. The property owner will review your booking request.
          </p>
        </form>
      )}
    </div>
  );
};

export default BookingForm;