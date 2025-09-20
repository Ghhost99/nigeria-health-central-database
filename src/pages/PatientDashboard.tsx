import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  User, 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Shield, 
  Settings, 
  LogOut,
  QrCode,
  Bell,
  Download,
  Heart,
  AlertTriangle,
  Clock,
  Phone
} from "lucide-react";

interface PatientData {
  patient_id: number;
  uhid: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  sex: string;
  phone?: string;
  address?: string;
  has_allergy: boolean;
  primary_allergy?: string;
  nin: string;
  emergency_contact: string;
  emergency_phone: string;
  created_at: string;
}

const PatientDashboard = () => {
  const [patientData, setPatientData] = useState<PatientData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPatient = localStorage.getItem('currentPatient');
    if (!currentPatient) {
      navigate('/patient-login');
      return;
    }
    
    setPatientData(JSON.parse(currentPatient));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentPatient');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const downloadEmergencyCard = () => {
    if (!patientData) return;
    
    const emergencyInfo = `
      NIGERIA HEALTH EMERGENCY CARD
      
      Name: ${patientData.first_name} ${patientData.last_name}
      UHID: ${patientData.uhid}
      Blood Type: [Not recorded]
      ${patientData.has_allergy ? `ALLERGIES: ${patientData.primary_allergy}` : 'No known allergies'}
      
      Emergency Contact: ${patientData.emergency_contact}
      Emergency Phone: ${patientData.emergency_phone}
      
      Generated: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([emergencyInfo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Emergency-Card-${patientData.uhid}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!patientData) {
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
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {patientData.first_name}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <span className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  UHID: {patientData.uhid}
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={downloadEmergencyCard}
                  className="text-primary"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  Emergency Card
                </Button>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-primary"
                asChild
              >
                <Link to="/patient-profile">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile Settings
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
        {/* Emergency Info Quick View */}
        <Card className="mb-8 border-orange-200 bg-orange-50">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-orange-800">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Emergency Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-medium text-orange-900">Blood Type</p>
                <p className="text-orange-700">[Not recorded]</p>
              </div>
              <div>
                <p className="font-medium text-orange-900">Allergies</p>
                <p className="text-orange-700">
                  {patientData.has_allergy ? patientData.primary_allergy : "No known allergies"}
                </p>
              </div>
              <div>
                <p className="font-medium text-orange-900">Emergency Contact</p>
                <p className="text-orange-700">{patientData.emergency_contact}</p>
                <p className="text-orange-600 text-xs">{patientData.emergency_phone}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts/Notifications */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-blue-600" />
                  <span className="text-sm">Complete your health profile for better care</span>
                </div>
                <Button variant="outline" size="sm">Action</Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-yellow-600" />
                  <span className="text-sm">Missing allergy information - Please update</span>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Appointments */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                Appointments
              </CardTitle>
              <CardDescription>Manage your medical appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="text-sm text-muted-foreground">
                  <p>No upcoming appointments</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Book Appointment
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  View History
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
              <CardDescription>Current and past medications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="text-sm text-muted-foreground">
                  <p>No active prescriptions</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Prescriptions
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Medication History
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Lab Results */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-primary" />
                Lab Results
              </CardTitle>
              <CardDescription>Test results and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="text-sm text-muted-foreground">
                  <p>No recent lab results</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Results
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Download Reports
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Personal Health Record */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Heart className="h-5 w-5 mr-2 text-primary" />
                Health Record
              </CardTitle>
              <CardDescription>Personal health information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Allergies</span>
                  <Badge variant={patientData.has_allergy ? "destructive" : "secondary"}>
                    {patientData.has_allergy ? "Yes" : "None"}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Chronic Conditions</span>
                  <Badge variant="secondary">Not recorded</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Update Health Info
              </Button>
            </CardContent>
          </Card>

          {/* Imaging */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Medical Imaging
              </CardTitle>
              <CardDescription>X-rays, MRIs, and scans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="text-sm text-muted-foreground">
                  <p>No imaging records</p>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  View Images
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Download Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Consent */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                Privacy & Consent
              </CardTitle>
              <CardDescription>Manage data access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Access Logs</span>
                  <Badge variant="outline">View</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Permissions</span>
                  <Badge variant="outline">Manage</Badge>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your latest healthcare interactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Account Created</p>
                    <p className="text-sm text-muted-foreground">
                      UHID generated: {patientData.uhid}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {new Date(patientData.created_at).toLocaleDateString()}
                </Badge>
              </div>
              
              <div className="text-center text-muted-foreground py-8">
                <p>No additional healthcare activities recorded yet.</p>
                <p className="text-sm">Your medical consultations will appear here.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default PatientDashboard;