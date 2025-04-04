
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-embrace-400" />
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg font-semibold">Embrace</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <Link to="/about" className="text-sm font-medium hover:text-embrace-400 transition-colors">
            About
          </Link>
          <Link to="/resources" className="text-sm font-medium hover:text-embrace-400 transition-colors">
            Resources
          </Link>
          <Link to="/blog" className="text-sm font-medium hover:text-embrace-400 transition-colors">
            Blog
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-embrace-400 transition-colors">
            Contact
          </Link>
          {user && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-embrace-400 transition-colors">
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm hidden sm:inline-block">
                Welcome, {user.name}
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={logout} 
                className="flex items-center gap-1"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Log Out</span>
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="hidden sm:flex">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-embrace-500 hover:bg-embrace-600">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
