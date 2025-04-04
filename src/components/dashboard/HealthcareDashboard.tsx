
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, 
  PlusCircle, 
  UsersRound,
  CalendarClock,
  AlertCircle,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

export const HealthcareDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Healthcare Professional Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-embrace-500 hover:bg-embrace-600" size="sm">
            <PlusCircle className="mr-1 h-4 w-4" /> Add Patient
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <UsersRound className="mr-2 h-5 w-5 text-embrace-400" />
              Total Patients
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-sm text-muted-foreground">3 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <CalendarClock className="mr-2 h-5 w-5 text-embrace-400" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">7</div>
            <p className="text-sm text-muted-foreground">2 remaining</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-warm-500" />
              Urgent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3</div>
            <p className="text-sm text-muted-foreground">Requires your attention</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Monitoring</CardTitle>
          <CardDescription>Recent patient updates and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <span className="text-sm text-warm-500 font-medium bg-warm-50 px-2 py-1 rounded-md flex items-center">
                    <AlertCircle className="mr-1 h-3 w-3" /> Symptom Alert
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Reported severe nausea and fatigue</p>
              </div>
              <Button size="sm">View</Button>
            </div>

            <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarFallback>RM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Robert Martinez</h3>
                  <span className="text-sm text-embrace-500 font-medium bg-embrace-50 px-2 py-1 rounded-md flex items-center">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Treatment Complete
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Completed radiation therapy cycle</p>
              </div>
              <Button size="sm">View</Button>
            </div>

            <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarFallback>AP</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Alice Peterson</h3>
                  <span className="text-sm text-warm-500 font-medium bg-warm-50 px-2 py-1 rounded-md flex items-center">
                    <AlertCircle className="mr-1 h-3 w-3" /> Medication Issue
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Missed 2 days of medication</p>
              </div>
              <Button size="sm">View</Button>
            </div>

            <div className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">John Davis</h3>
                  <span className="text-sm text-embrace-500 font-medium bg-embrace-50 px-2 py-1 rounded-md flex items-center">
                    <CheckCircle2 className="mr-1 h-3 w-3" /> Lab Results
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">New blood work results available</p>
              </div>
              <Button size="sm">View</Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <Link to="/patients">
              <Button variant="ghost" className="w-full justify-between">
                View All Patients
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <CardDescription>Upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border-l-4 border-embrace-400">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">Sarah Johnson - Follow-up</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 10:30 AM</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">Michael Lee - Initial Consultation</p>
                    <p className="text-sm text-muted-foreground">11:00 AM - 12:00 PM</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-medium">Team Meeting - Treatment Review</p>
                    <p className="text-sm text-muted-foreground">1:00 PM - 2:00 PM</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">View Details</Button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/appointments">
                <Button variant="ghost" className="w-full justify-between">
                  View Full Schedule
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Treatment Progress</CardTitle>
            <CardDescription>Key patient metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Sarah Johnson</h3>
                  <span className="text-sm font-medium">75%</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-sm text-muted-foreground">Breast Cancer - Chemotherapy</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Robert Martinez</h3>
                  <span className="text-sm font-medium">90%</span>
                </div>
                <Progress value={90} className="h-2" />
                <p className="text-sm text-muted-foreground">Prostate Cancer - Radiation</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">Alice Peterson</h3>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2" />
                <p className="text-sm text-muted-foreground">Lung Cancer - Immunotherapy</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/patients">
                <Button variant="ghost" className="w-full justify-between">
                  View All Treatment Plans
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
