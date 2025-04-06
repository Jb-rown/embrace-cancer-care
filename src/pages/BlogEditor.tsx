
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { blogService } from "@/services/supabaseService";
import { toast } from "sonner";
import { BlogPost } from "./Blog";
import { useAuth } from "@/contexts/AuthContext";

const BlogEditor = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    content: "",
    image_url: "",
    featured: false
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;
      
      try {
        const post = await blogService.getBlogPostById(id);
        setFormData({
          title: post.title,
          summary: post.summary,
          content: post.content,
          image_url: post.image_url || "",
          featured: post.featured
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post");
        setLoading(false);
      }
    };

    if (isEditing) {
      fetchBlogPost();
    }
  }, [id, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, featured: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.summary || !formData.content) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setSaving(true);
    
    try {
      const postData: Partial<BlogPost> = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        featured: formData.featured,
        author: user?.name || "Anonymous",
        published_at: new Date().toISOString(),
      };
      
      if (formData.image_url) {
        postData.image_url = formData.image_url;
      }
      
      if (isEditing && id) {
        await blogService.updateBlogPost(id, postData);
        toast.success("Blog post updated successfully");
      } else {
        await blogService.addBlogPost(postData as BlogPost);
        toast.success("Blog post created successfully");
      }
      
      navigate("/blog");
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-4xl py-12 px-4 md:px-6">
          <Button 
            onClick={() => navigate("/blog")} 
            variant="ghost" 
            className="pl-0 mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
          
          <h1 className="text-3xl font-bold tracking-tight mb-8">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>
          
          {loading ? (
            <div className="text-center py-12">Loading post data...</div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter post title"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Summary *</Label>
                <Textarea
                  id="summary"
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  required
                  placeholder="Enter a brief summary"
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  placeholder="Write your blog post content here"
                  className="min-h-[300px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="image_url">Image URL</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  placeholder="Enter image URL (optional)"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="featured" 
                  checked={formData.featured}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="featured" className="font-normal">
                  Feature this post
                </Label>
              </div>
              
              <div className="pt-4">
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-embrace-500 hover:bg-embrace-600"
                  disabled={saving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save Post"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogEditor;
