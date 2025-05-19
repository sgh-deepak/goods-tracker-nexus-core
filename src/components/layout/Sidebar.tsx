
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, Truck, Users, ShoppingCart, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarLink = ({ 
  to, 
  icon: Icon, 
  label, 
  isActive, 
  isCollapsed 
}: { 
  to: string, 
  icon: any, 
  label: string, 
  isActive: boolean,
  isCollapsed: boolean
}) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-md px-3 py-2 transition-all hover:bg-accent",
        isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const sidebarLinks = [
    { path: '/', label: 'Dashboard', icon: BarChart },
    { path: '/products', label: 'Products', icon: Package },
    { path: '/stock', label: 'Stock', icon: Truck },
    { path: '/suppliers', label: 'Suppliers', icon: Users },
    { path: '/orders', label: 'Orders', icon: ShoppingCart },
  ];

  return (
    <div 
      className={cn(
        "h-screen flex flex-col border-r bg-background transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <Link to="/" className="font-semibold text-lg flex items-center gap-2">
            <Package size={24} className="text-primary" />
            <span className="truncate">Inventory MS</span>
          </Link>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <Package size={24} className="text-primary" />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-3">
        <nav className="flex flex-col gap-1">
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
              isActive={location.pathname === link.path}
              isCollapsed={collapsed}
            />
          ))}
        </nav>
      </div>

      <div className="border-t p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
