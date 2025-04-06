
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Calendar, User, ArrowLeft, Edit, Trash2, ThumbsUp, Share, MessageCircle } from "lucide-react";
import { blogService } from "@/services/supabaseService";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { BlogPost as BlogPostType } from "./Blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;
      
      try {
        const fetchedPost = await blogService.getBlogPostById(id);
        setPost(fetchedPost);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post");
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    
    try {
      await blogService.deleteBlogPost(id);
      toast.success("Blog post deleted successfully");
      navigate("/blog");
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast.error("Failed to delete blog post");
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikeCount(prev => Math.max(0, prev - 1));
      setHasLiked(false);
      toast.success("Like removed");
    } else {
      setLikeCount(prev => prev + 1);
      setHasLiked(true);
      toast.success("Post liked!");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title || "Blog Post",
        text: post?.summary || "Check out this blog post",
        url: window.location.href,
      })
      .then(() => toast.success("Post shared successfully"))
      .catch(error => console.error("Error sharing post", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const isHealthcareProfessional = user && user.role === "healthcare";

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {loading ? (
          <div className="container py-20 text-center">Loading post...</div>
        ) : !post ? (
          <div className="container py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <Button onClick={() => navigate("/blog")} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </div>
        ) : (
          <article className="container max-w-4xl py-12 px-4 md:px-6">
            <div className="mb-6">
              <Button 
                onClick={() => navigate("/blog")} 
                variant="ghost" 
                className="pl-0 mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
              
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="mr-1 h-4 w-4" />
                  {format(new Date(post.published_at), "MMMM d, yyyy")}
                </div>
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  {post.author}
                </div>
              </div>
              
              {isHealthcareProfessional && (
                <div className="flex gap-2 mb-6">
                  <Button 
                    onClick={() => navigate(`/blog/edit/${post.id}`)} 
                    variant="outline" 
                    size="sm"
                    className="flex items-center"
                  >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </Button>
                  <Button 
                    onClick={() => setDeleteDialogOpen(true)} 
                    variant="destructive" 
                    size="sm"
                    className="flex items-center"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </Button>
                </div>
              )}
              
              {post.image_url && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img 
                    src={post.image_url} 
                    alt={post.title} 
                    className="w-full h-auto object-cover max-h-[400px]"
                  />
                </div>
              )}
              
              <Separator className="my-6" />
              
              <div className="prose prose-slate max-w-none">
                {post.content.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>

              <div className="flex items-center justify-between mt-8 pt-4 border-t">
                <div className="flex items-center gap-4">
                  <Button 
                    onClick={handleLike} 
                    variant="ghost" 
                    className={`flex items-center gap-2 ${hasLiked ? 'text-blue-500' : ''}`}
                  >
                    <ThumbsUp className="h-4 w-4" /> {likeCount > 0 ? likeCount : ''} Like
                  </Button>
                  <Button 
                    onClick={() => navigate(`/blog/${post.id}#comments`)} 
                    variant="ghost" 
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" /> Comment
                  </Button>
                </div>
                <Button 
                  onClick={handleShare} 
                  variant="ghost" 
                  className="flex items-center gap-2"
                >
                  <Share className="h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </article>
        )}
        
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this blog post? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-500 hover:bg-red-600">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
