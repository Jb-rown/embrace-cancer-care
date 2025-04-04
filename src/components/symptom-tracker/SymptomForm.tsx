
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";

export const SymptomForm = () => {
  const [symptomDate, setSymptomDate] = useState<Date>(new Date());
  const [symptomType, setSymptomType] = useState("");
  const [severity, setSeverity] = useState([3]);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to the backend API
    console.log("Submitting symptom:", {
      symptomDate,
      symptomType,
      severity: severity[0],
      location,
      notes,
    });
    toast.success("Symptom recorded successfully");
    // Reset form
    setSymptomType("");
    setSeverity([3]);
    setLocation("");
    setNotes("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !symptomDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {symptomDate ? format(symptomDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={symptomDate}
              onSelect={(date) => date && setSymptomDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label htmlFor="symptom-type">Symptom Type</Label>
        <Select value={symptomType} onValueChange={setSymptomType} required>
          <SelectTrigger id="symptom-type">
            <SelectValue placeholder="Select symptom" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pain">Pain</SelectItem>
            <SelectItem value="fatigue">Fatigue</SelectItem>
            <SelectItem value="nausea">Nausea</SelectItem>
            <SelectItem value="headache">Headache</SelectItem>
            <SelectItem value="dizziness">Dizziness</SelectItem>
            <SelectItem value="appetite-loss">Loss of Appetite</SelectItem>
            <SelectItem value="mood-changes">Mood Changes</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Severity (1-10)</Label>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Mild</span>
          <span className="text-sm text-muted-foreground">Severe</span>
        </div>
        <div className="flex items-center gap-4">
          <Slider
            defaultValue={[3]}
            min={1}
            max={10}
            step={1}
            value={severity}
            onValueChange={setSeverity}
          />
          <span className="font-medium w-8 text-center">{severity[0]}</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location (if applicable)</Label>
        <Input
          id="location"
          placeholder="e.g., Lower back, left side"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes</Label>
        <Textarea
          id="notes"
          placeholder="Describe how you're feeling, when the symptom started, etc."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
      </div>

      <Button type="submit" className="w-full bg-embrace-500 hover:bg-embrace-600">
        Record Symptom
      </Button>
    </form>
  );
};
