
// Mock data for inventory management system

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  costPrice: number;
  stockLevel: number;
  reorderPoint: number;
  supplier: string;
  imageUrl?: string;
  createdAt: Date;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  productsSupplied: number;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }>;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'received' | 'shipped' | 'adjusted';
  quantity: number;
  date: Date;
  reference: string;
}

// Products
export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Earbuds',
    sku: 'WE-001',
    category: 'Electronics',
    price: 79.99,
    costPrice: 45.00,
    stockLevel: 120,
    reorderPoint: 20,
    supplier: 'TechGadget Inc.',
    imageUrl: 'https://placehold.co/200x200',
    createdAt: new Date('2023-05-15')
  },
  {
    id: '2',
    name: 'Laptop Backpack',
    sku: 'LB-002',
    category: 'Accessories',
    price: 59.99,
    costPrice: 32.50,
    stockLevel: 45,
    reorderPoint: 10,
    supplier: 'BagMasters Co.',
    imageUrl: 'https://placehold.co/200x200',
    createdAt: new Date('2023-04-22')
  },
  {
    id: '3',
    name: 'Smart Watch',
    sku: 'SW-003',
    category: 'Electronics',
    price: 249.99,
    costPrice: 175.00,
    stockLevel: 18,
    reorderPoint: 15,
    supplier: 'TechGadget Inc.',
    imageUrl: 'https://placehold.co/200x200',
    createdAt: new Date('2023-06-10')
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    sku: 'BS-004',
    category: 'Electronics',
    price: 89.99,
    costPrice: 56.25,
    stockLevel: 62,
    reorderPoint: 25,
    supplier: 'SoundWave Electronics',
    imageUrl: 'https://placehold.co/200x200',
    createdAt: new Date('2023-02-08')
  },
  {
    id: '5',
    name: 'USB-C Cable',
    sku: 'UC-005',
    category: 'Accessories',
    price: 14.99,
    costPrice: 4.50,
    stockLevel: 250,
    reorderPoint: 50,
    supplier: 'CablePro Supply',
    imageUrl: 'https://placehold.co/200x200',
    createdAt: new Date('2023-01-15')
  },
  {
    id: '6',
    name: 'Wireless Mouse',
    sku: 'WM-006',
    category: 'Electronics',
    price: 29.99,
    costPrice: 15.75,
    stockLevel: 85,
    reorderPoint: 30,
    supplier: 'CompTech Solutions',
    imageUrl: 'https://placehold.co/200x200',
    createdAt: new Date('2023-03-21')
  }
];

// Suppliers
export const suppliers: Supplier[] = [
  {
    id: '1',
    name: 'TechGadget Inc.',
    contactPerson: 'John Smith',
    email: 'john@techgadget.com',
    phone: '555-1234',
    address: '123 Tech Blvd, San Francisco, CA 94107',
    productsSupplied: 12,
    status: 'active',
    createdAt: new Date('2022-10-10')
  },
  {
    id: '2',
    name: 'BagMasters Co.',
    contactPerson: 'Lisa Johnson',
    email: 'lisa@bagmasters.com',
    phone: '555-2345',
    address: '456 Fashion Ave, New York, NY 10018',
    productsSupplied: 5,
    status: 'active',
    createdAt: new Date('2022-11-15')
  },
  {
    id: '3',
    name: 'SoundWave Electronics',
    contactPerson: 'Mike Chen',
    email: 'mike@soundwave.com',
    phone: '555-3456',
    address: '789 Audio Ln, Austin, TX 78701',
    productsSupplied: 8,
    status: 'active',
    createdAt: new Date('2022-09-05')
  },
  {
    id: '4',
    name: 'CablePro Supply',
    contactPerson: 'Sarah Wilson',
    email: 'sarah@cablepro.com',
    phone: '555-4567',
    address: '101 Connect St, Seattle, WA 98101',
    productsSupplied: 15,
    status: 'active',
    createdAt: new Date('2023-01-22')
  },
  {
    id: '5',
    name: 'CompTech Solutions',
    contactPerson: 'David Lee',
    email: 'david@comptech.com',
    phone: '555-5678',
    address: '202 Computer Rd, Boston, MA 02108',
    productsSupplied: 20,
    status: 'inactive',
    createdAt: new Date('2022-08-17')
  }
];

// Orders
export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2023-001',
    customer: 'Acme Corp',
    date: new Date('2023-06-15'),
    status: 'delivered',
    total: 1259.94,
    items: [
      {
        productId: '1',
        productName: 'Wireless Earbuds',
        quantity: 5,
        price: 79.99
      },
      {
        productId: '3',
        productName: 'Smart Watch',
        quantity: 4,
        price: 249.99
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2023-002',
    customer: 'Global Industries',
    date: new Date('2023-06-18'),
    status: 'shipped',
    total: 599.92,
    items: [
      {
        productId: '4',
        productName: 'Bluetooth Speaker',
        quantity: 3,
        price: 89.99
      },
      {
        productId: '6',
        productName: 'Wireless Mouse',
        quantity: 11,
        price: 29.99
      }
    ]
  },
  {
    id: '3',
    orderNumber: 'ORD-2023-003',
    customer: 'Tech Solutions Ltd',
    date: new Date('2023-06-20'),
    status: 'processing',
    total: 824.93,
    items: [
      {
        productId: '2',
        productName: 'Laptop Backpack',
        quantity: 7,
        price: 59.99
      },
      {
        productId: '5',
        productName: 'USB-C Cable',
        quantity: 15,
        price: 14.99
      },
      {
        productId: '1',
        productName: 'Wireless Earbuds',
        quantity: 3,
        price: 79.99
      }
    ]
  },
  {
    id: '4',
    orderNumber: 'ORD-2023-004',
    customer: 'StartUp Innovations',
    date: new Date('2023-06-22'),
    status: 'pending',
    total: 1499.94,
    items: [
      {
        productId: '3',
        productName: 'Smart Watch',
        quantity: 6,
        price: 249.99
      }
    ]
  }
];

// Stock Movements
export const stockMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Wireless Earbuds',
    type: 'received',
    quantity: 50,
    date: new Date('2023-06-10'),
    reference: 'PO-2023-001'
  },
  {
    id: '2',
    productId: '1',
    productName: 'Wireless Earbuds',
    type: 'shipped',
    quantity: -8,
    date: new Date('2023-06-15'),
    reference: 'ORD-2023-001'
  },
  {
    id: '3',
    productId: '3',
    productName: 'Smart Watch',
    type: 'received',
    quantity: 25,
    date: new Date('2023-06-05'),
    reference: 'PO-2023-002'
  },
  {
    id: '4',
    productId: '3',
    productName: 'Smart Watch',
    type: 'shipped',
    quantity: -4,
    date: new Date('2023-06-15'),
    reference: 'ORD-2023-001'
  },
  {
    id: '5',
    productId: '4',
    productName: 'Bluetooth Speaker',
    type: 'shipped',
    quantity: -3,
    date: new Date('2023-06-18'),
    reference: 'ORD-2023-002'
  },
  {
    id: '6',
    productId: '2',
    productName: 'Laptop Backpack',
    type: 'adjusted',
    quantity: -2,
    date: new Date('2023-06-12'),
    reference: 'INV-ADJ-001'
  }
];

// Dashboard Statistics
export const dashboardStats = {
  totalProducts: products.length,
  totalSuppliers: suppliers.length,
  totalOrders: orders.length,
  lowStockItems: products.filter(p => p.stockLevel <= p.reorderPoint).length,
  totalInventoryValue: products.reduce((total, product) => total + (product.stockLevel * product.costPrice), 0),
  totalSalesValue: orders.reduce((total, order) => total + order.total, 0),
  stockMovementsByDay: [
    { day: 'Monday', received: 12, shipped: 8 },
    { day: 'Tuesday', received: 8, shipped: 10 },
    { day: 'Wednesday', received: 15, shipped: 12 },
    { day: 'Thursday', received: 10, shipped: 14 },
    { day: 'Friday', received: 5, shipped: 18 },
    { day: 'Saturday', received: 3, shipped: 6 },
    { day: 'Sunday', received: 0, shipped: 0 }
  ],
  inventoryByCategoryData: [
    { name: 'Electronics', value: products.filter(p => p.category === 'Electronics').reduce((sum, p) => sum + p.stockLevel, 0) },
    { name: 'Accessories', value: products.filter(p => p.category === 'Accessories').reduce((sum, p) => sum + p.stockLevel, 0) }
  ]
};
