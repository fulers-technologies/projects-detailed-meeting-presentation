"use client";

import { Header } from "@/components/header";
import { ProjectCard } from "@/components/project-card";
import { PortfolioOverviewChart } from "@/components/portfolio-overview-chart";
import { GradientHero } from "@/components/gradient-hero";
import { StatCard } from "@/components/stat-card";
import companyData from "@/data/company.json";
import imsData from "@/data/ims.json";
import mngoData from "@/data/mngo.json";
import aiVisionData from "@/data/ai-vision.json";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Target, TrendingUp, Calendar, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const company = companyData;
  const projects = [imsData, mngoData, aiVisionData];

  const stats = {
    totalProjects: projects.length,
    avgProgress: Math.round(
      projects.reduce((acc, p) => acc + p.progress, 0) / projects.length,
    ),
    activeProjects: projects.filter((p) => p.status === "In Progress").length,
    totalTeamMembers: projects.reduce(
      (acc, p) =>
        acc +
        p.resources.team.reduce((sum, m) => {
          if (!m) return sum;
          const count = (m as { count?: number }).count ?? 1;
          return sum + count;
        }, 0),
      0,
    ),
  };

  const statusBreakdown = {
    "In Progress": projects.filter((p) => p.status === "In Progress").length,
    Planning: projects.filter((p) => p.status === "Planning").length,
    "Near Completion": projects.filter((p) => p.status === "Near Completion")
      .length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative">
        {/* Hero Section with Gradient */}
        <GradientHero
          title="Fulers Technologies LLC"
          subtitle="Advanced Technology Solutions"
          badge="Board Presentation"
        >
          <div className="mb-6">
            <p className="text-lg text-muted-foreground italic">
              &ldquo;{company.description}&rdquo;
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {company.focus.map((area) => (
              <Badge
                key={area}
                variant="secondary"
                className="text-sm px-4 py-1.5"
              >
                {area}
              </Badge>
            ))}
          </div>
        </GradientHero>

        <div className="container mx-auto px-6 py-12">
          {/* Stats Overview with Enhanced Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Projects"
              value={stats.totalProjects}
              icon={Target}
              gradient="from-primary/10 to-primary/5"
            />
            <StatCard
              title="Active Projects"
              value={stats.activeProjects}
              icon={Rocket}
              gradient="from-primary/10 to-primary/5"
            />
            <StatCard
              title="Average Progress"
              value={`${stats.avgProgress}%`}
              icon={TrendingUp}
              gradient="from-primary/10 to-primary/5"
            />
            <StatCard
              title="Team Members"
              value={stats.totalTeamMembers}
              icon={Users}
              gradient="from-primary/10 to-primary/5"
            />
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
              <TabsTrigger value="projects">All Projects</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              >
                {/* Portfolio Chart */}
                <PortfolioOverviewChart projects={projects} />

                {/* Status Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Project Status</CardTitle>
                    <CardDescription>
                      Current status distribution
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(statusBreakdown).map(([status, count]) => (
                      <div key={status} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{status}</span>
                          <span className="text-sm text-muted-foreground">
                            {count} project{count !== 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${(count / projects.length) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Upcoming Milestones */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Upcoming Milestones
                      </CardTitle>
                      <CardDescription>
                        Key deliverables across all projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-start gap-4 pb-4 border-b last:border-0"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold text-primary">
                                  {project.name}
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {new Date(
                                    project.timeline.expectedDelivery,
                                  ).toLocaleDateString("en-US", {
                                    month: "short",
                                    year: "numeric",
                                  })}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {project.fullName}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-primary">
                                {project.progress}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Complete
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <footer className="border-t mt-20 py-8">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Fulers Technologies LLC. All rights
            reserved.
          </p>
          <p className="mt-2">Confidential Board Presentation</p>
        </div>
      </footer>
    </div>
  );
}
