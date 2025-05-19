
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Currency:</span>
      <div className="flex rounded-md overflow-hidden border">
        <Button 
          variant={currency === 'USD' ? "default" : "ghost"} 
          size="sm" 
          className="h-8 px-3 rounded-none"
          onClick={() => setCurrency('USD')}
        >
          USD ($)
        </Button>
        <Button 
          variant={currency === 'INR' ? "default" : "ghost"} 
          size="sm" 
          className="h-8 px-3 rounded-none"
          onClick={() => setCurrency('INR')}
        >
          INR (₹)
        </Button>
      </div>
    </div>
  );
}
