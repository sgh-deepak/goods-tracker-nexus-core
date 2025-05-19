
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product, StockMovement } from "@/lib/data";

interface StockTableProps {
  products: Product[];
  stockMovements: StockMovement[];
  onAddStock: (product: Product) => void;
}

export function StockTable({ products, stockMovements, onAddStock }: StockTableProps) {
  const [filter, setFilter] = useState<'all' | 'low'>('all');
  
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.stockLevel <= p.reorderPoint);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-x-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
          >
            All Items
          </Button>
          <Button
            variant={filter === 'low' ? 'default' : 'outline'}
            onClick={() => setFilter('low')}
          >
            Low Stock
            {filter !== 'low' && (
              <Badge variant="destructive" className="ml-2">
                {products.filter(p => p.stockLevel <= p.reorderPoint).length}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Current Stock</TableHead>
              <TableHead>Reorder Point</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Last Movement</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No items found.
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const productMovements = stockMovements.filter(sm => sm.productId === product.id);
                const lastMovement = productMovements.length > 0
                  ? productMovements.sort((a, b) => b.date.getTime() - a.date.getTime())[0]
                  : null;

                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {product.imageUrl && (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        {product.name}
                      </div>
                    </TableCell>
                    <TableCell>{product.sku}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className={product.stockLevel <= product.reorderPoint ? "text-red-500 font-semibold" : ""}>
                          {product.stockLevel}
                        </span>
                        {product.stockLevel <= product.reorderPoint && (
                          <Badge variant="destructive" className="text-xs">
                            Low
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.reorderPoint}</TableCell>
                    <TableCell>{product.supplier}</TableCell>
                    <TableCell>
                      {lastMovement ? (
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              lastMovement.type === 'received' ? 'default' :
                              lastMovement.type === 'shipped' ? 'secondary' : 'outline'
                            }
                          >
                            {lastMovement.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {lastMovement.quantity > 0 ? '+' : ''}{lastMovement.quantity}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground">No movements</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onAddStock(product)}
                      >
                        Adjust Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
