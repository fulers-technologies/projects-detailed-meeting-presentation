interface GradientHeroProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
}

export function GradientHero({
  title,
  subtitle,
  badge,
  children,
}: GradientHeroProps) {
  return (
    <div className="relative overflow-hidden bg-linear-to-b from-muted/30 via-background to-background">
      {/* Subtle Radial Gradient Orbs */}
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-primary/10 rounded-full blur-[120px] opacity-40" />
      <div className="absolute bottom-0 left-1/4 w-125 h-125 bg-primary/10 rounded-full blur-[120px] opacity-30" />

      {/* Content */}
      <div className="relative container mx-auto px-6 py-12">
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-4">
            {badge}
          </div>
        )}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
}
