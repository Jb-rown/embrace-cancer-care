
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SymptomForm } from "@/components/symptom-tracker/SymptomForm";
import { SymptomHistory } from "@/components/symptom-tracker/SymptomHistory";
import { SymptomChart } from "@/components/symptom-tracker/SymptomChart";
import { AISymptomAnalysis } from "@/components/symptom-tracker/AISymptomAnalysis";
import { symptomService } from "@/services/supabaseService";
import { useAuth } from "@/contexts/AuthContext";

// Define the symptom type
type Symptom = {
  id: string;
  symptom_name: string;
  severity: number;
  recorded_at: string;
  notes?: string;
  location?: string;
  mood?: string;
  category?: string;
};

const SymptomTracker = () => {
  const { user } = useAuth();
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const fetchSymptoms = async () => {
      try {
        setLoading(true);
        const data = await symptomService.getSymptoms(user.id);
        
        const processedData = data.map(processSymptomData);
        setSymptoms(processedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
        setLoading(false);
      }
    };
    
    fetchSymptoms();
    
    // Set up realtime updates
    const channel = symptomService.subscribeToSymptomChanges(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        setSymptoms(prev => [processSymptomData(payload.new), ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setSymptoms(prev => 
          prev.map(s => s.id === payload.new.id ? processSymptomData(payload.new) : s)
        );
      } else if (payload.eventType === 'DELETE') {
        setSymptoms(prev => prev.filter(s => s.id !== payload.old.id));
      }
    });
    
    return () => {
      if (channel) {
        channel.unsubscribe();
      }
    };
  }, [user]);

  const processSymptomData = (symptom: any): Symptom => {
    const processedSymptom: Symptom = { ...symptom };
    
    if (symptom.notes) {
      const lines = symptom.notes.split('\n');
      
      lines.forEach((line: string) => {
        if (line.startsWith('Mood:')) {
          processedSymptom.mood = line.replace('Mood:', '').trim();
        } else if (line.startsWith('Location:')) {
          processedSymptom.location = line.replace('Location:', '').trim();
        }
      });
    }
    
    if (symptom.symptom_name) {
      if (['pain', 'fatigue', 'weakness', 'numbness', 'swelling'].includes(symptom.symptom_name)) {
        processedSymptom.category = 'physical';
      } else if (['nausea', 'vomiting', 'appetite-loss', 'constipation', 'diarrhea'].includes(symptom.symptom_name)) {
        processedSymptom.category = 'digestive';
      } else if (['headache', 'dizziness', 'confusion', 'memory', 'balance'].includes(symptom.symptom_name)) {
        processedSymptom.category = 'neurological';
      } else if (['anxiety', 'depression', 'mood-changes', 'fear', 'irritability'].includes(symptom.symptom_name)) {
        processedSymptom.category = 'emotional';
      } else {
        processedSymptom.category = 'other';
      }
    }
    
    return processedSymptom;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="patient" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold tracking-tight mb-6">Symptom Tracker</h1>
          
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="md:col-span-2">
              <SymptomChart />
            </div>
            <div>
              <Card className="p-6">
                <h3 className="font-medium mb-3">Tracking Benefits</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Helps identify symptom patterns</li>
                  <li>Improves communication with your healthcare team</li>
                  <li>Enables more personalized treatment adjustments</li>
                  <li>Provides a record of your cancer journey</li>
                </ul>
              </Card>
            </div>
          </div>
          
          {/* AI Symptom Analysis */}
          {!loading && symptoms.length > 0 && (
            <div className="mb-6">
              <AISymptomAnalysis symptoms={symptoms} />
            </div>
          )}
          
          <div className="mt-6">
            <Tabs defaultValue="record">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="record">Record Symptoms</TabsTrigger>
                <TabsTrigger value="history">Symptom History</TabsTrigger>
              </TabsList>
              <TabsContent value="record" className="mt-6">
                <div className="max-w-xl mx-auto">
                  <SymptomForm />
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <SymptomHistory />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SymptomTracker;
