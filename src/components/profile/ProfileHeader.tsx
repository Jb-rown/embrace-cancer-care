
import { User } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // In a real app, you would upload the file to a server
    // For demo purposes, we're using a local URL
    const objectUrl = URL.createObjectURL(file);
    setAvatarUrl(objectUrl);
    
    toast({
      title: "Profile picture updated",
      description: "Your profile picture has been updated successfully."
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
      <div className="relative group">
        <Avatar className="h-24 w-24 border-2 border-border">
          <AvatarImage src={avatarUrl || undefined} alt={user.name} />
          <AvatarFallback className="text-xl bg-embrace-400 text-white">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <label 
          htmlFor="avatar-upload" 
          className="absolute bottom-0 right-0 p-1 bg-background border rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Camera className="h-4 w-4" />
          <input 
            id="avatar-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleAvatarUpload}
          />
        </label>
      </div>
      
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-muted-foreground">{user.email}</p>
        <div className="mt-2 flex items-center justify-center md:justify-start gap-2">
          <Badge variant="secondary" className="capitalize font-normal">
            {user.role}
          </Badge>
          <Badge variant="outline" className="font-normal">
            Member since {new Date().getFullYear()}
          </Badge>
        </div>
      </div>
    </div>
  );
}
