import { useRef, useEffect, useState } from "react";
import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Button } from "@/components/ui/button";
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
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, Filter, ChevronLeft, Bell, HelpCircle, ChevronDown, FileText, ExternalLink } from "lucide-react";
import { useParams, Link, useLocation } from "react-router-dom";
import { initialClients } from "@/data/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function MarketBriefDetail() {
    const { clientId, briefId } = useParams();
    const location = useLocation();
    const client = initialClients.find(c => c.id === clientId);
    const brief = location.state?.brief || client?.marketBriefs?.find(b => b.id === briefId);
    const [searchQuery, setSearchQuery] = useState("");
    const [syncedDocuments, setSyncedDocuments] = useState<any[]>([]);
    const lastDocProcessedRef = useRef<string | null>(null);

    // Polling for document sync trigger from Workfront Clone
    useEffect(() => {
        const checkCookie = () => {
            const match = document.cookie.match(new RegExp('(^| )omnify_new_document_trigger=([^;]+)'));
            if (match) {
                const docDataStr = decodeURIComponent(match[2]);
                // Simple check to avoid processing same cookie multiple times if value hasn't changed enough (timestamp/content)
                // In a real app we'd use a unique ID in the cookie.
                // Here we'll use the whole string as the unique key for simplicity in this demo.
                if (docDataStr !== lastDocProcessedRef.current) {
                    console.log("Document sync trigger detected!", docDataStr);
                    lastDocProcessedRef.current = docDataStr;

                    try {
                        const newDocData = JSON.parse(docDataStr);
                        setSyncedDocuments(prev => [newDocData, ...prev]);
                    } catch (e) {
                        console.error("Failed to parse document sync data", e);
                    }
                }
            }
        };

        const intervalId = setInterval(checkCookie, 1000);
        return () => clearInterval(intervalId);
    }, []);

    // Merge brief documents and synced documents
    const displayDocuments = [...(brief?.documents || []), ...syncedDocuments];

    if (!client || !brief) {
        return <div>Market Brief not found</div>;
    }

    const deliverables = brief.deliverables || [];

    const handleDownload = () => {
        if (!brief) return;

        const content = `
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>${brief.name}</title>
                    <style>
                        body { font-family: Arial, sans-serif; line-height: 1.6; }
                        h1 { color: #3b82f6; }
                        h2 { color: #333; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                        .section { margin-bottom: 20px; }
                        .label { font-weight: bold; color: #666; }
                        .value { margin-bottom: 10px; }
                    </style>
                </head>
                <body>
                    <h1>${brief.name}</h1>
                    
                    <div class="section">
                        <h2>Details</h2>
                        <p><span class="label">Client:</span> ${brief.clientName || client.name}</p>
                        <p><span class="label">Market:</span> ${brief.market}</p>
                        <p><span class="label">Brand/Product:</span> ${brief.brandProduct || "--"}</p>
                        <p><span class="label">Objective:</span> ${brief.objective || "--"}</p>
                        <p><span class="label">Project URL:</span> ${brief.projectUrl || "--"}</p>
                        <p><span class="label">Date Range:</span> ${brief.dateRange}</p>
                        <p><span class="label">Forecasted Budget:</span> ${brief.forecastedBudget}</p>
                    </div>

                    <div class="section">
                        <h2>Description</h2>
                        <p>${(brief.description || "--").replace(/\n/g, '<br>')}</p>
                    </div>
                </body>
            </html>
        `;

        const blob = new Blob([content], { type: "application/msword" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Market Brief - ${brief.clientName || client.name}.doc`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
                    <Link to={`/client-central/${clientId}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Back to Client Details
                    </Link>

                    <div className="flex items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                    {brief.name}
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="flex-1 p-6">
                    <Tabs defaultValue="brief" className="h-full flex flex-col">
                        <div className="bg-white dark:bg-[#1a1f2e] border-b px-6">
                            <TabsList className="h-auto p-0 bg-transparent space-x-8">
                                <TabsTrigger
                                    value="brief"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    Market Brief
                                </TabsTrigger>
                                <TabsTrigger
                                    value="members"
                                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#3b82f6] data-[state=active]:text-[#3b82f6] px-0 py-3 bg-transparent shadow-none"
                                >
                                    Members
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="mt-6 space-y-6">
                            <TabsContent value="brief" className="space-y-6 m-0">
                                {/* Details Card */}
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">Details</h3>

                                    </div>

                                    <div className="grid grid-cols-5 gap-8 mb-8">
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Client</div>
                                            <div className="text-sm font-medium underline decoration-slate-400 underline-offset-2">{brief.clientName || client.name}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Market</div>
                                            <div className="text-sm font-medium">{brief.market}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Brand/Product</div>
                                            <div className="text-sm font-medium">{brief.brandProduct || "--"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Objective</div>
                                            <div className="text-sm font-medium">{brief.objective || "--"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Project URL</div>
                                            <div className="text-sm font-medium">{brief.projectUrl || "--"}</div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-5 gap-8 mb-8">
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Date Range</div>
                                            <div className="text-sm font-medium">{brief.dateRange}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Client Team</div>
                                            <div className="text-sm font-medium">{brief.team || "--"}</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Workstreams</div>
                                            <div className="flex gap-2">
                                                {brief.workstreams && brief.workstreams.length > 0 ? (
                                                    brief.workstreams.map((ws: string, idx: number) => (
                                                        <Badge key={idx} variant="secondary" className="text-xs font-normal">
                                                            {ws}
                                                        </Badge>
                                                    ))
                                                ) : (
                                                    <span className="text-sm font-medium">--</span>
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground mb-1">Forecasted Budget</div>
                                            <div className="text-sm font-medium">{brief.forecastedBudget}</div>
                                        </div>
                                    </div>

                                    <div className="mb-8">
                                        <div className="text-xs text-muted-foreground mb-1">Description</div>
                                        <div className="text-sm font-medium whitespace-pre-wrap">{brief.description || "--"}</div>
                                    </div>

                                    <div className="mb-4">
                                        <div className="text-sm font-semibold mb-4">Documents</div>
                                        {displayDocuments && displayDocuments.length > 0 ? (
                                            <div className="grid grid-cols-1 gap-4">
                                                {displayDocuments.map((doc: any, idx: number) => (
                                                    <div key={idx} className="flex items-center p-4 bg-white dark:bg-[#1a1f2e] border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                                                            <FileText className="h-5 w-5 text-blue-600" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-slate-900 dark:text-white">{doc.name}</div>
                                                            <div className="text-xs text-muted-foreground">{doc.date} • {doc.size}</div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="text-blue-600 hover:text-blue-700"
                                                            onClick={handleDownload}
                                                        >
                                                            Download
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed">
                                                <div className="w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-3">
                                                    <FileText className="h-6 w-6 text-slate-400" />
                                                </div>
                                                <div className="text-sm font-medium text-slate-900 dark:text-white">Oops, nothing here yet</div>
                                                <div className="text-xs text-muted-foreground">There are no documents yet</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Deliverables Card */}
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-6">
                                    <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-6">Deliverables</h3>

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

                                        <div className="flex items-center gap-2 text-sm text-muted-foreground ml-4">
                                            <Filter className="h-4 w-4" />
                                            <span>Filters:</span>
                                        </div>

                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[150px] border-none shadow-none hover:bg-slate-50">
                                                <SelectValue placeholder="Sources: All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Sources: All</SelectItem>
                                            </SelectContent>
                                        </Select>

                                        <Select defaultValue="all">
                                            <SelectTrigger className="w-[150px] border-none shadow-none hover:bg-slate-50">
                                                <SelectValue placeholder="Statuses: All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Statuses: All</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Table>
                                        <TableHeader>
                                            <TableRow className="hover:bg-transparent border-none">
                                                <TableHead className="w-[300px]">Deliverable ▲</TableHead>
                                                <TableHead>Source ▼</TableHead>
                                                <TableHead>Console ▼</TableHead>
                                                <TableHead>Created By ▼</TableHead>
                                                <TableHead>Created Date ▼</TableHead>
                                                <TableHead>Status ▼</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {deliverables.map((item) => (
                                                <TableRow key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b last:border-0">
                                                    <TableCell className="font-medium">
                                                        {item.link ? (
                                                            <Link to={item.link} className="text-blue-600 hover:underline">
                                                                {item.name}
                                                            </Link>
                                                        ) : (
                                                            item.name
                                                        )}
                                                        {item.details && (
                                                            <div className="text-xs text-muted-foreground mt-1">{item.details}</div>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Badge variant="secondary" className="rounded-full font-normal text-slate-600 bg-slate-100 hover:bg-slate-200">
                                                            {item.source}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                        {item.console || "--"}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                        {item.createdBy}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                        {item.createdDate}
                                                    </TableCell>
                                                    <TableCell className="text-sm text-slate-600 dark:text-slate-300">
                                                        {item.status}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            {deliverables.length === 0 && (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                        No deliverables found
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </TabsContent>

                            <TabsContent value="members" className="m-0">
                                <div className="bg-white dark:bg-[#1a1f2e] rounded-xl shadow-sm border p-6">
                                    <div className="p-4 text-center text-muted-foreground">Member list placeholder</div>
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            </div>
        </InteractMasterLayout>
    );
}
