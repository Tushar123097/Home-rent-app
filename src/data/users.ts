import { User } from '../types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'tenant',
    wishlist: ['1', '4'],
    bookings: [
      {
        id: 'b1',
        propertyId: '3',
        userId: 'user1',
        startDate: '2023-12-05',
        endDate: '2023-12-10',
        status: 'confirmed',
        totalPrice: 4250,
      }
    ]
  },
  {
    id: 'landlord1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'landlord',
    wishlist: [],
    bookings: [],
    listings: ['1', '3']
  },
  {
    id: 'landlord2',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'landlord',
    wishlist: [],
    bookings: [],
    listings: ['2', '4']
  }
];

// Mock authenticated user for demo purposes
export const currentUser: User = {
  id: 'user1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'tenant',
  wishlist: ['1', '4'],
  bookings: [
    {
      id: 'b1',
      propertyId: '3',
      userId: 'user1',
      startDate: '2023-12-05',
      endDate: '2023-12-10',
      status: 'confirmed',
      totalPrice: 4250,
    }
  ]
};