
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { PatientDashboard } from "@/components/dashboard/PatientDashboard";
import { CaregiverDashboard } from "@/components/dashboard/CaregiverDashboard";
import { HealthcareDashboard } from "@/components/dashboard/HealthcareDashboard";
import { Button } from "@/components/ui/button";
import { User, Users, PlusCircle, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setupRealtimeSubscriptions } from "@/services/supabaseService";

const Dashboard = () => {
  // In a real app, this would be determined by authentication
  const [userRole, setUserRole] = useState<"patient" | "caregiver" | "healthcare">("patient");
  const navigate = useNavigate();

  // Set up real-time subscriptions when the dashboard loads
  useEffect(() => {
    setupRealtimeSubscriptions()
      .then(() => console.log("Real-time subscriptions set up successfully"))
      .catch(error => console.error("Error setting up real-time subscriptions:", error));
  }, []);

  const handleRoleChange = (role: "patient" | "caregiver" | "healthcare") => {
    setUserRole(role);
    toast.success(`Switched to ${role} view`);
  };

  const handleLogSymptom = () => {
    navigate("/symptom-tracker");
    toast.success("Navigated to Symptom Tracker");
  };

  const renderDashboard = () => {
    switch (userRole) {
      case "patient":
        return <PatientDashboard onLogSymptom={handleLogSymptom} />;
      case "caregiver":
        return <CaregiverDashboard />;
      case "healthcare":
        return <HealthcareDashboard />;
      default:
        return <PatientDashboard onLogSymptom={handleLogSymptom} />;
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
              <Button 
                onClick={() => handleRoleChange("patient")}
                className={`px-3 py-1 rounded text-sm flex items-center ${userRole === "patient" 
                  ? "bg-embrace-400 text-white" 
                  : "bg-muted-foreground/20"}`}
              >
                <User className="mr-1 h-4 w-4" />
                Patient
              </Button>
              <Button 
                onClick={() => handleRoleChange("caregiver")}
                className={`px-3 py-1 rounded text-sm flex items-center ${userRole === "caregiver" 
                  ? "bg-embrace-400 text-white" 
                  : "bg-muted-foreground/20"}`}
              >
                <User className="mr-1 h-4 w-4" />
                Caregiver
              </Button>
              <Button 
                onClick={() => handleRoleChange("healthcare")}
                className={`px-3 py-1 rounded text-sm flex items-center ${userRole === "healthcare" 
                  ? "bg-embrace-400 text-white" 
                  : "bg-muted-foreground/20"}`}
              >
                <Users className="mr-1 h-4 w-4" />
                Healthcare Professional
              </Button>
            </div>
          </div>
          {renderDashboard()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
