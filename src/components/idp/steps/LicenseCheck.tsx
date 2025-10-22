import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface LicenseCheckProps {
  onNext: (hasLicense: boolean) => void;
}

export const LicenseCheck = ({ onNext }: LicenseCheckProps) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleSubmit = () => {
    if (selectedValue === "yes") {
      onNext(true);
    }
  };

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">
        Do you currently hold a valid driver's license issued by your country?
      </h2>

      <RadioGroup value={selectedValue} onValueChange={setSelectedValue} className="space-y-4 mb-6">
        <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors">
          <RadioGroupItem value="yes" id="yes" />
          <Label htmlFor="yes" className="flex-1 cursor-pointer font-medium">
            Yes
          </Label>
        </div>

        <div className="flex items-center space-x-3 p-4 rounded-lg border bg-card hover:bg-accent cursor-pointer transition-colors">
          <RadioGroupItem value="no" id="no" />
          <Label htmlFor="no" className="flex-1 cursor-pointer font-medium">
            No
          </Label>
        </div>
      </RadioGroup>

      <Alert variant="destructive" className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          An international driver's permit necessitates having a valid driver's license from your home country. 
          Orders accompanied by expired or invalid local driving licenses will be declined.
        </AlertDescription>
      </Alert>

      <Button 
        onClick={handleSubmit} 
        disabled={selectedValue !== "yes"}
        className="w-full"
        size="lg"
      >
        Next
      </Button>
    </Card>
  );
};
