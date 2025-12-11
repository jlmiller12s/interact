import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { MyProjectsTable } from "@/components/MyProjectsTable";


const AudienceConsole = () => {
  return (
    <InteractMasterLayout

      activeCampaign={{
        id: "camp_001",
        name: "Q4 Product Launch",
        guid: "550e8400-e29b-41d4-a716-446655440000",
        workfrontId: "WF-2025-Q4-001",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>&gt;</span>
          <span className="font-medium text-foreground">Audience Console</span>
        </div>

        {/* Top Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Link to="/audience-console/build-analyze">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group h-full">
              <CardContent className="p-4 flex items-center justify-between h-full">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">Build & Analyze Audiences</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Card className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckSquare className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                <span className="font-medium">Access Audience Sandbox</span>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Notifications Section */}
          <Card className="h-[500px]">
            <CardContent className="p-6 h-full flex flex-col">
              <h2 className="text-xl font-semibold text-[#1e293b] mb-4">Notifications</h2>
              <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground">
                <p className="mb-1">You are all caught up!</p>
                <p>There are no new notifications available.</p>
              </div>
            </CardContent>
          </Card>

          {/* Tasks Section - Replaced with My Projects */}
          <div className="h-[500px]">
            <MyProjectsTable />
          </div>

        </div>

        {/* Training and Resource Center */}
        <div>
          <h2 className="text-xl font-semibold text-[#1e293b] mb-4">Training and Resource Center</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-medium">User Guides</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-medium">Academy</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <span className="font-medium">Product Resources</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </InteractMasterLayout>
  );
};

export default AudienceConsole;
