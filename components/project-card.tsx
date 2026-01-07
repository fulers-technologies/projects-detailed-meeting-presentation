"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  ArrowRight,
  Calendar,
  TrendingUp,
  Camera,
  Ticket,
  Search,
} from "lucide-react";

interface ProjectCardProps {
  id: string;
  name: string;
  fullName: string;
  description: string;
  status: string;
  progress: number;
  priority: string;
  brandColor?: string;
  timeline: {
    expectedDelivery: string;
  };
}

// Project icon mapping - using emojis
const projectEmojis = {
  ims: "🔍",
  mngo: "🎫",
  "ai-vision": "📹",
};

export function ProjectCard({
  id,
  name,
  fullName,
  description,
  status,
  progress,
  priority,
  brandColor = "#1D4DFF",
  timeline,
}: ProjectCardProps) {
  const statusColors = {
    "In Progress": "default",
    Planning: "warning",
    "Near Completion": "success",
  } as const;

  const priorityColors = {
    high: "destructive",
    medium: "warning",
    low: "secondary",
  } as const;

  const projectEmoji = projectEmojis[id as keyof typeof projectEmojis] || "🔍";

  return (
    <Link href={`/project/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Card className="h-full relative overflow-hidden transition-all hover:shadow-xl cursor-pointer border-2 hover:border-primary/50 group">
          {/* Gradient Background with Brand Color */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0.5 }}
            whileHover={{ opacity: 0.7 }}
            transition={{ duration: 0.3 }}
            style={{
              background: `linear-gradient(to bottom right, ${brandColor}15, ${brandColor}08, transparent)`,
            }}
          />

          {/* Radial Glow Effect with Brand Color */}
          <motion.div
            className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 0.3 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: `${brandColor}33`,
            }}
          />

          <CardHeader className="relative">
            <div className="flex items-start gap-4 mb-4">
              {/* Big Emoji Icon with Glow */}
              <div className="relative flex-shrink-0 w-20 h-20 flex items-center justify-center">
                {/* Glow effect layers */}
                <div
                  className="absolute inset-0 blur-2xl opacity-60 rounded-full"
                  style={{ backgroundColor: brandColor }}
                />
                <div
                  className="absolute inset-0 blur-xl opacity-40 rounded-full"
                  style={{ backgroundColor: brandColor }}
                />
                {/* Emoji */}
                <span
                  className="relative text-6xl leading-none select-none"
                  style={{
                    filter: `drop-shadow(0 0 20px ${brandColor})`,
                  }}
                >
                  {projectEmoji}
                </span>
              </div>

              {/* Title and Badge */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <CardTitle
                    className="text-3xl font-extrabold"
                    style={{ color: brandColor }}
                  >
                    {name}
                  </CardTitle>
                  <Badge
                    variant={
                      priorityColors[priority as keyof typeof priorityColors]
                    }
                    className="flex-shrink-0"
                  >
                    {priority.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription className="text-base font-medium">
                  {fullName}
                </CardDescription>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <Badge
                variant={statusColors[status as keyof typeof statusColors]}
                className="text-sm"
              >
                <TrendingUp className="w-3 h-3 mr-1" />
                {status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">Progress</span>
                <span className="text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(timeline.expectedDelivery).toLocaleDateString(
                  "en-US",
                  { month: "short", year: "numeric" },
                )}
              </div>
              <ArrowRight className="w-5 h-5" style={{ color: brandColor }} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  );
}
