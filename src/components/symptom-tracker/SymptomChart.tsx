
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

// Mock data for demonstration
const mockAllData = [
  {
    date: "Mar 25",
    pain: 4,
    fatigue: 6,
    nausea: 3,
    anxiety: 7,
    headache: 2,
  },
  {
    date: "Mar 26",
    pain: 3,
    fatigue: 7,
    nausea: 2,
    anxiety: 8,
    headache: 1,
  },
  {
    date: "Mar 27",
    pain: 2,
    fatigue: 5,
    nausea: 1,
    anxiety: 6,
    headache: 3,
  },
  {
    date: "Mar 28",
    pain: 3,
    fatigue: 6,
    nausea: 1,
    anxiety: 5,
    headache: 0,
  },
  {
    date: "Mar 29",
    pain: 4,
    fatigue: 5,
    nausea: 2,
    anxiety: 4,
    headache: 5,
  },
  {
    date: "Mar 30",
    pain: 3,
    fatigue: 4,
    nausea: 1,
    anxiety: 3,
    headache: 2,
  },
  {
    date: "Mar 31",
    pain: 5,
    fatigue: 6,
    nausea: 3,
    anxiety: 4,
    headache: 0,
  },
  {
    date: "Apr 1",
    pain: 6,
    fatigue: 7,
    nausea: 4,
    anxiety: 5,
    headache: 1,
  },
  {
    date: "Apr 2",
    pain: 4,
    fatigue: 7,
    nausea: 3,
    anxiety: 6,
    headache: 3,
  },
  {
    date: "Apr 3",
    pain: 6,
    fatigue: 5,
    nausea: 2,
    anxiety: 4,
    headache: 4,
  },
];

// Color mapping for different symptoms
const symptomColors = {
  pain: "#F76A3D",
  fatigue: "#1A73E8",
  nausea: "#4CAF50",
  anxiety: "#9C27B0",
  headache: "#FF5722"
};

export const SymptomChart = () => {
  const [timeRange, setTimeRange] = useState("week");
  const [selectedSymptoms, setSelectedSymptoms] = useState({
    pain: true,
    fatigue: true,
    nausea: true,
    anxiety: false,
    headache: false
  });

  // Filter data based on time range
  const getData = () => {
    let data = [...mockAllData];
    
    if (timeRange === "week") {
      // Last 7 days, starting with oldest
      data = data.slice(data.length - 7);
    } else if (timeRange === "month") {
      // All data (pretending it's a month)
      data = data;
    } else if (timeRange === "3days") {
      // Last 3 days
      data = data.slice(data.length - 3);
    }
    
    return data;
  };

  const toggleSymptom = (symptom: keyof typeof selectedSymptoms) => {
    setSelectedSymptoms({
      ...selectedSymptoms,
      [symptom]: !selectedSymptoms[symptom]
    });
  };

  // Calculate averages for displayed symptoms
  const calculateAverages = () => {
    const data = getData();
    const results: Record<string, number> = {};
    
    Object.keys(selectedSymptoms).forEach(symptom => {
      if (selectedSymptoms[symptom as keyof typeof selectedSymptoms]) {
        const values = data.map(item => Number(item[symptom as keyof typeof item]) || 0);
        results[symptom] = Number((values.reduce((a, b) => a + b, 0) / values.length).toFixed(1));
      }
    });
    
    return results;
  };
  
  const averages = calculateAverages();

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle>Symptom Trends</CardTitle>
          <CardDescription>Track how your symptoms change over time</CardDescription>
        </div>
        <div className="w-[150px] mt-2 sm:mt-0">
          <Select value={timeRange} onValueChange={(value) => setTimeRange(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3days">Last 3 days</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.keys(selectedSymptoms).map(symptom => (
            <Toggle
              key={symptom}
              pressed={selectedSymptoms[symptom as keyof typeof selectedSymptoms]}
              onPressedChange={() => toggleSymptom(symptom as keyof typeof selectedSymptoms)}
              variant="outline"
              className="gap-1.5"
            >
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: symptomColors[symptom as keyof typeof symptomColors] }}
              />
              <span className="capitalize">{symptom}</span>
            </Toggle>
          ))}
        </div>
        
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={getData()}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickLine={false}
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
                label={{ value: "Severity", angle: -90, position: "insideLeft", style: { textAnchor: 'middle' } }}
              />
              <Tooltip 
                formatter={(value, name) => {
                  // Type checking to ensure name is a string
                  const nameStr = typeof name === 'string' ? name : String(name);
                  return [`${value}/10`, nameStr.charAt(0).toUpperCase() + nameStr.slice(1)];
                }}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              
              {Object.keys(selectedSymptoms).map(symptom => (
                selectedSymptoms[symptom as keyof typeof selectedSymptoms] && (
                  <Line
                    key={symptom}
                    type="monotone"
                    dataKey={symptom}
                    name={symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                    stroke={symptomColors[symptom as keyof typeof symptomColors]}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center text-sm">
          {Object.entries(averages).map(([symptom, avg]) => (
            <div key={symptom} className="space-y-1">
              <div className="flex items-center justify-center gap-1">
                <div 
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: symptomColors[symptom as keyof typeof symptomColors] }}
                />
                <span className="font-medium capitalize">{symptom}</span>
              </div>
              <p className="text-muted-foreground">Avg: {avg}/10</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
