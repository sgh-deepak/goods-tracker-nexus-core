
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CurrencySwitcher } from './CurrencySwitcher';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex items-center justify-end p-2 px-6 border-b">
          <CurrencySwitcher />
        </div>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
