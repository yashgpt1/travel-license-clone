import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X } from "lucide-react";
import { Input } from "@/components/ui/input";

interface PhotoUploadProps {
  onNext: (data: any) => void;
}

export const PhotoUpload = ({ onNext }: PhotoUploadProps) => {
  const [photos, setPhotos] = useState<{
    selfie: string | null;
    licenseFront: string | null;
    licenseBack: string | null;
    signature: string | null;
  }>({
    selfie: null,
    licenseFront: null,
    licenseBack: null,
    signature: null,
  });
  const [signatureType, setSignatureType] = useState<string>("draw");
  const [typedSignature, setTypedSignature] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const handleFileChange = (type: keyof typeof photos, file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = (type: keyof typeof photos) => {
    setPhotos(prev => ({ ...prev, [type]: null }));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current) {
      setPhotos(prev => ({ ...prev, signature: canvasRef.current!.toDataURL() }));
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPhotos(prev => ({ ...prev, signature: null }));
  };

  const handleTypedSignature = () => {
    if (!typedSignature) return;
    const canvas = document.createElement("canvas");
    canvas.width = 500;
    canvas.height = 150;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "48px cursive";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(typedSignature, canvas.width / 2, canvas.height / 2);
    setPhotos(prev => ({ ...prev, signature: canvas.toDataURL() }));
  };

  const handleSubmit = () => {
    if (signatureType === "type" && typedSignature && !photos.signature) {
      handleTypedSignature();
    }
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
          {photos.selfie ? (
            <div className="relative border-2 border-border rounded-lg p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemovePhoto("selfie")}
              >
                <X className="h-4 w-4" />
              </Button>
              <img src={photos.selfie} alt="Selfie" className="max-h-64 mx-auto rounded" />
            </div>
          ) : (
            <Label htmlFor="selfie" className="cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="selfie"
                  onChange={(e) => handleFileChange("selfie", e.target.files?.[0] || null)}
                />
                <Button variant="outline" type="button" asChild>
                  <span>Upload a file</span>
                </Button>
              </div>
            </Label>
          )}
        </div>

        {/* License Front */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Photo of your drivers license (Front Side)</Label>
          {photos.licenseFront ? (
            <div className="relative border-2 border-border rounded-lg p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemovePhoto("licenseFront")}
              >
                <X className="h-4 w-4" />
              </Button>
              <img src={photos.licenseFront} alt="License Front" className="max-h-64 mx-auto rounded" />
            </div>
          ) : (
            <Label htmlFor="licenseFront" className="cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload front side of your license</p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="licenseFront"
                  onChange={(e) => handleFileChange("licenseFront", e.target.files?.[0] || null)}
                />
                <Button variant="outline" type="button" asChild>
                  <span>Upload a file</span>
                </Button>
              </div>
            </Label>
          )}
        </div>

        {/* License Back */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">Photo of your drivers license (Back Side)</Label>
          {photos.licenseBack ? (
            <div className="relative border-2 border-border rounded-lg p-4">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2"
                onClick={() => handleRemovePhoto("licenseBack")}
              >
                <X className="h-4 w-4" />
              </Button>
              <img src={photos.licenseBack} alt="License Back" className="max-h-64 mx-auto rounded" />
            </div>
          ) : (
            <Label htmlFor="licenseBack" className="cursor-pointer">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-2">Upload back side of your license</p>
                <Input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="licenseBack"
                  onChange={(e) => handleFileChange("licenseBack", e.target.files?.[0] || null)}
                />
                <Button variant="outline" type="button" asChild>
                  <span>Upload a file</span>
                </Button>
              </div>
            </Label>
          )}
        </div>

        {/* E-Signature */}
        <div className="space-y-4">
          <Label className="text-lg font-semibold">E-signature</Label>
          <Tabs defaultValue="draw" className="w-full" onValueChange={setSignatureType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="draw">Draw</TabsTrigger>
              <TabsTrigger value="type">Type</TabsTrigger>
              <TabsTrigger value="upload">Upload</TabsTrigger>
            </TabsList>
            <TabsContent value="draw" className="space-y-4">
              <div className="border rounded-lg p-4 bg-background">
                <canvas
                  ref={canvasRef}
                  width={500}
                  height={200}
                  className="border border-border rounded cursor-crosshair w-full"
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                />
                <Button variant="outline" size="sm" onClick={clearCanvas} className="mt-2">
                  Clear
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="type" className="space-y-4">
              <Input
                placeholder="Type your signature"
                className="text-2xl"
                style={{ fontFamily: 'cursive' }}
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                onBlur={handleTypedSignature}
              />
              {photos.signature && (
                <div className="border rounded-lg p-4">
                  <img src={photos.signature} alt="Signature Preview" className="max-h-32 mx-auto" />
                </div>
              )}
            </TabsContent>
            <TabsContent value="upload">
              {photos.signature ? (
                <div className="relative border-2 border-border rounded-lg p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemovePhoto("signature")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img src={photos.signature} alt="Signature" className="max-h-32 mx-auto" />
                </div>
              ) : (
                <Label htmlFor="signature" className="cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="signature"
                      onChange={(e) => handleFileChange("signature", e.target.files?.[0] || null)}
                    />
                    <Button variant="outline" type="button" asChild>
                      <span>Upload signature</span>
                    </Button>
                  </div>
                </Label>
              )}
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
