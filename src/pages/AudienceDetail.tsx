import { InteractMasterLayout } from "@/components/InteractMasterLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    ChevronDown,
    Info,
    ExternalLink,
    Upload,
    Share,
    MoreHorizontal,
    Plus,
    Filter,
    Baby,
    Users,
    DollarSign,
    Heart,
    User,
    AlertCircle,
    Check
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
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
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    Label
} from "recharts";
import { initialClients } from "@/data/mockData";

// --- Mock Data Generators ---

const generateAgeData = () => [
    { name: "18-24", value: 9, index: 109 },
    { name: "25-29", value: 10, index: 121 },
    { name: "30-34", value: 13, index: 150 },
    { name: "35-39", value: 12, index: 169 },
    { name: "40-44", value: 12, index: 171 },
    { name: "45-49", value: 11, index: 171 },
    { name: "50-54", value: 10, index: 140 },
    { name: "55-59", value: 8, index: 105 },
    { name: "60-64", value: 6, index: 77 },
    { name: "65+", value: 4, index: 23 },
];

const generateIncomeData = () => [
    { name: "<$30K", value: 11, index: 64 },
    { name: "$30K-$50K", value: 13, index: 87 },
    { name: "$50K-$75K", value: 14, index: 98 },
    { name: "$75K-$100K", value: 14, index: 111 },
    { name: "$100K-$150K", value: 24, index: 106 },
    { name: "$150K-$175K", value: 5, index: 126 },
    { name: "$175K-$200K", value: 7, index: 130 },
    { name: "$200K-$250K", value: 5, index: 134 },
    { name: "$250K+", value: 6, index: 139 },
];

const generateHouseholdSizeData = () => [
    { name: "1", value: 14, index: 44 },
    { name: "2", value: 31, index: 51 },
    { name: "3", value: 26, index: 144 },
    { name: "4", value: 14, index: 158 },
    { name: "5", value: 8, index: 171 },
    { name: "6+", value: 9, index: 186 },
];

const generateDonutData = (type: string) => {
    switch (type) {
        case "gender":
            return [
                { name: "Female", value: 49, fill: "#8b5cf6" }, // Violet
                { name: "Male", value: 51, fill: "#06b6d4" },   // Cyan
            ];
        case "ethnicity":
            return [
                { name: "White", value: 71, fill: "#f59e0b" }, // Amber
                { name: "Asian", value: 5, fill: "#06b6d4" },  // Cyan
                { name: "Hispanic", value: 11, fill: "#8b5cf6" }, // Violet
                { name: "African American", value: 8, fill: "#ec4899" }, // Pink
                { name: "Other", value: 5, fill: "#10b981" }, // Emerald
            ];
        case "marital":
            return [
                { name: "Single", value: 44, fill: "#8b5cf6" },
                { name: "Married", value: 56, fill: "#06b6d4" },
                { name: "Others", value: 0, fill: "#f59e0b" },
            ];
        case "children":
            return [
                { name: "Yes", value: 61, fill: "#06b6d4" },
                { name: "No", value: 39, fill: "#8b5cf6" },
                { name: "Others", value: 0, fill: "#f59e0b" },
            ];
        default:
            return [];
    }
};

const getAudienceData = (id: string) => {
    const defaultData = {
        name: "Buyers Of Hot Sauce-Dips And Hot Snacks Lookalike",
        size: "120.91M",
        status: "Active",
        type: "Lookalike",
        updatedBy: "Santiago Pacheco",
        updatedDate: "Dec 11, 2025",
        seedAudience: "Buyers of hot sauce-dips and hot snacks",
        seedSize: "63.27M",
        universe: "General Population",
        universeSize: "248.83M",
        spine: "NXS_US_PROD_ML_DB.LAL_INPUTS.SPINE_FOR_MODELING_2025_08_19",
        score: "0.5582",
        excluded: ["college_students_gender_female", "college_students_gender_male", "college_students_potentialstu...", "college_students_potentialstu..."],
        highlights: [
            { label: "30-34", sub: "13%", icon: <User className="h-5 w-5 text-slate-400" /> },
            { label: "are Male", sub: "51%", icon: <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">♂</div>, customIcon: true },
            { label: "Household Income", sub: "24%", prefix: "$100k-$150k", icon: <DollarSign className="h-5 w-5 text-slate-400" /> },
            { label: "are White", sub: "71%", icon: <User className="h-5 w-5 text-slate-400" /> },
            { label: "are Married", sub: "56%", icon: <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">⚭</div>, customIcon: true }, // Custom icon needed or lucide
            { label: "have Children", sub: "61%", icon: <Baby className="h-5 w-5 text-slate-400" /> },
            { label: "2 People In the Household", sub: "31%", icon: <Users className="h-5 w-5 text-slate-400" /> },
        ],
        charts: {
            age: generateAgeData(),
            income: generateIncomeData(),
            household: generateHouseholdSizeData(),
            gender: generateDonutData("gender"),
            ethnicity: generateDonutData("ethnicity"),
            marital: generateDonutData("marital"),
            children: generateDonutData("children"),
        }
    };

    if (id !== "1") {
        // Simple randomization for other IDs
        const randomFactor = Math.random();
        return {
            ...defaultData,
            name: id === "4" ? "M+F" : defaultData.name === "Buyers Of Hot Sauce..." ? "Generic Audience " + id : defaultData.name,
            size: (Math.random() * 200 + 50).toFixed(2) + "M",
            charts: {
                age: generateAgeData().map(d => ({ ...d, value: Math.floor(d.value * randomFactor + 5) })),
                income: generateIncomeData().map(d => ({ ...d, value: Math.floor(d.value * randomFactor + 5) })),
                household: generateHouseholdSizeData(),
                gender: [
                    { name: "Female", value: Math.floor(40 + Math.random() * 20), fill: "#8b5cf6" },
                    { name: "Male", value: 100 - Math.floor(40 + Math.random() * 20), fill: "#06b6d4" }
                ],
                ethnicity: generateDonutData("ethnicity"),
                marital: generateDonutData("marital"),
                children: generateDonutData("children"),
            }
        };
    }

    return defaultData;
};

const CLIENTS = [
    { name: "Demo Client", type: "Demo" },
    { name: "Omnicom", type: "" },
    { name: "Universal Demo Client", type: "" }
];

const HighlightCard = ({ item }: { item: any }) => (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4 min-w-[200px]">
        {item.customIcon ? item.icon : (
            <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center">
                {item.icon}
            </div>
        )}
        <div>
            <div className="flex items-baseline gap-1">
                {item.prefix && <span className="text-sm text-slate-500 font-medium">{item.prefix}</span>}
                <span className="text-xl font-bold text-slate-900">{item.sub}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium">{item.label}</div>
        </div>
    </div>
);

const CustomBarLabel = (props: any) => {
    const { x, y, width, value } = props;
    return (
        <text x={x + width / 2} y={y - 10} fill="#64748b" textAnchor="middle" fontSize={10} fontWeight={500}>
            {value}
        </text>
    );
};

const AudienceDetail = () => {
    const { audienceId } = useParams();
    const data = getAudienceData(audienceId || "1");
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
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                    <span>&gt;</span>
                    <Link to="/audience-console" className="hover:text-foreground transition-colors">Audience Console</Link>
                    <span>&gt;</span>
                    <Link to="/audience-console/build-analyze" className="hover:text-foreground transition-colors">Build & Analyze Audiences</Link>
                    <span>&gt;</span>
                    <span className="font-medium text-foreground">Demo Client</span>
                </div>

                {/* Header Section */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-baseline gap-3">
                        <h1 className="text-3xl font-bold text-slate-900">{data.name}</h1>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-sm text-slate-600 font-medium">
                            {data.size} <span className="text-[10px] border border-slate-300 px-0.5 rounded bg-white">IH</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 gap-2 rounded-full">
                            Create Report
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 rounded-full px-6">
                            Edit
                        </Button>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
                            Export
                        </Button>
                    </div>
                </div>

                {/* Main Tabs */}
                <Tabs defaultValue="persona" className="w-full space-y-6">
                    <TabsList className="bg-transparent h-auto p-0 border-b w-full justify-start rounded-none">
                        <TabsTrigger
                            value="summary"
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-slate-600 rounded-none px-4 py-2"
                        >
                            Audience Summary
                        </TabsTrigger>
                        <TabsTrigger
                            value="persona"
                            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-slate-600 rounded-none px-4 py-2"
                        >
                            Persona Dashboard
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="summary" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Audience Details Card */}
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg font-semibold text-slate-800">Audience Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <div className="text-sm text-slate-500 mb-1">Individuals</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-slate-900">{data.size}</span>
                                            <Badge variant="outline" className="text-[10px] text-slate-500 bg-white border-slate-200">ID</Badge>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Status</div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-medium text-slate-700">{data.status}</span>
                                                <Info className="h-4 w-4 text-slate-400" />
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Type</div>
                                            <div className="font-medium text-slate-700">{data.type}</div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Tag</div>
                                            <Button variant="outline" size="sm" className="h-6 text-xs border-dashed text-slate-500 gap-1 font-normal">
                                                <Plus className="h-3 w-3" />
                                                ADD TAG
                                            </Button>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Updated by</div>
                                            <div className="text-sm text-slate-700">
                                                {data.updatedBy} on {data.updatedDate}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Description</div>
                                            <div className="text-sm text-blue-600 hover:underline cursor-pointer">
                                                {/* @ts-ignore */}
                                                {data.description || "Add Description"}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm text-slate-500 mb-1">Market Brief</div>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="outline" size="sm" className="h-7 text-xs border-dashed text-slate-500 gap-1 font-normal w-full justify-start">
                                                        <Plus className="h-3 w-3" />
                                                        Add Market Brief
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 w-[300px]" align="start">
                                                    <Command>
                                                        <CommandInput placeholder="Search briefs..." />
                                                        <CommandList>
                                                            <CommandEmpty>No brief found.</CommandEmpty>
                                                            <CommandGroup heading="Market Briefs">
                                                                {initialClients.find(c => c.id === "1")?.marketBriefs?.map((brief) => (
                                                                    <CommandItem
                                                                        key={brief.id}
                                                                        value={brief.name}
                                                                        onSelect={() => {
                                                                            // Handle selection if needed, for now just UI
                                                                        }}
                                                                        className="text-xs"
                                                                    >
                                                                        {brief.name}
                                                                    </CommandItem>
                                                                ))}
                                                            </CommandGroup>
                                                        </CommandList>
                                                    </Command>
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Lookalike Audience Information Card */}
                            <Card className="border-slate-200 shadow-sm relative">
                                <div className="absolute top-4 right-4 flex gap-2">
                                    <Upload className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                                    <Share className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                                </div>
                                <CardHeader className="pb-2">
                                    <CardTitle className=" text-lg font-semibold text-slate-800">Lookalike Audience Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="border-b border-slate-100 pb-4">
                                            <div className="text-sm font-medium text-slate-700 mb-1">Seed Audience</div>
                                            <div className="flex items-center gap-2 text-sm text-orange-600">
                                                <span>{data.seedAudience} - [Size {data.seedSize}]</span>
                                                <ExternalLink className="h-3 w-3" />
                                            </div>
                                        </div>

                                        <div className="border-b border-slate-100 pb-4">
                                            <div className="text-sm font-medium text-slate-700 mb-1">Universe Audience</div>
                                            <div className="text-sm text-orange-600">
                                                {data.universe} - [Size {data.universeSize}]
                                            </div>
                                        </div>

                                        <div className="border-b border-slate-100 pb-4">
                                            <div className="text-sm font-medium text-slate-700 mb-1">Spine</div>
                                            <div className="text-sm text-slate-600 break-all font-mono">
                                                {data.spine}
                                            </div>
                                        </div>

                                        <div className="border-b border-slate-100 pb-4">
                                            <div className="text-sm font-medium text-slate-700 mb-1">Scores</div>
                                            <div className="text-sm text-slate-600">
                                                AUC_ROC - Score {data.score}
                                            </div>
                                        </div>

                                        <div>
                                            <div className="text-sm font-medium text-slate-700 mb-2">Excluded Attribute List</div>
                                            <div className="flex flex-wrap gap-2 text-xs text-slate-600">
                                                {data.excluded.map((attr, i) => (
                                                    <span key={i} className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
                                                        {attr}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Used In Section */}
                        <Card className="border-slate-200 shadow-sm mt-6">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-lg font-semibold text-slate-800">Used in</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-2">
                                    <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-full h-8 text-xs font-medium">Audiences</Button>
                                    <Button variant="ghost" className="text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-full h-8 text-xs font-medium">Reports</Button>
                                    <Button variant="ghost" className="text-slate-500 hover:bg-slate-50 hover:text-slate-700 rounded-full h-8 text-xs font-medium">Templates</Button>
                                </div>
                                <div className="h-32 flex items-center justify-center text-slate-400 text-sm italic">
                                    No linked items found
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="persona" className="space-y-8">
                        {/* Filter Button */}
                        <div>
                            <Button variant="outline" className="rounded-full gap-2 text-slate-600 h-8 border-slate-300">
                                <Filter className="h-3 w-3" />
                                Filter
                            </Button>
                        </div>

                        {/* Highlights Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 overflow-x-auto pb-2">
                            {/* @ts-ignore */}
                            {data.highlights.map((item, i) => (
                                <HighlightCard key={i} item={item} />
                            ))}
                        </div>

                        {/* Five-Year Range Chart */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-0">
                                <CardTitle className="text-base font-semibold text-slate-800">Five-Year Range</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px] w-full pt-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.charts.age} barSize={12}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#94a3b8' }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} label={<CustomBarLabel />}>
                                            {data.charts.age.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.index > 100 ? "#6366f1" : "#94a3b8"} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                                <div className="flex justify-center gap-6 mt-2 text-xs text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#6366f1]"></div>
                                        Index {'>'} 100
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-[#94a3b8]"></div>
                                        Index {'<='} 100
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Middle Row Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Gender */}
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-base font-semibold text-slate-800">Gender</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[250px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.charts.gender}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={0}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                {data.charts.gender.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                    {/* Custom Legend for Donut */}
                                    <div className="flex justify-center gap-6 text-xs text-slate-600 mt-[-20px]">
                                        {data.charts.gender.map((g, i) => (
                                            <div key={i} className="text-center">
                                                <div className="flex items-center justify-center gap-1 mb-0.5">
                                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: g.fill }}></div>
                                                    {g.name}
                                                </div>
                                                <div className="font-bold">{parseInt((g.value * 1.2).toString()) / 2}M</div>
                                                <div className="font-semibold">{g.value}%</div>
                                                <div className="text-slate-400">101</div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Household Income (Wide) */}
                            <Card className="border-slate-200 shadow-sm lg:col-span-2">
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-base font-semibold text-slate-800">Household Income</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[250px] w-full pt-4">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data.charts.income} barSize={12}>
                                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748b' }} dy={10} interval={0} />
                                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fontSize: 9, fill: '#94a3b8' }} />
                                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                            <Bar dataKey="value" radius={[4, 4, 0, 0]} label={<CustomBarLabel />}>
                                                {data.charts.income.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.index > 100 ? "#6366f1" : "grey"} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Third Row Charts */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Ethnicity */}
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-base font-semibold text-slate-800">Ethnicity</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.charts.ethnicity}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={0}
                                                dataKey="value"
                                            >
                                                {data.charts.ethnicity.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-[10px] text-slate-600 px-4">
                                        {data.charts.ethnicity.map((g, i) => (
                                            <div key={i} className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: g.fill }}></div>
                                                {g.name}
                                                <span className="font-bold">{g.value}%</span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Marital Status */}
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-base font-semibold text-slate-800">Marital Status</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.charts.marital}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={0}
                                                dataKey="value"
                                            >
                                                {data.charts.marital.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            {/* Presence Of Children */}
                            <Card className="border-slate-200 shadow-sm">
                                <CardHeader className="pb-0">
                                    <CardTitle className="text-base font-semibold text-slate-800">Presence Of Children</CardTitle>
                                </CardHeader>
                                <CardContent className="h-[250px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={data.charts.children}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                paddingAngle={0}
                                                dataKey="value"
                                            >
                                                {data.charts.children.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Bottom Row - People In Household */}
                        <Card className="border-slate-200 shadow-sm">
                            <CardHeader className="pb-0">
                                <CardTitle className="text-base font-semibold text-slate-800">People In Household</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[300px] w-full pt-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.charts.household} barSize={12}>
                                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} label={{ value: 'Percentage', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#94a3b8' }} />
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Bar dataKey="value" radius={[4, 4, 0, 0]} label={<CustomBarLabel />}>
                                            {data.charts.household.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.index > 100 ? "#6366f1" : "grey"} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </InteractMasterLayout>
    );
};

export default AudienceDetail;
