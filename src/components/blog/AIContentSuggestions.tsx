
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, ThumbsUp, ThumbsDown, Copy } from "lucide-react";
import { aiService } from "@/services/aiService";
import { toast } from "sonner";

interface AIContentSuggestionsProps {
  title: string;
  content: string;
  onApplySuggestion: (suggestion: string) => void;
}

export const AIContentSuggestions = ({ title, content, onApplySuggestion }: AIContentSuggestionsProps) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  const generateSuggestions = async (promptType: "improve" | "expand" | "simplify" | "custom") => {
    if (!content.trim()) {
      toast.warning("Please write some content first");
      return;
    }

    setLoading(true);

    let prompt = "";
    switch (promptType) {
      case "improve":
        prompt = `Improve this blog post content about "${title}". Make it more engaging and informative, while maintaining the medical accuracy: "${content}"`;
        break;
      case "expand":
        prompt = `Expand on this blog post content about "${title}" with more details, examples, and medical information: "${content}"`;
        break;
      case "simplify":
        prompt = `Simplify this blog post content about "${title}" to make it more accessible for patients and caregivers while keeping important medical information: "${content}"`;
        break;
      case "custom":
        prompt = customPrompt + ` Post title: "${title}". Current content: "${content}"`;
        break;
    }

    try {
      const response = await aiService.getAISuggestion({
        feature: "blog-suggestions",
        prompt: prompt
      });

      if (response.error) {
        toast.error(response.error);
      } else {
        setSuggestion(response.suggestion);
      }
    } catch (error) {
      toast.error("Failed to generate suggestions");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const applySuggestion = () => {
    onApplySuggestion(suggestion);
    toast.success("Suggestion applied to content");
    setSuggestion("");
  };

  const copySuggestion = () => {
    navigator.clipboard.writeText(suggestion);
    toast.success("Suggestion copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          onClick={() => generateSuggestions("improve")}
          disabled={loading}
          className="bg-embrace-500 hover:bg-embrace-600"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Improve Content
        </Button>
        <Button 
          size="sm" 
          onClick={() => generateSuggestions("expand")}
          disabled={loading}
          variant="outline"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Expand Content
        </Button>
        <Button 
          size="sm" 
          onClick={() => generateSuggestions("simplify")}
          disabled={loading}
          variant="outline"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
          Simplify Content
        </Button>
        <Button 
          size="sm" 
          onClick={() => setShowCustomPrompt(!showCustomPrompt)}
          variant="ghost"
        >
          Custom Prompt
        </Button>
      </div>

      {showCustomPrompt && (
        <div className="space-y-2">
          <Textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Enter your custom prompt for the AI (e.g., 'Add more information about side effects')"
            className="min-h-[80px]"
          />
          <Button 
            size="sm" 
            onClick={() => generateSuggestions("custom")}
            disabled={loading || !customPrompt.trim()}
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
            Generate
          </Button>
        </div>
      )}

      {suggestion && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-embrace-500" />
              AI Suggestion
            </CardTitle>
            <CardDescription>
              Review this suggestion and apply it if you find it helpful
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="bg-muted/50 p-4 rounded-md text-sm whitespace-pre-wrap">
                {suggestion}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex gap-2">
              <Button size="sm" variant="ghost" onClick={() => setSuggestion("")}>
                <ThumbsDown className="h-4 w-4 mr-2" />
                Dismiss
              </Button>
              <Button size="sm" variant="ghost" onClick={copySuggestion}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            <Button size="sm" onClick={applySuggestion}>
              <ThumbsUp className="h-4 w-4 mr-2" />
              Apply
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};
