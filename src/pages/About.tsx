
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PieChart, Users, HandHeart, BookOpen, Hospital } from "lucide-react";

const About = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-embrace-50 py-16 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                About Embrace
              </h1>
              <p className="mt-4 text-lg text-muted-foreground md:text-xl">
                Empowering patients, caregivers, and healthcare professionals through compassionate
                cancer care management.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter">Our Mission</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  At Embrace, our mission is to transform the cancer care experience by providing
                  intuitive tools that enhance communication, streamline care management, and foster
                  a supportive community for everyone involved in the cancer journey.
                </p>
                <p className="mt-4 text-lg text-muted-foreground">
                  We believe that better tools lead to better care outcomes, reduced stress, and an
                  improved quality of life for patients and their support networks.
                </p>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
                  alt="Healthcare professionals in discussion"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-embrace-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Core Values</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                The principles that guide our approach to cancer care management.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <HandHeart className="h-12 w-12 text-embrace-400 mb-2" />
                  <CardTitle>Compassion</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We approach every feature and interaction with genuine care, understanding the
                    emotional challenges of the cancer journey.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <PieChart className="h-12 w-12 text-embrace-400 mb-2" />
                  <CardTitle>Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We prioritize precise data collection and reliable information to ensure the
                    highest quality of care decisions.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <Users className="h-12 w-12 text-embrace-400 mb-2" />
                  <CardTitle>Inclusivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We design our platform to serve the diverse needs of patients, caregivers, and
                    healthcare professionals.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <BookOpen className="h-12 w-12 text-embrace-400 mb-2" />
                  <CardTitle>Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    We believe in empowering users through knowledge, providing accessible and
                    reliable educational resources.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Team</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A dedicated group of healthcare professionals, technologists, and cancer care
                advocates working together to improve cancer care management.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-embrace-100">
                    <img
                      src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
                      alt="Dr. Sarah Johnson"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle className="mt-4">Dr. Sarah Johnson</CardTitle>
                  <CardDescription>Chief Medical Officer</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Oncologist with 15+ years of experience, passionate about improving patient care
                    through technology.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-embrace-100">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
                      alt="Michael Chen"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle className="mt-4">Michael Chen</CardTitle>
                  <CardDescription>Chief Technology Officer</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Healthcare technology expert dedicated to creating intuitive digital solutions
                    for complex healthcare challenges.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader className="text-center">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-embrace-100">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1287&q=80"
                      alt="Dr. Elena Rodriguez"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardTitle className="mt-4">Dr. Elena Rodriguez</CardTitle>
                  <CardDescription>Head of Patient Experience</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground">
                    Clinical psychologist specializing in supporting patients through their cancer
                    journey.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="bg-embrace-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter">Our Partners</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Working together with leading healthcare organizations to transform cancer care.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex items-center justify-center p-4">
                <Hospital className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 font-medium">Metro Hospital</span>
              </div>
              <div className="flex items-center justify-center p-4">
                <Hospital className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 font-medium">City Medical</span>
              </div>
              <div className="flex items-center justify-center p-4">
                <Hospital className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 font-medium">Hope Institute</span>
              </div>
              <div className="flex items-center justify-center p-4">
                <Hospital className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 font-medium">Wellness Center</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
