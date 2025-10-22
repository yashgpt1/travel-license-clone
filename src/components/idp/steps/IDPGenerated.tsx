import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";

interface IDPGeneratedProps {
  formData: any;
}

export const IDPGenerated = ({ formData }: IDPGeneratedProps) => {
  const handleDownload = () => {
    // In a real app, this would generate and download the PDF
    console.log("Downloading IDP with data:", formData);
    alert("IDP PDF would be downloaded here");
  };

  const handleEmail = () => {
    // In a real app, this would send the IDP via email
    console.log("Emailing IDP to:", formData.email);
    alert("IDP would be sent to your email");
  };

  return (
    <Card className="p-8 max-w-3xl mx-auto">
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <CheckCircle className="h-20 w-20 text-primary" />
        </div>
        
        <div>
          <h2 className="text-3xl font-bold mb-2">Your IDP is Ready!</h2>
          <p className="text-muted-foreground">
            Congratulations! Your International Driving Permit has been generated successfully.
          </p>
        </div>

        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 space-y-3">
          <h3 className="font-semibold text-lg">IDP Details</h3>
          <div className="text-sm space-y-2 text-left">
            <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
            <p><span className="font-medium">License Number:</span> {formData.licenseNumber || "N/A"}</p>
            <p><span className="font-medium">Validity:</span> {formData.validity} Year(s)</p>
            <p><span className="font-medium">Format:</span> {formData.format === "both" ? "Print + Digital" : "Digital Only"}</p>
            <p><span className="font-medium">Issue Date:</span> {new Date().toLocaleDateString()}</p>
            <p><span className="font-medium">Expiry Date:</span> {new Date(new Date().setFullYear(new Date().getFullYear() + parseInt(formData.validity))).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button onClick={handleDownload} size="lg" className="gap-2">
            <Download className="h-5 w-5" />
            Download IDP
          </Button>
          <Button onClick={handleEmail} variant="outline" size="lg" className="gap-2">
            <Mail className="h-5 w-5" />
            Send via Email
          </Button>
        </div>

        <div className="pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            {formData.format === "both" 
              ? "Your physical IDP booklet will be shipped within 2-3 business days. You can use the digital version immediately."
              : "You can use your digital IDP immediately. It will also be sent to your email."}
          </p>
        </div>
      </div>
    </Card>
  );
};
