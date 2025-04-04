
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, Bell, Calendar, Clock, FilePlus } from "lucide-react";
import { Link } from "react-router-dom";

export const CaregiverDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Caregiver Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-embrace-500 hover:bg-embrace-600" size="sm">
            <FilePlus className="mr-1 h-4 w-4" /> Record Observation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Patient Overview</CardTitle>
          <CardDescription>Caring for Sarah Johnson</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Current Status</h3>
              <p className="font-medium">Stable - Week 4 of Treatment</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Primary Doctor</h3>
              <p className="font-medium">Dr. Michael Chen</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-1">Next Appointment</h3>
              <p className="font-medium">April 5, 2025 - 10:00 AM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Today's Tasks</CardTitle>
            <CardDescription>3 of 7 tasks completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Progress value={43} className="h-2" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full border border-input flex items-center justify-center mr-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-embrace-400"></div>
                </div>
                <span className="line-through text-muted-foreground">Morning medication</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full border border-input flex items-center justify-center mr-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-embrace-400"></div>
                </div>
                <span className="line-through text-muted-foreground">Prepare breakfast</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full border border-input flex items-center justify-center mr-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-embrace-400"></div>
                </div>
                <span className="line-through text-muted-foreground">Log morning symptoms</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full border border-input mr-3"></div>
                <span>Afternoon medication</span>
              </div>
              <div className="flex items-center">
                <div className="h-5 w-5 rounded-full border border-input mr-3"></div>
                <span>Evening walk</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" className="w-full justify-between">
                View All Tasks
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Observations</CardTitle>
            <CardDescription>Last recorded patient observations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 border-l-2 border-warm-400 pl-4">
                <div>
                  <p className="font-medium">Increased Fatigue</p>
                  <p className="text-sm text-muted-foreground">April 2, 2025 - 2:30 PM</p>
                  <p className="text-sm">Needed to rest after lunch</p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-l-2 border-embrace-400 pl-4">
                <div>
                  <p className="font-medium">Better Appetite</p>
                  <p className="text-sm text-muted-foreground">April 1, 2025 - 7:15 PM</p>
                  <p className="text-sm">Finished most of dinner</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/symptom-tracker">
                <Button variant="ghost" className="w-full justify-between">
                  View All Observations
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
                  <div className="text-lg">08</div>
                </div>
                <div>
                  <p className="font-medium flex items-center">
                    <Bell className="h-4 w-4 mr-1" /> Caregiver Support Group
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 7:00 PM at Community Center
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link to="/appointments">
                <Button variant="ghost" className="w-full justify-between">
                  View All Events
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Medication Schedule</CardTitle>
            <CardDescription>Today's medications for Sarah</CardDescription>
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
                <Button size="sm" variant="outline">Completed</Button>
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
                <Button size="sm" variant="outline">Remind</Button>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-embrace-100 flex items-center justify-center">
                    <span className="font-medium text-embrace-700">PM</span>
                  </div>
                  <div>
                    <p className="font-medium">Pain Medication</p>
                    <p className="text-sm text-muted-foreground">8:00 PM - Before bed</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Pending</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Caregiver Resources</CardTitle>
            <CardDescription>Tips and support for you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="group">
                <h3 className="font-medium group-hover:text-embrace-500 transition-colors">Self-Care for Caregivers</h3>
                <p className="text-sm text-muted-foreground">Strategies to avoid burnout while caring for your loved one.</p>
              </div>
              <div className="group">
                <h3 className="font-medium group-hover:text-embrace-500 transition-colors">Managing Medication Schedules</h3>
                <p className="text-sm text-muted-foreground">Tips for keeping track of complex medication regimens.</p>
              </div>
              <div className="group">
                <h3 className="font-medium group-hover:text-embrace-500 transition-colors">Communicating with Healthcare Teams</h3>
                <p className="text-sm text-muted-foreground">How to advocate effectively for your patient's needs.</p>
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
  );
};
