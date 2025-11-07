import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

// Import static page templates
import page1 from "@/assets/idp-template/page_1.jpg";
import page2 from "@/assets/idp-template/page_2.jpg";
import page3 from "@/assets/idp-template/page_3.jpg";
import page4 from "@/assets/idp-template/page_4.jpg";
import page5 from "@/assets/idp-template/page_5.jpg";
import page6 from "@/assets/idp-template/page_6.jpg";
import page7 from "@/assets/idp-template/page_7.jpg";
import page8 from "@/assets/idp-template/page_8.jpg";
import page9 from "@/assets/idp-template/page_9.jpg";
import page10 from "@/assets/idp-template/page_10.jpg";
import page11 from "@/assets/idp-template/page_11.jpg";
import page12 from "@/assets/idp-template/page_12.jpg";
import page13 from "@/assets/idp-template/page_13.jpg";
import page14 from "@/assets/idp-template/page_14.jpg";
import page15Template from "@/assets/idp-template/page_15.jpg";
import page16 from "@/assets/idp-template/page_16.jpg";

interface IDPGeneratedProps {
  formData: any;
}

export const IDPGenerated = ({ formData }: IDPGeneratedProps) => {
  const handleDownload = async () => {
    try {
      // Create a new PDF document
      const pdfDoc = await PDFDocument.create();
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const helveticaBoldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      // Helper function to fetch and embed images
      const fetchAndEmbedImage = async (imagePath: string) => {
        const response = await fetch(imagePath);
        const imageBytes = await response.arrayBuffer();
        return await pdfDoc.embedJpg(imageBytes);
      };

      // Add all static pages (1-14)
      const staticPages = [
        page1, page2, page3, page4, page5, page6, page7,
        page8, page9, page10, page11, page12, page13, page14
      ];

      for (const pagePath of staticPages) {
        const pageImage = await fetchAndEmbedImage(pagePath);
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
        const { width, height } = page.getSize();
        page.drawImage(pageImage, {
          x: 0,
          y: 0,
          width,
          height,
        });
      }

      // Page 15 - Dynamic user data page
      const page15Image = await fetchAndEmbedImage(page15Template);
      const page15 = pdfDoc.addPage([595.28, 841.89]);
      const { width, height } = page15.getSize();
      
      // Draw the template background
      page15.drawImage(page15Image, {
        x: 0,
        y: 0,
        width,
        height,
      });

      // Add user data on page 15 (coordinates adjusted based on the template)
      // Surname
      page15.drawText(formData.lastName?.toUpperCase() || "", {
        x: 95,
        y: height - 155,
        size: 11,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // Given name
      page15.drawText(formData.firstName?.toUpperCase() || "", {
        x: 95,
        y: height - 178,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Country/Place of birth
      page15.drawText(formData.country?.toUpperCase() || "", {
        x: 95,
        y: height - 200,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Date of birth
      page15.drawText(formData.dateOfBirth || "", {
        x: 95,
        y: height - 223,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Permanent residence
      const residence = formData.country?.toUpperCase() || "";
      page15.drawText(residence, {
        x: 95,
        y: height - 245,
        size: 11,
        font: helveticaFont,
        color: rgb(0, 0, 0),
      });

      // Add photo if available
      if (formData.photo) {
        try {
          const photoBytes = await fetch(formData.photo).then(res => res.arrayBuffer());
          const photoImage = await pdfDoc.embedJpg(photoBytes);
          page15.drawImage(photoImage, {
            x: 420,
            y: height - 235,
            width: 100,
            height: 130,
          });
        } catch (e) {
          console.log("Could not add photo:", e);
        }
      }

      // Add signature if available
      if (formData.signature) {
        try {
          const signatureBytes = await fetch(formData.signature).then(res => res.arrayBuffer());
          const signatureImage = await pdfDoc.embedPng(signatureBytes);
          page15.drawImage(signatureImage, {
            x: 380,
            y: height - 750,
            width: 120,
            height: 40,
          });
        } catch (e) {
          console.log("Could not add signature:", e);
        }
      }

      // Page 16 - Back cover (static)
      const page16Image = await fetchAndEmbedImage(page16);
      const page16Page = pdfDoc.addPage([595.28, 841.89]);
      page16Page.drawImage(page16Image, {
        x: 0,
        y: 0,
        width: page16Page.getWidth(),
        height: page16Page.getHeight(),
      });

      // Save the PDF
      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes.buffer as ArrayBuffer], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `IDP_${formData.firstName}_${formData.lastName}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("There was an error generating your IDP. Please try again.");
    }
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
