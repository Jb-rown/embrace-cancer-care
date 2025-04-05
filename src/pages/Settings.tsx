
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Moon, 
  Sun, 
  Bell, 
  Globe, 
  Shield, 
  LogOut, 
  Trash2, 
  Eye, 
  EyeOff,
  Monitor,
} from "lucide-react";

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Theme settings
  const [darkMode, setDarkMode] = useState(false);
  const [systemTheme, setSystemTheme] = useState(true);
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [appNotifications, setAppNotifications] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  
  // Privacy settings
  const [shareData, setShareData] = useState(false);
  const [activityVisibility, setActivityVisibility] = useState(false);
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role={user.role} />
      <div className="flex-1 overflow-auto">
        <main className="container py-6">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="lg:w-1/4">
              <div className="sticky top-0 space-y-4">
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
                  <p className="text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-1">
                  <Button 
                    variant={activeTab === "appearance" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("appearance")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Appearance
                  </Button>
                  <Button 
                    variant={activeTab === "notifications" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("notifications")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                  <Button 
                    variant={activeTab === "privacy" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("privacy")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Privacy
                  </Button>
                  <Button 
                    variant={activeTab === "account" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("account")}
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Account
                  </Button>
                </div>
              </div>
            </aside>
            
            <div className="flex-1 lg:max-w-2xl">
              {activeTab === "appearance" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Appearance</CardTitle>
                    <CardDescription>
                      Customize how the application looks and feels.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="dark-mode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Switch between light and dark theme
                          </p>
                        </div>
                        <Switch 
                          id="dark-mode"
                          checked={darkMode} 
                          onCheckedChange={setDarkMode} 
                          disabled={systemTheme}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="system-theme">Use System Theme</Label>
                          <p className="text-sm text-muted-foreground">
                            Automatically match your system's theme setting
                          </p>
                        </div>
                        <Switch 
                          id="system-theme"
                          checked={systemTheme} 
                          onCheckedChange={setSystemTheme}
                        />
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label>Preview</Label>
                      <div className="flex gap-4">
                        <div className="border rounded-md p-4 w-1/2 bg-white text-black flex items-center justify-center">
                          <Sun className="mr-2 h-5 w-5" />
                          Light Mode
                        </div>
                        <div className="border rounded-md p-4 w-1/2 bg-slate-950 text-white flex items-center justify-center">
                          <Moon className="mr-2 h-5 w-5" />
                          Dark Mode
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Save preferences</Button>
                  </CardFooter>
                </Card>
              )}
              
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>
                      Configure how you receive notifications from the app.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-notifications">Email Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive notifications via email
                        </p>
                      </div>
                      <Switch 
                        id="email-notifications"
                        checked={emailNotifications} 
                        onCheckedChange={setEmailNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="app-notifications">App Notifications</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive in-app notifications
                        </p>
                      </div>
                      <Switch 
                        id="app-notifications"
                        checked={appNotifications} 
                        onCheckedChange={setAppNotifications}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reminder-notifications">Appointment Reminders</Label>
                        <p className="text-sm text-muted-foreground">
                          Receive reminders about upcoming appointments
                        </p>
                      </div>
                      <Switch 
                        id="reminder-notifications"
                        checked={reminderNotifications} 
                        onCheckedChange={setReminderNotifications}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Save notification settings</Button>
                  </CardFooter>
                </Card>
              )}
              
              {activeTab === "privacy" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy</CardTitle>
                    <CardDescription>
                      Manage your privacy and data sharing preferences.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="share-data">Data Sharing</Label>
                        <p className="text-sm text-muted-foreground">
                          Share anonymized data to help improve the app
                        </p>
                      </div>
                      <Switch 
                        id="share-data"
                        checked={shareData} 
                        onCheckedChange={setShareData}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="activity-visibility">Activity Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow caregivers to see your app activity
                        </p>
                      </div>
                      <Switch 
                        id="activity-visibility"
                        checked={activityVisibility} 
                        onCheckedChange={setActivityVisibility}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <Label className="mb-2 block">Data Export</Label>
                      <Button variant="outline" className="w-full">
                        Download your data
                      </Button>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Export all your personal data in a portable format.
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleSaveSettings}>Save privacy settings</Button>
                  </CardFooter>
                </Card>
              )}
              
              {activeTab === "account" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                    <CardDescription>
                      Manage your account and make changes.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="account-email">Email Address</Label>
                      <Input id="account-email" defaultValue={user.email} readOnly />
                      <p className="text-xs text-muted-foreground">
                        To change your email, please contact support.
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Danger Zone</h3>
                      <div className="flex flex-col space-y-3">
                        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign out from all devices
                        </Button>
                        <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;

