import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Users, FileText, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const governmentSchema = z.object({
  organizationType: z.string().min(1, "Organization type is required"),
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  department: z.string().min(2, "Department is required"),
  contactPersonName: z.string().min(2, "Contact person name is required"),
  jobTitle: z.string().min(2, "Job title is required"),
  employeeId: z.string().min(1, "Employee ID is required"),
  officialEmail: z.string().email("Valid email is required"),
  governmentId: z.string().min(6, "Government ID must be at least 6 characters"),
  accessLevel: z.string().min(1, "Access level is required"),
  justification: z.string().min(20, "Please provide detailed justification (minimum 20 characters)"),
});

type GovernmentFormData = z.infer<typeof governmentSchema>;

const organizationTypes = [
  "Federal Ministry of Health",
  "State Ministry of Health", 
  "Local Government Area",
  "NHIA",
  "NCDC",
  "Research Institution",
  "University",
  "WHO Nigeria",
  "Other Government Agency",
];

const accessLevels = [
  "read_only",
  "analytics",
  "epidemiological",
  "research",
  "policy_making",
];

const GovernmentRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<GovernmentFormData>({
    resolver: zodResolver(governmentSchema),
  });

  const onSubmit = async (data: GovernmentFormData) => {
    setIsSubmitting(true);
    try {
      // Insert government user data into database
      const { data: govUserData, error } = await supabase
        .from('government_users')
        .insert({
          organization_type: data.organizationType,
          organization_name: data.organizationName,
          department: data.department,
          contact_person_name: data.contactPersonName,
          job_title: data.jobTitle,
          employee_id: data.employeeId,
          official_email: data.officialEmail,
          government_id: data.governmentId,
          access_level: data.accessLevel,
          access_expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Access Request Submitted!",
        description: `Request ID: ${govUserData.gov_user_id}. Your request will be reviewed by security personnel within 5-7 business days.`,
        variant: "default",
      });
      
      // Store government user ID for potential reference
      localStorage.setItem('govUserId', govUserData.gov_user_id.toString());
      
      // Reset form after successful submission
      form.reset();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Request Submission Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Navigation */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link to="/government-portal" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Government Portal</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="gradient-primary rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Government Access Request
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Request secure access to Nigeria's Central Health Database for authorized government personnel
            </p>
          </div>

          {/* Security Notice */}
          <Card className="mb-8 border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-amber-800">
                <AlertTriangle className="h-5 w-5" />
                <span>Security Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-amber-700">
              <ul className="space-y-2 text-sm">
                <li>• All access requests undergo rigorous security verification</li>
                <li>• Government-issued identification is required</li>
                <li>• Access is granted based on legitimate government business needs</li>
                <li>• All system access is logged and monitored</li>
                <li>• Misuse of access privileges may result in legal action</li>
              </ul>
            </CardContent>
          </Card>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Secure Access</h3>
                <p className="text-sm text-muted-foreground">Role-based permissions and encrypted data</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Population Health</h3>
                <p className="text-sm text-muted-foreground">National health trends and analytics</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Policy Support</h3>
                <p className="text-sm text-muted-foreground">Evidence-based policy making</p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Government Access Request Form</CardTitle>
              <CardDescription>
                Complete this form to request access to Nigeria's Central Health Database. All fields are mandatory and will be verified.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Organization Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Organization Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="organizationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select your organization type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {organizationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full official organization name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department/Unit *</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Epidemiology, Health Planning, Research Division" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPersonName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="Your official job title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="employeeId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Employee ID *</FormLabel>
                            <FormControl>
                              <Input placeholder="Government employee ID" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="officialEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Official Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.name@ministry.gov.ng" {...field} />
                            </FormControl>
                            <FormDescription>
                              Must be an official government email address
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="governmentId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Government ID Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your government identification number" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be verified during the security clearance process
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Access Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Access Requirements</h3>
                    
                    <FormField
                      control={form.control}
                      name="accessLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Requested Access Level *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select required access level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="read_only">Read Only - Basic health statistics</SelectItem>
                              <SelectItem value="analytics">Analytics - Health trends and patterns</SelectItem>
                              <SelectItem value="epidemiological">Epidemiological - Disease surveillance data</SelectItem>
                              <SelectItem value="research">Research - Anonymized research datasets</SelectItem>
                              <SelectItem value="policy_making">Policy Making - Comprehensive health intelligence</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="justification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Justification for Access *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Provide detailed justification for why you need access to the health database, including specific use cases and how it relates to your official duties"
                              className="min-h-[120px]"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Be specific about your government duties and how database access will support them
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <h4 className="font-semibold">Terms and Conditions</h4>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <p>By submitting this request, I acknowledge that:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>All information provided is accurate and will be verified</li>
                        <li>Access will be granted only for legitimate government business</li>
                        <li>I will comply with all data protection and security protocols</li>
                        <li>Unauthorized use or sharing of data is prohibited</li>
                        <li>My access and activities will be monitored and logged</li>
                        <li>Access can be revoked at any time for policy violations</li>
                      </ul>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting Request..." : "Submit Access Request"}
                    </Button>
                  </div>
                </form>
              </Form>

              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Already have access?{" "}
                  <Link to="/government-login" className="text-primary hover:underline font-medium">
                    Login here
                  </Link>
                </div>
                
                <div className="text-sm">
                  <Link to="#" className="text-primary hover:underline">
                    Contact Security Administrator
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Processing Timeline */}
          <Card className="mt-8 bg-accent/50">
            <CardHeader>
              <CardTitle>Processing Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mx-auto mb-2">1</div>
                  <p className="font-medium">Request Submitted</p>
                  <p className="text-muted-foreground">Immediate</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mx-auto mb-2">2</div>
                  <p className="font-medium">Initial Review</p>
                  <p className="text-muted-foreground">1-2 days</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mx-auto mb-2">3</div>
                  <p className="font-medium">Security Clearance</p>
                  <p className="text-muted-foreground">3-5 days</p>
                </div>
                <div className="text-center">
                  <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold mx-auto mb-2">4</div>
                  <p className="font-medium">Access Granted</p>
                  <p className="text-muted-foreground">Upon approval</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GovernmentRegistration;