"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call - accept any credentials
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Extract name from email (everything before @)
    const name = email.split('@')[0];
    
    const userData: User = {
      id: Date.now().toString(),
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoading(false);
    return true;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData: User = {
      id: Date.now().toString(),
      email,
      name: name.charAt(0).toUpperCase() + name.slice(1),
    };
    
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
