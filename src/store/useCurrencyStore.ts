import { create } from 'zustand';
import type { CurrencyState } from '../types';

const API_KEY = 'cur_live_6kKPrSJJ0WiiJzqn8yyoSDv7Q96ncefkE88Nd5HE';
const BASE_URL = 'https://api.currencyapi.com/v3/latest';

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  currency: 'CHF',
  rates: {},
  isLoading: false,
  setCurrency: (currency: string) => set({ currency }),
  fetchRates: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}`);
      const data = await response.json();
      const rates: Record<string, number> = {};
      Object.values(data.data).forEach((item: any) => {
        rates[item.code] = item.value;
      });
      set({ rates, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch rates:', error);
      set({ isLoading: false });
    }
  },
  convertPrice: (amountInCHF: number) => {
    const { currency, rates } = get();
    if (Object.keys(rates).length === 0) return `CHF ${amountInCHF}`;
    const rateCHF = rates['CHF'] || 1;
    const rateTarget = rates[currency] || 1;
    
    const convertedAmount = amountInCHF * (rateTarget / rateCHF);
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0
    }).format(convertedAmount);
  }
}));