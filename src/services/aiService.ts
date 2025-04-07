
import { supabase } from "@/integrations/supabase/client";

type AIFeature = "blog-suggestions" | "symptom-analysis" | "treatment-recommendations";

interface AIRequest {
  feature: AIFeature;
  prompt: string;
  context?: string;
}

interface AIResponse {
  suggestion: string;
  error?: string;
}

export const aiService = {
  /**
   * Gets AI suggestions based on the provided feature and content
   */
  async getAISuggestion(request: AIRequest): Promise<AIResponse> {
    try {
      const { data, error } = await supabase.functions.invoke("ai-assistant", {
        body: request
      });
      
      if (error) {
        console.error("AI service error:", error);
        throw new Error(error.message || "Failed to get AI suggestions");
      }
      
      return data as AIResponse;
    } catch (error) {
      console.error("AI service request failed:", error);
      return { 
        suggestion: "", 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      };
    }
  }
};
