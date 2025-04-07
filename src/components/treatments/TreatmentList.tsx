
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { AlertCircle, Calendar, Clock, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { treatmentService } from "@/services/supabaseService";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { toast } from "sonner";

type Treatment = {
  id: string;
  treatment_name: string;
  description: string | null;
  healthcare_provider: string | null;
  start_date: string;
  end_date: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export const TreatmentList = () => {
  const { user } = useAuth();
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const data = await treatmentService.getTreatments(user.id);
        setTreatments(data);
      } catch (err) {
        console.error("Error fetching treatments:", err);
        setError("Failed to load your treatments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchTreatments();
    
    // Set up real-time subscription
    const channel = treatmentService.subscribeToTreatmentChanges(user.id, (payload) => {
      if (payload.eventType === 'INSERT') {
        setTreatments(prev => [payload.new, ...prev]);
      } else if (payload.eventType === 'UPDATE') {
        setTreatments(prev => 
          prev.map(t => t.id === payload.new.id ? payload.new : t)
        );
      } else if (payload.eventType === 'DELETE') {
        setTreatments(prev => prev.filter(t => t.id !== payload.old.id));
      }
    });
    
    return () => {
      channel.unsubscribe();
    };
  }, [user]);

  const handleDeleteTreatment = async () => {
    if (!selectedTreatment) return;
    
    try {
      await treatmentService.deleteTreatment(selectedTreatment.id);
      setTreatments(prev => prev.filter(t => t.id !== selectedTreatment.id));
      toast.success("Treatment deleted successfully");
      setIsDeleteDialogOpen(false);
      setSelectedTreatment(null);
    } catch (err) {
      console.error("Error deleting treatment:", err);
      toast.error("Failed to delete treatment. Please try again.");
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading your treatments...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (treatments.length === 0) {
    return (
      <div className="text-center p-8">
        <h3 className="text-lg font-medium mb-2">No treatments found</h3>
        <p className="text-muted-foreground mb-4">
          You haven't added any treatments to your plan yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {treatments.map((treatment) => (
        <Card key={treatment.id}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{treatment.treatment_name}</CardTitle>
                {treatment.healthcare_provider && (
                  <CardDescription>Provider: {treatment.healthcare_provider}</CardDescription>
                )}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    setSelectedTreatment(treatment);
                    setIsDeleteDialogOpen(true);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>
                  Started: {format(new Date(treatment.start_date), "MMMM d, yyyy")}
                  {treatment.end_date && ` • Ends: ${format(new Date(treatment.end_date), "MMMM d, yyyy")}`}
                </span>
              </div>
              
              {treatment.description && (
                <p className="text-sm mt-2">{treatment.description}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      
      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={isDeleteDialogOpen} 
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Treatment</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedTreatment?.treatment_name}"? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTreatment}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
