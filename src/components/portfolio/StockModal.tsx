import React from 'react';
import { X } from 'lucide-react';
import type { Stock } from '../../types/stock.types';
import { useStockForm } from '../../hooks/useStockForm';

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (stock: Omit<Stock, 'id' | 'currentPrice'>) => void;
  editingStock?: Stock | null;
}

export const StockModal: React.FC<StockModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingStock,
}) => {
  const { formData, errors, handleChange, validate, reset } = useStockForm(
    editingStock || undefined
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit({
        ticker: formData.ticker.toUpperCase(),
        companyName: formData.companyName,
        quantity: Number(formData.quantity),
        purchasePrice: Number(formData.purchasePrice),
        dateOfPurchase: formData.dateOfPurchase,
      });
      reset();
      onClose();
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {editingStock ? 'Edit Stock' : 'Add New Stock'}
          </h2>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Ticker Symbol *
              </label>
              <input
                type="text"
                name="ticker"
                value={formData.ticker}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.ticker ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="e.g., AAPL"
                maxLength={5}
              />
              {errors.ticker && (
                <p className="text-red-500 text-sm mt-1">{errors.ticker}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Company Name *
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="e.g., Apple Inc."
              />
              {errors.companyName && (
                <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Quantity *
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.quantity ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="e.g., 10"
                min="1"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Purchase Price *
              </label>
              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.purchasePrice ? 'border-red-500' : 'border-slate-300'
                }`}
                placeholder="e.g., 150.00"
                step="0.01"
                min="0"
              />
              {errors.purchasePrice && (
                <p className="text-red-500 text-sm mt-1">{errors.purchasePrice}</p>
              )}
            </div>

            <div>
              <label className="block text-slate-700 font-semibold mb-2">
                Date of Purchase *
              </label>
              <input
                type="date"
                name="dateOfPurchase"
                value={formData.dateOfPurchase}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dateOfPurchase ? 'border-red-500' : 'border-slate-300'
                }`}
                max={new Date().toISOString().split('T')[0]}
              />
              {errors.dateOfPurchase && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.dateOfPurchase}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              {editingStock ? 'Update' : 'Add'} Stock
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-lg hover:bg-slate-300 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};