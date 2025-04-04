
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Search } from "lucide-react";

// Mock data
const resources = [
  {
    id: 1,
    title: "Understanding Chemotherapy",
    type: "article",
    category: "treatment",
    description: "Learn about how chemotherapy works, what to expect, and how to manage side effects.",
    timeToRead: "10 min read",
  },
  {
    id: 2,
    title: "Nutrition During Cancer Treatment",
    type: "article",
    category: "lifestyle",
    description: "Dietary recommendations to help maintain strength and manage side effects during treatment.",
    timeToRead: "8 min read",
  },
  {
    id: 3,
    title: "Managing Treatment Side Effects",
    type: "video",
    category: "treatment",
    description: "Expert tips on dealing with common side effects from cancer treatments.",
    duration: "15:32",
  },
  {
    id: 4,
    title: "Talking to Your Family About Cancer",
    type: "article",
    category: "support",
    description: "Guidance on having difficult conversations with loved ones about your diagnosis and treatment.",
    timeToRead: "12 min read",
  },
  {
    id: 5,
    title: "Meditation for Cancer Patients",
    type: "video",
    category: "wellness",
    description: "Guided meditation session specifically designed for cancer patients to reduce stress and anxiety.",
    duration: "20:45",
  },
  {
    id: 6,
    title: "Exercise During Recovery",
    type: "article",
    category: "lifestyle",
    description: "Safe exercise recommendations during and after cancer treatment.",
    timeToRead: "7 min read",
  },
  {
    id: 7,
    title: "Understanding Your Treatment Plan",
    type: "pdf",
    category: "treatment",
    description: "Detailed guide to help you understand your personalized cancer treatment plan.",
    pages: "24 pages",
  },
  {
    id: 8,
    title: "Caregiver Self-Care Guide",
    type: "pdf",
    category: "support",
    description: "Essential tips for caregivers to maintain their own wellbeing while supporting a loved one.",
    pages: "15 pages",
  },
  {
    id: 9,
    title: "Cancer Treatment Glossary",
    type: "pdf",
    category: "reference",
    description: "A comprehensive glossary of terms related to cancer diagnosis and treatment.",
    pages: "32 pages",
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen className="h-5 w-5 text-embrace-400" />;
      case "video":
        return <Video className="h-5 w-5 text-warm-500" />;
      case "pdf":
        return <FileText className="h-5 w-5 text-embrace-600" />;
      default:
        return <BookOpen className="h-5 w-5 text-embrace-400" />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar role="patient" />
      <div className="flex-1 overflow-auto">
        <main className="p-6">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Educational Resources</h1>
          <p className="text-muted-foreground mb-6">
            Access a curated library of articles, videos, and guides to better understand cancer and its treatment.
          </p>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search resources..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveCategory}>
            <div className="border-b mb-6">
              <TabsList className="w-full justify-start bg-transparent">
                <TabsTrigger value="all" className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-embrace-400 rounded-none">
                  All
                </TabsTrigger>
                <TabsTrigger value="treatment" className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-embrace-400 rounded-none">
                  Treatment
                </TabsTrigger>
                <TabsTrigger value="lifestyle" className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-embrace-400 rounded-none">
                  Lifestyle
                </TabsTrigger>
                <TabsTrigger value="wellness" className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-embrace-400 rounded-none">
                  Wellness
                </TabsTrigger>
                <TabsTrigger value="support" className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-embrace-400 rounded-none">
                  Support
                </TabsTrigger>
                <TabsTrigger value="reference" className="data-[state=active]:bg-background data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-embrace-400 rounded-none">
                  Reference
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3 pt-5">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          {getResourceIcon(resource.type)}
                          <CardTitle className="text-lg">{resource.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription className="pt-1">{resource.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-muted-foreground">
                          {resource.type === "article" && <span>{resource.timeToRead}</span>}
                          {resource.type === "video" && <span>{resource.duration}</span>}
                          {resource.type === "pdf" && <span>{resource.pages}</span>}
                        </div>
                        <Button size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No resources found matching your search.</p>
                </div>
              )}
            </TabsContent>

            {/* We use the same component for all tabs, as the filtering is done through the activeCategory state */}
            <TabsContent value="treatment" className="mt-0">
              {/* Content is controlled by the filtering logic */}
            </TabsContent>
            <TabsContent value="lifestyle" className="mt-0">
              {/* Content is controlled by the filtering logic */}
            </TabsContent>
            <TabsContent value="wellness" className="mt-0">
              {/* Content is controlled by the filtering logic */}
            </TabsContent>
            <TabsContent value="support" className="mt-0">
              {/* Content is controlled by the filtering logic */}
            </TabsContent>
            <TabsContent value="reference" className="mt-0">
              {/* Content is controlled by the filtering logic */}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Resources;
