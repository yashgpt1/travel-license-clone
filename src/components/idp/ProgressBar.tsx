import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: "Driver's details", sublabel: "Drivers" },
  { number: 2, label: "Upload photos", sublabel: "Photos" },
  { number: 3, label: "Choose your plan", sublabel: "Plan" },
  { number: 4, label: "Review your order", sublabel: "Review" },
];

export const ProgressBar = ({ currentStep }: ProgressBarProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? <Check className="h-5 w-5" /> : step.number}
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs font-medium">{step.sublabel}</p>
                <p className="text-xs text-muted-foreground hidden sm:block">{step.label}</p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 flex-1 mx-2 transition-colors",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
