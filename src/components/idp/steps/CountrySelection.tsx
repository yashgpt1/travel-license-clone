import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CountrySelectionProps {
  onNext: (country: string) => void;
}

const countries = [
  "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", 
  "Italy", "Spain", "Japan", "South Korea", "Mexico", "Brazil", "Argentina",
  "China", "India", "Thailand", "Singapore", "Malaysia", "New Zealand", "Netherlands"
];

export const CountrySelection = ({ onNext }: CountrySelectionProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handleSubmit = () => {
    if (selectedCountry) {
      onNext(selectedCountry);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Select your destination countries to ensure they allow an International Driving Permit?
      </h2>

      <div className="space-y-4 mb-6">
        <Label htmlFor="country">Destination Country</Label>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger id="country">
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
          <SelectContent>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {selectedCountry && (
          <div className="p-4 bg-accent rounded-lg text-sm">
            <p className="text-accent-foreground">
              The IDP is valid in <strong>{selectedCountry}</strong>. Accepted types include both a printed 
              and digital IDP valid from 1 to 3 years, or a digital-only IDP when accompanied by a valid driver's license.
            </p>
          </div>
        )}
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={!selectedCountry}
        className="w-full"
        size="lg"
      >
        Start Application
      </Button>
    </Card>
  );
};
