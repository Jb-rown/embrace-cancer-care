
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Upload } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const SymptomForm = () => {
  const [symptomDate, setSymptomDate] = useState<Date>(new Date());
  const [symptomType, setSymptomType] = useState("");
  const [symptomCategory, setSymptomCategory] = useState("physical");
  const [severity, setSeverity] = useState("5");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");
  const [mood, setMood] = useState("neutral");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to the backend API
    console.log("Submitting symptom:", {
      symptomDate,
      symptomCategory,
      symptomType,
      severity: parseInt(severity),
      location,
      mood,
      notes,
      hasImage: !!image,
    });
    toast.success("Symptom recorded successfully");
    // Reset form
    setSymptomType("");
    setSeverity("5");
    setLocation("");
    setNotes("");
    setMood("neutral");
    setImage(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        <Label>Symptom Category</Label>
        <Select value={symptomCategory} onValueChange={setSymptomCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="physical">Physical</SelectItem>
            <SelectItem value="digestive">Digestive</SelectItem>
            <SelectItem value="neurological">Neurological</SelectItem>
            <SelectItem value="emotional">Emotional</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="symptom-type">Symptom Type</Label>
        <Select value={symptomType} onValueChange={setSymptomType} required>
          <SelectTrigger id="symptom-type">
            <SelectValue placeholder="Select symptom" />
          </SelectTrigger>
          <SelectContent>
            {symptomCategory === "physical" && (
              <>
                <SelectItem value="pain">Pain</SelectItem>
                <SelectItem value="fatigue">Fatigue</SelectItem>
                <SelectItem value="weakness">Weakness</SelectItem>
                <SelectItem value="numbness">Numbness or Tingling</SelectItem>
                <SelectItem value="swelling">Swelling</SelectItem>
              </>
            )}
            {symptomCategory === "digestive" && (
              <>
                <SelectItem value="nausea">Nausea</SelectItem>
                <SelectItem value="vomiting">Vomiting</SelectItem>
                <SelectItem value="appetite-loss">Loss of Appetite</SelectItem>
                <SelectItem value="constipation">Constipation</SelectItem>
                <SelectItem value="diarrhea">Diarrhea</SelectItem>
              </>
            )}
            {symptomCategory === "neurological" && (
              <>
                <SelectItem value="headache">Headache</SelectItem>
                <SelectItem value="dizziness">Dizziness</SelectItem>
                <SelectItem value="confusion">Confusion</SelectItem>
                <SelectItem value="memory">Memory Problems</SelectItem>
                <SelectItem value="balance">Balance Issues</SelectItem>
              </>
            )}
            {symptomCategory === "emotional" && (
              <>
                <SelectItem value="anxiety">Anxiety</SelectItem>
                <SelectItem value="depression">Depression</SelectItem>
                <SelectItem value="mood-changes">Mood Changes</SelectItem>
                <SelectItem value="fear">Fear</SelectItem>
                <SelectItem value="irritability">Irritability</SelectItem>
              </>
            )}
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Severity (1-10)</Label>
        <ToggleGroup 
          type="single" 
          value={severity} 
          onValueChange={(value) => value && setSeverity(value)}
          className="flex justify-between"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
            <ToggleGroupItem 
              key={value} 
              value={value.toString()}
              aria-label={`Severity level ${value}`}
              className={cn(
                "w-8 h-8 rounded-full",
                parseInt(severity) === value && "font-bold",
                value <= 3 && "data-[state=on]:bg-green-100 data-[state=on]:text-green-800",
                value > 3 && value <= 7 && "data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-800",
                value > 7 && "data-[state=on]:bg-red-100 data-[state=on]:text-red-800"
              )}
            >
              {value}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <Label>How are you feeling today?</Label>
        <ToggleGroup 
          type="single" 
          value={mood} 
          onValueChange={(value) => value && setMood(value)}
          className="flex justify-between"
        >
          <ToggleGroupItem 
            value="terrible" 
            className="flex-1 data-[state=on]:bg-red-100 data-[state=on]:text-red-800"
          >
            😢 Terrible
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="bad" 
            className="flex-1 data-[state=on]:bg-orange-100 data-[state=on]:text-orange-800"
          >
            😕 Bad
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="neutral" 
            className="flex-1 data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-800"
          >
            😐 Neutral
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="good" 
            className="flex-1 data-[state=on]:bg-green-100 data-[state=on]:text-green-800"
          >
            🙂 Good
          </ToggleGroupItem>
          <ToggleGroupItem 
            value="excellent" 
            className="flex-1 data-[state=on]:bg-emerald-100 data-[state=on]:text-emerald-800"
          >
            😃 Excellent
          </ToggleGroupItem>
        </ToggleGroup>
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
        <Label htmlFor="image">Upload Image (optional)</Label>
        <div className="flex items-center gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => document.getElementById('image-upload')?.click()}
            className="w-full"
          >
            <Upload className="w-4 h-4 mr-2" />
            {image ? 'Change Image' : 'Upload Image'}
          </Button>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
        {image && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">Image selected: {image.name}</p>
          </div>
        )}
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
