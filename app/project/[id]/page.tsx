import { notFound } from "next/navigation";
import Link from "next/link";
import { readFile } from "fs/promises";
import { join } from "path";
import { Header } from "@/components/header";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AnimatedProgressWithLabel } from "@/components/animated-progress-with-label";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectTimelineChart } from "@/components/project-timeline-chart";
import { ResourceAllocationChart } from "@/components/resource-allocation-chart";
import { MermaidDiagram } from "@/components/mermaid-diagram";
import imsData from "@/data/ims.json";
import mngoData from "@/data/mngo.json";
import aiVisionData from "@/data/ai-vision.json";
import {
  ArrowLeft,
  Calendar,
  Users,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lightbulb,
  Camera,
  Network,
} from "lucide-react";
import Image from "next/image";

// Project emoji mapping
const projectEmojis = {
  ims: "🔍",
  mngo: "🎫",
  "ai-vision": "📹",
};

const projectsMap: Record<string, any> = {
  ims: imsData,
  mngo: mngoData,
  "ai-vision": aiVisionData,
};

export async function generateStaticParams() {
  return Object.keys(projectsMap).map((id) => ({
    id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projectsMap[id];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} - ${project.fullName} | Fuelers Technologies`,
    description: project.description,
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projectsMap[id];

  if (!project) {
    notFound();
  }

  const brandColor = project.brandColor || "#1D4DFF";

  // Load diagram if available
  let diagramContent = "";
  if (project.diagram?.path) {
    try {
      const diagramPath = join(process.cwd(), project.diagram.path);
      diagramContent = await readFile(diagramPath, "utf-8");
    } catch (error) {
      console.error("Error loading diagram:", error);
    }
  }

  const phaseStatusColors = {
    completed: "success",
    "in-progress": "default",
    upcoming: "secondary",
  } as const;

  const projectEmoji = projectEmojis[id as keyof typeof projectEmojis] || "🔍";

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative">
        {/* Project Hero with Brand Color Gradient */}
        <div className="relative overflow-hidden bg-linear-to-b from-muted/30 via-background to-background">
          {/* Subtle Radial Gradient Orbs with Brand Color */}
          <div
            className="absolute top-0 right-1/4 w-125 h-125 rounded-full blur-[120px] opacity-20"
            style={{ backgroundColor: brandColor }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-125 h-125 rounded-full blur-[120px] opacity-15"
            style={{ backgroundColor: brandColor }}
          />

          {/* Content */}
          <div className="relative container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Left Column - Text Content */}
              <div>
                {/* Back Button and Status Badge */}
                <div className="flex items-start justify-between mb-8">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Portfolio
                  </Link>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <div
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold"
                    style={{
                      backgroundColor: `${brandColor}1A`,
                      borderColor: `${brandColor}33`,
                      color: brandColor,
                    }}
                  >
                    {project.status}
                  </div>
                </div>

                {/* Project Title */}
                <h1
                  className="text-5xl md:text-7xl font-extrabold mb-6"
                  style={{ color: brandColor }}
                >
                  {project.name}
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-4">
                  {project.fullName}
                </p>
                <p className="text-lg text-muted-foreground mb-10">
                  {project.description}
                </p>

                {/* Progress Bar */}
                <AnimatedProgressWithLabel
                  value={project.progress}
                  brandColor={brandColor}
                  size="lg"
                  label="Overall Progress"
                  showPercentage={true}
                />
              </div>

              {/* Right Column - Big Emoji with Glow */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-96 h-96 flex items-center justify-center">
                  {/* Multiple glow layers for stronger effect */}
                  <div
                    className="absolute inset-0 blur-[120px] opacity-50 rounded-full"
                    style={{ backgroundColor: brandColor }}
                  />
                  <div
                    className="absolute inset-0 blur-[80px] opacity-40 rounded-full"
                    style={{ backgroundColor: brandColor }}
                  />
                  <div
                    className="absolute inset-0 blur-2xl opacity-30 rounded-full"
                    style={{ backgroundColor: brandColor }}
                  />
                  {/* Big emoji */}
                  <span
                    className="relative z-10 text-[16rem] leading-none select-none"
                    style={{
                      filter: `drop-shadow(0 0 40px ${brandColor}) drop-shadow(0 0 80px ${brandColor})`,
                    }}
                  >
                    {projectEmoji}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Project Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Business Problem</h4>
                    <p className="text-muted-foreground">
                      {project.overview.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Value Proposition</h4>
                    <p className="text-muted-foreground">
                      {project.overview.valueProposition}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Strategic Importance</h4>
                    <p className="text-muted-foreground">
                      {project.overview.strategicImportance}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Target Users</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.overview.targetUsers.map((user: string) => (
                        <Badge key={user} variant="secondary">
                          {user}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Key Features
                    </CardTitle>
                    <CardDescription>
                      Core capabilities and functionality
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {project.features.map((feature: any, index: number) => {
                        const IconComponent =
                          require("lucide-react")[feature.icon];
                        return (
                          <div
                            key={index}
                            className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                          >
                            <div
                              className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${brandColor}1A` }}
                            >
                              {IconComponent && (
                                <IconComponent
                                  className="w-5 h-5"
                                  style={{ color: brandColor }}
                                />
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">
                                {feature.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {feature.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* System Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="w-5 h-5" />
                      System Screenshots
                    </CardTitle>
                    <CardDescription>
                      Visual preview of the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      {project.screenshots.map(
                        (screenshot: any, index: number) => {
                          const isMobileScreenshot = screenshot.title
                            .toLowerCase()
                            .includes("mobile app");

                          return (
                            <div key={index} className="space-y-3">
                              <div
                                className={`bg-muted rounded-lg border-2 overflow-hidden relative ${
                                  isMobileScreenshot
                                    ? "flex items-center justify-center p-8 min-h-[600px]"
                                    : "aspect-video"
                                }`}
                              >
                                <Image
                                  src={screenshot.url}
                                  alt={screenshot.title}
                                  {...(isMobileScreenshot
                                    ? {
                                        width: 400,
                                        height: 800,
                                        className:
                                          "object-contain max-h-[700px] w-auto",
                                      }
                                    : {
                                        fill: true,
                                        className: "object-cover",
                                      })}
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                                  priority={index === 0}
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold">
                                  {screenshot.title}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {screenshot.description}
                                </p>
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* System Architecture Diagram */}
              {diagramContent && project.diagram && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Network className="w-5 h-5" />
                      {project.diagram.title}
                    </CardTitle>
                    <CardDescription>
                      {project.diagram.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MermaidDiagram
                      chart={diagramContent}
                      brandColor={brandColor}
                    />
                  </CardContent>
                </Card>
              )}

              {/* Timeline Chart */}
              <ProjectTimelineChart
                phases={project.timeline.phases}
                projectName={project.name}
              />

              {/* Timeline & Milestones */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Timeline & Milestones
                  </CardTitle>
                  <CardDescription>
                    Started:{" "}
                    {new Date(project.timeline.start).toLocaleDateString(
                      "en-US",
                      { month: "long", year: "numeric" },
                    )}{" "}
                    • Expected Delivery:{" "}
                    {new Date(
                      project.timeline.expectedDelivery,
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.timeline.phases.map(
                      (phase: any, index: number) => (
                        <div key={index} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {phase.status === "completed" && (
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                              )}
                              {phase.status === "in-progress" && (
                                <Clock className="w-4 h-4 text-primary" />
                              )}
                              {phase.status === "upcoming" && (
                                <Clock className="w-4 h-4 text-muted-foreground" />
                              )}
                              <span className="font-medium">{phase.name}</span>
                            </div>
                            <Badge
                              variant={
                                phaseStatusColors[
                                  phase.status as keyof typeof phaseStatusColors
                                ]
                              }
                            >
                              {phase.completion}%
                            </Badge>
                          </div>
                          <Progress
                            value={phase.completion}
                            brandColor={brandColor}
                            size="sm"
                            animate={true}
                          />
                        </div>
                      ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Phase Deliverables */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Phase Deliverables
                  </CardTitle>
                  <CardDescription>
                    Key outputs and milestones for each phase
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {project.timeline.phases.map(
                      (phase: any, index: number) =>
                        phase.deliverables &&
                        phase.deliverables.length > 0 && (
                          <div key={index} className="space-y-3">
                            <div className="flex items-center gap-2">
                              {phase.status === "completed" && (
                                <CheckCircle2 className="w-4 h-4 text-primary" />
                              )}
                              {phase.status === "in-progress" && (
                                <Clock className="w-4 h-4 text-primary" />
                              )}
                              {phase.status === "upcoming" && (
                                <Clock className="w-4 h-4 text-muted-foreground" />
                              )}
                              <h4 className="font-semibold">{phase.name}</h4>
                              <Badge
                                variant={
                                  phaseStatusColors[
                                    phase.status as keyof typeof phaseStatusColors
                                  ]
                                }
                                className="text-xs"
                              >
                                {phase.completion}%
                              </Badge>
                            </div>
                            <ul className="ml-6 space-y-1">
                              {phase.deliverables.map(
                                (deliverable: string, idx: number) => (
                                  <li
                                    key={idx}
                                    className="text-sm text-muted-foreground flex items-start gap-2"
                                  >
                                    <span className="text-primary mt-1">•</span>
                                    {deliverable}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        ),
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Resource Costs */}
              {project.resources.costs && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Resource Costs
                    </CardTitle>
                    <CardDescription>
                      Detailed budget breakdown and allocation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Summary */}
                      <div
                        className={`grid ${project.resources.costs.personnel.weekly && project.resources.costs.totalMonthly ? "grid-cols-3" : "grid-cols-2"} gap-4 p-4 bg-muted/50 rounded-lg`}
                      >
                        {project.resources.costs.personnel.weekly && (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Weekly Cost
                            </p>
                            <p
                              className="text-2xl font-bold"
                              style={{ color: brandColor }}
                            >
                              AED{" "}
                              {project.resources.costs.personnel.weekly.toLocaleString()}
                              /week
                            </p>
                            {project.resources.costs.personnel.usdEquivalent
                              ?.weekly && (
                              <p className="text-xs text-muted-foreground mt-1">
                                ≈ $
                                {project.resources.costs.personnel.usdEquivalent.weekly.toLocaleString()}
                                /week USD
                              </p>
                            )}
                          </div>
                        )}

                        {project.resources.costs.personnel.weekly &&
                        project.resources.costs.totalMonthly ? (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Monthly Cost
                            </p>
                            <p
                              className="text-2xl font-bold"
                              style={{ color: brandColor }}
                            >
                              AED{" "}
                              {project.resources.costs.totalMonthly.toLocaleString()}
                              /mo
                            </p>
                            {project.resources.costs.usdEquivalent?.monthly && (
                              <p className="text-xs text-muted-foreground mt-1">
                                ≈ $
                                {project.resources.costs.usdEquivalent.monthly.toLocaleString()}
                                /mo USD
                              </p>
                            )}
                          </div>
                        ) : !project.resources.costs.personnel.weekly &&
                          project.resources.costs.personnel.monthly ? (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Monthly Cost
                            </p>
                            <p
                              className="text-2xl font-bold"
                              style={{ color: brandColor }}
                            >
                              AED{" "}
                              {project.resources.costs.personnel.monthly.toLocaleString()}
                              /mo
                            </p>
                            {project.resources.costs.personnel.usdEquivalent
                              ?.monthly && (
                              <p className="text-xs text-muted-foreground mt-1">
                                ≈ $
                                {project.resources.costs.personnel.usdEquivalent.monthly.toLocaleString()}
                                /mo USD
                              </p>
                            )}
                          </div>
                        ) : !project.resources.costs.personnel.weekly &&
                          project.resources.costs.personnel.total ? (
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Cost
                            </p>
                            <p
                              className="text-2xl font-bold"
                              style={{ color: brandColor }}
                            >
                              AED{" "}
                              {project.resources.costs.personnel.total.toLocaleString()}
                              {project.resources.costs.personnel.period &&
                                ` (${project.resources.costs.personnel.period})`}
                            </p>
                            {project.resources.costs.personnel.usdEquivalent
                              ?.total && (
                              <p className="text-xs text-muted-foreground mt-1">
                                ≈ $
                                {project.resources.costs.personnel.usdEquivalent.total.toLocaleString()}
                                {" USD"}
                              </p>
                            )}
                          </div>
                        ) : null}

                        <div>
                          <p className="text-sm text-muted-foreground">
                            Total Project Cost
                          </p>
                          <p
                            className="text-2xl font-bold"
                            style={{ color: brandColor }}
                          >
                            AED{" "}
                            {project.resources.costs.totalProject.toLocaleString()}
                          </p>
                          {(project.resources.costs.personnel.usdEquivalent
                            ?.total ||
                            project.resources.costs.usdEquivalent?.total) && (
                            <p className="text-xs text-muted-foreground mt-1">
                              ≈ $
                              {(
                                project.resources.costs.personnel.usdEquivalent
                                  ?.total ||
                                project.resources.costs.usdEquivalent?.total
                              ).toLocaleString()}{" "}
                              USD
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Personnel Costs */}
                      <div>
                        <h4 className="font-semibold mb-3">Personnel</h4>
                        <div className="space-y-2">
                          {project.resources.costs.personnel.breakdown?.map(
                            (item: any, idx: number) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center text-sm"
                              >
                                <span className="text-muted-foreground">
                                  {item.role}
                                </span>
                                <span className="font-medium">
                                  {item.weeklyRate ? (
                                    <>
                                      AED {item.weeklyRate.toLocaleString()}
                                      /week × {item.totalWeeks} weeks
                                      {item.usdWeeklyRate && (
                                        <span className="text-xs text-muted-foreground block mt-1">
                                          ($
                                          {item.usdWeeklyRate.toLocaleString()}
                                          /week USD)
                                        </span>
                                      )}
                                    </>
                                  ) : item.monthlyRate ? (
                                    <>
                                      AED {item.monthlyRate.toLocaleString()}/mo
                                      {item.usdMonthlyRate && (
                                        <span className="text-xs text-muted-foreground block mt-1">
                                          ($
                                          {item.usdMonthlyRate.toLocaleString()}
                                          /mo USD)
                                        </span>
                                      )}
                                    </>
                                  ) : item.rate ? (
                                    <>
                                      AED {item.rate.toLocaleString()}/mo
                                      {item.usdRate && (
                                        <span className="text-xs text-muted-foreground block mt-1">
                                          (${item.usdRate.toLocaleString()}/mo
                                          USD)
                                        </span>
                                      )}
                                    </>
                                  ) : item.cost ? (
                                    <>
                                      AED {item.cost.toLocaleString()}
                                      {item.note && (
                                        <span className="text-xs text-muted-foreground block mt-1">
                                          {item.note}
                                        </span>
                                      )}
                                    </>
                                  ) : null}
                                </span>
                              </div>
                            ),
                          )}
                          <div className="flex justify-between items-center pt-2 border-t font-semibold">
                            <span>Subtotal</span>
                            <div className="text-right">
                              {project.resources.costs.personnel.weekly ? (
                                <>
                                  <div>
                                    AED{" "}
                                    {project.resources.costs.personnel.weekly.toLocaleString()}
                                    /week
                                  </div>
                                  {project.resources.costs.personnel
                                    .usdEquivalent?.weekly && (
                                    <div className="text-xs font-normal text-muted-foreground">
                                      ≈ $
                                      {project.resources.costs.personnel.usdEquivalent.weekly.toLocaleString()}
                                      /week USD
                                    </div>
                                  )}
                                </>
                              ) : project.resources.costs.personnel.monthly ? (
                                <>
                                  <div>
                                    AED{" "}
                                    {project.resources.costs.personnel.monthly.toLocaleString()}
                                    /mo
                                  </div>
                                  {project.resources.costs.personnel
                                    .usdEquivalent?.monthly && (
                                    <div className="text-xs font-normal text-muted-foreground">
                                      ≈ $
                                      {project.resources.costs.personnel.usdEquivalent.monthly.toLocaleString()}
                                      /mo USD
                                    </div>
                                  )}
                                </>
                              ) : project.resources.costs.personnel.total ? (
                                <>
                                  <div>
                                    AED{" "}
                                    {project.resources.costs.personnel.total.toLocaleString()}
                                    {project.resources.costs.personnel.period &&
                                      ` (${project.resources.costs.personnel.period})`}
                                  </div>
                                  {project.resources.costs.personnel
                                    .usdEquivalent?.total && (
                                    <div className="text-xs font-normal text-muted-foreground">
                                      ≈ $
                                      {project.resources.costs.personnel.usdEquivalent.total.toLocaleString()}
                                      {" USD"}
                                    </div>
                                  )}
                                </>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Fuelers Personnel Costs (if exists) */}
                      {project.resources.costs.fuelersPersonnel?.breakdown && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Fuelers Personnel
                          </h4>
                          <div className="space-y-2">
                            {project.resources.costs.fuelersPersonnel.breakdown.map(
                              (item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    {item.role}
                                  </span>
                                  <span className="font-medium">
                                    AED {item.monthlyRate.toLocaleString()}/mo ×{" "}
                                    {item.totalMonths} months
                                    {item.usdMonthlyRate && (
                                      <span className="text-xs text-muted-foreground block mt-1">
                                        ($
                                        {item.usdMonthlyRate.toLocaleString()}
                                        /mo USD)
                                      </span>
                                    )}
                                  </span>
                                </div>
                              ),
                            )}
                            <div className="flex justify-between items-center pt-2 border-t font-semibold">
                              <span>Subtotal</span>
                              <div className="text-right">
                                <div>
                                  AED{" "}
                                  {project.resources.costs.fuelersPersonnel.monthly.toLocaleString()}
                                  /mo
                                </div>
                                {project.resources.costs.fuelersPersonnel
                                  .usdEquivalent?.monthly && (
                                  <div className="text-xs font-normal text-muted-foreground">
                                    ≈ $
                                    {project.resources.costs.fuelersPersonnel.usdEquivalent.monthly.toLocaleString()}
                                    /mo USD
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Infrastructure Costs */}
                      {project.resources.costs.infrastructure?.breakdown && (
                        <div>
                          <h4 className="font-semibold mb-3">Infrastructure</h4>
                          <div className="space-y-2">
                            {project.resources.costs.infrastructure.breakdown.map(
                              (item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    {item.item}
                                  </span>
                                  <span className="font-medium">
                                    AED {item.cost.toLocaleString()}/mo
                                  </span>
                                </div>
                              ),
                            )}
                            <div className="flex justify-between items-center pt-2 border-t font-semibold">
                              <span>Subtotal</span>
                              <div className="text-right">
                                <div>
                                  AED{" "}
                                  {project.resources.costs.infrastructure.monthly?.toLocaleString()}
                                  /mo
                                </div>
                                {(project.resources.costs.infrastructure
                                  .usdEquivalent?.monthly ||
                                  project.resources.costs.infrastructure
                                    .usdMonthly) && (
                                  <div className="text-xs font-normal text-muted-foreground">
                                    ≈ $
                                    {(
                                      project.resources.costs.infrastructure
                                        .usdEquivalent?.monthly ||
                                      project.resources.costs.infrastructure
                                        .usdMonthly
                                    ).toLocaleString()}{" "}
                                    USD
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Software Costs */}
                      {project.resources.costs.software?.breakdown && (
                        <div>
                          <h4 className="font-semibold mb-3">
                            Software & Tools
                          </h4>
                          <div className="space-y-2">
                            {project.resources.costs.software.breakdown.map(
                              (item: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center text-sm"
                                >
                                  <span className="text-muted-foreground">
                                    {item.item}
                                  </span>
                                  <span className="font-medium">
                                    AED {item.cost.toLocaleString()}/mo
                                  </span>
                                </div>
                              ),
                            )}
                            <div className="flex justify-between items-center pt-2 border-t font-semibold">
                              <span>Subtotal</span>
                              <div className="text-right">
                                <div>
                                  AED{" "}
                                  {project.resources.costs.software.monthly?.toLocaleString()}
                                  /mo
                                </div>
                                {(project.resources.costs.software.usdEquivalent
                                  ?.monthly ||
                                  project.resources.costs.software
                                    .usdMonthly) && (
                                  <div className="text-xs font-normal text-muted-foreground">
                                    ≈ $
                                    {(
                                      project.resources.costs.software
                                        .usdEquivalent?.monthly ||
                                      project.resources.costs.software
                                        .usdMonthly
                                    ).toLocaleString()}{" "}
                                    USD
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Resource Allocation Chart */}
              <ResourceAllocationChart team={project.resources.team} />

              {/* Current Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Current Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <p className="text-muted-foreground">
                      {project.currentStatus.summary}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1">
                      {project.currentStatus.achievements.map(
                        (achievement: string, index: number) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">•</span>
                            {achievement}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  {project.currentStatus.risks.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-primary" />
                        Risks & Mitigation
                      </h4>
                      <div className="space-y-3">
                        {project.currentStatus.risks.map(
                          (risk: any, index: number) => (
                            <div
                              key={index}
                              className="border-l-2 border-primary pl-3 space-y-1"
                            >
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-medium">
                                  {risk.risk}
                                </p>
                                <Badge
                                  variant={
                                    risk.severity === "high"
                                      ? "destructive"
                                      : risk.severity === "medium"
                                        ? "warning"
                                        : "secondary"
                                  }
                                >
                                  {risk.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                Mitigation: {risk.mitigation}
                              </p>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
                  {project.currentStatus.blockers.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2 text-destructive">
                        <AlertTriangle className="w-4 h-4" />
                        Blockers
                      </h4>
                      <ul className="space-y-1">
                        {project.currentStatus.blockers.map(
                          (blocker: string, index: number) => (
                            <li
                              key={index}
                              className="text-sm text-destructive flex items-start gap-2"
                            >
                              <span className="mt-1">•</span>
                              {blocker}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="w-5 h-5" />
                    Next Steps & Board Asks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Planned Activities</h4>
                    <ul className="space-y-1">
                      {project.nextSteps.planned.map(
                        (step: string, index: number) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="text-primary mt-1">→</span>
                            {step}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                  <div className="bg-muted border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Board Decisions Required
                    </h4>
                    <ul className="space-y-1">
                      {project.nextSteps.boardAsks.map(
                        (ask: string, index: number) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="mt-1">•</span>
                            {ask}
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Resources */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Resource Level
                      </span>
                      <Badge
                        variant={
                          project.resources.resourceLevel === "Heavy"
                            ? "destructive"
                            : project.resources.resourceLevel === "Medium"
                              ? "warning"
                              : "secondary"
                        }
                      >
                        {project.resources.resourceLevel}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2">
                      Team Composition
                    </h4>
                    <div className="space-y-2">
                      {project.resources.team.map(
                        (member: any, index: number) => {
                          const memberCount =
                            (member as { count?: number }).count ?? 1;
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between text-sm"
                            >
                              <span className="text-muted-foreground">
                                {member.role}
                                {memberCount > 1 && ` (${memberCount})`}
                              </span>
                              <span className="text-xs font-medium">
                                {member.allocation}
                              </span>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                  {project.resources.dependencies.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Dependencies
                      </h4>
                      <ul className="space-y-1">
                        {project.resources.dependencies.map(
                          (dep: string, index: number) => (
                            <li
                              key={index}
                              className="text-xs text-muted-foreground flex items-start gap-1"
                            >
                              <span className="mt-0.5">•</span>
                              {dep}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                  {project.resources.constraints.length > 0 && (
                    <div>
                      <h4 className="text-sm font-semibold mb-2">
                        Constraints
                      </h4>
                      <ul className="space-y-1">
                        {project.resources.constraints.map(
                          (constraint: string, index: number) => (
                            <li
                              key={index}
                              className="text-xs text-muted-foreground flex items-start gap-1"
                            >
                              <span className="mt-0.5">•</span>
                              {constraint}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Priority
                    </span>
                    <Badge
                      variant={
                        project.priority === "high"
                          ? "destructive"
                          : project.priority === "medium"
                            ? "warning"
                            : "secondary"
                      }
                    >
                      {project.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Team Size
                    </span>
                    <span className="font-semibold">
                      {project.resources.team.reduce(
                        (acc: number, m: any) =>
                          acc + ((m as { count?: number }).count ?? 1),
                        0,
                      )}{" "}
                      members
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Phases
                    </span>
                    <span className="font-semibold">
                      {project.timeline.phases.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Completed Phases
                    </span>
                    <span className="font-semibold">
                      {
                        project.timeline.phases.filter(
                          (p: any) => p.status === "completed",
                        ).length
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
