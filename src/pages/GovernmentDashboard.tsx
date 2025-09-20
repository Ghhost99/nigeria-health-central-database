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
  Shield, 
  BarChart, 
  TrendingUp, 
  Users, 
  Building2, 
  Calendar, 
  FileText, 
  Activity, 
  Settings, 
  LogOut,
  Download,
  Globe,
  Heart,
  AlertTriangle,
  Database,
  Search,
  MapPin,
  Clock,
  Pill,
  Microscope
} from "lucide-react";

interface GovernmentUserData {
  gov_user_id: number;
  employee_id: string;
  organization_name: string;
  organization_type: string;
  department?: string;
  official_email: string;
  government_id: string;
  contact_person_name: string;
  job_title: string;
  access_level: string;
  access_expiry?: string;
  created_at: string;
}

const GovernmentDashboard = () => {
  const [govUserData, setGovUserData] = useState<GovernmentUserData | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const currentGovUser = localStorage.getItem('currentGovernmentUser');
    if (!currentGovUser) {
      navigate('/government-login');
      return;
    }
    
    setGovUserData(JSON.parse(currentGovUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentGovernmentUser');
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  if (!govUserData) {
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
              <h1 className="text-3xl font-bold mb-2">{govUserData.organization_name}</h1>
              <div className="space-y-1 text-white/90 text-sm">
                <div className="flex items-center space-x-4">
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    {govUserData.contact_person_name} • {govUserData.job_title}
                  </span>
                  <Badge variant="secondary" className="text-primary">
                    {govUserData.employee_id}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span>{govUserData.department}</span>
                  {govUserData.access_expiry && (
                    <span className="text-xs">
                      Access valid until: {new Date(govUserData.access_expiry).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="secondary"
                size="sm"
                className="text-primary"
                asChild
              >
                <Link to="/government-settings">
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
        {/* Quick Stats Bar (KPIs) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Total Patients</p>
                  <p className="text-xl font-bold">0</p>
                </div>
                <Users className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Institutions</p>
                  <p className="text-xl font-bold">0</p>
                </div>
                <Building2 className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Appointments</p>
                  <p className="text-xl font-bold">0</p>
                </div>
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Top Conditions</p>
                  <p className="text-xl font-bold">5</p>
                </div>
                <Heart className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Prescriptions (30d)</p>
                  <p className="text-xl font-bold">0</p>
                </div>
                <Pill className="h-6 w-6 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Epidemiology & Disease Trends */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Disease Trends
              </CardTitle>
              <CardDescription>Epidemiological monitoring and outbreak detection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Malaria Cases</span>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-green-600">+5%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>TB Surveillance</span>
                  <Badge variant="outline">Stable</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Outbreak Alerts</span>
                  <Badge variant="destructive">0</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  View Heat Maps
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Outbreak Detection
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Healthcare Utilization */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-primary" />
                Healthcare Utilization
              </CardTitle>
              <CardDescription>Service usage across regions and facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Primary Care</span>
                  <Badge variant="outline">85%</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Specialist Care</span>
                  <Badge variant="outline">62%</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Emergency Services</span>
                  <Badge variant="outline">78%</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Regional Analysis
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Capacity vs Usage
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Population Health Insights */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-primary" />
                Population Health
              </CardTitle>
              <CardDescription>Demographics and health burden analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Diabetes Prevalence</span>
                  <Badge variant="outline">4.2%</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Hypertension</span>
                  <Badge variant="outline">23.1%</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Vaccination Coverage</span>
                  <Badge variant="outline">76%</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Age/Sex Distribution
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Chronic Disease Burden
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Prescription & Drug Usage */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2 text-primary" />
                Drug Monitoring
              </CardTitle>
              <CardDescription>Prescription patterns and controlled substances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Most Prescribed</span>
                  <Badge variant="outline">Antibiotics</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Regional Variations</span>
                  <Badge variant="outline">View</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Controlled Substances</span>
                  <Badge variant="outline">Monitor</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Drug Usage Patterns
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Abuse Prevention
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Institutional Performance */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-primary" />
                Institution Overview
              </CardTitle>
              <CardDescription>Healthcare facility performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Teaching Hospitals</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Primary Care Centers</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Data Quality Score</span>
                  <Badge variant="outline">--%</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Rural vs Urban Gaps
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Performance Metrics
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Research Data Access */}
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Microscope className="h-5 w-5 mr-2 text-primary" />
                Research Data
              </CardTitle>
              <CardDescription>Anonymized datasets for approved research</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span>Active Projects</span>
                  <Badge variant="outline">0</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Ethical Approvals</span>
                  <Badge variant="outline">Verified</Badge>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>Data Exports</span>
                  <Badge variant="outline">Available</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Datasets
                </Button>
                <Button variant="ghost" size="sm" className="w-full">
                  Project Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports & Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* National Health Indicators */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                National Health Indicators
              </CardTitle>
              <CardDescription>Key performance indicators aligned with SDGs and NHIA targets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Maternal Mortality Rate</p>
                    <p className="text-sm text-muted-foreground">Per 100,000 live births</p>
                  </div>
                  <Badge variant="outline">512</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Under-5 Mortality Rate</p>
                    <p className="text-sm text-muted-foreground">Per 1,000 live births</p>
                  </div>
                  <Badge variant="outline">132</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Health Insurance Coverage</p>
                    <p className="text-sm text-muted-foreground">% of population</p>
                  </div>
                  <Badge variant="outline">5.2%</Badge>
                </div>
                
                <Separator />
                
                <Button variant="outline" size="sm" className="w-full">
                  View Full Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Quality & System Health */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                System Performance
              </CardTitle>
              <CardDescription>Data quality metrics and system health monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Completeness</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded mr-2">
                      <div className="w-3/4 h-2 bg-green-500 rounded"></div>
                    </div>
                    <span className="text-sm">75%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Data Accuracy</span>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded mr-2">
                      <div className="w-4/5 h-2 bg-blue-500 rounded"></div>
                    </div>
                    <span className="text-sm">83%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">System Uptime</span>
                  <Badge variant="outline" className="text-green-600">99.9%</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Active Institutions</span>
                  <Badge variant="outline">0</Badge>
                </div>
                
                <Button variant="outline" size="sm" className="w-full">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Data Quality Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              System Activity & Alerts
            </CardTitle>
            <CardDescription>Recent system events and important notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">System Status</p>
                    <p className="text-sm text-muted-foreground">
                      All systems operational - Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <Badge variant="outline">Normal</Badge>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">Database Update</p>
                    <p className="text-sm text-muted-foreground">
                      Platform initialized - Ready for data collection
                    </p>
                  </div>
                </div>
                <Badge variant="outline">
                  {new Date().toLocaleDateString()}
                </Badge>
              </div>
              
              <div className="text-center text-muted-foreground py-8">
                <p>No additional system alerts at this time.</p>
                <p className="text-sm">Health data analytics will appear here as institutions begin using the system.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default GovernmentDashboard;