export interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
