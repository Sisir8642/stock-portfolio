import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { usePortfolioStore } from './store/portfolioStore';
import { PortfolioSummary } from './components/portfolio/PortfolioSummary';
import { PortfolioTable } from './components/portfolio/PortfolioTable';
import { StockModal } from './components/portfolio/StockModal';
import { StockLineChart } from './components/charts/StockLineChart';
import { StockBarChart } from './components/charts/StockBarChart';
import { Stock } from './types/stock.types';
import { initialStocks, mockChartData } from './utils/mockData';

function App() {
  const { portfolio, addStock, updateStock, deleteStock } = usePortfolioStore();
  const [showModal, setShowModal] = useState(false);
  const [editingStock, setEditingStock] = useState<Stock | null>(null);
  const [activeTab, setActiveTab] = useState<'portfolio' | 'charts'>('portfolio');

  // Initialize portfolio with mock data
  useEffect(() => {
    if (portfolio.length === 0) {
      initialStocks.forEach((stock) => addStock(stock));
    }
  }, []);

  const handleAddStock = (stockData: Omit<Stock, 'id' | 'currentPrice'>) => {
    const newStock: Stock = {
      ...stockData,
      id: Date.now().toString(),
      currentPrice: stockData.purchasePrice * (1 + Math.random() * 0.2 - 0.1),
    };
    addStock(newStock);
  };

  const handleUpdateStock = (stockData: Omit<Stock, 'id' | 'currentPrice'>) => {
    if (editingStock) {
      updateStock(editingStock.id, {
        ...stockData,
        currentPrice: editingStock.currentPrice,
      });
      setEditingStock(null);
    }
  };

  const handleEditClick = (stock: Stock) => {
    setEditingStock(stock);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingStock(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Stock Portfolio Manager
          </h1>
          <p className="text-slate-600">Track and manage your investments</p>
        </div>

        {/* Summary Cards */}
        <PortfolioSummary stocks={portfolio} />

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'portfolio'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => setActiveTab('charts')}
              className={`px-6 py-4 font-semibold transition-colors ${
                activeTab === 'charts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Charts
            </button>
          </div>

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">My Stocks</h2>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Stock
                </button>
              </div>

              <PortfolioTable
                stocks={portfolio}
                onEdit={handleEditClick}
                onDelete={deleteStock}
              />
            </div>
          )}

          {/* Charts Tab */}
          {activeTab === 'charts' && (
            <div className="p-6 space-y-6">
              <StockLineChart data={mockChartData} />
              <StockBarChart data={mockChartData} />
            </div>
          )}
        </div>

        {/* Stock Modal */}
        <StockModal
          isOpen={showModal}
          onClose={handleModalClose}
          onSubmit={editingStock ? handleUpdateStock : handleAddStock}
          editingStock={editingStock}
        />
      </div>
    </div>
  );
}

export default App;