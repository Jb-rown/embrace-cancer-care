
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
import { Search } from "lucide-react";

// Mock data for demonstration
const mockSymptoms = [
  {
    id: "1",
    date: "Apr 3, 2025",
    type: "Pain",
    severity: 6,
    location: "Lower back",
    notes: "Pain worsens when sitting for long periods",
  },
  {
    id: "2",
    date: "Apr 2, 2025",
    type: "Fatigue",
    severity: 7,
    location: "General",
    notes: "Felt exhausted all day, needed to nap twice",
  },
  {
    id: "3",
    date: "Apr 1, 2025",
    type: "Nausea",
    severity: 4,
    location: "Stomach",
    notes: "Mild nausea after breakfast, subsided by noon",
  },
  {
    id: "4", 
    date: "Mar 29, 2025",
    type: "Headache",
    severity: 5,
    location: "Temples",
    notes: "Throbbing headache, lasted about 3 hours",
  },
  {
    id: "5",
    date: "Mar 28, 2025",
    type: "Fatigue",
    severity: 6,
    location: "General",
    notes: "Difficulty concentrating and staying awake",
  },
];

export const SymptomHistory = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search symptoms..."
            className="pl-9 h-10 w-full md:w-[250px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            Export
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
              <TableHead className="hidden lg:table-cell">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockSymptoms.map((symptom) => (
              <TableRow key={symptom.id}>
                <TableCell>{symptom.date}</TableCell>
                <TableCell>{symptom.type}</TableCell>
                <TableCell>
                  <SeverityBadge severity={symptom.severity} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {symptom.location}
                </TableCell>
                <TableCell className="hidden lg:table-cell max-w-xs truncate">
                  {symptom.notes}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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
