import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="gradient-primary rounded-lg p-2">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-lg font-bold text-primary">Nigeria Health Hub</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Securing Nigeria's health future through unified digital healthcare records and seamless data sharing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/patient-registration" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Patient Registration
              </Link>
              <Link to="/institution-registration" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Institution Registration
              </Link>
              <Link to="/government-portal" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Government Portal
              </Link>
              <Link to="/login" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <div className="space-y-2">
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
              <Link to="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                Support
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@nigeriahealthhub.gov.ng</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+234 (0) 800-HEALTH</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Federal Ministry of Health, Abuja</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 Nigeria Health Hub. All rights reserved. | Powered by Federal Ministry of Health, Nigeria
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;