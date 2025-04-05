
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Download, Moon, Sun, SunMoon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export function ProfilePreferences() {
  const [isLoading, setIsLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  
  // Notification preferences
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  
  // App preferences
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const [fontScale, setFontScale] = useState("1");
  const [colorScheme, setColorScheme] = useState("default");
  
  // Advanced settings
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [dataSync, setDataSync] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  
  function savePreferences() {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      console.log({
        notifications: {
          email: emailNotifications,
          sms: smsNotifications,
          app: appNotifications,
        },
        preferences: {
          theme,
          language,
          fontScale,
          colorScheme,
        },
        advanced: {
          dataSync,
          autoSave,
        }
      });
      
      setIsLoading(false);
      toast({
        title: "Preferences saved",
        description: "Your preferences have been updated.",
      });
    }, 1000);
  }

  function exportUserData() {
    setIsExporting(true);
    
    // In a real app, this would be an API call to get user data
    setTimeout(() => {
      // Create a mock data JSON
      const userData = {
        profile: {
          name: "User Name",
          email: "user@example.com",
          preferences: {
            theme,
            language,
            notifications: {
              email: emailNotifications,
              sms: smsNotifications,
              app: appNotifications
            }
          },
          activities: [
            { type: "login", date: "2025-03-04T10:20:30Z" },
            { type: "profile_update", date: "2025-03-02T15:30:20Z" }
          ]
        }
      };
      
      // Create a download link
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userData, null, 2));
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "user_data.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
      
      setIsExporting(false);
      toast({
        title: "Data exported",
        description: "Your data has been exported successfully.",
      });
    }, 1500);
  }
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Manage how you receive notifications and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive updates, reminders, and reports via email
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
              <Label htmlFor="sms-notifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive appointment reminders via text message
              </p>
            </div>
            <Switch
              id="sms-notifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="app-notifications">In-App Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive notifications within the application
              </p>
            </div>
            <Switch
              id="app-notifications"
              checked={appNotifications}
              onCheckedChange={setAppNotifications}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
          <CardDescription>
            Customize your application experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Choose how the app looks
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">
                Select your preferred language
              </p>
            </div>

            <div className="space-y-2">
              <Label>Color Scheme</Label>
              <ToggleGroup 
                type="single" 
                value={colorScheme} 
                onValueChange={(value) => value && setColorScheme(value)}
                className="justify-start"
              >
                <ToggleGroupItem value="default" aria-label="Default color scheme">
                  Default
                </ToggleGroupItem>
                <ToggleGroupItem value="high-contrast" aria-label="High contrast color scheme">
                  High Contrast
                </ToggleGroupItem>
                <ToggleGroupItem value="soft" aria-label="Soft color scheme">
                  Soft
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-sm text-muted-foreground">
                Pick a color scheme that works best for you
              </p>
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <ToggleGroup 
                type="single" 
                value={fontScale} 
                onValueChange={(value) => value && setFontScale(value)}
                className="justify-start"
              >
                <ToggleGroupItem value="0.9" aria-label="Small font">
                  Small
                </ToggleGroupItem>
                <ToggleGroupItem value="1" aria-label="Medium font">
                  Medium
                </ToggleGroupItem>
                <ToggleGroupItem value="1.1" aria-label="Large font">
                  Large
                </ToggleGroupItem>
              </ToggleGroup>
              <p className="text-sm text-muted-foreground">
                Adjust text size for better readability
              </p>
            </div>
          </div>
          
          <Collapsible
            open={showAdvancedSettings}
            onOpenChange={setShowAdvancedSettings}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold">Advanced Settings</h4>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {showAdvancedSettings ? "Hide" : "Show"}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sync">Data Synchronization</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync your data across all your devices
                  </p>
                </div>
                <Switch
                  id="data-sync"
                  checked={dataSync}
                  onCheckedChange={setDataSync}
                />
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-save">Auto-save Changes</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically save changes as you make them
                  </p>
                </div>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={exportUserData} 
            disabled={isExporting}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            {isExporting ? "Exporting..." : "Export Data"}
          </Button>
          <Button onClick={savePreferences} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Preferences"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
