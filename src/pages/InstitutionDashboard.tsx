import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Settings, 
  LogOut,
  UserPlus,
  Search,
  BarChart,
  Bed,
  Stethoscope,
  MessageSquare,
  AlertCircle,
  Clock,
  TrendingUp,
  Download
} from "lucide-react";

interface InstitutionData {
  institution_id: number;
  name: string;
  type: string;
  address: string;
  contact?: string;
  email?: string;
  institution_code?: string;
  license_number?: string;
  license_expiry?: string;
  cac_number?: string;
  services_offered?: string[];
  bed_capacity?: number;
  status: string;
  created_at: string;
}

const InstitutionDashboard = () => {
  const [institutionData, setInstitutionData] = useState<InstitutionData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const currentInstitution = localStorage.getItem('currentInstitution');
    if (!currentInstitution) {
      navigate('/institution-login');
      return;
    }
    
    setInstitutionData(JSON.parse(currentInstitution));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentInstitution');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (!institutionData) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Dashboard Header */}
      <div className="bg-gradient-primary text-white py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0">
              <h1 className="text-3xl font-bold mb-2">{institutionData.name}</h1>
              <div className="flex items-center space-x-4 text-white/90 text-sm">
                <span className="flex items-center">
                  <Building2 className="h-4 w-4 mr-2" />
                  {institutionData.type}
                </span>
                <span className="flex items-center">
                  <Badge variant="secondary" className="text-primary">
                    {institutionData.institution_code}
                  </Badge>
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-primary"
                asChild
              >
                <Link to="/institution-profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-white/20 text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Patients Registered</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Appointments Today</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Lab Tests Pending</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <FileText className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Prescriptions Issued</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <Pill className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Patient Management */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                Patient Management
              </CardTitle>
              <CardDescription>Register and manage patient records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by UHID/NIN"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="default" size="sm" className="w-full">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register New Patient
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  View All Patients
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Update Records
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Staff Management */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Stethoscope className="h-5 w-5 mr-2 text-primary" />
                Staff Management
              </CardTitle>
              <CardDescription>Manage healthcare professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Doctors</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Nurses</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Lab Technicians</span>
                  <Badge variant="outline">0</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Add Staff Member
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Manage Staff
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appointments */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Appointments
              </CardTitle>
              <CardDescription>Schedule and manage appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="text-sm text-muted-foreground">
                  <p>No appointments scheduled for today</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Schedule Appointment
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  View Calendar
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Track No-shows
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lab & Diagnostics */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Lab & Diagnostics
              </CardTitle>
              <CardDescription>Manage test results and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Pending Results</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Completed Today</span>
                  <Badge variant="outline">0</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Upload Results
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  View Reports
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Track Turnaround
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prescriptions */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2 text-primary" />
                Prescriptions
              </CardTitle>
              <CardDescription>Issue and monitor medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Issued Today</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Drug Alerts</span>
                  <Badge variant="outline">0</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Issue Prescription
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Monitor Dispensing
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Allergy Checks
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Institution Network */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                Institution Network
              </CardTitle>
              <CardDescription>Connect with other healthcare institutions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Network Institutions</span>
                  <Badge variant="outline">View</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Unread Messages</span>
                  <Badge variant="outline">0</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Browse Network
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Message Inbox
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services & Capacity + Analytics Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Services & Capacity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bed className="h-5 w-5 mr-2" />
                Services & Capacity
              </CardTitle>
              <CardDescription>Current facility status and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {institutionData.bed_capacity && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Bed Capacity</span>
                    <div className="text-right">
                      <p className="font-bold">{institutionData.bed_capacity}</p>
                      <p className="text-sm text-muted-foreground">Available: {institutionData.bed_capacity}</p>
                    </div>
                  </div>
                )}
                
                <Separator />
                
                <div>
                  <p className="text-sm font-medium mb-2">Services Offered</p>
                  <div className="flex flex-wrap gap-2">
                    {institutionData.services_offered?.map((service, index) => (
                      <Badge key={index} variant="secondary">{service}</Badge>
                    )) || <p className="text-sm text-muted-foreground">No services listed</p>}
                  </div>
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  Update Services
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics & Reports */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Analytics & Reports
              </CardTitle>
              <CardDescription>Performance insights and data exports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
                    <span className="text-sm">Patient Flow Trend</span>
                  </div>
                  <Badge variant="outline">View</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm">Service Utilization</span>
                  </div>
                  <Badge variant="outline">View</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-2 text-purple-600" />
                    <span className="text-sm">Monthly Reports</span>
                  </div>
                  <Badge variant="outline">Export</Badge>
                </div>
                
                <Separator />
                
                <Button variant="outline" size="sm" className="w-full">
                  Generate Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Institution Profile & Compliance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              Institution Profile & Compliance
            </CardTitle>
            <CardDescription>License status and institutional information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">License Number</p>
                <p className="font-medium">{institutionData.license_number || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">License Expiry</p>
                <div className="flex items-center">
                  <p className="font-medium">{institutionData.license_expiry || "Not provided"}</p>
                  {institutionData.license_expiry && (
                    <Badge variant="outline" className="ml-2">Valid</Badge>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">CAC Number</p>
                <p className="font-medium">{institutionData.cac_number || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Registration Status</p>
                <Badge variant={institutionData.status === 'approved' ? 'default' : 'secondary'}>
                  {institutionData.status}
                </Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Contact</p>
                <p className="font-medium">{institutionData.contact || "Not provided"}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Registration Date</p>
                <p className="font-medium">{new Date(institutionData.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" size="sm">
                Update Institution Details
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default InstitutionDashboard;