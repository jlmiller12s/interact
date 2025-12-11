import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { useUser } from "@/context/UserContext";
import { CustomizableProjectOwnerDashboard } from "@/components/dashboards/CustomizableProjectOwnerDashboard";
import { MyProjectsTable } from "@/components/MyProjectsTable";
import { CustomizableTaskOwnerDashboard } from "@/components/dashboards/CustomizableTaskOwnerDashboard";
import { ApproverDashboard } from "@/components/dashboards/ApproverDashboard";
import { EnhancedExecutiveDashboard } from "@/components/dashboards/EnhancedExecutiveDashboard";
import { CampaignManagerDashboard } from "@/components/dashboards/CampaignManagerDashboard";
import { PlanningView } from "@/components/PlanningView";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/components/NotificationItem";
import { DraggableWidget } from "@/components/DraggableWidget";
import { ArrowRight, BookOpen, GraduationCap, Box } from "lucide-react";
import { Link } from "react-router-dom";

type SectionId = "notifications-tasks" | "training-resources";

interface Section {
  id: SectionId;
}

const WORKFRONT_TASK_URL = "https://experience.adobe.com/#/@leappointptrsd/so:leappointptrsd-Production/workfront/issue/6914c0aa0004b8034f914b6e6b63fe85/overview";

const Index = () => {
  const [searchParams] = useSearchParams();
  const viewParam = searchParams.get("view");
  const { currentRole, setCurrentRole } = useUser();
  const [workfrontConnected, setWorkfrontConnected] = useState(false);
  const [sections, setSections] = useState<Section[]>([
    { id: "notifications-tasks" },
    { id: "training-resources" },
  ]);

  useEffect(() => {
    if (viewParam === "planning") {
      setCurrentRole("planning");
    }
  }, [viewParam, setCurrentRole]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderDashboard = () => {
    switch (currentRole) {
      case "planning":
        return <PlanningView />;
      case "project-owner":
        return <CustomizableProjectOwnerDashboard />;
      case "task-owner":
        return <CustomizableTaskOwnerDashboard />;
      case "campaign-manager":
        return <CampaignManagerDashboard />;
      case "approver":
        return <ApproverDashboard />;
      case "executive":
        return <EnhancedExecutiveDashboard />;
      default:
        return <CustomizableProjectOwnerDashboard />;
    }
  };

  const renderSection = (sectionId: SectionId) => {
    switch (sectionId) {
      case "notifications-tasks":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-muted-foreground mb-1">You are all caught up!</p>
                <p className="text-muted-foreground text-sm">There are no new notifications available.</p>
              </CardContent>
            </Card>

            <MyProjectsTable />
          </div>
        );
      case "training-resources":
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Training and Resource Center</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* User Guides */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:shadow-sm cursor-pointer transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded">
                    <BookOpen size={20} />
                  </div>
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">User Guides</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Academy */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:shadow-sm cursor-pointer transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded">
                    <GraduationCap size={20} />
                  </div>
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">Academy</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Product Resources */}
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:shadow-sm cursor-pointer transition-shadow group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded">
                    <Box size={20} />
                  </div>
                  <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">Product Resources</span>
                </div>
                <ArrowRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <InteractMasterLayout
      activeCampaign={{
        id: "camp_001",
        name: "Q4 Product Launch",
        guid: "550e8400-e29b-41d4-a716-446655440000",
        workfrontId: "WF-2025-Q4-001",
      }}
    >
      {currentRole === "planning" ? (
        <PlanningView />
      ) : (
        <main className={currentRole === "task-owner" ? "w-full" : "max-w-[1400px] mx-auto px-6 py-6"}>
          <div className={`flex items-center justify-between ${currentRole === "task-owner" ? "px-4 py-2 border-b bg-white" : "mb-6"}`}>
            <div>
              {currentRole !== "task-owner" && (
                <>
                  <h1 className="text-2xl font-semibold text-foreground mb-0.5">Welcome to Interact</h1>
                  <p className="text-sm text-muted-foreground">Manage your workflow and campaigns efficiently</p>
                </>
              )}
            </div>
          </div>

          {renderDashboard()}

          {/* Draggable Sections - Only show for project-owner, task-owner, and approver roles */}
          {(currentRole !== "executive" && currentRole !== "campaign-manager" && currentRole !== "task-owner") && (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="mt-6 space-y-6">
                  {sections.map((section) => (
                    <DraggableWidget key={section.id} id={section.id}>
                      {renderSection(section.id)}
                    </DraggableWidget>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </main>
      )}
    </InteractMasterLayout>
  );
};

export default Index;
