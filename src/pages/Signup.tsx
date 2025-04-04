
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !role || !agreeTerms) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Signup attempt with:", { name, email, password, role, agreeTerms });
      const success = await signup(name, email, password, role);
      if (success) {
        // Redirect to dashboard after successful signup
        navigate("/dashboard");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">Enter your information to get started</p>
          </div>

          <form className="form-card space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Your Role</Label>
              <Select 
                value={role} 
                onValueChange={setRole} 
                disabled={isSubmitting}
                required
              >
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patient">Patient</SelectItem>
                  <SelectItem value="caregiver">Caregiver</SelectItem>
                  <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeTerms} 
                onCheckedChange={() => setAgreeTerms(!agreeTerms)} 
                required
                disabled={isSubmitting}
              />
              <Label htmlFor="terms" className="text-sm font-normal">
                I agree to the{" "}
                <Link to="/terms" className="text-embrace-400 hover:text-embrace-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-embrace-400 hover:text-embrace-500">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            <Button 
              className="w-full bg-embrace-500 hover:bg-embrace-600" 
              type="submit"
              disabled={isSubmitting || !agreeTerms}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-embrace-400 hover:text-embrace-500 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
