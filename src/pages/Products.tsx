
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductTable } from '@/components/products/ProductTable';
import { ProductForm } from '@/components/products/ProductForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Product, products as initialProducts } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";

const Products = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | undefined>(undefined);

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleAddProduct = () => {
    setCurrentProduct(undefined);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setProducts(prev => prev.filter(p => p.id !== product.id));
    toast({
      title: "Product Deleted",
      description: `${product.name} has been removed from the inventory.`,
    });
  };

  const handleSaveProduct = (formData: Partial<Product>) => {
    if (currentProduct) {
      // Update existing product
      setProducts(prev => 
        prev.map(p => p.id === currentProduct.id ? { ...p, ...formData } : p)
      );
      toast({
        title: "Product Updated",
        description: `${formData.name} has been updated successfully.`,
      });
    } else {
      // Add new product
      const newProduct: Product = {
        id: (products.length + 1).toString(),
        name: formData.name || '',
        sku: formData.sku || '',
        category: formData.category || '',
        price: formData.price || 0,
        costPrice: formData.costPrice || 0,
        stockLevel: formData.stockLevel || 0,
        reorderPoint: formData.reorderPoint || 0,
        supplier: formData.supplier || '',
        imageUrl: formData.imageUrl,
        createdAt: new Date(),
      };
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Product Added",
        description: `${newProduct.name} has been added to inventory.`,
      });
    }
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Button onClick={handleAddProduct}>Add Product</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <Input
              placeholder="Search by product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          <Select
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <ProductTable 
          products={filteredProducts} 
          onEdit={handleEditProduct} 
          onDelete={handleDeleteProduct} 
        />

        <ProductForm 
          open={isFormOpen} 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSaveProduct}
          product={currentProduct}
        />
      </div>
    </PageLayout>
  );
};

export default Products;
