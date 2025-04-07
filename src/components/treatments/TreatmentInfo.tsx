
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AITreatmentInfo } from "@/components/treatments/AITreatmentInfo";

export const TreatmentInfo = () => {
  const [selectedTreatment, setSelectedTreatment] = useState("Chemotherapy");

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-4">Treatment Information</h2>
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Select a Treatment</CardTitle>
            <CardDescription>
              Get detailed information about specific treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button 
                variant={selectedTreatment === "Chemotherapy" ? "default" : "outline"}
                className={`w-full justify-start text-left ${selectedTreatment === "Chemotherapy" ? "bg-embrace-500 hover:bg-embrace-600" : ""}`}
                onClick={() => setSelectedTreatment("Chemotherapy")}
              >
                Chemotherapy
              </Button>
              <Button 
                variant={selectedTreatment === "Radiation Therapy" ? "default" : "outline"}
                className={`w-full justify-start text-left ${selectedTreatment === "Radiation Therapy" ? "bg-embrace-500 hover:bg-embrace-600" : ""}`}
                onClick={() => setSelectedTreatment("Radiation Therapy")}
              >
                Radiation Therapy
              </Button>
              <Button 
                variant={selectedTreatment === "Immunotherapy" ? "default" : "outline"}
                className={`w-full justify-start text-left ${selectedTreatment === "Immunotherapy" ? "bg-embrace-500 hover:bg-embrace-600" : ""}`}
                onClick={() => setSelectedTreatment("Immunotherapy")}
              >
                Immunotherapy
              </Button>
              <Button 
                variant={selectedTreatment === "Hormone Therapy" ? "default" : "outline"}
                className={`w-full justify-start text-left ${selectedTreatment === "Hormone Therapy" ? "bg-embrace-500 hover:bg-embrace-600" : ""}`}
                onClick={() => setSelectedTreatment("Hormone Therapy")}
              >
                Hormone Therapy
              </Button>
              <Button 
                variant={selectedTreatment === "Surgery" ? "default" : "outline"}
                className={`w-full justify-start text-left ${selectedTreatment === "Surgery" ? "bg-embrace-500 hover:bg-embrace-600" : ""}`}
                onClick={() => setSelectedTreatment("Surgery")}
              >
                Surgery
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="md:col-span-3">
          <AITreatmentInfo treatmentName={selectedTreatment} />
        </div>
      </div>
    </div>
  );
};
