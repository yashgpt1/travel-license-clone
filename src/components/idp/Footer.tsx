import { Shield, Lock, FileCheck } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t mt-16 py-8 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8 mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">SSL Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">GDPR Compliant</span>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">DSS Certified</span>
          </div>
        </div>
        
        <p className="text-center text-sm text-muted-foreground mb-4">
          <strong>Secure & Compliant:</strong> Your data's safety is our priority with SSL encryption and GDPR compliance
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-4">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms and Conditions</a>
          <a href="#" className="hover:text-primary transition-colors">Refund policy</a>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Copyright {new Date().getFullYear()}. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
