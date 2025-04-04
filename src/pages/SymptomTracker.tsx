
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SymptomForm } from "@/components/symptom-tracker/SymptomForm";
import { SymptomHistory } from "@/components/symptom-tracker/SymptomHistory";
import { SymptomChart } from "@/components/symptom-tracker/SymptomChart";

const SymptomTracker = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="patient" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Symptom Tracker</h1>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <SymptomChart />
            </div>
            <div>
              <Card className="p-6">
                <h3 className="font-medium mb-3">Tracking Benefits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Helps identify symptom patterns</li>
                  <li>Improves communication with your healthcare team</li>
                  <li>Enables more personalized treatment adjustments</li>
                  <li>Provides a record of your cancer journey</li>
                </ul>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs defaultValue="record">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="record">Record Symptoms</TabsTrigger>
                <TabsTrigger value="history">Symptom History</TabsTrigger>
              </TabsList>
              <TabsContent value="record" className="mt-6">
                <div className="max-w-xl mx-auto">
                  <SymptomForm />
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <SymptomHistory />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SymptomTracker;
