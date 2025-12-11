import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Folder,
    MoreHorizontal,
    Plus,
    Search,
    Filter,

    Info,
    ChevronDown,
    AlertCircle,
    Check
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const FOLDERS = [
    { id: 1, name: "1_KENVUE RFP", count: 24 },
    { id: 2, name: "Amazon Flex", count: 11 },
    { id: 3, name: "Anthropic", count: 0 },
    { id: 4, name: "ATV", count: 5 },
    { id: 5, name: "Banana Republic", count: 1 },
    { id: 6, name: "Cafe Undergrounds", count: 0 },
    { id: 7, name: "Carnival", count: 1 },
    { id: 8, name: "Cat Buyers Pitch", count: 7 },
    { id: 9, name: "Crystal Clear", count: 1 },
    { id: 10, name: "Daybright", count: 9 },
    { id: 11, name: "DraftKings", count: 0 },
    { id: 12, name: "HP", count: 2 },
    { id: 13, name: "LAL testing", count: 8 },
    { id: 14, name: "Listerine Omni Pitch", count: 8 },
    { id: 15, name: "Mastercard", count: 53 },
    { id: 16, name: "Newcastle UFC", count: 7 }
];

const AUDIENCES = [
    {
        id: 1,
        name: "Buyers of hot sauce-dips and hot snacks lookalike",
        status: "Active",
        size: "120.91M",
        type: "Lookalike",
        updated: "Dec 11, 2025",
        updatedBy: "SP",
        usage: "-"
    },
    {
        id: 2,
        name: "Buyers of hot sauce-dips and hot snacks",
        status: "Active",
        size: "63.27M",
        type: "Custom",
        updated: "Dec 11, 2025",
        updatedBy: "SP",
        usage: "Lookalike"
    },
    {
        id: 3,
        name: "Demographic test new Format",
        status: "Active",
        size: "142.01M",
        type: "Base",
        updated: "Dec 10, 2025",
        updatedBy: "MP",
        usage: "-"
    },
    {
        id: 4,
        name: "M+F",
        status: "Active",
        size: "227.12M",
        type: "Base",
        updated: "Dec 10, 2025",
        updatedBy: "VB",
        usage: "Insights"
    },
    {
        id: 5,
        name: "None Chanel Lux Buyers",
        status: "Active",
        size: "152.60M",
        type: "Base",
        updated: "Dec 9, 2025",
        updatedBy: "CW",
        usage: "-",
        setName: "Chanel"
    },
    {
        id: 6,
        name: "Chanel Catagory Buyer",
        status: "Active",
        size: "71.27M",
        type: "Base",
        updated: "Dec 9, 2025",
        updatedBy: "CW",
        usage: "-",
        setName: "Chanel"
    },
    {
        id: 7,
        name: "Luxury Buyer",
        status: "Active",
        size: "155.26M",
        type: "Base",
        updated: "Dec 9, 2025",
        updatedBy: "CW",
        usage: "-",
        setName: "Chanel"
    },
    {
        id: 8,
        name: "Sports healthy eaters",
        status: "Active",
        size: "94.35M",
        type: "Base",
        updated: "Dec 8, 2025",
        updatedBy: "LK",
        usage: "-",
        setName: "Sports healthy eaters",
        tag: "DRAFT"
    },
    {
        id: 9,
        name: "Clone - Sports healthy eaters",
        status: "Active",
        size: "32.28M",
        type: "Base",
        updated: "Dec 8, 2025",
        updatedBy: "LK",
        usage: "-",
        setName: "Sports healthy eaters",
        tag: "DRAFT"
    },
    {
        id: 10,
        name: "Young Families",
        status: "Active",
        size: "63.44M",
        type: "Base",
        updated: "Dec 5, 2025",
        updatedBy: "LZ",
        usage: "-"
    },
    {
        id: 11,
        name: "Fake Audience Test",
        status: "Active",
        size: "9.43M",
        type: "Base",
        updated: "Dec 5, 2025",
        updatedBy: "CR",
        usage: "-"
    },
    {
        id: 12,
        name: "Audience to test release digital rankers",
        status: "Active",
        size: "19.81M",
        type: "Base",
        updated: "Dec 5, 2025",
        updatedBy: "RB",
        usage: "Insights"
    },
    {
        id: 13,
        name: "Audience to test 4.14",
        status: "Active",
        size: "11.18M",
        type: "Base",
        updated: "Dec 5, 2025",
        updatedBy: "RB",
        usage: "Insights"
    },
    {
        id: 14,
        name: "Audience 2 to test 4.14",
        status: "Active",
        size: "114.56M",
        type: "Base",
        updated: "Dec 5, 2025",
        updatedBy: "RB",
        usage: "Insights",
        setName: "Test release 4.14"
    },
    {
        id: 15,
        name: "Audience to test 4.14 release",
        status: "Active",
        size: "219.10M",
        type: "Base",
        updated: "Dec 5, 2025",
        updatedBy: "RB",
        usage: "Insights",
        setName: "Test release 4.14"
    },
    {
        id: 16,
        name: "Canada Goose - US luxury",
        status: "Active",
        size: "5.44M",
        type: "Base",
        updated: "Dec 3, 2025",
        updatedBy: "ND",
        usage: "-"
    },
    {
        id: 17,
        name: "Las Angeles Luxury",
        status: "Active",
        size: "2.65M",
        type: "Base",
        updated: "Nov 28, 2025",
        updatedBy: "ND",
        usage: "-",
        setName: "US"
    },
    {
        id: 18,
        name: "Newyork Luxury",
        status: "Active",
        size: "2.80M",
        type: "Base",
        updated: "Nov 28, 2025",
        updatedBy: "ND",
        usage: "-",
        setName: "US"
    },
    {
        id: 19,
        name: "Triple Threat Employees",
        status: "Active",
        size: "10.71M",
        type: "Base",
        updated: "Nov 27, 2025",
        updatedBy: "HR",
        usage: "Insights"
    },
    {
        id: 20,
        name: "Listerine Audience",
        status: "Active",
        size: "30.46M",
        type: "Base",
        updated: "Nov 27, 2025",
        updatedBy: "SC",
        usage: "Insights"
    },
    {
        id: 21,
        name: "EV Male 30-50",
        status: "Active",
        size: "21.20M",
        type: "Base",
        updated: "Nov 26, 2025",
        updatedBy: "ML",
        usage: "Insights"
    }
];

const CLIENTS = [
    { name: "Demo Client", type: "Demo" },
    { name: "Omnicom", type: "" },
    { name: "Universal Demo Client", type: "" }
];

const BuildAnalyzeAudiences = () => {
    const [clientOpen, setClientOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState(CLIENTS[0]);
    return (
        <InteractMasterLayout>

            <div className="w-full bg-white border-b">
                {/* Top Context Bar */}
                <div className="max-w-[1600px] mx-auto px-6 h-14 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-4">
                        <span className="font-semibold text-lg text-slate-700">Audience Console</span>

                        <div className="flex items-center gap-2 ml-4">
                            <span className="text-sm text-slate-500">Client:</span>
                            <Popover open={clientOpen} onOpenChange={setClientOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        role="combobox"
                                        aria-expanded={clientOpen}
                                        className="h-8 gap-2 font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 px-3"
                                    >
                                        {selectedClient.name}
                                        <ChevronDown className="h-4 w-4 text-slate-500" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="p-0 w-[300px]" align="start">
                                    <Command>
                                        <CommandInput placeholder="Search" />
                                        <CommandList>
                                            <CommandEmpty>No client found.</CommandEmpty>
                                            <CommandGroup>
                                                {CLIENTS.map((client) => (
                                                    <CommandItem
                                                        key={client.name}
                                                        value={client.name}
                                                        onSelect={() => {
                                                            setSelectedClient(client);
                                                            setClientOpen(false);
                                                        }}
                                                        className="flex items-center justify-between py-3"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            <span>{client.name}</span>
                                                            {client.type === "Demo" && (
                                                                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-normal border border-slate-200 h-5 px-1.5 flex items-center gap-1">
                                                                    <AlertCircle className="h-3 w-3" />
                                                                    Demo
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        {selectedClient.name === client.name && (
                                                            <Check className="h-4 w-4 text-blue-600" />
                                                        )}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>

                            {selectedClient.type === "Demo" && (
                                <Badge variant="secondary" className="bg-slate-100 text-slate-500 font-normal border border-slate-200 h-6 px-2 flex items-center gap-1.5 ml-1">
                                    <AlertCircle className="h-3 w-3" />
                                    Demo
                                </Badge>
                            )}

                            <span className="text-sm text-slate-500 ml-4">Market:</span>
                            <Button variant="ghost" className="h-8 gap-2 font-semibold text-slate-900 hover:bg-slate-100 px-2">
                                United States
                                <ChevronDown className="h-4 w-4 text-slate-500" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-[1600px] mx-auto px-6 h-12 flex items-center gap-6">
                    <button className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 h-full">
                        Audiences and Insights
                    </button>
                    <button className="text-sm font-medium text-muted-foreground hover:text-foreground h-full">
                        Templates
                    </button>
                </div>
            </div>

            <div className="max-w-[1600px] mx-auto px-6 py-6 font-sans">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <Link to="/audience-console" className="hover:text-foreground transition-colors">Audience Console</Link>
                    <span>&gt;</span>
                    <span className="font-medium text-foreground">Build & Analyze Audiences</span>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-bold text-slate-900">Demo Client</h1>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        Create
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </div>

                {/* Folders Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                    {FOLDERS.map((folder) => (
                        <div
                            key={folder.id}
                            className="bg-white rounded-lg p-3 border border-slate-200 hover:shadow-sm cursor-pointer transition-shadow flex items-start justify-between group"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex items-center justify-center p-2 bg-slate-50 border border-slate-200 rounded text-xs px-2 min-w-[32px]">
                                    {folder.count}
                                </div>
                                <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]" title={folder.name}>
                                    {folder.name}
                                </span>
                            </div>
                            <MoreHorizontal className="h-4 w-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    ))}

                    {/* Create New Folder Card */}
                    <div className="bg-white rounded-lg p-3 border border-slate-200 border-dashed hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-colors flex items-center gap-3">
                        <div className="p-1 bg-blue-100 text-blue-600 rounded">
                            <Plus className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-slate-600">Create New Folder</span>
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2">
                        <Link to="/audience-console/build-analyze" className="px-4 py-1.5 bg-slate-100 rounded-full text-sm font-medium text-slate-900">
                            Audiences
                        </Link>
                        <Link to="/audience-console/build-analyze" className="px-4 py-1.5 hover:bg-slate-50 rounded-full text-sm font-medium text-muted-foreground">
                            Insights
                        </Link>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            <Filter className="h-4 w-4 text-slate-400" />
                            <span>Filters:</span>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            <span>All Types</span>
                            <ChevronDown className="h-3 w-3" />
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            <span>All Status</span>
                            <ChevronDown className="h-3 w-3" />
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="show-starred" className="rounded border-slate-300" />
                            <label htmlFor="show-starred" className="cursor-pointer">Show Starred</label>
                        </div>

                        <div className="flex items-center gap-2">
                            <input type="checkbox" id="created-by-me" className="rounded border-slate-300" />
                            <label htmlFor="created-by-me" className="cursor-pointer">Created By Me</label>
                        </div>

                        <div className="flex items-center gap-1 cursor-pointer hover:text-foreground">
                            <Info className="h-4 w-4 text-slate-400" />
                            <span>Status Legend</span>
                        </div>
                    </div>
                </div>

                {/* Audiences Table */}
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-slate-50">
                            <TableRow>
                                <TableHead className="w-12"></TableHead>
                                <TableHead className="w-12"></TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Name</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Status</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tag</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Set Name</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Audience Size</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Type</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Updated</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Refreshed</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500">Usage</TableHead>
                                <TableHead className="text-xs font-semibold uppercase tracking-wider text-slate-500 text-center">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {AUDIENCES.map((audience) => (
                                <TableRow key={audience.id} className="group hover:bg-blue-50/50">
                                    <TableCell>
                                        <input type="checkbox" className="rounded border-slate-300" />
                                    </TableCell>
                                    <TableCell>
                                        {/* Star placeholder */}
                                        <span className="text-slate-300 cursor-pointer hover:text-yellow-400">★</span>
                                    </TableCell>
                                    <TableCell className="font-medium text-slate-900">
                                        <Link to={`/audience-console/build-analyze/${audience.id}`} className="hover:text-blue-600 hover:underline">
                                            {audience.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                            <span className="text-sm text-slate-700">{audience.status}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500">
                                        {audience.tag ? (
                                            <Badge variant="secondary" className="bg-slate-200 text-slate-600 hover:bg-slate-300 rounded-sm font-normal text-[10px] px-1.5 py-0 h-5">
                                                {audience.tag}
                                            </Badge>
                                        ) : (
                                            "-"
                                        )}
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">
                                        {audience.setName || "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <span className="font-medium text-slate-700">{audience.size}</span>
                                            <span className="px-1 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] text-slate-500 font-mono">IH</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-slate-700">{audience.type}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                {audience.updatedBy}
                                            </div>
                                            <span className="text-sm text-slate-600">{audience.updated}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-slate-500 text-sm">-</TableCell>
                                    <TableCell className="text-slate-500 text-sm">{audience.usage}</TableCell>
                                    <TableCell className="text-center">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <div className="p-3 border-t bg-slate-50 flex justify-center">
                        <Button className="bg-blue-600 text-white gap-2 shadow-lg hover:bg-blue-700 rounded-full px-6">
                            <div className="bg-white rounded-full p-0.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-600">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
        </InteractMasterLayout>
    );
};

export default BuildAnalyzeAudiences;
