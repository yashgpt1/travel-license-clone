import { Mail } from "lucide-react";

export const Banner = () => {
  return (
    <div className="bg-[hsl(var(--banner))] py-3 px-4 text-center">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <Mail className="h-4 w-4" />
        <span>Rapid, Simple, and Cost-Effective: Get Your International Driving Permit Now!</span>
      </div>
    </div>
  );
};
