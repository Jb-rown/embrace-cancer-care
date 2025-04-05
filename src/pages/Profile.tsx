
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { ProfileSecurity } from "@/components/profile/ProfileSecurity";
import { ProfilePreferences } from "@/components/profile/ProfilePreferences";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

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
            <Tabs 
              defaultValue="personal" 
              value={activeTab} 
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
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
