import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Mail } from "lucide-react";
import { PDFDocument, rgb, StandardFonts, degrees } from "pdf-lib";

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
        try {
          const response = await fetch(imagePath);
          if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
          }
          const imageBytes = await response.arrayBuffer();
          
          // Try PNG first (since template files are PNG despite .jpg extension)
          // Then fallback to JPG if PNG fails
          try {
            return await pdfDoc.embedPng(imageBytes);
          } catch (pngError) {
            console.log('PNG embed failed, trying JPG:', imagePath);
            return await pdfDoc.embedJpg(imageBytes);
          }
        } catch (error) {
          console.error('Error loading image:', imagePath, error);
          throw error;
        }
      };

      // Page 1 - Cover page with dynamic "Valid Until" date (portrait orientation)
      const page1Image = await fetchAndEmbedImage(page1);
      const page1Page = pdfDoc.addPage([595.28, 841.89]); // A4 portrait
      const page1Width = page1Page.getWidth();
      const page1Height = page1Page.getHeight();
      
      // Draw the page 1 image
      page1Page.drawImage(page1Image, {
        x: 0,
        y: 0,
        width: page1Width,
        height: page1Height,
      });

      // Add dynamic "Valid Until" date on page 1
      const validityYears = parseInt(formData.validity || "1");
      const validUntilDate = new Date();
      validUntilDate.setFullYear(validUntilDate.getFullYear() + validityYears);
      const validUntilText = validUntilDate.toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
      });
      
      // Position for "Valid Until" date on page 1 (portrait orientation)
      // Positioned on the blank line after "Valid Until"
      page1Page.drawText(validUntilText, {
        x: 250,
        y: page1Height - 300,
        size: 20,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // Add static pages 2-14
      const staticPages = [
        page2, page3, page4, page5, page6, page7,
        page8, page9, page10, page11, page12, page13, page14
      ];

      for (let i = 0; i < staticPages.length; i++) {
        const pagePath = staticPages[i];
        const pageImage = await fetchAndEmbedImage(pagePath);
        const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
        const { width, height } = page.getSize();
        
        // First page needs to be rotated 90 degrees clockwise
        if (i === 0) {
          page.drawImage(pageImage, {
            x: width,
            y: 0,
            width: height,
            height: width,
            rotate: degrees(90),
          });
        } else {
          page.drawImage(pageImage, {
            x: 0,
            y: 0,
            width,
            height,
          });
        }
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

      // Add user data on page 15 (coordinates calibrated to clean template)
      // Template has 5 numbered lines at the top for user details
      
      // 1. Surname (Line 1)
      page15.drawText(formData.lastName?.toUpperCase() || "", {
        x: 95,
        y: height - 85,
        size: 13,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // 2. Given name (Line 2)
      page15.drawText(formData.firstName?.toUpperCase() || "", {
        x: 95,
        y: height - 110,
        size: 13,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // 3. Country/Place of birth (Line 3)
      page15.drawText(formData.birthCountry?.toUpperCase() || "", {
        x: 95,
        y: height - 135,
        size: 13,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // 4. Date of birth (Line 4)
      const birthDate = formData.birthDate ? new Date(formData.birthDate).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }).replace(/ /g, '-') : "";
      page15.drawText(birthDate, {
        x: 95,
        y: height - 160,
        size: 13,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // 5. Permanent residence (Line 5)
      const residence = formData.currentCountry?.toUpperCase() || "";
      page15.drawText(residence, {
        x: 95,
        y: height - 185,
        size: 13,
        font: helveticaBoldFont,
        color: rgb(0, 0, 0),
      });

      // Add selfie photo if available (positioned in the photo box on right side)
      if (formData.selfie) {
        try {
          const photoBytes = await fetch(formData.selfie).then(res => res.arrayBuffer());
          // Try to embed as PNG first, fallback to JPG
          let photoImage;
          try {
            photoImage = await pdfDoc.embedPng(photoBytes);
          } catch {
            photoImage = await pdfDoc.embedJpg(photoBytes);
          }
          // Photo box is on the right side of the page
          page15.drawImage(photoImage, {
            x: 255,
            y: height - 510,
            width: 170,
            height: 225,
          });
        } catch (e) {
          console.error("Could not add photo:", e);
        }
      }

      // Add signature if available (positioned above "Signature de titulaire*" line)
      if (formData.signature) {
        try {
          const signatureBytes = await fetch(formData.signature).then(res => res.arrayBuffer());
          const signatureImage = await pdfDoc.embedPng(signatureBytes);
          // Signature area is in the center of the page, above the signature line
          page15.drawImage(signatureImage, {
            x: 230,
            y: height - 585,
            width: 180,
            height: 50,
          });
        } catch (e) {
          console.error("Could not add signature:", e);
        }
      }

      // Add license classes/stamps in the circles (A, B, C, D, E)
      // Template shows circles on the left side - A and B are empty, C/D/E have authority text
      if (formData.licenseClasses && formData.licenseClasses.length > 0) {
        // Positions based on the template's A, B, C, D, E circles on left side
        // Circle centers measured from template - adjusted to center in each box
        const stampPositions = [
          { x: 114, y: height - 270, label: 'A' },  // A position (empty circle)
          { x: 114, y: height - 350, label: 'B' },  // B position (empty circle)
          { x: 260, y: height - 545, label: 'C' },  // C position (has authority text)
          { x: 260, y: height - 680, label: 'D' },  // D position (has authority text)
          { x: 260, y: height - 815, label: 'E' },  // E position (has authority text)
        ];

        const classMap: { [key: string]: number } = {
          'A': 0,
          'B': 1,
          'C': 2,
          'D': 3,
          'E': 4
        };

        formData.licenseClasses.forEach((licenseClass: string) => {
          const index = classMap[licenseClass];
          if (index !== undefined && stampPositions[index]) {
            const pos = stampPositions[index];
            // Draw a stamp/seal to indicate the license class is valid
            // Using a filled circle with blue color to simulate official stamp
            page15.drawCircle({
              x: pos.x,
              y: pos.y,
              size: 35,
              borderColor: rgb(0, 0.2, 0.6),
              borderWidth: 2.5,
              color: rgb(0.3, 0.4, 0.9),
              opacity: 0.6,
            });
            // Add "VALID" text overlay on the stamp
            page15.drawText('VALID', {
              x: pos.x - 20,
              y: pos.y - 5,
              size: 9,
              font: helveticaBoldFont,
              color: rgb(1, 1, 1),
            });
          }
        });
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
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`There was an error generating your IDP: ${errorMessage}\n\nPlease try again or contact support.`);
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
