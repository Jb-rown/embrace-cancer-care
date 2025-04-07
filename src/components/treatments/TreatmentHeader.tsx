
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TreatmentHeaderProps {
  onAddTreatment: () => void;
}

export const TreatmentHeader = ({ onAddTreatment }: TreatmentHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold tracking-tight">Treatment Plan</h1>
      <Button 
        onClick={onAddTreatment}
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Treatment
      </Button>
    </div>
  );
};
