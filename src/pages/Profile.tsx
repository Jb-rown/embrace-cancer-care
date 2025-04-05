
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileSecurity } from "@/components/profile/ProfileSecurity";
import { ProfilePreferences } from "@/components/profile/ProfilePreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { User, Settings, Bell, Shield } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={user.role} />
      <div className="flex-1 overflow-auto">
        <main className="container py-6">
          <ProfileHeader user={user} />
          
          <div className="mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-2xl font-semibold mb-4 sm:mb-0">Account Settings</h2>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Settings size={16} />
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setActiveTab("personal")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Edit Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("security")}>
                    <Shield className="mr-2 h-4 w-4" />
                    <span>Security Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setActiveTab("preferences")}>
                    <Bell className="mr-2 h-4 w-4" />
                    <span>Notification Preferences</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Tabs 
              defaultValue="personal" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="personal" className="flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">Personal Info</span>
                </TabsTrigger>
                <TabsTrigger value="security" className="flex items-center gap-2">
                  <Shield size={16} />
                  <span className="hidden sm:inline">Security</span>
                </TabsTrigger>
                <TabsTrigger value="preferences" className="flex items-center gap-2">
                  <Bell size={16} />
                  <span className="hidden sm:inline">Preferences</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="personal" className="mt-6">
                <ProfileForm user={user} />
              </TabsContent>
              <TabsContent value="security" className="mt-6">
                <ProfileSecurity />
              </TabsContent>
              <TabsContent value="preferences" className="mt-6">
                <ProfilePreferences />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
