import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AiConsoleModeProvider } from "@/context/AiConsoleModeContext";
import { UserProvider } from "@/context/UserContext";
import { OmniIntro } from "@/components/OmniIntro";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Events from "./pages/Events";
import BriefMapper from "./pages/BriefMapper";
import ResearchConsole from "./pages/ResearchConsole";
import ResearchConsoleDetail from "./pages/ResearchConsoleDetail";
import PlanDetail from "./pages/PlanDetail";
import AudienceConsole from "./pages/AudienceConsole";
import TaxonomyUnifier from "./pages/TaxonomyUnifier";
import ProjectModule from "./pages/ProjectModule";
import ProductionConsole from "./pages/ProductionConsole";
import ProofApproval from "./pages/ProofApproval";
import WorkflowConsole from "./pages/WorkflowConsole";
import ClientCentral from "./pages/ClientCentral";
import ClientDetail from "./pages/ClientDetail";
import MarketBriefDetail from "./pages/MarketBriefDetail";
import BuildAnalyzeAudiences from "./pages/BuildAnalyzeAudiences";
import AudienceDetail from "./pages/AudienceDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ui-blueprint-theme">
      <OmniIntro>
        <AiConsoleModeProvider>
          <UserProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter basename="/interact/">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/research-console" element={<ResearchConsole />} />
                  <Route path="/research-console/detail" element={<ResearchConsoleDetail />} />
                  <Route path="/briefs/:briefId/map" element={<BriefMapper />} />
                  <Route path="/plan" element={<PlanDetail />} />
                  <Route path="/audience-console" element={<AudienceConsole />} />
                  <Route path="/audience-console/build-analyze" element={<BuildAnalyzeAudiences />} />
                  <Route path="/audience-console/build-analyze/:audienceId" element={<AudienceDetail />} />
                  <Route path="/taxonomy-unifier" element={<TaxonomyUnifier />} />
                  <Route path="/project-module" element={<ProjectModule />} />
                  <Route path="/production-console" element={<ProductionConsole />} />
                  <Route path="/proof-approval" element={<ProofApproval />} />
                  <Route path="/workflow-console" element={<WorkflowConsole />} />
                  <Route path="/client-central" element={<ClientCentral />} />
                  <Route path="/client-central/:clientId" element={<ClientDetail />} />
                  <Route path="/client-central/:clientId/market-brief/:briefId" element={<MarketBriefDetail />} />

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </UserProvider>
        </AiConsoleModeProvider>
      </OmniIntro>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
