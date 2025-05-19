
import { useState } from 'react';
import { Package, ShoppingCart, Users, AlertTriangle, DollarSign } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { StockMovementChart, CategoryDistributionChart } from '@/components/dashboard/InventoryChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { dashboardStats, products, orders, suppliers, stockMovements } from '@/lib/data';

const Index = () => {
  // Recent activities
  const recentActivities = [
    {
      id: '1',
      type: 'product',
      description: 'New product "Wireless Earbuds" added to inventory',
      date: new Date('2023-06-15T14:30:00'),
    },
    {
      id: '2',
      type: 'stock',
      description: 'Stock level updated: +50 Bluetooth Speakers',
      date: new Date('2023-06-14T10:15:00'),
    },
    {
      id: '3',
      type: 'order',
      description: 'New order #ORD-2023-004 received from StartUp Innovations',
      date: new Date('2023-06-13T09:45:00'),
    },
    {
      id: '4',
      type: 'supplier',
      description: 'New supplier "CompTech Solutions" added',
      date: new Date('2023-06-12T16:20:00'),
    },
    {
      id: '5',
      type: 'stock',
      description: 'Low stock alert: Smart Watch (8 remaining)',
      date: new Date('2023-06-11T11:30:00'),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Products"
            value={dashboardStats.totalProducts}
            icon={<Package size={20} />}
            description="Across all categories"
            trend={{ value: 12, positive: true }}
          />
          <StatsCard
            title="Total Orders"
            value={dashboardStats.totalOrders}
            icon={<ShoppingCart size={20} />}
            description="Last 30 days"
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            title="Suppliers"
            value={dashboardStats.totalSuppliers}
            icon={<Users size={20} />}
            description="Active suppliers"
            trend={{ value: 0, positive: true }}
          />
          <StatsCard
            title="Low Stock Items"
            value={dashboardStats.lowStockItems}
            icon={<AlertTriangle size={20} />}
            description="Items below reorder point"
            trend={{ value: 2, positive: false }}
            className="text-amber-500"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <StockMovementChart data={dashboardStats.stockMovementsByDay} />
          </div>
          <div>
            <CategoryDistributionChart data={dashboardStats.inventoryByCategoryData} />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <RecentActivity activities={recentActivities} />
          <div className="space-y-6">
            <div className="rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Inventory Value</h3>
              <div className="text-3xl font-bold text-primary">
                ${Math.round(dashboardStats.totalInventoryValue).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Total cost value of current stock
              </p>
            </div>
            <div className="rounded-lg border p-6">
              <h3 className="font-semibold mb-4">Sales Value</h3>
              <div className="text-3xl font-bold text-green-500">
                ${Math.round(dashboardStats.totalSalesValue).toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Total sales this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Index;
