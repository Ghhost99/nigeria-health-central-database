import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="gradient-primary rounded-lg p-2">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div className="hidden md:block">
              <span className="text-xl font-bold text-primary">Nigeria Health Hub</span>
              <div className="text-xs text-muted-foreground">National Digital Health Platform</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#about" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </Link>
            <Link to="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
              Benefits
            </Link>
            <Link to="#security" className="text-sm font-medium hover:text-primary transition-colors">
              Security
            </Link>
            <Link to="#contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/patient-registration">Get Your UHID</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link to="#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
              <Link to="#benefits" className="text-sm font-medium hover:text-primary transition-colors">
                Benefits
              </Link>
              <Link to="#security" className="text-sm font-medium hover:text-primary transition-colors">
                Security
              </Link>
              <Link to="#contact" className="text-sm font-medium hover:text-primary transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="hero" asChild>
                <Link to="/patient-registration">Get Your UHID</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;