import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-health-platform.jpg";
import {
  Heart,
  Shield,
  Users,
  Building2,
  BarChart3,
  FileText,
  Clock,
  CheckCircle,
  Lock,
  Smartphone,
  Database,
  Globe,
  Stethoscope,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  National Health Initiative
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  Your Health, <span className="gradient-primary bg-clip-text text-transparent">Unified</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl">
                  Nigeria's National Digital Health Platform. Secure, Accessible, and Comprehensive Healthcare Records for Every Nigerian.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="hero" asChild className="text-lg px-8 py-6">
                  <Link to="/patient-registration">Get Your UHID</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                  <Link to="/institution-registration">For Healthcare Institutions</Link>
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" asChild>
                  <Link to="/provider-portal">For Healthcare Professionals</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link to="/government-portal">For Government & Researchers</Link>
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img
                src={heroImage}
                alt="Nigeria Digital Health Platform"
                className="rounded-2xl shadow-strong"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-medium border">
                <div className="flex items-center space-x-3">
                  <div className="gradient-primary rounded-full p-2">
                    <Heart className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Unified Health ID</div>
                    <div className="text-sm text-muted-foreground">Secure & Accessible</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution Overview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transforming Healthcare in Nigeria
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Breaking barriers in healthcare delivery through unified digital records and seamless data sharing across all healthcare stakeholders.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Fragmented Records</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Medical records scattered across different hospitals, clinics, and labs make comprehensive care impossible.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Patient Safety Risks</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Critical information like allergies and medications are often unavailable during emergencies.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardHeader>
                <div className="gradient-primary rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Database className="h-8 w-8 text-white" />
                </div>
                <CardTitle>Limited Interoperability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Healthcare systems don't communicate, causing delays in treatment and duplicate tests.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Benefits for Every Stakeholder
            </h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* For Patients */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="gradient-primary rounded-full p-6 w-20 h-20 mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">For Patients</h3>
                <p className="text-lg font-semibold text-primary mb-6">Empower Your Health Journey</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Instant Access to Records</p>
                    <p className="text-sm text-muted-foreground">Your complete medical history at your fingertips</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Safer Healthcare</p>
                    <p className="text-sm text-muted-foreground">Prevent medical errors with accurate information</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Control Your Data</p>
                    <p className="text-sm text-muted-foreground">Manage consent and privacy settings</p>
                  </div>
                </div>
              </div>
              
              <Button variant="hero" asChild className="w-full">
                <Link to="/patient-registration">Register as Patient</Link>
              </Button>
            </div>

            {/* For Healthcare Institutions */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="gradient-primary rounded-full p-6 w-20 h-20 mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">For Healthcare Institutions</h3>
                <p className="text-lg font-semibold text-primary mb-6">Join the Future of Healthcare</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Seamless Integration</p>
                    <p className="text-sm text-muted-foreground">Connect with national health network</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Reduced Administrative Burden</p>
                    <p className="text-sm text-muted-foreground">Standardized data management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Enhanced Efficiency</p>
                    <p className="text-sm text-muted-foreground">Improved patient trust and operations</p>
                  </div>
                </div>
              </div>
              
              <Button variant="default" asChild className="w-full">
                <Link to="/institution-registration">Register Your Institution</Link>
              </Button>
            </div>

            {/* For Government */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="gradient-primary rounded-full p-6 w-20 h-20 mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4">For Government & Policy Makers</h3>
                <p className="text-lg font-semibold text-primary mb-6">Data-Driven Health Planning</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Real-time Insights</p>
                    <p className="text-sm text-muted-foreground">Make informed health policy decisions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Epidemic Response</p>
                    <p className="text-sm text-muted-foreground">Rapid response to health emergencies</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-success mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Policy Evaluation</p>
                    <p className="text-sm text-muted-foreground">Track program effectiveness</p>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" asChild className="w-full">
                <Link to="/government-portal">Access Government Portal</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to secure your health future
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="gradient-primary rounded-full p-6 w-20 h-20 mx-auto">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">1. Get Your UHID</h3>
              <p className="text-muted-foreground">Link your health records to your National Identification Number (NIN)</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="gradient-primary rounded-full p-6 w-20 h-20 mx-auto">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">2. Access Your Records</h3>
              <p className="text-muted-foreground">View your complete medical history through patient portal or authorized providers</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="gradient-primary rounded-full p-6 w-20 h-20 mx-auto">
                <Globe className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold">3. Experience Unified Care</h3>
              <p className="text-muted-foreground">Seamless data sharing across Nigeria's healthcare ecosystem</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust */}
      <section id="security" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Security & Trust at the Core
              </h2>
              <p className="text-xl text-muted-foreground">
                Your health data is protected with enterprise-grade security and strict privacy controls.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Lock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">End-to-End Encryption</h4>
                    <p className="text-sm text-muted-foreground">Military-grade encryption</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Role-Based Access</h4>
                    <p className="text-sm text-muted-foreground">Strict permission controls</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <UserCheck className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Consent Management</h4>
                    <p className="text-sm text-muted-foreground">You control data sharing</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Audit Trail</h4>
                    <p className="text-sm text-muted-foreground">Complete access logging</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="shadow-strong">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="gradient-primary rounded-full p-3">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle>Secure Health Data</CardTitle>
                      <CardDescription>ISO 27001 & HIPAA Compliant</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Encryption</span>
                    <Badge variant="secondary">256-bit AES</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Access Control</span>
                    <Badge variant="secondary">Multi-Factor Auth</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Compliance</span>
                    <Badge variant="secondary">Federal Standards</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Partner with Us - Institutions */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are you a Healthcare Institution?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join Nigeria's leading digital health platform to enhance patient care, streamline operations, and contribute to national health initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Improve Data Accuracy</h4>
                <p className="text-sm text-muted-foreground">Enhanced interoperability across systems</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Reduce Overhead</h4>
                <p className="text-sm text-muted-foreground">Eliminate duplicate tests and paperwork</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Real-time Analytics</h4>
                <p className="text-sm text-muted-foreground">Make data-driven decisions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center hover:shadow-medium transition-shadow">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h4 className="font-semibold mb-2">National Compliance</h4>
                <p className="text-sm text-muted-foreground">Meet federal health standards</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="hero" asChild className="text-lg px-8 py-6">
              <Link to="/institution-registration">Learn More & Register Your Institution</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;