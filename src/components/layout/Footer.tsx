
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-embrace-400" />
              <span className="text-lg font-semibold">Embrace</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Compassionate care throughout your cancer journey.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-3">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/symptom-tracker" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Symptom Tracker
                </Link>
              </li>
              <li>
                <Link to="/treatments" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Treatment Management
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Appointments
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-3">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/resources" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Educational Resources
                </Link>
              </li>
              <li>
                <Link to="/quiz" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Knowledge Quiz
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-embrace-400">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Support Network
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm text-muted-foreground hover:text-embrace-400">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-muted-foreground hover:text-embrace-400">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Embrace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
