import { useState } from 'react';
import type { Stock } from '../types/stock.types';
import type { StockFormData } from '../types/stock.types';

export const useStockForm = (initialStock?: Stock) => {
  const [formData, setFormData] = useState<StockFormData>({
    ticker: initialStock?.ticker || '',
    companyName: initialStock?.companyName || '',
    quantity: initialStock?.quantity.toString() || '',
    purchasePrice: initialStock?.purchasePrice.toString() || '',
    dateOfPurchase: initialStock?.dateOfPurchase || '',
  });

  const [errors, setErrors] = useState<Partial<StockFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof StockFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<StockFormData> = {};

    if (!formData.ticker.trim()) {
      newErrors.ticker = 'Ticker is required';
    } else if (!/^[A-Z]{1,5}$/.test(formData.ticker.toUpperCase())) {
      newErrors.ticker = 'Invalid ticker format (1-5 uppercase letters)';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.quantity || Number(formData.quantity) <= 0) {
      newErrors.quantity = 'Quantity must be greater than 0';
    }

    if (!formData.purchasePrice || Number(formData.purchasePrice) <= 0) {
      newErrors.purchasePrice = 'Purchase price must be greater than 0';
    }

    if (!formData.dateOfPurchase) {
      newErrors.dateOfPurchase = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setFormData({
      ticker: '',
      companyName: '',
      quantity: '',
      purchasePrice: '',
      dateOfPurchase: '',
    });
    setErrors({});
  };

  return {
    formData,
    errors,
    handleChange,
    validate,
    reset,
    setFormData,
  };
};