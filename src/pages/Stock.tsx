
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { StockTable } from '@/components/stock/StockTable';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Product, products as initialProducts, stockMovements as initialMovements, StockMovement } from '@/lib/data';
import { useToast } from "@/hooks/use-toast";

const Stock = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [stockMovements, setStockMovements] = useState<StockMovement[]>(initialMovements);
  const [adjustStockOpen, setAdjustStockOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [adjustmentQuantity, setAdjustmentQuantity] = useState('');
  const [movementType, setMovementType] = useState<'received' | 'shipped' | 'adjusted'>('received');
  const [reference, setReference] = useState('');

  const handleOpenAdjustStock = (product: Product) => {
    setCurrentProduct(product);
    setAdjustStockOpen(true);
    setAdjustmentQuantity('');
    setMovementType('received');
    setReference('');
  };

  const handleAdjustStock = () => {
    if (!currentProduct) return;

    const quantity = parseInt(adjustmentQuantity);
    if (isNaN(quantity)) return;

    // Prepare the actual quantity for the movement (negative for shipped)
    const actualQuantity = movementType === 'shipped' ? -Math.abs(quantity) : quantity;

    // Create new stock movement
    const newMovement: StockMovement = {
      id: (stockMovements.length + 1).toString(),
      productId: currentProduct.id,
      productName: currentProduct.name,
      type: movementType,
      quantity: actualQuantity,
      date: new Date(),
      reference: reference || `STOCK-${new Date().toISOString().slice(0, 10)}`,
    };
    
    // Add movement to history
    setStockMovements(prev => [...prev, newMovement]);
    
    // Update product stock level
    setProducts(prev => 
      prev.map(p => {
        if (p.id === currentProduct.id) {
          const newStockLevel = p.stockLevel + actualQuantity;
          return {
            ...p,
            stockLevel: Math.max(0, newStockLevel) // Ensure stock level is not negative
          };
        }
        return p;
      })
    );

    toast({
      title: 'Stock Updated',
      description: `${currentProduct.name} stock level has been ${movementType}`,
    });

    setAdjustStockOpen(false);
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Stock Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-lg border p-6 bg-blue-50">
            <h3 className="text-lg font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{products.length}</p>
          </div>
          <div className="rounded-lg border p-6 bg-amber-50">
            <h3 className="text-lg font-semibold mb-2">Low Stock Items</h3>
            <p className="text-3xl font-bold text-amber-600">
              {products.filter(p => p.stockLevel <= p.reorderPoint).length}
            </p>
          </div>
          <div className="rounded-lg border p-6 bg-green-50">
            <h3 className="text-lg font-semibold mb-2">Stock Movements</h3>
            <p className="text-3xl font-bold text-green-600">{stockMovements.length}</p>
          </div>
        </div>
        
        <StockTable 
          products={products} 
          stockMovements={stockMovements} 
          onAddStock={handleOpenAdjustStock} 
        />

        <Dialog open={adjustStockOpen} onOpenChange={setAdjustStockOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adjust Stock Level</DialogTitle>
            </DialogHeader>
            
            {currentProduct && (
              <div className="space-y-4 py-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded flex items-center justify-center bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">{currentProduct.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Current stock: {currentProduct.stockLevel}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Movement Type</Label>
                  <RadioGroup 
                    value={movementType} 
                    onValueChange={(value) => setMovementType(value as any)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="received" id="received" />
                      <Label htmlFor="received">Received</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="shipped" id="shipped" />
                      <Label htmlFor="shipped">Shipped</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="adjusted" id="adjusted" />
                      <Label htmlFor="adjusted">Adjusted</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    min="1"
                    value={adjustmentQuantity} 
                    onChange={(e) => setAdjustmentQuantity(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reference">Reference (Optional)</Label>
                  <Input 
                    id="reference" 
                    placeholder="e.g. PO-12345 or INV-678" 
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                  />
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setAdjustStockOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdjustStock}>
                Update Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
};

export default Stock;
