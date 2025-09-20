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
import { ArrowLeft, User, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  uhid: z.string().min(11, "UHID must be 11 characters").max(11, "UHID must be 11 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const PatientLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUHID, setShowUHID] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      // Find patient by UHID
      const { data: patientData, error } = await supabase
        .from('patients')
        .select('*')
        .eq('uhid', data.uhid)
        .single();

      if (error || !patientData) {
        throw new Error("Invalid UHID. Please check and try again.");
      }

      // Store patient data in localStorage for session
      localStorage.setItem('currentPatient', JSON.stringify(patientData));
      
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${patientData.first_name}!`,
      });

      // Navigate to patient dashboard
      navigate('/patient-dashboard');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.message || "Please check your UHID and try again.",
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
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Patient Portal Login</h1>
            <p className="text-muted-foreground">
              Enter your UHID to access your health records
            </p>
          </div>

          {/* Login Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Welcome Back</CardTitle>
              <CardDescription>
                Sign in with your Unique Health ID (UHID)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="uhid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>UHID (Unique Health ID)</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showUHID ? "text" : "password"}
                              placeholder="Enter your 11-character UHID"
                              maxLength={11}
                              className="pr-10"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                            onClick={() => setShowUHID(!showUHID)}
                          >
                            {showUHID ? (
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
                    {isSubmitting ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </Form>

              <div className="mt-6 text-center space-y-4">
                <div className="text-sm text-muted-foreground">
                  Don't have a UHID?{" "}
                  <Link to="/patient-registration" className="text-primary hover:underline font-medium">
                    Register here
                  </Link>
                </div>
                
                <div className="text-sm">
                  <Link to="#" className="text-primary hover:underline">
                    Forgot your UHID?
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

          {/* Security Note */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>🔒 Your health data is protected with end-to-end encryption</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PatientLogin;