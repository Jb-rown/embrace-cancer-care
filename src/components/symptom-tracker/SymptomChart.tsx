
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

// Mock data for demonstration
const mockData = [
  {
    date: "Mar 28",
    pain: 3,
    fatigue: 6,
    nausea: 1,
  },
  {
    date: "Mar 29",
    pain: 4,
    fatigue: 5,
    nausea: 2,
  },
  {
    date: "Mar 30",
    pain: 3,
    fatigue: 4,
    nausea: 1,
  },
  {
    date: "Mar 31",
    pain: 5,
    fatigue: 6,
    nausea: 3,
  },
  {
    date: "Apr 1",
    pain: 6,
    fatigue: 7,
    nausea: 4,
  },
  {
    date: "Apr 2",
    pain: 4,
    fatigue: 7,
    nausea: 3,
  },
  {
    date: "Apr 3",
    pain: 6,
    fatigue: 5,
    nausea: 2,
  },
];

export const SymptomChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Trends</CardTitle>
        <CardDescription>Track how your symptoms change over time</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockData}
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
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pain"
                stroke="#F76A3D"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="fatigue"
                stroke="#1A73E8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="nausea"
                stroke="#4CAF50"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 text-center text-sm">
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[#F76A3D]" />
              <span className="font-medium">Pain</span>
            </div>
            <p className="text-muted-foreground">Avg: 4.4/10</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[#1A73E8]" />
              <span className="font-medium">Fatigue</span>
            </div>
            <p className="text-muted-foreground">Avg: 5.7/10</p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1">
              <div className="h-3 w-3 rounded-full bg-[#4CAF50]" />
              <span className="font-medium">Nausea</span>
            </div>
            <p className="text-muted-foreground">Avg: 2.3/10</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
