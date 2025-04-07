
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { aiService } from "@/services/aiService";
import { toast } from "sonner";

interface AITreatmentInfoProps {
  treatmentName: string;
  treatmentType?: string;
}

export const AITreatmentInfo = ({ treatmentName, treatmentType = "cancer" }: AITreatmentInfoProps) => {
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [infoType, setInfoType] = useState<"overview" | "sideEffects" | "preparation" | "questions">("overview");

  const generateInfo = async () => {
    setLoading(true);

    let prompt = "";
    switch (infoType) {
      case "overview":
        prompt = `Provide an informative overview of ${treatmentName} as a ${treatmentType} treatment. Include what it is, how it works, and what patients can generally expect during treatment.`;
        break;
      case "sideEffects":
        prompt = `Explain common side effects of ${treatmentName} ${treatmentType} treatment, ways to manage them, and when patients should contact their healthcare provider about side effects.`;
        break;
      case "preparation":
        prompt = `Provide helpful tips for patients preparing for ${treatmentName} ${treatmentType} treatment, including what to bring to appointments, dietary considerations, and self-care suggestions.`;
        break;
      case "questions":
        prompt = `Suggest important questions patients should ask their healthcare provider about ${treatmentName} ${treatmentType} treatment to better understand their care plan.`;
        break;
    }

    try {
      const response = await aiService.getAISuggestion({
        feature: "treatment-recommendations",
        prompt: prompt
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        setInfo(response.suggestion);
      }
    } catch (error) {
      toast.error("Failed to generate treatment information");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Sparkles className="h-4 w-4 mr-2 text-embrace-500" />
          AI Treatment Information
        </CardTitle>
        <CardDescription>
          Get helpful information and insights about your treatment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Important Note</AlertTitle>
          <AlertDescription>
            This information is general in nature and should not replace your healthcare provider's specific instructions.
          </AlertDescription>
        </Alert>

        <div className="flex flex-wrap gap-2">
          <Button 
            size="sm" 
            variant={infoType === "overview" ? "default" : "outline"}
            onClick={() => setInfoType("overview")}
            className={infoType === "overview" ? "bg-embrace-500 hover:bg-embrace-600" : ""}
          >
            Overview
          </Button>
          <Button 
            size="sm" 
            variant={infoType === "sideEffects" ? "default" : "outline"}
            onClick={() => setInfoType("sideEffects")}
            className={infoType === "sideEffects" ? "bg-embrace-500 hover:bg-embrace-600" : ""}
          >
            Side Effects
          </Button>
          <Button 
            size="sm" 
            variant={infoType === "preparation" ? "default" : "outline"}
            onClick={() => setInfoType("preparation")}
            className={infoType === "preparation" ? "bg-embrace-500 hover:bg-embrace-600" : ""}
          >
            Preparation
          </Button>
          <Button 
            size="sm" 
            variant={infoType === "questions" ? "default" : "outline"}
            onClick={() => setInfoType("questions")}
            className={infoType === "questions" ? "bg-embrace-500 hover:bg-embrace-600" : ""}
          >
            Questions to Ask
          </Button>
        </div>

        <Button 
          onClick={generateInfo} 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating Info...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Get {infoType === "overview" ? "Overview" : 
                    infoType === "sideEffects" ? "Side Effects Info" : 
                    infoType === "preparation" ? "Preparation Tips" : 
                    "Questions to Ask"}
            </>
          )}
        </Button>
        
        {info && (
          <div className="mt-4 rounded-md border p-4 bg-muted/50">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-medium mb-2">
                {infoType === "overview" ? `About ${treatmentName}` : 
                 infoType === "sideEffects" ? `Managing Side Effects` : 
                 infoType === "preparation" ? `Preparing for Treatment` : 
                 `Questions for Your Provider`}
              </h3>
              <div className="whitespace-pre-wrap">
                {info}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
