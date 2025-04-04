
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { CaregiverDashboard } from "@/components/dashboard/CaregiverDashboard";
import { HealthcareDashboard } from "@/components/dashboard/HealthcareDashboard";

const Dashboard = () => {
  // In a real app, this would be determined by authentication
  const [userRole, setUserRole] = useState<"patient" | "caregiver" | "healthcare">("patient");

  const renderDashboard = () => {
    switch (userRole) {
      case "patient":
        return <PatientDashboard />;
      case "caregiver":
        return <CaregiverDashboard />;
      case "healthcare":
        return <HealthcareDashboard />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={userRole} />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          {/* Role selector (for demo purposes) */}
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="font-medium mb-2">Demo Mode: Select User Role</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setUserRole("patient")}
                className={`px-3 py-1 rounded text-sm ${userRole === "patient" 
                  ? "bg-embrace-400 text-white" 
                  : "bg-muted-foreground/20"}`}
              >
                Patient
              </button>
              <button 
                onClick={() => setUserRole("caregiver")}
                className={`px-3 py-1 rounded text-sm ${userRole === "caregiver" 
                  ? "bg-embrace-400 text-white" 
                  : "bg-muted-foreground/20"}`}
              >
                Caregiver
              </button>
              <button 
                onClick={() => setUserRole("healthcare")}
                className={`px-3 py-1 rounded text-sm ${userRole === "healthcare" 
                  ? "bg-embrace-400 text-white" 
                  : "bg-muted-foreground/20"}`}
              >
                Healthcare Professional
              </button>
            </div>
          </div>
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
