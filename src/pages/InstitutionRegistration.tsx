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
import { ArrowLeft, Building2, CheckCircle, Clock, BarChart3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const institutionSchema = z.object({
  name: z.string().min(2, "Institution name must be at least 2 characters"),
  type: z.string().min(1, "Please select institution type"),
  address: z.string().min(10, "Please provide a detailed address"),
  contact: z.string().optional(),
  registrationNumber: z.string().min(1, "Registration number is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  contactPersonName: z.string().min(1, "Contact person name is required"),
  contactPersonTitle: z.string().min(1, "Contact person title is required"),
  contactPersonEmail: z.string().email("Valid email is required"),
  contactPersonPhone: z.string().min(1, "Contact person phone is required"),
  servicesOffered: z.string().min(10, "Please describe services offered"),
  capacity: z.string().optional(),
});

type InstitutionFormData = z.infer<typeof institutionSchema>;

const institutionTypes = [
  "Teaching Hospital",
  "General Hospital",
  "Federal Medical Center",
  "Specialist Hospital",
  "Psychiatric Hospital",
  "Orthopaedic Hospital",
  "District Hospital",
  "Mission Hospital",
  "Private Hospital",
  "Primary Health Center",
  "Community Health Center",
  "Laboratory",
  "Radiological Center",
  "Pharmacy",
  "Dental Clinic",
  "Eye Clinic",
  "Maternity Home",
  "Diagnostic Center",
];

const InstitutionRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InstitutionFormData>({
    resolver: zodResolver(institutionSchema),
  });

  const onSubmit = async (data: InstitutionFormData) => {
    setIsSubmitting(true);
    try {
      // Insert institution data into database
      const { data: institutionData, error } = await supabase
        .from('institutions')
        .insert({
          name: data.name,
          type: data.type,
          address: data.address,
          contact: data.contact || null,
          cac_number: data.registrationNumber,
          license_number: data.licenseNumber,
          services_offered: [data.servicesOffered],
          bed_capacity: data.capacity ? parseInt(data.capacity) : null,
          email: data.contactPersonEmail,
          status: 'pending',
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Registration Submitted Successfully!",
        description: `Institution ID: ${institutionData.institution_id}. You'll receive an email confirmation within 2-3 business days.`,
        variant: "default",
      });
      
      // Store institution data for potential login
      localStorage.setItem('institutionId', institutionData.institution_id.toString());
      
      // Reset form after successful submission
      form.reset();
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration Failed",
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
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/institution-login" className="flex items-center space-x-2">
                <span>Already registered? Login</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="gradient-primary rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <Building2 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Healthcare Institution Registration
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join Nigeria's leading digital health platform to enhance patient care and streamline operations
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <CheckCircle className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Seamless Integration</h3>
                <p className="text-sm text-muted-foreground">Connect with national health network</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Clock className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Reduced Burden</h3>
                <p className="text-sm text-muted-foreground">Standardized data management</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Enhanced Efficiency</h3>
                <p className="text-sm text-muted-foreground">Real-time analytics and insights</p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Process Info */}
          <Card className="mb-8 bg-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Building2 className="h-5 w-5" />
                <span>Registration Process</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">1</div>
                  <div>
                    <p className="font-medium">Complete Registration</p>
                    <p className="text-muted-foreground">Fill out the detailed form below</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">2</div>
                  <div>
                    <p className="font-medium">Document Verification</p>
                    <p className="text-muted-foreground">We verify your licenses and credentials</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">3</div>
                  <div>
                    <p className="font-medium">System Onboarding</p>
                    <p className="text-muted-foreground">Technical setup and training</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Registration Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Institution Information</CardTitle>
              <CardDescription>
                Please provide accurate information about your healthcare institution. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Institution Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Institution Details</h3>
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter full institution name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select institution type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {institutionTypes.map((type) => (
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
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Address *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter complete address including state and local government area" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+234 XXX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Legal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Legal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="registrationNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>CAC Registration Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Corporate Affairs Commission number" {...field} />
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
                            <FormLabel>Healthcare License Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="Federal/State healthcare license" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Authorized Contact Person</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPersonName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Contact person's full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPersonTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g., Chief Medical Director, Administrator" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="contactPersonEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="contact@institution.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="contactPersonPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+234 XXX XXX XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Services Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Services & Capacity</h3>
                    
                    <FormField
                      control={form.control}
                      name="servicesOffered"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Services Offered *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the medical services your institution provides (e.g., general medicine, surgery, emergency care, laboratory services, etc.)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            This helps us understand your institution's capabilities for better integration
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="capacity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bed Capacity (if applicable)</FormLabel>
                          <FormControl>
                            <Input placeholder="Number of beds available" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            For hospitals and clinics with inpatient services
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
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
                      {isSubmitting ? "Submitting Registration..." : "Submit Institution Registration"}
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      By registering, you agree to our{" "}
                      <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                      . You will receive a confirmation email within 2-3 business days.
                    </p>
                    
                    <div className="text-center pt-4 border-t mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Already registered?</p>
                      <Link 
                        to="/institution-login" 
                        className="text-primary hover:underline font-medium"
                      >
                        Login to Institution Portal
                      </Link>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default InstitutionRegistration;