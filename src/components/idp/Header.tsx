import { Globe } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Globe className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold uppercase tracking-wider">International</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wide">Drivers Permit</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium">🇺🇸 EN</span>
          <span className="text-muted-foreground">|</span>
          <span className="font-medium">$ - USD</span>
        </div>
      </div>
    </header>
  );
};
