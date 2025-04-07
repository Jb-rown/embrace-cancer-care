
import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TreatmentForm } from "@/components/treatments/TreatmentForm";
import { TreatmentList } from "@/components/treatments/TreatmentList";
import { TreatmentSummary } from "@/components/treatments/TreatmentSummary";
import { TreatmentInfo } from "@/components/treatments/TreatmentInfo";
import { TreatmentHeader } from "@/components/treatments/TreatmentHeader";
import { useAuth } from "@/contexts/AuthContext";

const Treatments = () => {
  const { user } = useAuth();
  const [isTreatmentFormOpen, setIsTreatmentFormOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={user?.role || "patient"} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <TreatmentHeader onAddTreatment={() => setIsTreatmentFormOpen(true)} />
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tracking Your Progress</AlertTitle>
            <AlertDescription>
              Track your treatment journey and access helpful information about each treatment type.
            </AlertDescription>
          </Alert>
          
          <TreatmentSummary />
          
          {/* Treatment List Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Treatments</h2>
            <TreatmentList />
          </div>
          
          {/* Treatment Information Section */}
          <TreatmentInfo />
        </main>
      </div>
      
      {/* Treatment Form Dialog */}
      <TreatmentForm
        isOpen={isTreatmentFormOpen}
        onClose={() => setIsTreatmentFormOpen(false)}
      />
    </div>
  );
};

export default Treatments;
