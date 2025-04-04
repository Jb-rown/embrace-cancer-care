
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
import { useState } from "react";
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

// Mock data for demonstration
const mockSymptoms = [
  {
    id: "1",
    date: "Apr 3, 2025",
    category: "physical",
    type: "Pain",
    severity: 6,
    location: "Lower back",
    mood: "bad",
    notes: "Pain worsens when sitting for long periods",
  },
  {
    id: "2",
    date: "Apr 2, 2025",
    category: "physical",
    type: "Fatigue",
    severity: 7,
    location: "General",
    mood: "bad",
    notes: "Felt exhausted all day, needed to nap twice",
  },
  {
    id: "3",
    date: "Apr 1, 2025",
    category: "digestive",
    type: "Nausea",
    severity: 4,
    location: "Stomach",
    mood: "neutral",
    notes: "Mild nausea after breakfast, subsided by noon",
  },
  {
    id: "4", 
    date: "Mar 29, 2025",
    category: "neurological",
    type: "Headache",
    severity: 5,
    location: "Temples",
    mood: "bad",
    notes: "Throbbing headache, lasted about 3 hours",
  },
  {
    id: "5",
    date: "Mar 28, 2025",
    category: "physical",
    type: "Fatigue",
    severity: 6,
    location: "General",
    mood: "terrible",
    notes: "Difficulty concentrating and staying awake",
  },
  {
    id: "6",
    date: "Mar 26, 2025",
    category: "emotional",
    type: "Anxiety",
    severity: 8,
    location: "N/A",
    mood: "terrible",
    notes: "Felt overwhelmed about upcoming treatment",
  },
  {
    id: "7",
    date: "Mar 25, 2025",
    category: "digestive",
    type: "Appetite Loss",
    severity: 6,
    location: "N/A",
    mood: "bad",
    notes: "Couldn't finish meals all day",
  },
];

export const SymptomHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [selectedSymptom, setSelectedSymptom] = useState<any | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filteredSymptoms = mockSymptoms.filter(symptom => {
    const matchesSearch = symptom.type.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         symptom.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         symptom.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !categoryFilter || symptom.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  const handleViewDetails = (symptom: any) => {
    setSelectedSymptom(symptom);
    setIsDrawerOpen(true);
  };

  const exportToCsv = () => {
    // In a real app, this would generate and download a CSV file
    toast.success("Symptom history exported successfully");
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
            {filteredSymptoms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No symptoms found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredSymptoms.map((symptom) => (
                <TableRow key={symptom.id}>
                  <TableCell>{symptom.date}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{symptom.type}</span>
                      <Badge variant="outline" className="mt-1 w-fit">
                        {symptom.category.charAt(0).toUpperCase() + symptom.category.slice(1)}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SeverityBadge severity={symptom.severity} />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {symptom.location}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <MoodBadge mood={symptom.mood} />
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
                  Recorded on {selectedSymptom.date}
                </DrawerDescription>
              </DrawerHeader>
              <div className="px-4">
                <dl className="divide-y divide-border">
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Type:</dt>
                    <dd className="col-span-2">{selectedSymptom.type}</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Category:</dt>
                    <dd className="col-span-2">
                      {selectedSymptom.category.charAt(0).toUpperCase() + selectedSymptom.category.slice(1)}
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Severity:</dt>
                    <dd className="col-span-2">{selectedSymptom.severity}/10</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Location:</dt>
                    <dd className="col-span-2">{selectedSymptom.location}</dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Mood:</dt>
                    <dd className="col-span-2">
                      <MoodBadge mood={selectedSymptom.mood} showLabel />
                    </dd>
                  </div>
                  <div className="py-3 grid grid-cols-3">
                    <dt className="font-medium text-muted-foreground">Notes:</dt>
                    <dd className="col-span-2">{selectedSymptom.notes}</dd>
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
