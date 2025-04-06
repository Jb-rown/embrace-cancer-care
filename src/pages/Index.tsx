
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { CalendarCheck, HeartPulse, BookOpen, Users, Shield, FilePlus, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { blogService } from "@/services/supabaseService";
import { BlogPost } from "./Blog";

const Index = () => {
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  
  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const posts = await blogService.getBlogPosts();
        // Get only the 3 most recent posts
        setRecentPosts(posts.slice(0, 3));
        setLoadingPosts(false);
      } catch (error) {
        console.error("Error fetching recent blog posts:", error);
        setLoadingPosts(false);
      }
    };
    
    fetchRecentPosts();
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-embrace-100 px-3 py-1 text-sm text-embrace-700">
                  Introducing Embrace
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
                  Compassionate Cancer Care Management
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Track symptoms, manage treatments, and access educational resources—all in one place. 
                  Your journey, supported with care.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/signup">
                    <Button size="lg" className="bg-embrace-500 hover:bg-embrace-600">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/about">
                    <Button variant="outline" size="lg">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Healthcare professionals supporting a patient"
                  className="rounded-lg object-cover w-full max-w-[500px] shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Comprehensive Cancer Management
            </h2>
            <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
              Embrace provides the tools needed to navigate your cancer journey with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="feature-card">
              <CardHeader className="pb-2">
                <HeartPulse className="h-10 w-10 text-embrace-400 mb-2" />
                <CardTitle>Symptom Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Log and monitor your symptoms over time, providing valuable data for your healthcare team.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="pb-2">
                <CalendarCheck className="h-10 w-10 text-embrace-400 mb-2" />
                <CardTitle>Treatment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Keep track of your medication schedule, appointments, and treatment progress all in one place.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="pb-2">
                <BookOpen className="h-10 w-10 text-embrace-400 mb-2" />
                <CardTitle>Educational Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access a curated library of articles, videos, and resources to better understand your condition.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="pb-2">
                <Users className="h-10 w-10 text-embrace-400 mb-2" />
                <CardTitle>Caregiver Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Tools for caregivers to coordinate care, manage tasks, and support their loved ones effectively.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="pb-2">
                <Shield className="h-10 w-10 text-embrace-400 mb-2" />
                <CardTitle>Personalized Plans</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Customized care plans based on your specific condition, treatment regimen, and personal needs.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="feature-card">
              <CardHeader className="pb-2">
                <FilePlus className="h-10 w-10 text-embrace-400 mb-2" />
                <CardTitle>Progress Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Generate reports to share with your healthcare team, helping them make informed decisions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-embrace-50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Latest From Our Blog
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Stay informed with our latest articles and insights on cancer care.
              </p>
            </div>

            {loadingPosts ? (
              <div className="text-center py-8">Loading latest posts...</div>
            ) : recentPosts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">No blog posts available yet.</p>
                <Link to="/blog">
                  <Button variant="outline">Visit Our Blog</Button>
                </Link>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {recentPosts.map((post) => (
                    <Card key={post.id} className="h-full flex flex-col">
                      {post.image_url && (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={post.image_url}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{post.summary}</p>
                      </CardContent>
                      <div className="p-6 pt-0">
                        <Link to={`/blog/${post.id}`}>
                          <Button variant="ghost" className="p-0 h-auto text-embrace-500 hover:text-embrace-600">
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/blog">
                    <Button className="bg-embrace-500 hover:bg-embrace-600">
                      View All Blog Posts
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Trusted by Patients and Professionals
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-border">
                <CardContent className="pt-6">
                  <p className="mb-4 italic text-muted-foreground">
                    "Embrace has transformed how I manage my treatment. The symptom tracker helps me communicate better with my doctor."
                  </p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-muted-foreground">Breast Cancer Survivor</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-border">
                <CardContent className="pt-6">
                  <p className="mb-4 italic text-muted-foreground">
                    "As an oncologist, I appreciate how Embrace helps my patients stay organized and provides me with valuable insights."
                  </p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="font-medium">Dr. Michael Chen</p>
                      <p className="text-sm text-muted-foreground">Oncologist</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-border">
                <CardContent className="pt-6">
                  <p className="mb-4 italic text-muted-foreground">
                    "The caregiver tools have been invaluable in helping me coordinate care for my father during his cancer treatment."
                  </p>
                  <div className="flex items-center">
                    <div className="ml-4">
                      <p className="font-medium">Kevin Rodriguez</p>
                      <p className="text-sm text-muted-foreground">Caregiver</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16 px-4 md:px-6">
          <div className="rounded-2xl bg-embrace-500 p-8 md:p-12 shadow-lg">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                  Begin Your Journey Today
                </h2>
                <p className="text-embrace-50 md:text-lg">
                  Join thousands of patients, caregivers, and healthcare professionals using Embrace to manage cancer care more effectively.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-[400px]:flex-row items-center justify-center lg:justify-end">
                <Link to="/signup">
                  <Button size="lg" className="bg-white text-embrace-600 hover:bg-embrace-50">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-embrace-600">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
