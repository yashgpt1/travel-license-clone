import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Camera } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PhotoUploadProps {
  onNext: (data: any) => void;
}

export const PhotoUpload = ({ onNext }: PhotoUploadProps) => {
  const [photos, setPhotos] = useState({
    selfie: null,
    licenseFront: null,
    licenseBack: null,
    signature: null,
  });

  const handleFileChange = (type: keyof typeof photos, file: File | null) => {
    setPhotos(prev => ({ ...prev, [type]: file }));
  };

  const handleSubmit = () => {
    onNext(photos);
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Upload photos</h2>
        <p className="text-muted-foreground">Photo should resemble a license or passport photo with your head straight.</p>
      </div>

      <div className="space-y-8">
        {/* Selfie Upload */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Your Selfie or Passport Photo</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="selfie"
              onChange={(e) => handleFileChange("selfie", e.target.files?.[0] || null)}
            />
            <Label htmlFor="selfie" className="cursor-pointer">
              <Button variant="outline" type="button">Upload a file</Button>
            </Label>
          </div>
        </div>

        {/* License Front */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Photo of your drivers license (Front Side)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload front side of your license</p>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="licenseFront"
              onChange={(e) => handleFileChange("licenseFront", e.target.files?.[0] || null)}
            />
            <Label htmlFor="licenseFront" className="cursor-pointer">
              <Button variant="outline" type="button">Upload a file</Button>
            </Label>
          </div>
        </div>

        {/* License Back */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Photo of your drivers license (Back Side)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Upload back side of your license</p>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="licenseBack"
              onChange={(e) => handleFileChange("licenseBack", e.target.files?.[0] || null)}
            />
            <Label htmlFor="licenseBack" className="cursor-pointer">
              <Button variant="outline" type="button">Upload a file</Button>
            </Label>
          </div>
        </div>

        {/* E-Signature */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">E-signature</Label>
          <Tabs defaultValue="draw" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className="border rounded-lg p-6 min-h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">Draw your signature directly below</p>
            </TabsContent>
            <TabsContent value="type" className="space-y-4">
              <Input placeholder="Type your signature" className="text-2xl font-script" />
            </TabsContent>
            <TabsContent value="upload">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="signature"
                  onChange={(e) => handleFileChange("signature", e.target.files?.[0] || null)}
                />
                <Label htmlFor="signature" className="cursor-pointer">
                  <Button variant="outline" type="button">Upload signature</Button>
                </Label>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <Button onClick={handleSubmit} className="w-full" size="lg">
          Upload & Continue
        </Button>
      </div>
    </Card>
  );
};
