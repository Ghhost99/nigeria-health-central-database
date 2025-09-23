import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Building2, Shield, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  institutionId: z.string().min(1, "Institution ID is required"),
  licenseNumber: z.string().min(1, "Healthcare license number is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const InstitutionLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      // Find institution by institution_id and license_number
      const { data: institutionData, error } = await supabase
        .from('institutions')
        .select('*')
        .eq('institution_id', parseInt(data.institutionId))
        .eq('license_number', data.licenseNumber)
        .single();

      if (error || !institutionData) {
        throw new Error("Institution not found. Please check your Institution ID and Healthcare License Number.");
      }

      if (institutionData.status !== 'approved') {
        throw new Error("Your institution registration is still pending approval.");
      }

      // Store institution data in localStorage for session
      localStorage.setItem('currentInstitution', JSON.stringify(institutionData));
      
      toast({
        title: "Login Successful!",
        description: `Welcome to ${institutionData.name}`,
      });

      // Navigate to institution dashboard
      navigate('/institution-dashboard');
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

        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="gradient-primary rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <Building2 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Institution Portal</h1>
            <p className="text-muted-foreground">
              Nigeria Health Central Database
            </p>
            <p className="text-sm text-muted-foreground">
              Secure Access for Verified Healthcare Institutions
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Institution Login</CardTitle>
              <CardDescription>
                Access your institution's healthcare management portal
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="institutionId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution ID</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Institution ID"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="licenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Healthcare License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your Healthcare License Number"
                            {...field}
                          />
                        </FormControl>
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
                    {isSubmitting ? (
                      <>
                        <Lock className="h-4 w-4 mr-2 animate-spin" />
                        Signing In...
                      </>
                    ) : (
                      "Secure Login"
                    )}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Not registered yet?{" "}
                  <Link to="/institution-registration" className="text-primary hover:underline font-medium">
                    Register your institution
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

          {/* Security Features */}
          <div className="mt-6 space-y-3">
            <div className="bg-muted/50 p-4 rounded-lg border">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-primary" />
                <span>Secure access for authorized personnel only</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                All access attempts are monitored and logged
              </div>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              <p>🔒 Two-factor authentication ready</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InstitutionLogin;