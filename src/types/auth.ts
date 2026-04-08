export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  memberSince: string;
}

export interface AuthContextType {
  user: User | null;
  hasSeenOnboarding: boolean;
  isLoading: boolean;
  mockLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}
