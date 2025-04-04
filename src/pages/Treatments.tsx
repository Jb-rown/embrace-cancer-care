
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Treatments = () => {
  // This is a basic placeholder for the Treatments page
  // In a real app, you'd implement functionality to view and manage treatments
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="patient" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Treatment Plan</h1>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Coming Soon</AlertTitle>
            <AlertDescription>
              The complete treatment management functionality is under development. 
              Basic features are available below.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <Button variant="outline" className="w-full">View All Treatments</Button>
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
                <div className="relative h-40 w-40 flex items-center justify-center">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted stroke-current"
                      strokeWidth="10"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-embrace-500 stroke-current"
                      strokeWidth="10"
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      strokeDasharray="251.2"
                      strokeDashoffset="100.5"
                    />
                  </svg>
                  <div className="absolute text-center">
                    <div className="text-3xl font-bold">60%</div>
                    <div className="text-sm text-muted-foreground">Complete</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">6 of 10 treatments completed</p>
                  <p className="text-sm text-muted-foreground mt-1">Estimated completion: May 15, 2025</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Treatments;
