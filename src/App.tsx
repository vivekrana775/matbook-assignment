import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import WorkflowBuilder from "./pages/WorkflowBuilder";
import NotFound from "./pages/NotFound";
import Workflow from "./pages/WorkflowCreator";
import { WorkflowsProvider } from "./context/WorkflowsContext"; // ✅ Import context
import SignIn from "./pages/SignIn";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WorkflowsProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/signup" element={<SignIn />} />
            <Route path="/workflow-builder" element={<WorkflowBuilder />} />
            <Route path="/workflow-creator" element={<Workflow />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </WorkflowsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
