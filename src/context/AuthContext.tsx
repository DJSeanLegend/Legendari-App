import React, { createContext, useContext, useState } from 'react';
import { AuthContextType, User } from '../types/auth';

const MOCK_USER: User = {
  id: 'user_001',
  firstName: 'Amara',
  lastName: 'Legendari',
  email: 'amara@legendari.com',
  memberSince: '2024-01-15T00:00:00Z',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mockLogin = async (_email: string, _password: string) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setUser(MOCK_USER);
    setIsLoading(false);
  };

  const logout = () => setUser(null);

  const completeOnboarding = () => setHasSeenOnboarding(true);

  return (
    <AuthContext.Provider
      value={{ user, hasSeenOnboarding, isLoading, mockLogin, logout, completeOnboarding }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
