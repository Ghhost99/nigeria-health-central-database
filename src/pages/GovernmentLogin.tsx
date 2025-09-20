import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  organizationType: z.string().min(1, "Organization type is required"),
  department: z.string().min(1, "Department is required"),
  officialEmail: z.string().email("Valid email is required"),
  governmentId: z.string().min(6, "Government ID must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const GovernmentLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGovId, setShowGovId] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      // Find government user by employee_id and official_email
      const { data: govUserData, error } = await supabase
        .from('government_users')
        .select('*')
        .eq('employee_id', data.employeeId)
        .eq('official_email', data.officialEmail)
        .single();

      if (error || !govUserData) {
        throw new Error("Invalid credentials. Please verify your Employee ID and Official Email.");
      }

      // Check if access is still valid
      if (govUserData.access_expiry && new Date(govUserData.access_expiry) < new Date()) {
        throw new Error("Your access has expired. Please contact your administrator.");
      }

      // Store government user data in localStorage for session
      localStorage.setItem('currentGovernmentUser', JSON.stringify(govUserData));
      
      toast({
        title: "Login Successful!",
        description: `Welcome, ${govUserData.contact_person_name}`,
      });

      // Navigate to government dashboard
      navigate('/government-dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials and try again.",
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
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
        </div>

        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="gradient-primary rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Government Access Portal</h1>
            <p className="text-muted-foreground mb-1">
              Nigeria Health Central Database
            </p>
            <p className="text-sm text-muted-foreground">
              Secure, role-based access to national health intelligence
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Government & Research Access</CardTitle>
              <CardDescription>
                Secure login for authorized government personnel and researchers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="employeeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employee ID</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Employee ID"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="organizationType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="federal_ministry">Federal Ministry of Health</SelectItem>
                              <SelectItem value="state_ministry">State Ministry of Health</SelectItem>
                              <SelectItem value="lga">Local Government Area</SelectItem>
                              <SelectItem value="nhia">NHIA</SelectItem>
                              <SelectItem value="ncdc">NCDC</SelectItem>
                              <SelectItem value="research_institution">Research Institution</SelectItem>
                              <SelectItem value="university">University</SelectItem>
                              <SelectItem value="who">WHO Nigeria</SelectItem>
                              <SelectItem value="other">Other Government Agency</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department/Unit</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Epidemiology, Health Planning, Research"
                            {...field}
                          />
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
                        <FormLabel>Official Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your.name@ministry.gov.ng"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="governmentId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Government ID</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showGovId ? "text" : "password"}
                              placeholder="Enter your Government ID"
                              className="pr-10"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowGovId(!showGovId)}
                          >
                            {showGovId ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Authenticating..." : "Secure Login"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Don't have access?{" "}
                  <Link to="/government-registration" className="text-primary hover:underline font-medium">
                    Request access
                  </Link>
                </div>
                
                <div className="text-sm">
                  <Link to="#" className="text-primary hover:underline">
                    Need Help?
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start">
              <Shield className="h-5 w-5 text-amber-600 mr-2 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 mb-1">Security Notice</p>
                <p className="text-amber-700">
                  This system is for authorized government personnel only. All access is logged and monitored.
                  Unauthorized access is prohibited and may result in legal action.
                </p>
              </div>
            </div>
          </div>

          {/* MFA Notice */}
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>🔐 Two-factor authentication available for enhanced security</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default GovernmentLogin;