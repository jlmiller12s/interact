import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    MoreHorizontal,
    Plus,
    Search,
    Filter,
    LayoutTemplate,
    List,
    FileText,
    Copy
} from "lucide-react";

const projects = [
    {
        id: 1,
        name: "Omnicom | Omnicom Platforms | Omni+ Work",
        owner: { name: "Jen", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jen" },
        status: "Working At Risk",
        statusColor: "bg-red-500",
        dueOn: "3/31/26",
        lastUpdate: "Jen met with the Omni+ team"
    },
    {
        id: 2,
        name: "AI Services Team Goals, Meetings and Operations",
        owner: { name: "Mike", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" },
        status: "Active",
        statusColor: "bg-green-500",
        dueOn: "12/31/25",
        lastUpdate: "Meeting Summary Date: Sep"
    },
    {
        id: 3,
        name: "AI GTM and Department Structure",
        owner: { name: "Alex", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" },
        status: "Active",
        statusColor: "bg-green-500",
        dueOn: "12/31/25",
        lastUpdate: "I believe this applies to all cu"
    },
    {
        id: 4,
        name: "LP AoA",
        owner: { name: "Sarah", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
        status: "Complete",
        statusColor: "bg-green-500",
        dueOn: "7/2/25",
        lastUpdate: "Omni Ai to Fusion Endpoint"
    },
    {
        id: 5,
        name: "FireFly Tiger Team Service Offering",
        owner: { name: "Tom", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tom" },
        status: "Cancelled",
        statusColor: "bg-red-500",
        dueOn: "4/12/27",
        lastUpdate: "We haven't gotten to really c"
    },
    {
        id: 6,
        name: "CVS Group PLC | Marketing | CVS | AEM Sites E",
        owner: { name: "Unknown", image: "" },
        status: "Active",
        statusColor: "bg-green-500",
        dueOn: "1/30/26",
        lastUpdate: "Total of 800 hours + 210 req"
    },
    {
        id: 7,
        name: "CVS Group PLC | Marketing | CVS | UX & UI Enl",
        owner: { name: "Unknown", image: "" },
        status: "Complete",
        statusColor: "bg-green-500",
        dueOn: "3/1/25",
        lastUpdate: "@Karen Hughes I just did thi"
    },
    {
        id: 8,
        name: "2025 AEM Team Goals, Meetings, Non-Bill Wo",
        owner: { name: "Kathy", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kathy" },
        status: "Operations",
        statusColor: "bg-orange-500",
        dueOn: "1/31/26",
        lastUpdate: "Kathy Haven confirmed 10/2"
    },
    {
        id: 9,
        name: "CVS Group PLC | Marketing | CVS Group | Mar",
        owner: { name: "Unknown", image: "" },
        status: "Active",
        statusColor: "bg-green-500",
        dueOn: "12/31/25",
        lastUpdate: "@Emma Kovacs @Bev Collir"
    }
];

export function MyProjectsTable() {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CardTitle className="text-lg font-semibold">My Tasks</CardTitle>
                        <span className="text-muted-foreground cursor-help">ⓘ</span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <Button variant="outline" className="rounded-full px-6">
                        New
                    </Button>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="" className="w-8 pl-8 border-none shadow-none focus-visible:ring-0" />
                        </div>

                        <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
                            <button className="hover:text-foreground transition-colors">Projects I Own</button>
                            <button className="bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md">Projects I'm On</button>
                        </div>

                        <div className="h-4 w-px bg-border mx-2" />

                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <LayoutTemplate className="h-4 w-4" />
                                Columns
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-2">
                                <List className="h-4 w-4" />
                                Grouping
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-0 flex-1 overflow-auto">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow className="h-8 hover:bg-transparent">
                            <TableHead className="w-[80px] h-8 text-xs">Quick Actions</TableHead>
                            <TableHead className="h-8 text-xs">Name</TableHead>
                            <TableHead className="h-8 text-xs">Owner: Photo</TableHead>
                            <TableHead className="h-8 text-xs">Status</TableHead>
                            <TableHead className="h-8 text-xs">Due On</TableHead>
                            <TableHead className="h-8 text-xs">Last Update</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id} className="hover:bg-muted/50 h-8">
                                <TableCell className="py-1">
                                    <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-5 w-5">
                                            <Copy className="h-3 w-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-5 w-5">
                                            <MoreHorizontal className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium text-blue-600 hover:underline cursor-pointer py-1 text-xs truncate max-w-[200px]">
                                    {project.name}
                                </TableCell>
                                <TableCell className="py-1">
                                    {project.owner.image ? (
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={project.owner.image} />
                                            <AvatarFallback className="text-[10px]">{project.owner.name[0]}</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <Avatar className="h-5 w-5">
                                            <AvatarFallback className="bg-blue-100 text-blue-600 text-[10px]">
                                                <FileText className="h-2.5 w-2.5" />
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </TableCell>
                                <TableCell className="py-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full ${project.statusColor}`} />
                                        <span className="text-xs">{project.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-1 text-xs">{project.dueOn}</TableCell>
                                <TableCell className="text-muted-foreground max-w-[150px] truncate py-1 text-xs">
                                    {project.lastUpdate}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
