export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  images: string[];
  amenities: string[];
  featured: boolean;
  available: boolean;
  landlordId: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord';
  wishlist: string[];
  bookings: Booking[];
  listings?: string[];
}

export interface Booking {
  id: string;
  propertyId: string;
  userId: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

export interface SearchFilters {
  location: string;
  priceMin: number;
  priceMax: number;
  bedrooms: number;
  bathrooms: number;
}