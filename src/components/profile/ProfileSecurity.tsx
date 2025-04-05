
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Bell, Clock } from "lucide-react";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, {
    message: "Current password is required.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(1, {
    message: "Confirm your new password.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function ProfileSecurity() {
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showTwoFactorDialog, setShowTwoFactorDialog] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [sessionMonitoring, setSessionMonitoring] = useState(true);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof passwordSchema>) {
    setIsLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      console.log(values);
      setIsLoading(false);
      form.reset();
      toast({
        title: "Password changed",
        description: "Your password has been changed successfully.",
      });
    }, 1000);
  }

  function handleDeleteAccount() {
    // In a real app, this would be an API call
    toast({
      variant: "destructive",
      title: "Account deletion requested",
      description: "Your account will be scheduled for deletion.",
    });
    setShowDeleteDialog(false);
  }

  function toggleTwoFactor() {
    if (twoFactorEnabled) {
      // In a real app, this would be an API call to disable 2FA
      setTwoFactorEnabled(false);
      toast({
        title: "Two-factor authentication disabled",
        description: "Two-factor authentication has been disabled for your account.",
      });
    } else {
      // In a real app, this would show a QR code or send a verification code
      setShowTwoFactorDialog(true);
    }
  }

  function setupTwoFactor() {
    // In a real app, this would verify the code and enable 2FA
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true);
      setShowTwoFactorDialog(false);
      setVerificationCode("");
      toast({
        title: "Two-factor authentication enabled",
        description: "Two-factor authentication has been enabled for your account.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Invalid code",
        description: "Please enter a valid 6-digit verification code.",
      });
    }
  }

  const recentActivities = [
    { type: "Login", date: "Today, 10:30 AM", location: "New York, USA", device: "Chrome on Windows" },
    { type: "Password Change", date: "Mar 28, 2025", location: "New York, USA", device: "Firefox on macOS" },
    { type: "Login", date: "Mar 25, 2025", location: "Boston, USA", device: "Safari on iPhone" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormDescription>
                      Password must be at least 8 characters long
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <CardFooter className="px-0 pb-0">
                <Button type="submit" disabled={isLoading} className="ml-auto">
                  {isLoading ? "Updating..." : "Update Password"}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Account Security</CardTitle>
          </div>
          <CardDescription>
            Additional security measures to protect your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your account with 2FA
              </p>
            </div>
            <Button 
              variant={twoFactorEnabled ? "outline" : "default"} 
              onClick={toggleTwoFactor}
            >
              {twoFactorEnabled ? "Disable" : "Enable"}
            </Button>
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">Login Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Get notified when someone logs into your account
              </p>
            </div>
            <Checkbox 
              checked={loginNotifications} 
              onCheckedChange={(checked) => setLoginNotifications(checked as boolean)} 
              id="login-notifications"
            />
          </div>
          
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <h4 className="text-sm font-medium">Session Monitoring</h4>
              <p className="text-sm text-muted-foreground">
                Track and manage your active sessions
              </p>
            </div>
            <Checkbox 
              checked={sessionMonitoring} 
              onCheckedChange={(checked) => setSessionMonitoring(checked as boolean)} 
              id="session-monitoring"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Recent Activities</CardTitle>
          </div>
          <CardDescription>
            Review recent activities on your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                <div>
                  <h4 className="text-sm font-medium">{activity.type}</h4>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.location} • {activity.device}</p>
                </div>
                {activity.type === "Login" && (
                  <Button variant="ghost" size="sm" className="text-xs">
                    Not you?
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Actions here can't be undone. Please proceed with caution.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">
            Deleting your account will remove all of your data from our systems. This action cannot be undone.
          </p>
          <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. Your account and all associated data will be permanently deleted.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2 py-4">
                <Checkbox id="confirm-delete" checked={confirmDelete} onCheckedChange={(checked) => setConfirmDelete(checked as boolean)} />
                <label
                  htmlFor="confirm-delete"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I understand that this action is irreversible
                </label>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" disabled={!confirmDelete} onClick={handleDeleteAccount}>
                  Delete Account
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication Dialog */}
      <Dialog open={showTwoFactorDialog} onOpenChange={setShowTwoFactorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Up Two-Factor Authentication</DialogTitle>
            <DialogDescription>
              Enter the 6-digit verification code sent to your phone or email to enable two-factor authentication.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col space-y-4 py-4">
            <div className="grid grid-cols-6 gap-2">
              {Array(6).fill(0).map((_, i) => (
                <Input
                  key={i}
                  className="h-12 text-center text-lg"
                  type="tel"
                  maxLength={1}
                  value={verificationCode[i] || ''}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.match(/^[0-9]$/) || value === '') {
                      const newCode = verificationCode.split('');
                      newCode[i] = value;
                      setVerificationCode(newCode.join(''));
                      
                      // Auto-focus next input
                      if (value && i < 5) {
                        const nextInput = document.querySelector(`input[name="2fa-${i + 1}"]`) as HTMLInputElement;
                        if (nextInput) nextInput.focus();
                      }
                    }
                  }}
                  name={`2fa-${i}`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              In a real application, we would show a QR code to scan with an authenticator app like Google Authenticator or send a verification code via SMS.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTwoFactorDialog(false)}>
              Cancel
            </Button>
            <Button onClick={setupTwoFactor} disabled={verificationCode.length !== 6}>
              Verify & Enable
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
