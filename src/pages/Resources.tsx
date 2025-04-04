
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Video, FileText, Search, Heart, Share, BookmarkPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";

// Mock data with expanded fields
const resources = [
  {
    id: 1,
    title: "Understanding Chemotherapy",
    type: "article",
    category: "treatment",
    description: "Learn about how chemotherapy works, what to expect, and how to manage side effects.",
    timeToRead: "10 min read",
    content: "Chemotherapy is a type of cancer treatment that uses drugs to kill cancer cells. It works by stopping or slowing the growth of cancer cells, which grow and divide quickly. However, it can also harm healthy cells that divide quickly, such as those that line your mouth and intestines, or cause your hair to grow. Damage to healthy cells may cause side effects. Often, side effects get better or go away after chemotherapy is over...",
    author: "Dr. Sarah Johnson",
    publishDate: "2023-05-12",
    tags: ["chemotherapy", "treatment", "side effects"]
  },
  {
    id: 2,
    title: "Nutrition During Cancer Treatment",
    type: "article",
    category: "lifestyle",
    description: "Dietary recommendations to help maintain strength and manage side effects during treatment.",
    timeToRead: "8 min read",
    content: "Good nutrition is especially important if you have cancer because both the illness and its treatments can affect your appetite. Cancer and cancer treatments can also affect your body's ability to tolerate certain foods and use nutrients. The nutrient needs of people with cancer vary from person to person...",
    author: "Emma Williams, RD",
    publishDate: "2023-07-18",
    tags: ["nutrition", "diet", "lifestyle"]
  },
  {
    id: 3,
    title: "Managing Treatment Side Effects",
    type: "video",
    category: "treatment",
    description: "Expert tips on dealing with common side effects from cancer treatments.",
    duration: "15:32",
    content: "https://example.com/videos/side-effects-management",
    presenter: "Dr. Michael Chen",
    publishDate: "2023-06-05",
    tags: ["side effects", "treatment", "management"]
  },
  {
    id: 4,
    title: "Talking to Your Family About Cancer",
    type: "article",
    category: "support",
    description: "Guidance on having difficult conversations with loved ones about your diagnosis and treatment.",
    timeToRead: "12 min read",
    content: "Deciding when and how to tell loved ones about a cancer diagnosis is a personal decision. For parents with young children, these conversations can be especially difficult. Though there is no one 'right way' to talk about cancer, there are some things to keep in mind...",
    author: "Lisa Thompson, LCSW",
    publishDate: "2023-04-22",
    tags: ["family", "communication", "support"]
  },
  {
    id: 5,
    title: "Meditation for Cancer Patients",
    type: "video",
    category: "wellness",
    description: "Guided meditation session specifically designed for cancer patients to reduce stress and anxiety.",
    duration: "20:45",
    content: "https://example.com/videos/guided-meditation",
    presenter: "Amanda Roberts, MSc",
    publishDate: "2023-08-03",
    tags: ["meditation", "stress", "wellness"]
  },
  {
    id: 6,
    title: "Exercise During Recovery",
    type: "article",
    category: "lifestyle",
    description: "Safe exercise recommendations during and after cancer treatment.",
    timeToRead: "7 min read",
    content: "Research has shown that exercise is not only safe during cancer treatment, but it can improve physical functioning and many aspects of quality of life. Moderate exercise has been shown to improve fatigue, anxiety, and self-esteem...",
    author: "David Miller, PT",
    publishDate: "2023-09-10",
    tags: ["exercise", "recovery", "lifestyle"]
  },
  {
    id: 7,
    title: "Understanding Your Treatment Plan",
    type: "pdf",
    category: "treatment",
    description: "Detailed guide to help you understand your personalized cancer treatment plan.",
    pages: "24 pages",
    content: "https://example.com/pdfs/treatment-plan-guide.pdf",
    author: "Cancer Treatment Centers of America",
    publishDate: "2023-02-15",
    tags: ["treatment plan", "guide", "personalized care"]
  },
  {
    id: 8,
    title: "Caregiver Self-Care Guide",
    type: "pdf",
    category: "support",
    description: "Essential tips for caregivers to maintain their own wellbeing while supporting a loved one.",
    pages: "15 pages",
    content: "https://example.com/pdfs/caregiver-guide.pdf",
    author: "National Cancer Support Network",
    publishDate: "2023-03-20",
    tags: ["caregiver", "self-care", "support"]
  },
  {
    id: 9,
    title: "Cancer Treatment Glossary",
    type: "pdf",
    category: "reference",
    description: "A comprehensive glossary of terms related to cancer diagnosis and treatment.",
    pages: "32 pages",
    content: "https://example.com/pdfs/cancer-glossary.pdf",
    author: "American Cancer Society",
    publishDate: "2023-01-05",
    tags: ["glossary", "terminology", "reference"]
  },
];

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [savedResources, setSavedResources] = useState<number[]>([]);
  const [selectedResource, setSelectedResource] = useState<any>(null);
  const [isResourceDetailOpen, setIsResourceDetailOpen] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Load saved resources from localStorage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem("embrace-saved-resources");
    if (savedItems) {
      setSavedResources(JSON.parse(savedItems));
    }
  }, []);

  // Save to localStorage whenever savedResources changes
  useEffect(() => {
    localStorage.setItem("embrace-saved-resources", JSON.stringify(savedResources));
  }, [savedResources]);

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

  const toggleSaveResource = (id: number) => {
    setSavedResources(prev => {
      if (prev.includes(id)) {
        toast({
          title: "Resource removed",
          description: "Resource has been removed from your saved items",
        });
        return prev.filter(resourceId => resourceId !== id);
      } else {
        toast({
          title: "Resource saved",
          description: "Resource has been saved to your collection",
        });
        return [...prev, id];
      }
    });
  };

  const handleViewResource = (resource: any) => {
    setSelectedResource(resource);
    setIsResourceDetailOpen(true);
  };

  const shareResource = (resource: any) => {
    // In a real app, this would use the Web Share API
    navigator.clipboard.writeText(`Check out this resource: ${resource.title} - Embrace Health App`);
    toast({
      title: "Link copied",
      description: "Resource link copied to clipboard",
    });
  };

  // Get recommended resources based on category
  const getRecommendedResources = (category: string) => {
    if (category === "all") {
      return resources.slice(0, 3);
    }
    
    const categoryResources = resources.filter(resource => resource.category === category);
    return categoryResources.slice(0, Math.min(categoryResources.length, 3));
  };

  const recommendedResources = getRecommendedResources(activeCategory);

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

            {/* Recommended resources section */}
            {recommendedResources.length > 0 && activeCategory !== "all" && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recommended for you</h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {recommendedResources.map((resource) => (
                    <Card key={`rec-${resource.id}`} className="bg-muted/30 hover:bg-muted/50 transition-colors">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge variant="outline" className="mb-2">Recommended</Badge>
                          <div className="flex space-x-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6" 
                              onClick={() => toggleSaveResource(resource.id)}
                            >
                              {savedResources.includes(resource.id) ? (
                                <Heart className="h-4 w-4 fill-embrace-400 text-embrace-400" />
                              ) : (
                                <Heart className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-md">{resource.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => handleViewResource(resource)}
                        >
                          Quick View
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

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
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className={`h-8 w-8 ${savedResources.includes(resource.id) ? 'text-embrace-400' : ''}`}
                          onClick={() => toggleSaveResource(resource.id)}
                        >
                          {savedResources.includes(resource.id) ? (
                            <Heart className="h-4 w-4 fill-embrace-400" />
                          ) : (
                            <Heart className="h-4 w-4" />
                          )}
                        </Button>
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
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => shareResource(resource)}>
                            <Share className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" onClick={() => handleViewResource(resource)}>View</Button>
                        </div>
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

      {/* Resource Detail Dialog */}
      <Dialog open={isResourceDetailOpen} onOpenChange={setIsResourceDetailOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          {selectedResource && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getResourceIcon(selectedResource.type)}
                  {selectedResource.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedResource.type === "article" && <span className="text-muted-foreground">{selectedResource.timeToRead}</span>}
                  {selectedResource.type === "video" && <span className="text-muted-foreground">Video: {selectedResource.duration}</span>}
                  {selectedResource.type === "pdf" && <span className="text-muted-foreground">PDF: {selectedResource.pages}</span>}
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-2">
                {selectedResource.tags && (
                  <div className="flex flex-wrap gap-2">
                    {selectedResource.tags.map((tag: string) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
                
                {selectedResource.type === "article" && (
                  <div className="prose prose-sm max-w-none">
                    <p>{selectedResource.content}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      By {selectedResource.author} • Published on {new Date(selectedResource.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                {selectedResource.type === "video" && (
                  <div className="space-y-4">
                    <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                      <Video className="h-12 w-12 text-muted-foreground" />
                      <span className="ml-2">Video Preview</span>
                    </div>
                    <p className="text-sm">
                      Presented by {selectedResource.presenter} • Published on {new Date(selectedResource.publishDate).toLocaleDateString()}
                    </p>
                  </div>
                )}
                
                {selectedResource.type === "pdf" && (
                  <div className="space-y-4">
                    <div className="aspect-[3/4] max-h-[400px] bg-muted rounded-md flex items-center justify-center">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                      <span className="ml-2">PDF Preview</span>
                    </div>
                    <p className="text-sm">
                      By {selectedResource.author} • Published on {new Date(selectedResource.publishDate).toLocaleDateString()}
                    </p>
                    <Button className="w-full">
                      <FileText className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                )}
                
                <div className="flex justify-between pt-4">
                  <Button 
                    variant={savedResources.includes(selectedResource.id) ? "default" : "outline"}
                    onClick={() => toggleSaveResource(selectedResource.id)}
                  >
                    {savedResources.includes(selectedResource.id) ? (
                      <>
                        <Heart className="h-4 w-4 mr-2 fill-white" />
                        Saved
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save for Later
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => shareResource(selectedResource)}>
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Resources;
