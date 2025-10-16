import { create } from 'zustand';
import type { Stock } from '../types/stock.types';

interface PortfolioState {
  portfolio: Stock[];
  addStock: (stock: Stock) => void;
  updateStock: (id: string, stock: Partial<Stock>) => void;
  deleteStock: (id: string) => void;
  getStockById: (id: string) => Stock | undefined;
}

export const usePortfolioStore = create<PortfolioState>((set, get) => ({
  portfolio: [],
  
  addStock: (stock) =>
    set((state) => ({
      portfolio: [...state.portfolio, stock],
    })),
  
  updateStock: (id, updatedStock) =>
    set((state) => ({
      portfolio: state.portfolio.map((stock) =>
        stock.id === id ? { ...stock, ...updatedStock } : stock
      ),
    })),
  
  deleteStock: (id) =>
    set((state) => ({
      portfolio: state.portfolio.filter((stock) => stock.id !== id),
    })),
  
  getStockById: (id) => {
    return get().portfolio.find((stock) => stock.id === id);
  },
}));