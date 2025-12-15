import { useRef, useEffect, useState } from "react";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Download, Search, Filter, ChevronLeft, ExternalLink, Bell, HelpCircle, ChevronDown, FileText, ChevronRight, Plus, Info, Sparkles, Loader2, Calendar } from "lucide-react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { initialClients, Client, MarketBrief } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import { DateRange } from "react-day-picker";

export default function ClientDetail() {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const client = initialClients.find(c => c.id === clientId);
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedLOBs, setExpandedLOBs] = useState<string[]>(["1"]); // Default expand first
    const [expandedTeams, setExpandedTeams] = useState<string[]>(["1"]); // Default expand first
    const [isCreateBriefOpen, setIsCreateBriefOpen] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [briefDescription, setBriefDescription] = useState("");
    const [marketBriefs, setMarketBriefs] = useState<MarketBrief[]>(client?.marketBriefs || []);
    const [briefBudget, setBriefBudget] = useState("");
    const [briefGoal, setBriefGoal] = useState("");
    const [briefTeam, setBriefTeam] = useState("");

    const [briefWorkstreams, setBriefWorkstreams] = useState<string[]>([]);
    const [briefDateRange, setBriefDateRange] = useState<DateRange | undefined>();
    const lastProcessedRef = useRef<string | null>(null);
    const lastDocProcessedRef = useRef<string | null>(null);
    const lastNameProcessedRef = useRef<string | null>(null);

    // Polling for sync trigger from Workfront Clone (New Project)
    useEffect(() => {
        const checkCookie = () => {
            const match = document.cookie.match(new RegExp('(^| )omnify_new_project_trigger=([^;]+)'));
            if (match) {
                const timestamp = match[2];
                if (timestamp !== lastProcessedRef.current) {
                    console.log("Sync trigger detected!", timestamp);
                    lastProcessedRef.current = timestamp;

                    // Create new brief
                    const newBrief: MarketBrief = {
                        id: `mb-sync-${Date.now()}`,
                        name: "AI Generated Brief (Synced)",
                        market: "United States",
                        forecastedBudget: "$25,000",
                        owner: "System Sync",
                        dateRange: "2025-04-01 - 2025-06-30",
                        description: "Automatically generating market brief based on new project initialization.",
                        clientName: client?.name,
                        brandProduct: "New Product",
                        objective: "New Campaign",
                        projectUrl: "#",
                        deliverables: [],
                        documents: [],
                        team: "Marketing Team",
                        workstreams: ["Creative"]
                    };

                    setMarketBriefs(prev => [newBrief, ...prev]);

                    // Show confirmation/toast if available, or just log
                    console.log("New brief created from sync");
                }
            }
        };

        const intervalId = setInterval(checkCookie, 1000);
        return () => clearInterval(intervalId);
    }, [client]);

    // Polling for name sync
    useEffect(() => {
        const checkNameCookie = () => {
            const match = document.cookie.match(new RegExp('(^| )omnify_project_name_trigger=([^;]+)'));
            if (match) {
                const newName = decodeURIComponent(match[2]);
                if (newName !== lastNameProcessedRef.current) {
                    lastNameProcessedRef.current = newName;

                    setMarketBriefs(prev => prev.map(brief => {
                        // Update only the synced brief (identified by ID prefix)
                        if (brief.id.startsWith('mb-sync-')) {
                            return { ...brief, name: newName };
                        }
                        return brief;
                    }));
                }
            }
        };
        const intervalId = setInterval(checkNameCookie, 1000);
        return () => clearInterval(intervalId);
    }, []);

    const handleGenerateBrief = () => {
        setIsGenerating(true);
        setTimeout(() => {
            const generatedName = briefGoal ? briefGoal.split('\n')[0].substring(0, 50) : "Strategic Campaign Brief";
            const newBrief: MarketBrief = {
                id: `mb-${Date.now()}`,
                name: generatedName,
                market: "United States",
                forecastedBudget: briefBudget || "$50,000",
                owner: "AI Assistant",
                dateRange: "2025-01-01 - 2025-03-31",
                description: `Project Brief: ${briefDescription}

Project Overview
This project focuses on ${briefDescription.toLowerCase()} to ensure they better reflect and align with our company values. Recognizing the importance of consistent messaging and inclusivity, this initiative aims to refresh our materials, making them more engaging, relevant, and representative of our organizational culture.

The effort is timely as it supports our ongoing commitment to diversity, equity, and inclusion, while improving the overall experience for employees.

Objectives
${briefGoal || "Update existing resources to align with company values."}
Enhance clarity, inclusivity, and engagement in content.
Create a cohesive and modernized experience.
Ensure that all materials reflect the principles championed by our initiatives.

Scope & Deliverables
Revision and redesign of materials.
Development of updated documentation.
Creation and refinement of comprehensive modules.
The project will exclusively focus on ${briefDescription.toLowerCase()}. Other unrelated materials or external communications are outside this scope.

Timeline & Milestones
August:
Project kickoff, initial review of existing materials, and planning.

September:
Design and content updates underway; iterative reviews with teams.

October:
Final revisions, approvals, and rollout of updated resources.

Stakeholders & Roles
Design Team:
Responsible for the visual refresh and user-friendly layouts of all materials.

Strategy Team:
Provides expertise on content, ensures accuracy, and oversees alignment with policies.

DEI Team:
Ensures that updated resources promote inclusivity and reflect company diversity values.

The project is intended for internal company use, primarily benefiting new hires and employees participating in ongoing training.`,
                clientName: client?.name,
                brandProduct: "New Product",
                objective: briefGoal || "Launch Campaign",
                projectUrl: "https://example.com",
                deliverables: [],
                documents: [
                    {
                        name: `Market Brief - ${client?.name || "Client"}.docx`,
                        type: "docx",
                        date: new Date().toLocaleDateString(),
                        size: "24 KB"
                    }
                ],
                team: briefTeam,
                workstreams: briefWorkstreams
            };
            setMarketBriefs([...marketBriefs, newBrief]);
            setIsCreateBriefOpen(false);
            setIsGenerating(false);
            setBriefDescription("");
            setBriefBudget("");
            setBriefGoal("");
            setBriefTeam("");
            setBriefWorkstreams([]);

            // Trigger Workfront project creation via cookie
            const projectTriggerValue = JSON.stringify({
                briefName: newBrief.name,
                timestamp: Date.now()
            });
            document.cookie = `omnify_create_projects_trigger=${encodeURIComponent(projectTriggerValue)}; path=/; max-age=60`;

            // Sync with local Project Module
            const newProject = {
                id: `PRJ-${Math.floor(Math.random() * 10000)}`,
                name: newBrief.name || "New Market Brief Project",
                owner: "John Miller",
                status: "Planning",
                startDate: new Date().toISOString().split('T')[0],
                dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                progress: 0,
                description: briefDescription || "New project created from market brief.",
                hoursLogged: 0,
                totalHours: 100,
                teamMembers: ["John Miller"]
            };

            const existingProjects = JSON.parse(localStorage.getItem("omnify_projects") || "[]");
            localStorage.setItem("omnify_projects", JSON.stringify([...existingProjects, newProject]));

            console.log("Brief generated and sync trigger set:", newBrief.name);

            // Navigate to the newly created brief
            navigate(`/client-central/${clientId}/market-brief/${newBrief.id}`, { state: { brief: newBrief } });

        }, 2000);
    };

    if (!client) {
        return <div>Client not found</div>;
    }

    // Use subClients if available, otherwise empty
    const clientsToShow = client.subClients || [];
    // marketBriefs is now state
    const clientTeams = client.clientTeams || [];
    const linesOfBusiness = client.linesOfBusiness || [];

    const toggleLOB = (id: string) => {
        setExpandedLOBs(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const toggleTeam = (id: string) => {
        setExpandedTeams(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    return (
        <InteractMasterLayout>
            <div className="flex flex-col h-full bg-[#f5f7fa] dark:bg-[#0f1419]">
                {/* Top Header */}
                <div className="bg-white dark:bg-[#1a1f2e] border-b px-6 py-3 flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-[#3b82f6]">Client Central</h1>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground">
                            <HelpCircle className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                                JM
                            </div>
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>
                </div>

                {/* Breadcrumb & Title Area */}
                <div className="bg-white dark:bg-[#1a1f2e] px-6 py-4 border-b">
                    <Link to="/client-central" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Clients List
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {client.name}
                                </h2>
                                {client.status === 'Active' && (
                                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-600" />
                                        Active
                                    </div>
                                )}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-4">
                                <span>Client ID: {client.clientId || '56078'}</span>
                                <span className="text-slate-300">|</span>
                                <span>Updated by: {client.updatedBy} {client.lastUpdated}</span>
                            </div>
                        </div>

                        <Button variant="outline" className="text-[#3b82f6] border-[#3b82f6] hover:bg-blue-50">
                            Changelog
                        </Button>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="flex-1 p-6">
                    <Tabs defaultValue="general" className="h-full flex flex-col">
                        <div className="bg-white dark:bg-[#1a1f2e] border-b px-6">
                            <TabsList className="h-auto p-0 bg-transparent space-x-8">
                                <TabsTrigger
                                    value="general"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    General Information
                                </TabsTrigger>
                                <TabsTrigger
                                    value="brands"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    Brands/Products
                                </TabsTrigger>
                                <TabsTrigger
                                    value="briefs"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    Market Briefs
                                </TabsTrigger>
                                <TabsTrigger
                                    value="team"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    Client Team
                                </TabsTrigger>
                                <TabsTrigger
                                    value="related"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    Related Clients
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="mt-6 space-y-6">
                            <TabsContent value="general" className="space-y-6 m-0">
                                {/* Client Details Card */}
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Client Details</h3>

                                    <div className="grid grid-cols-4 gap-8 mb-8">
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Also Known As</div>
                                            <div className="text-sm font-medium">{client.subName || client.name + " Corporation"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Industry</div>
                                            <div className="text-sm font-medium">{client.industries}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Website</div>
                                            <a href="#" className="text-sm text-[#3b82f6] hover:underline flex items-center gap-1">
                                                <ExternalLink className="h-3 w-3" />
                                                {client.website || "Open link"}
                                            </a>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Hierarchy</div>
                                            <div className="text-sm font-medium">{client.hierarchy || "--"}</div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="text-xs text-muted-foreground mb-1">Account Owners</div>
                                        <div className="text-sm text-[#3b82f6]">{client.accountOwners?.join(", ") || "vincent.spruyt@kinesso.com"}</div>
                                    </div>

                                    <div>
                                        <div className="text-xs text-muted-foreground mb-1">Description</div>
                                        <div className="text-sm text-slate-700 dark:text-slate-300">
                                            {client.description || "Large company in the Client Business"}
                                        </div>
                                    </div>
                                </div>

                                {/* Markets & Agencies Card */}
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Markets & Agencies</h3>

                                    <div className="mb-8">
                                        <div className="text-xs text-muted-foreground mb-2">Agency</div>
                                        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {client.agencyList || "Acxiom, Healix, IPG, IPG Fusion, IPG Health, IPG Mediabrands, Ignite, Initiative, Kinesso, Matterkind, McCann, McCann Healthcare, McCann Worldgroup, Orion, Rapport, Reprise, Rufus, SOLVE(D), Stickyeyes, The Martin Agency, UM"}
                                        </div>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent border-none bg-slate-50 dark:bg-slate-800/50">
                                                <TableHead className="w-[200px]">Region</TableHead>
                                                <TableHead>Markets</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {client.regionMarkets ? (
                                                client.regionMarkets.map((rm, idx) => (
                                                    <TableRow key={idx} className="border-b last:border-0">
                                                        <TableCell className="font-medium">{rm.region}</TableCell>
                                                        <TableCell>{rm.markets}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <>
                                                    <TableRow className="border-b">
                                                        <TableCell className="font-medium">EMEA</TableCell>
                                                        <TableCell>Germany</TableCell>
                                                    </TableRow>
                                                    <TableRow className="border-0">
                                                        <TableCell className="font-medium">NA</TableCell>
                                                        <TableCell>Demo Market, United States</TableCell>
                                                    </TableRow>
                                                </>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="brands" className="m-0">
                                <Tabs defaultValue="brands-list" className="w-full">
                                    <div className="bg-white dark:bg-[#1a1f2e] border-b px-6">
                                        <TabsList className="h-auto p-0 bg-transparent space-x-8">
                                            <TabsTrigger
                                                value="brands-list"
                                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                            >
                                                Brands/Products
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="lob"
                                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                            >
                                                Lines of Business
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <div className="p-6">
                                        <TabsContent value="brands-list" className="m-0">
                                            <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-4">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <h3 className="text-lg font-semibold">Brands/Products</h3>
                                                    <span className="text-muted-foreground">{clientsToShow.length}</span>
                                                </div>

                                                <div className="relative w-64 mb-6">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                                    <Input
                                                        placeholder="Search"
                                                        className="pl-9 bg-white"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>

                                                <Table>
                                                    <TableHeader>
                                                        <TableRow className="hover:bg-transparent border-none">
                                                            <TableHead className="w-[300px]">Name ▲</TableHead>
                                                            <TableHead>Markets</TableHead>
                                                            <TableHead>Lines of Business</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {clientsToShow.map((client) => (
                                                            <TableRow key={client.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b last:border-0">
                                                                <TableCell className="font-medium text-slate-700 dark:text-slate-300">
                                                                    {client.name}
                                                                </TableCell>
                                                                <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                                    {client.markets}
                                                                </TableCell>
                                                                <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                                    {client.name.includes("Demo Brand") ? "Demo LOB" : "—"}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="lob" className="m-0">
                                            <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-4">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <h3 className="text-lg font-semibold">Lines of Business</h3>
                                                    <span className="text-muted-foreground">{linesOfBusiness.length}</span>
                                                </div>

                                                {linesOfBusiness.map(lob => (
                                                    <div key={lob.id} className="border rounded-lg mb-4 overflow-hidden">
                                                        <button
                                                            onClick={() => toggleLOB(lob.id)}
                                                            className="w-full flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors text-left"
                                                        >
                                                            {expandedLOBs.includes(lob.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                            <span className="font-semibold">{lob.name}</span>
                                                            <span className="text-muted-foreground text-sm">{lob.brands.length}</span>
                                                        </button>

                                                        {expandedLOBs.includes(lob.id) && (
                                                            <div className="p-0">
                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow className="hover:bg-transparent border-none">
                                                                            <TableHead>Name ▲</TableHead>
                                                                            <TableHead>Markets</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {lob.brands.map((brand, idx) => (
                                                                            <TableRow key={idx} className="border-b last:border-0">
                                                                                <TableCell className="font-medium">{brand.name}</TableCell>
                                                                                <TableCell>{brand.markets}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </TabsContent>

                            <TabsContent value="briefs" className="m-0">
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-4">
                                    <div className="flex items-center gap-2 mb-6">
                                        <h3 className="text-lg font-semibold">Market Briefs</h3>
                                        <span className="text-muted-foreground">{marketBriefs.length}</span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <div className="relative w-64">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Search"
                                                className="pl-9 bg-white rounded-full"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>

                                        <div className="flex bg-slate-100 p-1 rounded-full">
                                            <button className="px-4 py-1.5 text-sm font-medium bg-white shadow-sm rounded-full text-slate-900">All Market Briefs</button>
                                            <button className="px-4 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-900">My Market Briefs</button>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground ml-4">
                                            <Filter className="h-4 w-4" />
                                            <span>Filters:</span>
                                        </div>

                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[150px] border-none shadow-none hover:bg-slate-50">
                                                <SelectValue placeholder="Markets" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Markets: All</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Button
                                            className="ml-auto bg-[#3b82f6] hover:bg-blue-600 text-white rounded-full gap-2"
                                            onClick={() => setIsCreateBriefOpen(true)}
                                        >
                                            <Plus className="h-4 w-4" />
                                            Create New Market Brief
                                        </Button>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent border-none">
                                                <TableHead className="w-[400px]">Name ▲</TableHead>
                                                <TableHead>Market ▼</TableHead>
                                                <TableHead>Forecasted Budget ▼</TableHead>
                                                <TableHead>Owner ▼</TableHead>
                                                <TableHead>Date Range ▼</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {marketBriefs.map((brief) => (
                                                <TableRow key={brief.id} className="border-b last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                    <TableCell className="font-medium">
                                                        <Link
                                                            to={`/client-central/${clientId}/market-brief/${brief.id}`}
                                                            state={{ brief }}
                                                            className="font-medium text-[#3b82f6] hover:underline"
                                                        >
                                                            {brief.name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{brief.market}</TableCell>
                                                    <TableCell>{brief.forecastedBudget}</TableCell>
                                                    <TableCell>{brief.owner}</TableCell>
                                                    <TableCell>{brief.dateRange}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="team" className="m-0">
                                <Tabs defaultValue="teams" className="w-full">
                                    <div className="bg-white dark:bg-[#1a1f2e] border-b px-6">
                                        <TabsList className="h-auto p-0 bg-transparent space-x-8">
                                            <TabsTrigger
                                                value="teams"
                                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                            >
                                                Client Teams
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="access"
                                                className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                            >
                                                Client Access
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <div className="p-6">
                                        <TabsContent value="teams" className="m-0">
                                            <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-4">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <h3 className="text-lg font-semibold">Client Teams</h3>
                                                    <span className="text-muted-foreground">{clientTeams.length}</span>
                                                </div>

                                                {clientTeams.map(team => (
                                                    <div key={team.id} className="border rounded-lg mb-4 overflow-hidden">
                                                        <button
                                                            onClick={() => toggleTeam(team.id)}
                                                            className="w-full flex items-center gap-2 p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 transition-colors text-left"
                                                        >
                                                            {expandedTeams.includes(team.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                            <span className="font-semibold">{team.name}</span>
                                                            <span className="text-muted-foreground text-sm">{team.members.length}</span>
                                                        </button>

                                                        {expandedTeams.includes(team.id) && (
                                                            <div className="p-4">
                                                                <div className="grid grid-cols-3 gap-8 mb-4 text-sm text-muted-foreground">
                                                                    <div>Description</div>
                                                                    <div>Brands/Products</div>
                                                                    <div>Lines of Business</div>
                                                                </div>
                                                                <div className="grid grid-cols-3 gap-8 mb-6 text-sm">
                                                                    <div>{team.description}</div>
                                                                    <div>Demo Brand 1, Demo Brand 2</div>
                                                                    <div>Demo LOB</div>
                                                                </div>

                                                                <Table>
                                                                    <TableHeader>
                                                                        <TableRow className="hover:bg-transparent border-none">
                                                                            <TableHead>Name ▲</TableHead>
                                                                            <TableHead>Email ▼</TableHead>
                                                                        </TableRow>
                                                                    </TableHeader>
                                                                    <TableBody>
                                                                        {team.members.map((member, idx) => (
                                                                            <TableRow key={idx} className="border-b last:border-0">
                                                                                <TableCell className="font-medium">{member.name}</TableCell>
                                                                                <TableCell>{member.email}</TableCell>
                                                                            </TableRow>
                                                                        ))}
                                                                    </TableBody>
                                                                </Table>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </TabsContent>
                                        <TabsContent value="access" className="m-0">
                                            <div className="p-4 text-center text-muted-foreground">No access data available</div>
                                        </TabsContent>
                                    </div>
                                </Tabs>
                            </TabsContent>

                            <TabsContent value="related" className="m-0">
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-12 flex flex-col items-center justify-center min-h-[300px]">
                                    <div className="flex items-center gap-2 mb-6 w-full">
                                        <h3 className="text-lg font-semibold">Related Clients</h3>
                                        <span className="text-muted-foreground">0</span>
                                    </div>

                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                            <FileText className="h-8 w-8 text-slate-300" />
                                        </div>
                                        <h3 className="text-lg font-medium text-slate-400">No relationships</h3>
                                    </div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>

                    <Dialog open={isCreateBriefOpen} onOpenChange={setIsCreateBriefOpen}>
                        <DialogContent className="sm:max-w-[95vw] bg-[#f5f7fa] dark:bg-[#0f1419] p-0 gap-0 overflow-hidden">
                            <div className="bg-white dark:bg-[#1a1f2e] border-b px-6 py-4 flex items-center justify-between">
                                <DialogTitle className="text-xl font-semibold text-[#3b82f6]">New Market Brief</DialogTitle>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="rounded-full px-6" onClick={() => setIsCreateBriefOpen(false)}>Cancel</Button>
                                    <Button
                                        className="rounded-full bg-[#3b82f6] hover:bg-blue-600 px-6 text-white"
                                        onClick={handleGenerateBrief}
                                        disabled={isGenerating}
                                    >
                                        {isGenerating ? "Generating..." : "Save"}
                                    </Button>
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Market Brief Details</h3>

                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                        {/* Row 1 */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Client</label>
                                            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 border rounded-md text-sm text-slate-500">
                                                {client.name}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Market *</label>
                                            <Select defaultValue="us">
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="Select Markets" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="us">United States</SelectItem>
                                                    <SelectItem value="em">Germany</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Row 2 */}
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Name *</label>
                                            <Input
                                                value={briefGoal}
                                                onChange={(e) => setBriefGoal(e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Brand/Product</label>
                                            <Select>
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="Select Brand/Product" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="bp1">Demo Brand 1</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Row 3 */}
                                        <div className="space-y-2">
                                            <div className="space-y-2">
                                                <label className="text-xs text-muted-foreground">Date Range</label>
                                                <div className="flex items-center gap-4">
                                                    <div className="relative flex-1">
                                                        <DatePickerWithRange
                                                            date={briefDateRange}
                                                            setDate={setBriefDateRange}
                                                        />
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-9 h-5 bg-slate-200 rounded-full relative cursor-pointer">
                                                            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm" />
                                                        </div>
                                                        <span className="text-sm text-slate-600">Always On</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Objective</label>
                                            <Select defaultValue="none">
                                                <SelectTrigger className="bg-white">
                                                    <SelectValue placeholder="None" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="none">None</SelectItem>
                                                    <SelectItem value="launch">Launch</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Row 4 */}

                                        <div className="space-y-2">
                                            <label className="text-xs text-muted-foreground">Forecasted Budget</label>
                                            <div className="flex gap-2">
                                                <Select defaultValue="usd">
                                                    <SelectTrigger className="w-[100px] bg-white">
                                                        <SelectValue placeholder="USD" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="usd">USD</SelectItem>
                                                        <SelectItem value="eur">EUR</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <Input
                                                    value={briefBudget}
                                                    onChange={(e) => setBriefBudget(e.target.value)}
                                                    className="flex-1 bg-white"
                                                />
                                            </div>
                                        </div>

                                        {/* Row 5 */}
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-xs text-muted-foreground">Status *</label>
                                            <Select defaultValue="draft">
                                                <SelectTrigger className="bg-white w-1/2">
                                                    <SelectValue placeholder="Draft" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="draft">Draft</SelectItem>
                                                    <SelectItem value="active">Active</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        {/* Description */}
                                        <div className="space-y-2 col-span-2">
                                            <div className="flex justify-between items-center">
                                                <label className="text-xs text-muted-foreground">Description</label>
                                                <Button
                                                    variant="ghost"
                                                    className="h-auto p-0 text-[#3b82f6] hover:bg-transparent hover:text-blue-700 flex items-center gap-1.5"
                                                    onClick={handleGenerateBrief}
                                                >
                                                    <Sparkles className="h-3.5 w-3.5" />
                                                    <span className="text-xs font-medium">Generate with AI</span>
                                                </Button>
                                            </div>
                                            <Textarea
                                                value={briefDescription}
                                                onChange={(e) => setBriefDescription(e.target.value)}
                                                className="min-h-[150px] resize-none bg-white p-4"
                                            />
                                            <div className="flex gap-6 mt-4">
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="creative"
                                                        checked={briefWorkstreams.includes("Creative")}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setBriefWorkstreams([...briefWorkstreams, "Creative"]);
                                                            } else {
                                                                setBriefWorkstreams(briefWorkstreams.filter(w => w !== "Creative"));
                                                            }
                                                        }}
                                                    />
                                                    <Label htmlFor="creative" className="text-sm font-normal">Creative</Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Checkbox
                                                        id="media"
                                                        checked={briefWorkstreams.includes("Media")}
                                                        onCheckedChange={(checked) => {
                                                            if (checked) {
                                                                setBriefWorkstreams([...briefWorkstreams, "Media"]);
                                                            } else {
                                                                setBriefWorkstreams(briefWorkstreams.filter(w => w !== "Media"));
                                                            }
                                                        }}
                                                    />
                                                    <Label htmlFor="media" className="text-sm font-normal">Media</Label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div >
        </InteractMasterLayout >
    );
}
