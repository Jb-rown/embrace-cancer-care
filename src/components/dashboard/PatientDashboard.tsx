
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, Activity, Calendar, Clock, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface PatientDashboardProps {
  onLogSymptom?: () => void;
}

export const PatientDashboard = ({ onLogSymptom }: PatientDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Patient Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button 
            className="bg-embrace-500 hover:bg-embrace-600" 
            size="sm"
            onClick={onLogSymptom}
          >
            <FileText className="mr-1 h-4 w-4" /> Log Symptom
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Treatment Progress</CardTitle>
            <CardDescription>You're doing great! Keep it up.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Medication Adherence</span>
                  <span className="font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Symptom Management</span>
                  <span className="font-medium">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Symptoms</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-l-2 border-warm-400 pl-4">
                <div>
                  <p className="font-medium">Moderate Fatigue</p>
                  <p className="text-sm text-muted-foreground">April 2, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-embrace-400 pl-4">
                <div>
                  <p className="font-medium">Mild Nausea</p>
                  <p className="text-sm text-muted-foreground">April 1, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-embrace-300 pl-4">
                <div>
                  <p className="font-medium">Slight Headache</p>
                  <p className="text-sm text-muted-foreground">March 28, 2025</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/symptom-tracker">
                <Button variant="ghost" className="w-full justify-between">
                  View All Symptoms
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
            <CardDescription>Next 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="min-w-10 rounded-md bg-embrace-100 text-embrace-700 text-center py-2 font-medium">
                  <div className="text-xs">APR</div>
                  <div className="text-lg">05</div>
                </div>
                <div>
                  <p className="font-medium flex items-center">
                    <Calendar className="h-4 w-4 mr-1" /> Oncologist Appointment
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 10:00 AM with Dr. Miller
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="min-w-10 rounded-md bg-warm-100 text-warm-700 text-center py-2 font-medium">
                  <div className="text-xs">APR</div>
                  <div className="text-lg">07</div>
                </div>
                <div>
                  <p className="font-medium flex items-center">
                    <Activity className="h-4 w-4 mr-1" /> Blood Test
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 2:30 PM at Memorial Labs
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/appointments">
                <Button variant="ghost" className="w-full justify-between">
                  View All Appointments
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Treatment Schedule</CardTitle>
              <CardDescription>Today's medication and treatments</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-embrace-100 flex items-center justify-center">
                      <span className="font-medium text-embrace-700">AM</span>
                    </div>
                    <div>
                      <p className="font-medium">Paclitaxel</p>
                      <p className="text-sm text-muted-foreground">8:00 AM - Before breakfast</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Mark as Done</Button>
                </div>
                <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-warm-100 flex items-center justify-center">
                      <span className="font-medium text-warm-700">PM</span>
                    </div>
                    <div>
                      <p className="font-medium">Anti-nausea Medication</p>
                      <p className="text-sm text-muted-foreground">1:00 PM - With lunch</p>
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
                      <p className="font-medium">Hydration Reminder</p>
                      <p className="text-sm text-muted-foreground">Throughout the day</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">Mark as Done</Button>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link to="/treatments">
                  <Button variant="ghost" className="w-full justify-between">
                    View Full Schedule
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Educational Resources</CardTitle>
              <CardDescription>Recommended for you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="group">
                  <h3 className="font-medium group-hover:text-embrace-500 transition-colors">Understanding Your Treatment</h3>
                  <p className="text-sm text-muted-foreground">Learn more about how your medications work.</p>
                </div>
                <div className="group">
                  <h3 className="font-medium group-hover:text-embrace-500 transition-colors">Nutrition During Cancer Treatment</h3>
                  <p className="text-sm text-muted-foreground">Dietary recommendations to help manage side effects.</p>
                </div>
                <div className="group">
                  <h3 className="font-medium group-hover:text-embrace-500 transition-colors">Managing Fatigue</h3>
                  <p className="text-sm text-muted-foreground">Tips and strategies for dealing with treatment-related fatigue.</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <Link to="/resources">
                  <Button variant="ghost" className="w-full justify-between">
                    Browse Resources
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
