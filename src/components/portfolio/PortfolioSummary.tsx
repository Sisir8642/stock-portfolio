import React from 'react';
import { TrendingUp, DollarSign, Package } from 'lucide-react';
import { Stock } from '../../types/stock.types';

interface PortfolioSummaryProps {
  stocks: Stock[];
}

export const PortfolioSummary: React.FC<PortfolioSummaryProps> = ({ stocks }) => {
  const totalValue = stocks.reduce(
    (sum, stock) => sum + stock.currentPrice * stock.quantity,
    0
  );
  const totalInvested = stocks.reduce(
    (sum, stock) => sum + stock.purchasePrice * stock.quantity,
    0
  );
  const totalGain = totalValue - totalInvested;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm mb-1">Portfolio Value</p>
            <p className="text-3xl font-bold text-slate-800">
              ${totalValue.toFixed(2)}
            </p>
          </div>
          <DollarSign className="w-12 h-12 text-blue-500 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm mb-1">Total Gain/Loss</p>
            <p
              className={`text-3xl font-bold ${
                totalGain >= 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              ${totalGain.toFixed(2)}
            </p>
          </div>
          <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-600 text-sm mb-1">Total Stocks</p>
            <p className="text-3xl font-bold text-slate-800">{stocks.length}</p>
          </div>
          <Package className="w-12 h-12 text-purple-500 opacity-20" />
        </div>
      </div>
    </div>
  );
};