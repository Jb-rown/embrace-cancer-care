
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Header = () => {
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
        </nav>
        <div className="flex items-center gap-4">
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
        </div>
      </div>
    </header>
  );
};
