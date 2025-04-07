
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { aiService } from "@/services/aiService";
import { toast } from "sonner";

interface Symptom {
  id: string;
  symptom_name: string;
  severity: number;
  recorded_at: string;
  notes?: string;
  location?: string;
  mood?: string;
}

interface AISymptomAnalysisProps {
  symptoms: Symptom[];
}

export const AISymptomAnalysis = ({ symptoms }: AISymptomAnalysisProps) => {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string | null>(null);

  const recentSymptoms = symptoms
    .sort((a, b) => new Date(b.recorded_at).getTime() - new Date(a.recorded_at).getTime())
    .slice(0, 5);

  const generateAnalysis = async () => {
    if (recentSymptoms.length === 0) {
      toast.warning("No symptoms to analyze");
      return;
    }

    setLoading(true);

    // Format symptom data for the prompt
    const symptomDetails = recentSymptoms.map(symptom => {
      return `- ${formatSymptomName(symptom.symptom_name)}: Severity ${symptom.severity}/10${symptom.location ? `, Location: ${symptom.location}` : ''}${symptom.mood ? `, Mood: ${symptom.mood}` : ''}${symptom.notes ? `, Notes: ${symptom.notes.replace(/Mood:.*\n|Location:.*\n/g, '')}` : ''}`;
    }).join("\n");

    const prompt = `
    Please analyze these recently recorded symptoms:
    
    ${symptomDetails}
    
    Provide:
    1. A brief overview of what these symptoms might indicate
    2. Possible patterns or triggers
    3. Self-care suggestions that might help
    4. When to consider contacting a healthcare provider
    `;

    try {
      const response = await aiService.getAISuggestion({
        feature: "symptom-analysis",
        prompt: prompt
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        setAnalysis(response.suggestion);
      }
    } catch (error) {
      toast.error("Failed to generate symptom analysis");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const formatSymptomName = (name: string): string => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Sparkles className="h-4 w-4 mr-2 text-embrace-500" />
            AI Symptom Analysis
          </CardTitle>
          <CardDescription>
            Get insights on your recent symptoms from our AI assistant
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important Note</AlertTitle>
            <AlertDescription>
              This AI analysis is not a medical diagnosis. Always consult with your healthcare provider for professional medical advice.
            </AlertDescription>
          </Alert>
          
          {recentSymptoms.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No recent symptoms to analyze. Record symptoms to use this feature.
            </div>
          ) : (
            <>
              <Button 
                onClick={generateAnalysis} 
                disabled={loading || recentSymptoms.length === 0}
                className="w-full bg-embrace-500 hover:bg-embrace-600"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyze Recent Symptoms
                  </>
                )}
              </Button>
              
              {analysis && (
                <div className="mt-4 rounded-md border p-4 bg-muted/50">
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">
                      {analysis}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
