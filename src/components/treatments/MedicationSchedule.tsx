
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const MedicationSchedule = () => {
  return (
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
  );
};
