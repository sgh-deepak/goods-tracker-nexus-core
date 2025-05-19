
import React, { createContext, useContext, useState, ReactNode } from 'react';

type CurrencyType = 'USD' | 'INR';

interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (currency: CurrencyType) => void;
  formatPrice: (price: number) => string;
  conversionRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Approximate conversion rate (1 USD = ~83 INR as of May 2023)
const USD_TO_INR = 83;

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  const formatPrice = (price: number): string => {
    if (currency === 'USD') {
      return `$${price.toFixed(2)}`;
    } else {
      // Convert to INR
      const inrPrice = price * USD_TO_INR;
      return `₹${inrPrice.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency, 
      formatPrice,
      conversionRate: USD_TO_INR
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
