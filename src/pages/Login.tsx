
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state, or default to dashboard
  const from = location.state?.from || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      return;
    }

    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        // Redirect to the page they tried to visit or dashboard
        navigate(from);
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
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form className="form-card space-y-4" onSubmit={handleSubmit}>
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-embrace-400 hover:text-embrace-500">
                  Forgot password?
                </Link>
              </div>
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
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe} 
                onCheckedChange={() => setRememberMe(!rememberMe)} 
                disabled={isSubmitting}
              />
              <Label htmlFor="remember-me" className="text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>
            <Button 
              className="w-full bg-embrace-500 hover:bg-embrace-600" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-embrace-400 hover:text-embrace-500 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
