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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Heart, Shield, User, Download, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const patientSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  birthDate: z.string().min(1, "Birth date is required"),
  sex: z.enum(["Male", "Female", "Other"], { required_error: "Please select gender" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  hasAllergy: z.boolean().default(false),
  primaryAllergy: z.string().optional(),
  nin: z.string().min(11, "NIN must be 11 digits").max(11, "NIN must be 11 digits"),
  emergencyContact: z.string().min(1, "Emergency contact is required"),
  emergencyPhone: z.string().min(1, "Emergency phone is required"),
});

type PatientFormData = z.infer<typeof patientSchema>;

const PatientRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedUHID, setGeneratedUHID] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      hasAllergy: false,
    },
  });

  const watchHasAllergy = form.watch("hasAllergy");

  const copyUHID = () => {
    if (generatedUHID) {
      navigator.clipboard.writeText(generatedUHID);
      toast({
        title: "UHID Copied!",
        description: "Your UHID has been copied to clipboard.",
      });
    }
  };

  const downloadUHIDPDF = () => {
    const patientData = localStorage.getItem('patientData');
    if (patientData) {
      const data = JSON.parse(patientData);
      const pdfContent = `
        NIGERIA HEALTH CENTRAL DATABASE
        
        UNIQUE HEALTH ID (UHID) CERTIFICATE
        
        Patient Name: ${data.name}
        UHID: ${data.uhid}
        NIN: ${data.nin}
        Date Generated: ${data.dateGenerated}
        
        This UHID is your unique identifier in Nigeria's unified healthcare system.
        Keep this safe and use it for all medical consultations.
      `;
      
      const blob = new Blob([pdfContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `UHID-${data.uhid}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const onSubmit = async (data: PatientFormData) => {
    setIsSubmitting(true);
    try {
      // Check if NIN already exists
      const { data: existingPatient } = await supabase
        .from('patients')
        .select('uhid, first_name, last_name')
        .eq('nin', data.nin)
        .single();

      if (existingPatient) {
        toast({
          title: "NIN Already Registered",
          description: `This NIN is already registered to ${existingPatient.first_name} ${existingPatient.last_name}. Your UHID is: ${existingPatient.uhid}`,
          variant: "destructive",
        });
        setGeneratedUHID(existingPatient.uhid);
        return;
      }

      // Insert patient data into database
      const { data: patientData, error } = await supabase
        .from('patients')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          birth_date: data.birthDate,
          sex: data.sex,
          phone: data.phone || null,
          address: data.address || null,
          has_allergy: data.hasAllergy,
          primary_allergy: data.hasAllergy ? data.primaryAllergy : null,
          nin: data.nin,
          emergency_contact: data.emergencyContact,
          emergency_phone: data.emergencyPhone,
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      setGeneratedUHID(patientData.uhid);
      
      toast({
        title: "Registration Successful!",
        description: `Your UHID is: ${patientData.uhid}. Please save this for future logins.`,
        variant: "default",
      });

      // Store UHID for download
      localStorage.setItem('generatedUHID', patientData.uhid);
      localStorage.setItem('patientData', JSON.stringify({
        name: `${data.firstName} ${data.lastName}`,
        uhid: patientData.uhid,
        nin: data.nin,
        dateGenerated: new Date().toLocaleDateString()
      }));
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
                <Link to="/patient-login" className="flex items-center space-x-2">
                  <span>Already have a UHID? Login</span>
                </Link>
              </Button>
            </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="gradient-primary rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <User className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Patient Registration
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your Unique Health ID (UHID) and join Nigeria's unified healthcare system
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <Heart className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Unified Records</h3>
                <p className="text-sm text-muted-foreground">All your medical history in one place</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Enhanced Safety</h3>
                <p className="text-sm text-muted-foreground">Prevent medical errors with accurate data</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <User className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Easy Access</h3>
                <p className="text-sm text-muted-foreground">Access your records anytime, anywhere</p>
              </CardContent>
            </Card>
          </div>

          {/* Registration Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>
                Please provide accurate information to create your UHID. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your first name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your last name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Birth *</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sex"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender *</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="nin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>National Identification Number (NIN) *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your 11-digit NIN" maxLength={11} {...field} />
                          </FormControl>
                          <FormDescription>
                            Your NIN will be used to link your health records securely
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Contact Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+234 XXX XXX XXXX" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter your full address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Emergency Contact */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Emergency Contact</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="emergencyContact"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="Next of kin name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="emergencyPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Emergency Contact Phone *</FormLabel>
                            <FormControl>
                              <Input placeholder="+234 XXX XXX XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Medical Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="hasAllergy"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I have known allergies
                            </FormLabel>
                            <FormDescription>
                              Check this if you have any known allergies
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    {watchHasAllergy && (
                      <FormField
                        control={form.control}
                        name="primaryAllergy"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Allergy</FormLabel>
                            <FormControl>
                              <Input placeholder="Describe your primary allergy" {...field} />
                            </FormControl>
                            <FormDescription>
                              This information is critical for your safety during medical emergencies
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>

                  {/* UHID Display Section */}
                  {generatedUHID && (
                    <div className="bg-gradient-primary/10 border border-primary/20 rounded-lg p-6 space-y-4">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-primary mb-2">
                          Your UHID Has Been Generated!
                        </h3>
                        <div className="bg-white border-2 border-primary rounded-lg p-4 inline-block">
                          <p className="text-sm text-muted-foreground mb-1">Your Unique Health ID</p>
                          <p className="text-2xl font-bold text-primary tracking-wider">{generatedUHID}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 justify-center">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={copyUHID}
                          className="flex items-center gap-2"
                        >
                          <Copy className="h-4 w-4" />
                          Copy UHID
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={downloadUHIDPDF}
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download Certificate
                        </Button>
                      </div>
                      
                      <div className="text-center text-sm text-muted-foreground">
                        <p className="font-medium mb-1">Important:</p>
                        <p>Save your UHID safely. You'll need it to log into the patient portal and for all future medical consultations.</p>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting || generatedUHID !== null}
                    >
                      {isSubmitting ? "Processing..." : generatedUHID ? "Registration Complete" : "Register & Get My UHID"}
                    </Button>
                    
                    <p className="text-center text-sm text-muted-foreground mt-4">
                      By registering, you agree to our{" "}
                      <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
                      {" "}and{" "}
                      <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                    </p>
                    
                    <div className="text-center pt-4 border-t mt-4">
                      <p className="text-sm text-muted-foreground mb-2">Already have a UHID?</p>
                      <Link 
                        to="/patient-login" 
                        className="text-primary hover:underline font-medium"
                      >
                        Login to Patient Portal
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

export default PatientRegistration;