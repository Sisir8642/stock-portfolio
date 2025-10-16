export interface Stock {
  id: string;
  ticker: string;
  companyName: string;
  quantity: number;
  purchasePrice: number;
  currentPrice: number;
  dateOfPurchase: string;
}

export interface StockFormData {
  ticker: string;
  companyName: string;
  quantity: string;
  purchasePrice: string;
  dateOfPurchase: string;
}

export interface ChartData {
  date: string;
  price: number;
  volume: number;
}