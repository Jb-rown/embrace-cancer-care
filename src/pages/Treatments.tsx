
import { useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, AlertCircle, Calendar as CalendarIcon, Clock, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AITreatmentInfo } from "@/components/treatments/AITreatmentInfo";
import { TreatmentForm } from "@/components/treatments/TreatmentForm";
import { TreatmentList } from "@/components/treatments/TreatmentList";
import { useAuth } from "@/contexts/AuthContext";

const Treatments = () => {
  const { user } = useAuth();
  const [completedTreatments, setCompletedTreatments] = useState(6);
  const totalTreatments = 10;
  const percentComplete = (completedTreatments / totalTreatments) * 100;
  const [selectedTreatment, setSelectedTreatment] = useState("Chemotherapy");
  const [isTreatmentFormOpen, setIsTreatmentFormOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={user?.role || "patient"} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Treatment Plan</h1>
            <Button 
              onClick={() => setIsTreatmentFormOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Treatment
            </Button>
          </div>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Tracking Your Progress</AlertTitle>
            <AlertDescription>
              Track your treatment journey and access helpful information about each treatment type.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Treatments</CardTitle>
                <CardDescription>Your scheduled treatments for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="min-w-10 rounded-md bg-embrace-100 text-embrace-700 text-center py-2 font-medium">
                      <div className="text-xs">APR</div>
                      <div className="text-lg">08</div>
                    </div>
                    <div>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> Chemotherapy Session
                      </p>
                      <p className="text-sm text-muted-foreground">
                        9:00 AM - Memorial Hospital
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="min-w-10 rounded-md bg-embrace-100 text-embrace-700 text-center py-2 font-medium">
                      <div className="text-xs">APR</div>
                      <div className="text-lg">10</div>
                    </div>
                    <div>
                      <p className="font-medium flex items-center">
                        <Calendar className="h-4 w-4 mr-1" /> Radiation Therapy
                      </p>
                      <p className="text-sm text-muted-foreground">
                        2:30 PM - Oncology Center
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/appointments">View All Appointments</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medication Schedule</CardTitle>
                <CardDescription>Your daily medications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-embrace-100 flex items-center justify-center">
                        <span className="font-medium text-embrace-700">AM</span>
                      </div>
                      <div>
                        <p className="font-medium">Paclitaxel</p>
                        <p className="text-sm text-muted-foreground">8:00 AM - 2 tablets</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Mark as Done</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-embrace-100 flex items-center justify-center">
                        <span className="font-medium text-embrace-700">PM</span>
                      </div>
                      <div>
                        <p className="font-medium">Anti-nausea</p>
                        <p className="text-sm text-muted-foreground">8:00 PM - 1 tablet</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Mark as Done</Button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">View All Medications</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Treatment Progress</CardTitle>
                <CardDescription>Your journey so far</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="w-full mb-4">
                  <Progress value={percentComplete} className="h-4" />
                  <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-embrace-500">{percentComplete}%</div>
                  <div className="text-sm text-muted-foreground">Complete</div>
                </div>
                
                <div className="w-full text-center">
                  <p className="text-sm mb-1">{completedTreatments} of {totalTreatments} treatments completed</p>
                  <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <CalendarIcon className="h-3 w-3" /> Estimated completion: May 15, 2025
                  </p>
                </div>
                
                <div className="mt-4 w-full">
                  <Button className="w-full mt-2" asChild>
                    <Link to="/appointments">Schedule Next Treatment</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Treatment List Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Treatments</h2>
            <TreatmentList />
          </div>
          
          {/* Treatment AI Information Section */}
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
