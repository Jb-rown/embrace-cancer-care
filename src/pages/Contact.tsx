
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Mail, MapPin, SendIcon } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you soon.", {
        duration: 5000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-embrace-50 py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Contact Us
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Have questions or need support? We're here to help you navigate your cancer care
                journey.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number (Optional)</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we help you?"
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-embrace-500 hover:bg-embrace-600"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          Sending... <span className="ml-2 animate-spin">●</span>
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <SendIcon className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">Contact Information</h3>
                  <p className="mt-2 text-muted-foreground">
                    Reach out to us through any of these channels.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="mr-4 h-6 w-6 text-embrace-400" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="mt-1 text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday, 9am - 5pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="mr-4 h-6 w-6 text-embrace-400" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="mt-1 text-muted-foreground">support@embrace-care.com</p>
                      <p className="text-sm text-muted-foreground">
                        We aim to respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="mr-4 h-6 w-6 text-embrace-400" />
                    <div>
                      <h4 className="font-medium">Office Location</h4>
                      <p className="mt-1 text-muted-foreground">
                        123 Healthcare Avenue
                        <br />
                        Suite 200
                        <br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="bg-embrace-50 border-embrace-100">
                  <CardContent className="p-6">
                    <h4 className="font-medium mb-2">Need Immediate Support?</h4>
                    <p className="text-muted-foreground mb-4">
                      For urgent medical concerns, please contact your healthcare provider directly
                      or call 911 in case of emergency.
                    </p>
                    <p className="text-muted-foreground">
                      For technical support with the Embrace platform, please call our dedicated
                      support line at +1 (555) 987-6543.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-embrace-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Frequently Asked Questions</h2>
              <p className="mt-4 text-muted-foreground">
                Find quick answers to common questions about Embrace.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>How do I create an account?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Click on the "Sign Up" button in the top right corner of the homepage. Follow the
                    steps to create your profile and select whether you're a patient, caregiver, or
                    healthcare professional.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Is my health data secure?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, we take data security very seriously. All personal and health information is
                    encrypted and stored securely in compliance with healthcare privacy regulations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Can I use Embrace on my mobile device?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes, Embrace is fully responsive and works on smartphones, tablets, and desktop
                    computers. Simply visit our website on your device's browser.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>How do I connect with my healthcare team?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Once you've created an account, you can invite your healthcare providers to
                    connect with you through Embrace. They'll receive an email with instructions on
                    how to join your care team.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
