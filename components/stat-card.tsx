"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  gradient?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  gradient = "from-primary/10 to-primary/5",
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <Card className="relative overflow-hidden border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
        {/* Gradient Background */}
        <motion.div
          className={`absolute inset-0 bg-linear-to-br ${gradient}`}
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Icon className="w-4 h-4" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-end justify-between">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl font-extrabold"
            >
              {value}
            </motion.p>
            {trend && (
              <span className="text-xs text-primary font-medium">{trend}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
