
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  role: "patient" | "caregiver" | "healthcare";
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: string) => Promise<boolean>;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user is already authenticated
  useEffect(() => {
    const storedUser = localStorage.getItem("embrace-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("embrace-user");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would call an API endpoint
      // For now, we'll simulate a successful login if credentials match any existing user
      
      // Hardcoded check for demo (remove in production)
      if (!email || !password) {
        toast({
          title: "Login failed",
          description: "Please provide both email and password",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, let's create a mock user
      const newUser: User = {
        id: Math.random().toString(36).slice(2),
        name: email.split('@')[0], // Extract name from email
        email,
        role: "patient", // Default role
      };
      
      setUser(newUser);
      localStorage.setItem("embrace-user", JSON.stringify(newUser));
      
      toast({
        title: "Login successful",
        description: "Welcome back to Embrace!",
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string, role: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would call an API endpoint
      // For now, we'll simulate a successful registration
      
      if (!name || !email || !password || !role) {
        toast({
          title: "Signup failed",
          description: "Please provide all required information",
          variant: "destructive",
        });
        return false;
      }

      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).slice(2),
        name,
        email,
        role: role as "patient" | "caregiver" | "healthcare",
      };
      
      setUser(newUser);
      localStorage.setItem("embrace-user", JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: "Welcome to Embrace! Your account has been created successfully.",
      });
      
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      toast({
        title: "Signup failed",
        description: "Could not create your account. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("embrace-user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
