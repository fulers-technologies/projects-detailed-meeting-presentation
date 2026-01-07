"use client";

import { Header } from "@/components/header";
import { BackgroundPattern } from "@/components/background-pattern";
import companyData from "@/data/company.json";
import imsData from "@/data/ims.json";
import mngoData from "@/data/mngo.json";
import aiVisionData from "@/data/ai-vision.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Users,
  Calendar,
} from "lucide-react";
import { motion } from "framer-motion";

export default function ReportsPage() {
  const company = companyData;
  const projects = [imsData, mngoData, aiVisionData];

  const totalAchievements = projects.reduce(
    (acc, p) => acc + p.currentStatus.achievements.length,
    0,
  );
  const totalRisks = projects.reduce(
    (acc, p) => acc + p.currentStatus.risks.length,
    0,
  );
  const totalBlockers = projects.reduce(
    (acc, p) => acc + p.currentStatus.blockers.length,
    0,
  );
  const totalBoardAsks = projects.reduce(
    (acc, p) => acc + p.nextSteps.boardAsks.length,
    0,
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2">Executive Summary</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive overview of all projects and key metrics
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity" />
            <CardHeader className="relative pb-3">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle2 className="w-5 h-5" />
                <CardDescription>Total Achievements</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-4xl font-extrabold text-primary">
                {totalAchievements}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity" />
            <CardHeader className="relative pb-3">
              <div className="flex items-center gap-2 text-primary">
                <AlertTriangle className="w-5 h-5" />
                <CardDescription>Active Risks</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-4xl font-extrabold text-primary">
                {totalRisks}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity" />
            <CardHeader className="relative pb-3">
              <div className="flex items-center gap-2 text-primary">
                <AlertTriangle className="w-5 h-5" />
                <CardDescription>Current Blockers</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-4xl font-extrabold text-primary">
                {totalBlockers}
              </p>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-all hover:shadow-lg group">
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-primary/5 opacity-50 group-hover:opacity-70 transition-opacity" />
            <CardHeader className="relative pb-3">
              <div className="flex items-center gap-2 text-primary">
                <FileText className="w-5 h-5" />
                <CardDescription>Board Decisions</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <p className="text-4xl font-extrabold text-primary">
                {totalBoardAsks}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Reports */}
        <div className="space-y-8">
          {projects.map((project, index) => {
            const brandColor = project.brandColor || "#1D4DFF";
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  key={project.id}
                  className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg group"
                >
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity"
                    style={{
                      background: `linear-gradient(to bottom right, ${brandColor}0D, transparent, ${brandColor}0D)`,
                    }}
                  />
                  <div
                    className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundColor: `${brandColor}1A`,
                    }}
                  />

                  <CardHeader className="relative">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle
                          className="text-2xl"
                          style={{ color: brandColor }}
                        >
                          {project.name} - {project.fullName}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {project.description}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={
                          project.status === "In Progress"
                            ? "default"
                            : project.status === "Planning"
                              ? "warning"
                              : "success"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative space-y-6">
                    {/* Progress */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">Overall Progress</span>
                        <span
                          className="text-xl font-bold"
                          style={{ color: brandColor }}
                        >
                          {project.progress}%
                        </span>
                      </div>
                      <Progress
                        value={project.progress}
                        className="h-2"
                        brandColor={brandColor}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Timeline */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          Timeline
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Started:
                            </span>
                            <span>
                              {new Date(
                                project.timeline.start,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Expected Delivery:
                            </span>
                            <span>
                              {new Date(
                                project.timeline.expectedDelivery,
                              ).toLocaleDateString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Resources */}
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Resources
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Team Size:
                            </span>
                            <span>
                              {project.resources.team.reduce(
                                (acc, m) =>
                                  acc + ((m as { count?: number }).count ?? 1),
                                0,
                              )}{" "}
                              members
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              Resource Level:
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
                      </div>
                    </div>

                    {/* Key Achievements */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <CheckCircle2
                          className="w-4 h-4"
                          style={{ color: brandColor }}
                        />
                        Key Achievements (
                        {project.currentStatus.achievements.length})
                      </h4>
                      <ul className="space-y-1">
                        {project.currentStatus.achievements
                          .slice(0, 3)
                          .map((achievement, index) => (
                            <li
                              key={index}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <span
                                style={{ color: brandColor }}
                                className="mt-1"
                              >
                                •
                              </span>
                              {achievement}
                            </li>
                          ))}
                        {project.currentStatus.achievements.length > 3 && (
                          <li className="text-sm text-muted-foreground italic">
                            +{project.currentStatus.achievements.length - 3}{" "}
                            more achievements
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Risks */}
                    {project.currentStatus.risks.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <AlertTriangle
                            className="w-4 h-4"
                            style={{ color: brandColor }}
                          />
                          Active Risks ({project.currentStatus.risks.length})
                        </h4>
                        <div className="space-y-2">
                          {project.currentStatus.risks.map((risk, index) => (
                            <div
                              key={index}
                              className="text-sm border-l-2 pl-3"
                              style={{ borderColor: brandColor }}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{risk.risk}</span>
                                <Badge
                                  variant={
                                    risk.severity === "high"
                                      ? "destructive"
                                      : risk.severity === "medium"
                                        ? "warning"
                                        : "secondary"
                                  }
                                  className="text-xs"
                                >
                                  {risk.severity}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Board Asks */}
                    <div className="bg-muted border border-border rounded-lg p-4">
                      <h4 className="font-semibold mb-2 text-foreground">
                        Board Decisions Required (
                        {project.nextSteps.boardAsks.length})
                      </h4>
                      <ul className="space-y-1">
                        {project.nextSteps.boardAsks.map((ask, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <span className="mt-1">•</span>
                            {ask}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
