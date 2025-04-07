
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const UpcomingTreatments = () => {
  return (
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
  );
};
