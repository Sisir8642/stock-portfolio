import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Stock } from '../../types/stock.types';

interface PortfolioTableProps {
  stocks: Stock[];
  onEdit: (stock: Stock) => void;
  onDelete: (id: string) => void;
}

export const PortfolioTable: React.FC<PortfolioTableProps> = ({
  stocks,
  onEdit,
  onDelete,
}) => {
  const calculateGainLoss = (stock: Stock) => {
    const gain = (stock.currentPrice - stock.purchasePrice) * stock.quantity;
    const percentage =
      ((stock.currentPrice - stock.purchasePrice) / stock.purchasePrice) * 100;
    return { gain, percentage };
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      onDelete(id);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b-2 border-slate-200">
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">
              Ticker
            </th>
            <th className="text-left py-3 px-4 text-slate-600 font-semibold">
              Company
            </th>
            <th className="text-right py-3 px-4 text-slate-600 font-semibold">
              Quantity
            </th>
            <th className="text-right py-3 px-4 text-slate-600 font-semibold">
              Purchase Price
            </th>
            <th className="text-right py-3 px-4 text-slate-600 font-semibold">
              Current Price
            </th>
            <th className="text-right py-3 px-4 text-slate-600 font-semibold">
              Gain/Loss
            </th>
            <th className="text-right py-3 px-4 text-slate-600 font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {stocks.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-8 text-slate-500">
                No stocks in portfolio. Add your first stock to get started!
              </td>
            </tr>
          ) : (
            stocks.map((stock) => {
              const { gain, percentage } = calculateGainLoss(stock);
              return (
                <tr
                  key={stock.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-4 px-4 font-bold text-slate-800">
                    {stock.ticker}
                  </td>
                  <td className="py-4 px-4 text-slate-600">
                    {stock.companyName}
                  </td>
                  <td className="py-4 px-4 text-right text-slate-800">
                    {stock.quantity}
                  </td>
                  <td className="py-4 px-4 text-right text-slate-800">
                    ${stock.purchasePrice.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right text-slate-800">
                    ${stock.currentPrice.toFixed(2)}
                  </td>
                  <td
                    className={`py-4 px-4 text-right font-semibold ${
                      gain >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    ${gain.toFixed(2)} ({percentage.toFixed(2)}%)
                  </td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(stock)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                        aria-label="Edit stock"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(stock.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                        aria-label="Delete stock"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};