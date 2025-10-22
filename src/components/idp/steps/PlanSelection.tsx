import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface PlanSelectionProps {
  onNext: (data: any) => void;
}

export const PlanSelection = ({ onNext }: PlanSelectionProps) => {
  const [validity, setValidity] = useState<string>("3");
  const [format, setFormat] = useState<string>("both");

  const handleSubmit = () => {
    onNext({ validity, format });
  };

  return (
    <Card className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Choose your plan</h2>
        <p className="text-muted-foreground">Please choose your plan wisely as certain countries do not accept digital-only options.</p>
      </div>

      <div className="space-y-8">
        {/* Validity Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Choose IDP validity</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { years: "1", expires: "2026", price: 49 },
              { years: "2", expires: "2027", price: 69 },
              { years: "3", expires: "2028", price: 79 },
            ].map((option) => (
              <div
                key={option.years}
                onClick={() => setValidity(option.years)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  validity === option.years
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="text-center">
                  <p className="font-bold text-lg">{option.years} Year{option.years !== "1" ? "s" : ""}</p>
                  <p className="text-sm text-muted-foreground">Expires {option.expires}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">Select a format</h3>
          <p className="text-sm text-muted-foreground mb-4">
            All formats are UN regulated travel document and covered by a no-hassle 100% money-back guarantee
          </p>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Print + Digital */}
            <div
              onClick={() => setFormat("both")}
              className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                format === "both"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Badge className="absolute top-4 right-4 bg-primary">Recommended</Badge>
              <div className="space-y-4">
                <h4 className="font-bold text-xl">PRINT + DIGITAL</h4>
                <div>
                  <p className="text-3xl font-bold">${validity === "3" ? "79" : validity === "2" ? "69" : "49"}</p>
                  <p className="text-sm text-muted-foreground line-through">$207</p>
                  <Badge variant="secondary" className="mt-1">61% off</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Physical booklet shipped to your address</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Digital IDP ready in 2 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Accepted worldwide</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Express shipping available</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Digital Only */}
            <div
              onClick={() => setFormat("digital")}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                format === "digital"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="space-y-4">
                <h4 className="font-bold text-xl">DIGITAL ONLY</h4>
                <div>
                  <p className="text-3xl font-bold">${validity === "3" ? "49" : validity === "2" ? "39" : "29"}</p>
                  <p className="text-sm text-muted-foreground line-through">$107</p>
                  <Badge variant="secondary" className="mt-1">54% off</Badge>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Digital IDP ready in 2 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Instant download via email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Perfect for digital-accepting countries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-primary mt-0.5" />
                    <span>Eco-friendly option</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Button onClick={handleSubmit} className="w-full" size="lg">
          Continue to Review
        </Button>
      </div>
    </Card>
  );
};
