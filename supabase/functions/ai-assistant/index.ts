
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { feature, prompt, context } = await req.json();
    
    console.log(`AI Assistant request for feature: ${feature}`);
    
    let systemPrompt = "You are a helpful assistant.";
    
    // Configure the system prompt based on the feature
    switch (feature) {
      case "blog-suggestions":
        systemPrompt = "You are a medical content expert that helps healthcare professionals write clear, informative, and compassionate cancer care blog posts. Provide helpful content suggestions, improvements, and ideas based on the draft content.";
        break;
      case "symptom-analysis":
        systemPrompt = "You are a symptom analysis assistant. Analyze the provided symptoms, severity, and patient context to offer potential insights and recommendations. Always remind users to consult healthcare professionals for proper medical advice. Your suggestions are meant to be informative, not diagnostic.";
        break;
      case "treatment-recommendations":
        systemPrompt = "You are a treatment information assistant. Based on the treatment information provided, offer supporting information, potential questions for healthcare providers, and lifestyle suggestions that might complement the treatment. Always emphasize that your recommendations should be discussed with healthcare providers.";
        break;
      default:
        systemPrompt = "You are a cancer care assistant providing helpful information and support.";
    }
    
    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt }
    ];

    // Add context if provided
    if (context) {
      messages.splice(1, 0, { role: "system", content: `Additional context: ${context}` });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: messages,
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API Error:", error);
      throw new Error(`OpenAI API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    
    return new Response(
      JSON.stringify({
        suggestion: data.choices[0].message.content
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in AI Assistant function:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
