import { useState, useEffect } from "react";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {
    Briefcase,
    Calendar,
    Users,
    MoreHorizontal,
    Search,
    Filter,
    Plus,
    Clock,
    Check,
    X,
    Layers
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { Toggle } from "@/components/ui/toggle";

interface Project {
    id: string;
    name: string;
    owner: string;
    status: "Active" | "Planning" | "On Hold" | "Completed";
    startDate: string;
    dueDate: string;
    progress: number;
    description: string;
    hoursLogged: number;
    totalHours: number;
    teamMembers: string[];
}

const dummyProjects: Project[] = [
    {
        id: "PRJ-001",
        name: "Q4 Global Product Launch",
        owner: "Rob Lawrence (LeapPoint)",
        status: "Active",
        startDate: "2025-10-01",
        dueDate: "2025-12-15",
        progress: 65,
        description: "Comprehensive launch campaign for the new Q4 product line across all global markets. Includes digital, print, and experiential activations.",
        hoursLogged: 120,
        totalHours: 200,
        teamMembers: ["Rob Lawrence (LeapPoint)", "Stephen Tierney (LeapPoint)", "Alexander Stratford (LeapPoint)"],
    },
    {
        id: "PRJ-002",
        name: "Holiday Marketing Campaign 2025",
        owner: "Stephen Tierney (LeapPoint)",
        status: "Planning",
        startDate: "2025-09-15",
        dueDate: "2025-11-30",
        progress: 25,
        description: "Strategic planning and asset creation for the 2025 holiday season. Focus on customer retention and loyalty offers.",
        hoursLogged: 45,
        totalHours: 150,
        teamMembers: ["Stephen Tierney (LeapPoint)", "Brian Mauger (LeapPoint)"],
    },
    {
        id: "PRJ-003",
        name: "Brand Refresh Initiative",
        owner: "Alexander Stratford (LeapPoint)",
        status: "Active",
        startDate: "2025-08-01",
        dueDate: "2026-01-30",
        progress: 40,
        description: "Updating brand visual identity and tone of voice across all customer touchpoints. Requires coordination with design and content teams.",
        hoursLogged: 310,
        totalHours: 300, // Over budget
        teamMembers: ["Alexander Stratford (LeapPoint)", "Joel Caracci (LeapPoint)", "Jimmie Miller (LeapPoint)"],
    },
    {
        id: "PRJ-004",
        name: "Social Media Expansion",
        owner: "Brian Mauger (LeapPoint)",
        status: "On Hold",
        startDate: "2025-11-01",
        dueDate: "2026-03-15",
        progress: 10,
        description: "Expanding social media presence to new platforms (TikTok, Threads). Currently paused pending budget approval.",
        hoursLogged: 15,
        totalHours: 100,
        teamMembers: ["Brian Mauger (LeapPoint)", "Timothy Higgins (LeapPoint)"],
    },
    {
        id: "PRJ-005",
        name: "Customer Loyalty Program Revamp",
        owner: "Joel Caracci (LeapPoint)",
        status: "Completed",
        startDate: "2025-06-01",
        dueDate: "2025-09-30",
        progress: 100,
        description: "Complete overhaul of the rewards program tier structure and benefits. Successfully launched on time.",
        hoursLogged: 195,
        totalHours: 200,
        teamMembers: ["Joel Caracci (LeapPoint)", "David Cornwell (LeapPoint)"],
    },
    {
        id: "PRJ-006",
        name: "AI Content Generation Pilot",
        owner: "Jimmie Miller (LeapPoint)",
        status: "Active",
        startDate: "2025-11-15",
        dueDate: "2026-02-28",
        progress: 30,
        description: "Pilot program to test AI tools for generating marketing copy and visual assets. Aiming to reduce production time by 40%.",
        hoursLogged: 60,
        totalHours: 120,
        teamMembers: ["Jimmie Miller (LeapPoint)", "Laura Anderson (LeapPoint)", "Rob Lawrence (LeapPoint)"],
    },
    {
        id: "PRJ-007",
        name: "Mobile App UX Redesign",
        owner: "Timothy Higgins (LeapPoint)",
        status: "Planning",
        startDate: "2026-01-10",
        dueDate: "2026-06-30",
        progress: 5,
        description: "Complete redesign of the mobile app user experience to improve engagement and conversion rates.",
        hoursLogged: 10,
        totalHours: 400,
        teamMembers: ["Timothy Higgins (LeapPoint)", "Jennifer Krempa (LeapPoint)"],
    },
    {
        id: "PRJ-008",
        name: "Data Analytics Platform Migration",
        owner: "David Cornwell (LeapPoint)",
        status: "Active",
        startDate: "2025-10-20",
        dueDate: "2026-04-15",
        progress: 55,
        description: "Migrating all marketing data to a new centralized analytics platform for better reporting and insights.",
        hoursLogged: 180,
        totalHours: 350,
        teamMembers: ["David Cornwell (LeapPoint)", "Stephen Tierney (LeapPoint)", "Brian Mauger (LeapPoint)"],
    },
    {
        id: "PRJ-009",
        name: "Influencer Marketing Strategy",
        owner: "Laura Anderson (LeapPoint)",
        status: "On Hold",
        startDate: "2025-12-01",
        dueDate: "2026-05-01",
        progress: 15,
        description: "Developing a comprehensive strategy for partnering with key influencers in the tech and lifestyle sectors.",
        hoursLogged: 25,
        totalHours: 160,
        teamMembers: ["Laura Anderson (LeapPoint)", "Alexander Stratford (LeapPoint)"],
    },
    {
        id: "PRJ-010",
        name: "Sustainability Reporting Dashboard",
        owner: "Jennifer Krempa (LeapPoint)",
        status: "Completed",
        startDate: "2025-07-01",
        dueDate: "2025-11-15",
        progress: 100,
        description: "Building a dashboard to track and report on the company's sustainability initiatives and carbon footprint.",
        hoursLogged: 210,
        totalHours: 200, // Slightly over
        teamMembers: ["Jennifer Krempa (LeapPoint)", "Joel Caracci (LeapPoint)", "Jimmie Miller (LeapPoint)"],
    },
];

const ProjectModule = () => {
    const [projects, setProjects] = useState<Project[]>(dummyProjects);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Load projects from local storage
    useEffect(() => {
        const localProjects = JSON.parse(localStorage.getItem("omnify_projects") || "[]");
        if (localProjects.length > 0) {
            setProjects(prev => {
                // Avoid duplicates based on ID
                const existingIds = new Set(prev.map(p => p.id));
                const newProjects = localProjects.filter((p: Project) => !existingIds.has(p.id));
                return [...prev, ...newProjects];
            });
        }
    }, []);

    // Filter states
    const [statusFilters, setStatusFilters] = useState<string[]>([]);
    const [ownerFilters, setOwnerFilters] = useState<string[]>([]);

    // Grouping state
    const [isGroupingEnabled, setIsGroupingEnabled] = useState(false);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsDialogOpen(true);
    };

    const getStatusColor = (status: Project["status"]) => {
        switch (status) {
            case "Active": return "default";
            case "Planning": return "secondary";
            case "On Hold": return "destructive";
            case "Completed": return "outline";
            default: return "secondary";
        }
    };

    // Derived data for filters
    const statuses = Array.from(new Set(projects.map(p => p.status)));
    const owners = Array.from(new Set(projects.map(p => p.owner)));

    // Filter logic
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.id.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilters.length === 0 || statusFilters.includes(project.status);
        const matchesOwner = ownerFilters.length === 0 || ownerFilters.includes(project.owner);

        return matchesSearch && matchesStatus && matchesOwner;
    });

    const activeFilterCount = statusFilters.length + ownerFilters.length;

    // Grouping logic
    const groupedProjects = isGroupingEnabled
        ? statuses.reduce((acc, status) => {
            const projectsInStatus = filteredProjects.filter(p => p.status === status);
            if (projectsInStatus.length > 0) {
                acc[status] = projectsInStatus;
            }
            return acc;
        }, {} as Record<string, Project[]>)
        : { "All": filteredProjects };

    return (
        <InteractMasterLayout>
            <div className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-foreground">Project Module</h1>
                        <p className="text-sm text-muted-foreground">Manage and oversee all master projects</p>
                    </div>
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        New Project
                    </Button>
                </div>

                <Card>
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg font-medium flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-primary" />
                                Master Projects
                            </CardTitle>
                            <div className="flex items-center gap-2">
                                <div className="relative w-64">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search projects..."
                                        className="pl-8 h-9"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                <Toggle
                                    pressed={isGroupingEnabled}
                                    onPressedChange={setIsGroupingEnabled}
                                    variant="outline"
                                    size="sm"
                                    className="h-9 gap-2"
                                >
                                    <Layers className="h-4 w-4" />
                                    Group by Status
                                </Toggle>

                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" size="sm" className="h-9 border-dashed">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                            {activeFilterCount > 0 && (
                                                <>
                                                    <Separator orientation="vertical" className="mx-2 h-4" />
                                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                                        {activeFilterCount}
                                                    </Badge>
                                                    <div className="hidden space-x-1 lg:flex">
                                                        {activeFilterCount > 2 ? (
                                                            <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                                                {activeFilterCount} selected
                                                            </Badge>
                                                        ) : (
                                                            <>
                                                                {statusFilters.map((option) => (
                                                                    <Badge
                                                                        variant="secondary"
                                                                        key={option}
                                                                        className="rounded-sm px-1 font-normal"
                                                                    >
                                                                        {option}
                                                                    </Badge>
                                                                ))}
                                                                {ownerFilters.map((option) => (
                                                                    <Badge
                                                                        variant="secondary"
                                                                        key={option}
                                                                        className="rounded-sm px-1 font-normal"
                                                                    >
                                                                        {option.split('(')[0].trim()}
                                                                    </Badge>
                                                                ))}
                                                            </>
                                                        )}
                                                    </div>
                                                </>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0" align="end">
                                        <Command>
                                            <CommandInput placeholder="Filter..." />
                                            <CommandList>
                                                <CommandEmpty>No results found.</CommandEmpty>
                                                <CommandGroup heading="Status">
                                                    {statuses.map((status) => {
                                                        const isSelected = statusFilters.includes(status);
                                                        return (
                                                            <CommandItem
                                                                key={status}
                                                                onSelect={() => {
                                                                    if (isSelected) {
                                                                        setStatusFilters(statusFilters.filter((f) => f !== status));
                                                                    } else {
                                                                        setStatusFilters([...statusFilters, status]);
                                                                    }
                                                                }}
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                        isSelected
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "opacity-50 [&_svg]:invisible"
                                                                    )}
                                                                >
                                                                    <Check className={cn("h-4 w-4")} />
                                                                </div>
                                                                <span>{status}</span>
                                                            </CommandItem>
                                                        );
                                                    })}
                                                </CommandGroup>
                                                <CommandSeparator />
                                                <CommandGroup heading="Owner">
                                                    {owners.map((owner) => {
                                                        const isSelected = ownerFilters.includes(owner);
                                                        return (
                                                            <CommandItem
                                                                key={owner}
                                                                onSelect={() => {
                                                                    if (isSelected) {
                                                                        setOwnerFilters(ownerFilters.filter((f) => f !== owner));
                                                                    } else {
                                                                        setOwnerFilters([...ownerFilters, owner]);
                                                                    }
                                                                }}
                                                            >
                                                                <div
                                                                    className={cn(
                                                                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                                        isSelected
                                                                            ? "bg-primary text-primary-foreground"
                                                                            : "opacity-50 [&_svg]:invisible"
                                                                    )}
                                                                >
                                                                    <Check className={cn("h-4 w-4")} />
                                                                </div>
                                                                <span className="truncate">{owner}</span>
                                                            </CommandItem>
                                                        );
                                                    })}
                                                </CommandGroup>
                                                {activeFilterCount > 0 && (
                                                    <>
                                                        <CommandSeparator />
                                                        <CommandGroup>
                                                            <CommandItem
                                                                onSelect={() => {
                                                                    setStatusFilters([]);
                                                                    setOwnerFilters([]);
                                                                }}
                                                                className="justify-center text-center"
                                                            >
                                                                Clear filters
                                                            </CommandItem>
                                                        </CommandGroup>
                                                    </>
                                                )}
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Project Name</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Start Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Object.entries(groupedProjects).length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} className="h-24 text-center">
                                            No projects found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    Object.entries(groupedProjects).map(([group, projects]) => (
                                        <>
                                            {isGroupingEnabled && (
                                                <TableRow key={`group-${group}`} className="bg-muted/50 hover:bg-muted/50">
                                                    <TableCell colSpan={7} className="font-semibold py-2">
                                                        <div className="flex items-center gap-2">
                                                            <Badge variant={getStatusColor(group as Project["status"])}>
                                                                {group}
                                                            </Badge>
                                                            <span className="text-xs text-muted-foreground">({projects.length})</span>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                            {projects.map((project) => (
                                                <TableRow
                                                    key={project.id}
                                                    className="cursor-pointer hover:bg-muted/50"
                                                    onClick={() => handleProjectClick(project)}
                                                >
                                                    <TableCell className="font-medium">
                                                        <div className="flex flex-col">
                                                            <span>{project.name}</span>
                                                            <span className="text-xs text-muted-foreground">{project.id}</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2">
                                                            <Users className="w-4 h-4 text-muted-foreground" />
                                                            {project.owner}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant={getStatusColor(project.status)}>
                                                            {project.status}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <Calendar className="w-4 h-4" />
                                                            {project.startDate}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-muted-foreground">
                                                            <Calendar className="w-4 h-4" />
                                                            {project.dueDate}
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        <div className="w-full max-w-[100px]">
                                                            <div className="flex items-center justify-between text-xs mb-1">
                                                                <span>{project.progress}%</span>
                                                            </div>
                                                            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-primary transition-all"
                                                                    style={{ width: `${project.progress}%` }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <MoreHorizontal className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Project Detail Modal */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogContent className="max-w-2xl">
                        {selectedProject && (
                            <>
                                <DialogHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <DialogTitle className="text-xl font-bold flex items-center gap-2">
                                                {selectedProject.name}
                                                <Badge variant={getStatusColor(selectedProject.status)} className="ml-2">
                                                    {selectedProject.status}
                                                </Badge>
                                            </DialogTitle>
                                            <DialogDescription className="mt-1">
                                                Project ID: {selectedProject.id}
                                            </DialogDescription>
                                        </div>
                                    </div>
                                </DialogHeader>

                                <div className="grid gap-6 py-4">
                                    {/* Description */}
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                                        <p className="text-sm">{selectedProject.description}</p>
                                    </div>

                                    <Separator />

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Hours */}
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                Hours Tracking
                                            </h3>
                                            <div className="p-3 bg-secondary/30 rounded-lg border">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-sm font-medium">
                                                        {selectedProject.hoursLogged} / {selectedProject.totalHours} hrs
                                                    </span>
                                                    {selectedProject.hoursLogged > selectedProject.totalHours && (
                                                        <Badge variant="destructive" className="text-[10px] h-5">Over Budget</Badge>
                                                    )}
                                                </div>
                                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full transition-all ${selectedProject.hoursLogged > selectedProject.totalHours ? "bg-destructive" : "bg-primary"
                                                            }`}
                                                        style={{ width: `${Math.min((selectedProject.hoursLogged / selectedProject.totalHours) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2">
                                                    {selectedProject.totalHours - selectedProject.hoursLogged > 0
                                                        ? `${selectedProject.totalHours - selectedProject.hoursLogged} hours remaining`
                                                        : `${selectedProject.hoursLogged - selectedProject.totalHours} hours over budget`
                                                    }
                                                </p>
                                            </div>
                                        </div>

                                        {/* Timeline */}
                                        <div className="space-y-2">
                                            <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Timeline
                                            </h3>
                                            <div className="p-3 bg-secondary/30 rounded-lg border space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Start Date:</span>
                                                    <span className="font-medium">{selectedProject.startDate}</span>
                                                </div>
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-muted-foreground">Due Date:</span>
                                                    <span className="font-medium">{selectedProject.dueDate}</span>
                                                </div>
                                                <div className="flex justify-between text-sm pt-1 border-t border-dashed">
                                                    <span className="text-muted-foreground">Progress:</span>
                                                    <span className="font-medium">{selectedProject.progress}%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Team */}
                                    <div>
                                        <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                                            <Users className="w-4 h-4" />
                                            Team Members
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.teamMembers.map((member, i) => (
                                                <div key={i} className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-full border">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member}`} />
                                                        <AvatarFallback>{member.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="text-xs font-medium">{member}</span>
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" className="h-9 w-9 rounded-full p-0">
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                                    <Button>View Full Details</Button>
                                </div>
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </InteractMasterLayout>
    );
};

export default ProjectModule;
