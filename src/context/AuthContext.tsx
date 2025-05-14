import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { users, currentUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string, role: 'tenant' | 'landlord') => Promise<boolean>;
  addToWishlist: (propertyId: string) => void;
  removeFromWishlist: (propertyId: string) => void;
  isInWishlist: (propertyId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // In a real app, this would be null by default and set after authentication
  const [user, setUser] = useState<User | null>(currentUser);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = users.find(u => u.email === email);
        if (foundUser) {
          setUser(foundUser);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: 'tenant' | 'landlord'
  ): Promise<boolean> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          id: `user${users.length + 1}`,
          name,
          email,
          role,
          wishlist: [],
          bookings: [],
          listings: role === 'landlord' ? [] : undefined,
        };
        
        // In a real app, this would add the user to the database
        setUser(newUser);
        resolve(true);
      }, 1000);
    });
  };

  const addToWishlist = (propertyId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      wishlist: [...user.wishlist, propertyId]
    });
  };

  const removeFromWishlist = (propertyId: string) => {
    if (!user) return;
    
    setUser({
      ...user,
      wishlist: user.wishlist.filter(id => id !== propertyId)
    });
  };

  const isInWishlist = (propertyId: string): boolean => {
    return user ? user.wishlist.includes(propertyId) : false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    addToWishlist,
    removeFromWishlist,
    isInWishlist
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};