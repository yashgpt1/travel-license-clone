import { useState } from "react";
import { Header } from "@/components/idp/Header";
import { Banner } from "@/components/idp/Banner";
import { LicenseCheck } from "@/components/idp/steps/LicenseCheck";
import { CountrySelection } from "@/components/idp/steps/CountrySelection";
import { DriverDetails } from "@/components/idp/steps/DriverDetails";
import { PhotoUpload } from "@/components/idp/steps/PhotoUpload";
import { PlanSelection } from "@/components/idp/steps/PlanSelection";
import { IDPGenerated } from "@/components/idp/steps/IDPGenerated";
import { ProgressBar } from "@/components/idp/ProgressBar";
import { Footer } from "@/components/idp/Footer";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasLicense, setHasLicense] = useState<boolean | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [formData, setFormData] = useState({});

  const handleLicenseCheck = (hasValidLicense: boolean) => {
    setHasLicense(hasValidLicense);
    if (hasValidLicense) {
      setCurrentStep(1);
    }
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setCurrentStep(2);
  };

  const handleDriverDetails = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(3);
  };

  const handlePhotoUpload = (data: any) => {
    setFormData({ ...formData, ...data });
    setCurrentStep(4);
  };

  const handlePlanSelection = (data: any) => {
    const finalData = { ...formData, ...data };
    setFormData(finalData);
    setCurrentStep(5);
  };

  return (
    <div className="min-h-screen bg-background">
      <Banner />
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {currentStep >= 2 && currentStep < 5 && (
          <ProgressBar currentStep={currentStep - 2} totalSteps={4} />
        )}

        {currentStep === 0 && (
          <LicenseCheck onNext={handleLicenseCheck} />
        )}

        {currentStep === 1 && (
          <CountrySelection onNext={handleCountrySelect} />
        )}

        {currentStep === 2 && (
          <DriverDetails onNext={handleDriverDetails} />
        )}

        {currentStep === 3 && (
          <PhotoUpload onNext={handlePhotoUpload} />
        )}

        {currentStep === 4 && (
          <PlanSelection onNext={handlePlanSelection} />
        )}

        {currentStep === 5 && (
          <IDPGenerated formData={formData} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
