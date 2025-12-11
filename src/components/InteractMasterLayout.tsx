import { ReactNode, useState } from "react";
import { UniversalInbox } from "./UniversalInbox";
import { ContextBar } from "./ContextBar";
import { TenantSelector } from "./TenantSelector";
import { QuickSwitcher } from "./QuickSwitcher";
import { useOmniIntro } from "./OmniIntro";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

import { SyncStatusWidget } from "./SyncStatusWidget";
import { ProfileSettings } from "./ProfileSettings";
import { AINavigationOrb } from "./AINavigationOrb";
import { AiConsoleToggle } from "./AiConsoleToggle";
import { ThemeToggle } from "./ThemeToggle";
import { ConsoleNavigationMenu } from "./ConsoleNavigationMenu";
import { Bell, Search, Settings, Sparkles } from "lucide-react";



import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface InteractMasterLayoutProps {
  children: ReactNode;
  // Optional overrides if needed, but primarily use context
  activeCampaign?: {
    id: string;
    name: string;
    guid: string;
    workfrontId?: string;
  };
}

export function InteractMasterLayout({
  children,
  activeCampaign,
}: InteractMasterLayoutProps) {
  const { currentUser, currentRole, setCurrentRole } = useUser();

  const [inboxOpen, setInboxOpen] = useState(false);
  const [quickSwitcherOpen, setQuickSwitcherOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);
  const [consoleMenuOpen, setConsoleMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(12);

  // Local state for profile updates if needed, though context is source of truth
  const [userProfile, setUserProfile] = useState(currentUser);

  const { playIntro } = useOmniIntro();
  const navigate = useNavigate();

  const handleProfileSave = (updatedUser: any) => {
    setUserProfile({ ...userProfile, ...updatedUser });
  };

  const handleHomeClick = () => {
    navigate("/");
    playIntro();
  };

  return (
    <div className="h-screen flex flex-col bg-[#f5f7fa] dark:bg-[#0f1419]">
      {/* Global Header */}
      <header className="h-14 border-b bg-white dark:bg-[#1a1f2e] flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-1">
          {/* Hamburger Menu */}
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setConsoleMenuOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </Button>

          {/* Vertical Separator */}
          <div className="h-6 w-px bg-border"></div>

          {/* Home Link */}
          <Button
            variant="ghost"
            className="h-10 px-3 text-[18px] font-medium text-primary hover:bg-transparent hover:text-primary/80"
            onClick={handleHomeClick}
          >
            Home
          </Button>

          {/* Logo */}
          <a href="/" className="flex items-center gap-1 hover:opacity-80 transition-opacity mx-2">
            <span className="text-[18px] font-bold text-[#1e40af] dark:text-blue-400 tracking-tight">Omni</span>
            <Sparkles className="h-5 w-5 text-[#1e40af] dark:text-blue-400 fill-current" />
          </a>

          {/* Context Bar - Shows current campaign/project */}
          {activeCampaign && (
            <ContextBar campaign={activeCampaign} />
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Sync Status */}
          <SyncStatusWidget />

          {/* Quick Switcher - CMD+K */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuickSwitcherOpen(true)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {/* Universal Inbox */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setInboxOpen(!inboxOpen)}
            className="relative"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 min-w-5 p-0 flex items-center justify-center text-[10px]"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>

          {/* User Avatar */}
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2 ml-2 pl-2 border-l hover:bg-secondary/50 rounded-lg px-2 py-1 transition-colors"
          >
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="text-sm text-left">
              <div className="font-medium">{userProfile.name}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {/* @ts-ignore - role string manipulation */}
                {currentRole.replace("-", " ")}
              </div>
            </div>
          </button>
        </div>
      </header>

      {/* Console Navigation Menu */}
      <ConsoleNavigationMenu
        isOpen={consoleMenuOpen}
        onClose={() => setConsoleMenuOpen(false)}
        currentRole={currentRole}
        onRoleChange={setCurrentRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>

        {/* Right Sidebar - Universal Inbox */}
        {inboxOpen && (
          <UniversalInbox
            onClose={() => setInboxOpen(false)}
            onUnreadCountChange={setUnreadCount}
          />
        )}

      </div>

      {/* Quick Switcher Modal */}
      {quickSwitcherOpen && (
        <QuickSwitcher onClose={() => setQuickSwitcherOpen(false)} />
      )}

      {/* Profile Settings Modal */}
      <ProfileSettings
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        currentUser={{ ...userProfile, role: currentRole }}
        onSave={handleProfileSave}
      />

      {/* AI Navigation Orb */}
      <AINavigationOrb />

      {/* Real-time Connection Indicator */}
      <div className="fixed bottom-4 right-4 z-40">
        <div className="flex items-center gap-2 bg-white dark:bg-[#1a1f2e] border rounded-full px-3 py-1.5 shadow-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
    </div>
  );
}
