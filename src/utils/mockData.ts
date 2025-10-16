import type { Stock, ChartData } from "../types/stock.types";

export const initialStocks: Stock[] = [
  {
    id: '1',
    ticker: 'AAPLE',
    companyName: 'Apple Inc.',
    quantity: 10,
    purchasePrice: 150,
    currentPrice: 168,
    dateOfPurchase: '2025-01-15',
  },
  {
    id: '2',
    ticker: 'GOOGLE',
    companyName: 'Alphabet Inc.',
    quantity: 5,
    purchasePrice: 140,
    currentPrice: 155,
    dateOfPurchase: '2025-02-20',
  },
];

export const mockChartData: ChartData[] = [
  { date: '2025-01', price: 150, volume: 1000000 },
  { date: '2025-02', price: 155, volume: 1200000 },
  { date: '2025-03', price: 148, volume: 980000 },
  { date: '2025-04', price: 162, volume: 1500000 },
  { date: '2025-05', price: 170, volume: 1800000 },
  { date: '2025-06', price: 168, volume: 1600000 },
];