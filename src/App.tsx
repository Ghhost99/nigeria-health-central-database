import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PatientRegistration from "./pages/PatientRegistration";
import PatientLogin from "./pages/PatientLogin";
import PatientDashboard from "./pages/PatientDashboard";
import InstitutionRegistration from "./pages/InstitutionRegistration";
import InstitutionLogin from "./pages/InstitutionLogin";
import InstitutionDashboard from "./pages/InstitutionDashboard";
import GovernmentPortal from "./pages/GovernmentPortal";
import GovernmentRegistration from "./pages/GovernmentRegistration";
import GovernmentLogin from "./pages/GovernmentLogin";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/institution-registration" element={<InstitutionRegistration />} />
          <Route path="/institution-login" element={<InstitutionLogin />} />
          <Route path="/institution-dashboard" element={<InstitutionDashboard />} />
          <Route path="/government-portal" element={<GovernmentPortal />} />
          <Route path="/government-registration" element={<GovernmentRegistration />} />
          <Route path="/government-login" element={<GovernmentLogin />} />
          <Route path="/government-dashboard" element={<GovernmentDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
