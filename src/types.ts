export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
}

export interface CurrencyState {
  currency: string;
  rates: Record<string, number>;
  isLoading: boolean;
  setCurrency: (currency: string) => void;
  fetchRates: () => Promise<void>;
  convertPrice: (amountInCHF: number) => string;
}