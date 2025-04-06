
import { useEffect, useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Calendar, User } from "lucide-react";
import { blogService } from "@/services/supabaseService";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export type BlogPost = {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  published_at: string;
  featured: boolean;
  image_url?: string;
};

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await blogService.getBlogPosts();
        setBlogPosts(posts);
        
        // Find featured post
        const featured = posts.find(post => post.featured);
        if (featured) {
          setFeaturedPost(featured);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
        toast.error("Failed to load blog posts");
        setLoading(false);
      }
    };

    fetchBlogPosts();

    // Set up realtime subscription for blog posts
    const subscription = blogService.subscribeToBlogChanges((payload) => {
      fetchBlogPosts();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCreatePost = () => {
    navigate("/blog/create");
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-embrace-50 py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Embrace Cancer Care Blog
              </h1>
              <p className="mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Insights, stories, and resources to support you on your cancer care journey.
              </p>
              {user && user.role === "healthcare" && (
                <Button 
                  onClick={handleCreatePost} 
                  className="mt-6 bg-embrace-500 hover:bg-embrace-600"
                >
                  Create New Post
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        {featuredPost && (
          <section className="py-12">
            <div className="container px-4 md:px-6">
              <h2 className="mb-8 text-2xl font-semibold">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredPost.image_url && (
                    <div className="h-full">
                      <img 
                        src={featuredPost.image_url} 
                        alt={featuredPost.title}
                        className="h-full w-full object-cover rounded-l-lg"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="text-2xl mb-2">{featuredPost.title}</CardTitle>
                      <CardDescription className="text-lg">{featuredPost.summary}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 pb-4">
                      <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-4 w-4" />
                          {format(new Date(featuredPost.published_at), "MMM d, yyyy")}
                        </div>
                        <div className="flex items-center">
                          <User className="mr-1 h-4 w-4" />
                          {featuredPost.author}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0">
                      <Link to={`/blog/${featuredPost.id}`}>
                        <Button variant="default" className="bg-embrace-500 hover:bg-embrace-600">
                          Read Article
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            </div>
          </section>
        )}

        {/* Blog Posts Grid */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-semibold">Latest Articles</h2>
            {loading ? (
              <div className="text-center py-12">Loading blog posts...</div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-12">No blog posts available yet.</div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col">
                    {post.image_url && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={post.image_url} 
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="flex gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          {format(new Date(post.published_at), "MMM d, yyyy")}
                        </span>
                        <span className="flex items-center">
                          <User className="mr-1 h-3 w-3" />
                          {post.author}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
                    </CardContent>
                    <CardFooter>
                      <Link to={`/blog/${post.id}`}>
                        <Button variant="ghost" className="p-0 h-auto text-embrace-500 hover:text-embrace-600">
                          Read More <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
