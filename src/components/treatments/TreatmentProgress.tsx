
import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export const TreatmentProgress = () => {
  const [completedTreatments, setCompletedTreatments] = useState(6);
  const totalTreatments = 10;
  const percentComplete = (completedTreatments / totalTreatments) * 100;

  return (
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
            <Calendar className="h-3 w-3" /> Estimated completion: May 15, 2025
          </p>
        </div>
        
        <div className="mt-4 w-full">
          <Button className="w-full mt-2" asChild>
            <Link to="/appointments">Schedule Next Treatment</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
