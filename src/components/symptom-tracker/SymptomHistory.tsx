import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Calendar, Download, Eye } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { symptomService } from "@/services/supabaseService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { RealtimeChannel } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

type Symptom = {
  id: string;
  recorded_at: string;
  severity: number;
  symptom_name: string;
  user_id: string;
  notes: string | null;
  category?: string;
  location?: string;
  mood?: string;
};

export const SymptomHistory = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    let channel: RealtimeChannel;
    
    const fetchSymptoms = async () => {
      try {
        setIsLoading(true);
        const data = await symptomService.getSymptoms(user.id);
        
        const processedData = data.map(processSymptomData);
        setSymptoms(processedData);
      } catch (error) {
        console.error("Error fetching symptoms:", error);
        toast({
          title: "Error",
          description: "Failed to load symptoms. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    const setupRealtime = () => {
      channel = symptomService.subscribeToSymptomChanges(user.id, (payload) => {
        console.log("Real-time update received:", payload);
        
        if (payload.eventType === 'INSERT') {
          setSymptoms(prev => [processSymptomData(payload.new), ...prev]);
          toast({
            title: "New Symptom",
            description: "A new symptom has been recorded successfully",
          });
        } else if (payload.eventType === 'UPDATE') {
          setSymptoms(prev => 
            prev.map(s => s.id === payload.new.id ? processSymptomData(payload.new) : s)
          );
        } else if (payload.eventType === 'DELETE') {
          setSymptoms(prev => prev.filter(s => s.id !== payload.old.id));
        }
      });
    };
    
    fetchSymptoms();
    setupRealtime();
    
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [user]);

  const processSymptomData = (symptom: any): Symptom => {
    const processedSymptom: Symptom = { ...symptom };
    
    if (symptom.notes) {
      const lines = symptom.notes.split('\n');
      
      lines.forEach(line => {
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

  const filteredSymptoms = symptoms.filter(symptom => {
    const matchesSearch = 
      symptom.symptom_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (symptom.notes?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
      (symptom.location?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    
    const matchesCategory = !categoryFilter || symptom.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (symptom: Symptom) => {
    setSelectedSymptom(symptom);
    setIsDrawerOpen(true);
  };

  const exportToCsv = () => {
    toast({
      title: "Export Successful",
      description: "Symptom history exported successfully",
    });
  };

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={categoryFilter || ""} onValueChange={(val) => setCategoryFilter(val || null)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All categories</SelectItem>
              <SelectItem value="physical">Physical</SelectItem>
              <SelectItem value="digestive">Digestive</SelectItem>
              <SelectItem value="neurological">Neurological</SelectItem>
              <SelectItem value="emotional">Emotional</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm" onClick={exportToCsv} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Symptom</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Mood</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Loading symptoms...
                </TableCell>
              </TableRow>
            ) : filteredSymptoms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No symptoms found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSymptoms.map((symptom) => (
                <TableRow key={symptom.id}>
                  <TableCell>
                    {format(new Date(symptom.recorded_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{formatSymptomName(symptom.symptom_name)}</span>
                      <Badge variant="outline" className="mt-1 w-fit">
                        {symptom.category ? symptom.category.charAt(0).toUpperCase() + symptom.category.slice(1) : 'Other'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={symptom.severity} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {symptom.location || 'Not specified'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <MoodBadge mood={symptom.mood || 'neutral'} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleViewDetails(symptom)}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          {selectedSymptom && (
            <>
              <DrawerHeader>
                <DrawerTitle>Symptom Details</DrawerTitle>
                <DrawerDescription>
                  Recorded on {format(new Date(selectedSymptom.recorded_at), 'PPP')}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <dl className="divide-y divide-border">
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Type:</dt>
                    <dd className="col-span-2">{formatSymptomName(selectedSymptom.symptom_name)}</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Category:</dt>
                    <dd className="col-span-2">
                      {selectedSymptom.category ? selectedSymptom.category.charAt(0).toUpperCase() + selectedSymptom.category.slice(1) : 'Other'}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Severity:</dt>
                    <dd className="col-span-2">{selectedSymptom.severity}/10</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Location:</dt>
                    <dd className="col-span-2">{selectedSymptom.location || 'Not specified'}</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Mood:</dt>
                    <dd className="col-span-2">
                      <MoodBadge mood={selectedSymptom.mood || 'neutral'} showLabel />
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Notes:</dt>
                    <dd className="col-span-2">{(selectedSymptom.notes || '').replace(/Mood:.*\n|Location:.*\n/g, '')}</dd>
                  </div>
                </dl>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Close</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const formatSymptomName = (name: string): string => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const SeverityBadge = ({ severity }: { severity: number }) => {
  let color = "bg-green-100 text-green-800";
  
  if (severity >= 7) {
    color = "bg-red-100 text-red-800";
  } else if (severity >= 4) {
    color = "bg-yellow-100 text-yellow-800";
  }

  return (
    <Badge variant="outline" className={`${color} border-none font-medium`}>
      {severity}/10
    </Badge>
  );
};

const MoodBadge = ({ mood, showLabel = false }: { mood: string, showLabel?: boolean }) => {
  const moodData = {
    terrible: { emoji: "😢", color: "bg-red-100 text-red-800", label: "Terrible" },
    bad: { emoji: "😕", color: "bg-orange-100 text-orange-800", label: "Bad" },
    neutral: { emoji: "😐", color: "bg-yellow-100 text-yellow-800", label: "Neutral" },
    good: { emoji: "🙂", color: "bg-green-100 text-green-800", label: "Good" },
    excellent: { emoji: "😃", color: "bg-emerald-100 text-emerald-800", label: "Excellent" },
  };

  const { emoji, color, label } = moodData[mood as keyof typeof moodData] || 
    moodData.neutral;

  return (
    <Badge variant="outline" className={`${color} border-none font-medium`}>
      {emoji} {showLabel && label}
    </Badge>
  );
};
