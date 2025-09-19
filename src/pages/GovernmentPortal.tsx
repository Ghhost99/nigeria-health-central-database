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
import { ArrowLeft, BarChart3, TrendingUp, Globe, Shield, FileText, Users } from "lucide-react";

const governmentSchema = z.object({
  organizationName: z.string().min(2, "Organization name must be at least 2 characters"),
  organizationType: z.string().min(1, "Please select organization type"),
  department: z.string().min(1, "Department/Unit is required"),
  contactPersonName: z.string().min(1, "Contact person name is required"),
  contactPersonTitle: z.string().min(1, "Contact person title is required"),
  contactPersonEmail: z.string().email("Valid email is required"),
  contactPersonPhone: z.string().min(1, "Contact person phone is required"),
  officialId: z.string().min(1, "Official ID number is required"),
  accessPurpose: z.string().min(10, "Please describe the purpose of access"),
  dataRequirements: z.string().min(10, "Please specify data requirements"),
  researchObjectives: z.string().optional(),
  ethicalApproval: z.string().optional(),
  timeframe: z.string().min(1, "Please specify timeframe"),
});

type GovernmentFormData = z.infer<typeof governmentSchema>;

const organizationTypes = [
  "Federal Ministry of Health",
  "State Ministry of Health",
  "Local Government Health Department",
  "Nigeria Centre for Disease Control (NCDC)",
  "National Primary Health Care Development Agency (NPHCDA)",
  "Nigerian Institute of Medical Research (NIMR)",
  "Federal Medical Centre",
  "Teaching Hospital",
  "Research Institution",
  "University/Academic Institution",
  "International Health Organization",
  "Non-Governmental Organization (NGO)",
  "Policy Think Tank",
  "Health Insurance Organization",
];

const GovernmentPortal = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<GovernmentFormData>({
    resolver: zodResolver(governmentSchema),
  });

  const onSubmit = async (data: GovernmentFormData) => {
    setIsSubmitting(true);
    try {
      // Here you would integrate with Supabase to save government access request data
      console.log("Government portal access request:", data);
      
      toast({
        title: "Access Request Submitted Successfully!",
        description: "Your request is under review. You'll receive an email confirmation and access credentials within 5-7 business days.",
        variant: "default",
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
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

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="gradient-primary rounded-full p-4 w-20 h-20 mx-auto mb-6">
              <BarChart3 className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Government & Research Portal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access Nigeria's health data for policy making, research, and public health initiatives
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Real-time Insights</h3>
                <p className="text-sm text-muted-foreground">Access live health data for informed decisions</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <Globe className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Epidemic Response</h3>
                <p className="text-sm text-muted-foreground">Rapid response to health emergencies</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Policy Evaluation</h3>
                <p className="text-sm text-muted-foreground">Track program effectiveness and outcomes</p>
              </CardContent>
            </Card>
          </div>

          {/* Access Features */}
          <Card className="mb-8 bg-accent/50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>What You Can Access</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4" />
                    <span>Analytics Dashboard</span>
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Disease surveillance and trends</li>
                    <li>• Geographic health mapping</li>
                    <li>• Population health indicators</li>
                    <li>• Healthcare utilization patterns</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Research Data</span>
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Anonymized patient data</li>
                    <li>• Clinical outcome statistics</li>
                    <li>• Treatment effectiveness data</li>
                    <li>• Public health research datasets</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Access Request Form */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Access Request Information</CardTitle>
              <CardDescription>
                All access requests are subject to review and approval. Please provide detailed information about your organization and intended use of the data.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Organization Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Organization Information</h3>
                    
                    <FormField
                      control={form.control}
                      name="organizationName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Organization Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Full organization name" {...field} />
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
                          <FormLabel>Organization Type *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select organization type" />
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
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department/Unit *</FormLabel>
                          <FormControl>
                            <Input placeholder="Specific department or unit within organization" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Primary Contact Person</h3>
                    
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
                              <Input placeholder="e.g., Director, Researcher, Policy Analyst" {...field} />
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
                            <FormLabel>Official Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="official@organization.gov.ng" {...field} />
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

                    <FormField
                      control={form.control}
                      name="officialId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Official ID Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Employee ID or Government ID number" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be verified with your organization
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Access Requirements */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Data Access Requirements</h3>
                    
                    <FormField
                      control={form.control}
                      name="accessPurpose"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Purpose of Data Access *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Describe the specific purpose for accessing health data (e.g., policy development, epidemic surveillance, research study, etc.)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dataRequirements"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Specific Data Requirements *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Specify what type of data you need (e.g., disease patterns, demographic data, treatment outcomes, geographic regions, etc.)" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="timeframe"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Access Timeframe *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select access duration" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="3-months">3 Months</SelectItem>
                              <SelectItem value="6-months">6 Months</SelectItem>
                              <SelectItem value="1-year">1 Year</SelectItem>
                              <SelectItem value="2-years">2 Years</SelectItem>
                              <SelectItem value="ongoing">Ongoing (Subject to annual review)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Research Specific (Optional) */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Research Information (If Applicable)</h3>
                    
                    <FormField
                      control={form.control}
                      name="researchObjectives"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Research Objectives</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="If this is for research purposes, please describe your research objectives and methodology" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Required only for research-based access requests
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ethicalApproval"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ethical Approval Reference</FormLabel>
                          <FormControl>
                            <Input placeholder="Ethics committee approval reference number (if applicable)" {...field} />
                          </FormControl>
                          <FormDescription>
                            Required for research involving human subjects data
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
                      {isSubmitting ? "Submitting Access Request..." : "Submit Access Request"}
                    </Button>
                    
                    <div className="text-center text-sm text-muted-foreground mt-4 space-y-2">
                      <p>
                        By submitting this request, you agree to our{" "}
                        <Link to="#" className="text-primary hover:underline">Data Use Agreement</Link>
                        {" "}and{" "}
                        <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                      </p>
                      <p className="font-medium">
                        All requests are subject to review and approval. You will receive a response within 5-7 business days.
                      </p>
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

export default GovernmentPortal;