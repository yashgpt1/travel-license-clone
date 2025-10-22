import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Car, Truck, Bus } from "lucide-react";

interface DriverDetailsProps {
  onNext: (data: any) => void;
}

const countries = ["United States", "United Kingdom", "Canada", "Australia", "Germany", "France"];
const eyeColors = ["Black", "Brown", "Blue", "Green", "Hazel", "Gray"];

export const DriverDetails = ({ onNext }: DriverDetailsProps) => {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    birthCountry: "",
    birthDate: "",
    gender: "",
    eyeColor: "",
    height: "",
    currentCountry: "",
    phoneNumber: "",
    address: "",
    licenseClasses: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext(formData);
  };

  const toggleLicenseClass = (classType: string) => {
    setFormData(prev => ({
      ...prev,
      licenseClasses: prev.licenseClasses.includes(classType)
        ? prev.licenseClasses.filter(c => c !== classType)
        : [...prev.licenseClasses, classType]
    }));
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Driver's details</h2>
        <p className="text-muted-foreground">Please provide details exactly as they are shown on your driver's license.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-lg">About you</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                required
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                required
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="birthCountry">Birth Country *</Label>
              <Select value={formData.birthCountry} onValueChange={(value) => setFormData({ ...formData, birthCountry: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map(country => (
                    <SelectItem key={country} value={country}>{country}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthDate">Birth Date *</Label>
              <Input
                id="birthDate"
                type="date"
                required
                value={formData.birthDate}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender *</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="eyeColor">Eye Color *</Label>
              <Select value={formData.eyeColor} onValueChange={(value) => setFormData({ ...formData, eyeColor: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {eyeColors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm) *</Label>
              <Input
                id="height"
                type="number"
                required
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                placeholder="170"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentCountry">In which country are you living now *</Label>
            <Select value={formData.currentCountry} onValueChange={(value) => setFormData({ ...formData, currentCountry: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map(country => (
                  <SelectItem key={country} value={country}>{country}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full address in your driver's license *</Label>
            <Input
              id="address"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Enter your full address"
            />
          </div>

          <div className="space-y-4">
            <Label>License Classes *</Label>
            <p className="text-sm text-muted-foreground">Please select at least one type of license classes</p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {["A", "B", "C", "D", "E"].map((classType) => (
                <div
                  key={classType}
                  onClick={() => toggleLicenseClass(classType)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.licenseClasses.includes(classType)
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    {classType === "A" && <Car className="h-8 w-8" />}
                    {classType === "B" && <Car className="h-8 w-8" />}
                    {classType === "C" && <Truck className="h-8 w-8" />}
                    {classType === "D" && <Bus className="h-8 w-8" />}
                    {classType === "E" && <Truck className="h-8 w-8" />}
                    <span className="font-bold text-lg">{classType}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          Next: Upload photos
        </Button>
      </form>
    </Card>
  );
};
