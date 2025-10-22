import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";
import jsPDF from "jspdf";

interface IDPGeneratedProps {
  formData: any;
}

export const IDPGenerated = ({ formData }: IDPGeneratedProps) => {
  const handleDownload = async () => {
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4"
    });

    const issueDate = new Date();
    const expiryDate = new Date(issueDate);
    expiryDate.setFullYear(expiryDate.getFullYear() + parseInt(formData.validity || "1"));

    // Cover Page
    pdf.setFillColor(0, 102, 51);
    pdf.rect(0, 0, 210, 297, "F");
    
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(28);
    pdf.setFont("helvetica", "bold");
    pdf.text("INTERNATIONAL", 105, 80, { align: "center" });
    pdf.text("DRIVING PERMIT", 105, 95, { align: "center" });
    
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "normal");
    pdf.text("Convention on Road Traffic", 105, 115, { align: "center" });
    pdf.text("Vienna, 1968 / Geneva, 1949", 105, 125, { align: "center" });
    
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text(formData.selectedCountry || "INTERNATIONAL", 105, 150, { align: "center" });
    
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Issue Date: ${issueDate.toLocaleDateString()}`, 105, 200, { align: "center" });
    pdf.text(`Valid Until: ${expiryDate.toLocaleDateString()}`, 105, 210, { align: "center" });
    pdf.text(`Permit No: IDP-${Date.now().toString().slice(-8)}`, 105, 220, { align: "center" });

    // Page 2 - Personal Information
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, "F");
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("HOLDER INFORMATION", 105, 30, { align: "center" });
    
    // Add photo if available
    if (formData.photo) {
      try {
        pdf.addImage(formData.photo, "JPEG", 15, 45, 40, 50);
        pdf.rect(15, 45, 40, 50);
      } catch (e) {
        console.log("Could not add photo");
      }
    } else {
      pdf.rect(15, 45, 40, 50);
      pdf.setFontSize(10);
      pdf.text("Photo", 35, 72, { align: "center" });
    }
    
    // Personal details
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    let yPos = 50;
    const leftCol = 65;
    
    pdf.text("1. SURNAME:", leftCol, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.lastName?.toUpperCase() || "N/A", leftCol + 40, yPos);
    
    yPos += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("2. GIVEN NAME:", leftCol, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.firstName || "N/A", leftCol + 40, yPos);
    
    yPos += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("3. DATE OF BIRTH:", leftCol, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.dateOfBirth || "N/A", leftCol + 40, yPos);
    
    yPos += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("4. ADDRESS:", leftCol, yPos);
    pdf.setFont("helvetica", "normal");
    const address = `${formData.address || ""}, ${formData.city || ""}, ${formData.state || ""} ${formData.zipCode || ""}`;
    pdf.text(address, leftCol + 40, yPos);
    
    yPos += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("5. COUNTRY:", leftCol, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.country || "N/A", leftCol + 40, yPos);
    
    yPos += 10;
    pdf.setFont("helvetica", "bold");
    pdf.text("6. LICENSE NO:", leftCol, yPos);
    pdf.setFont("helvetica", "normal");
    pdf.text(formData.licenseNumber || "N/A", leftCol + 40, yPos);

    // Signature
    yPos += 20;
    pdf.setFont("helvetica", "bold");
    pdf.text("7. SIGNATURE:", leftCol, yPos);
    if (formData.signature) {
      try {
        pdf.addImage(formData.signature, "PNG", leftCol, yPos + 5, 50, 15);
      } catch (e) {
        console.log("Could not add signature");
      }
    }

    // Page 3 - Vehicle Categories
    pdf.addPage();
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, "F");
    
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "bold");
    pdf.text("AUTHORIZED VEHICLE CATEGORIES", 105, 30, { align: "center" });
    
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    yPos = 50;
    const categories = [
      { code: "A", desc: "Motorcycles" },
      { code: "B", desc: "Automobiles (passenger cars)" },
      { code: "C", desc: "Trucks/Lorries" },
      { code: "D", desc: "Buses" },
      { code: "E", desc: "Combinations of vehicles" }
    ];
    
    categories.forEach(cat => {
      pdf.setFont("helvetica", "bold");
      pdf.text(`Category ${cat.code}:`, 20, yPos);
      pdf.setFont("helvetica", "normal");
      pdf.text(cat.desc, 60, yPos);
      yPos += 12;
    });
    
    // Footer
    yPos = 260;
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "italic");
    pdf.text("This International Driving Permit is valid for one year from the date of issue.", 105, yPos, { align: "center" });
    pdf.text("It must be accompanied by your valid national driver's license.", 105, yPos + 7, { align: "center" });

    // Save the PDF
    pdf.save(`IDP_${formData.firstName}_${formData.lastName}.pdf`);
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
