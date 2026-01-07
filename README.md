# Fulers Technologies - Board Presentation Dashboard

Professional Next.js board presentation dashboard for Fulers Technologies LLC featuring interactive project portfolio visualization with charts, analytics, and comprehensive project tracking.

## ✨ Features

- **Portfolio Overview Dashboard**: Interactive homepage with project cards, progress tracking, and status visualization
- **Detailed Project Pages**: Comprehensive project views with timeline charts, resource allocation, risks, and board asks
- **Executive Reports**: Summary page with all achievements, risks, blockers, and board decisions
- **Interactive Charts**: Built with Recharts and shadcn/ui chart components
  - Portfolio progress pie chart
  - Phase timeline bar charts
  - Resource allocation visualizations
- **Fulers Branding**:
  - Brand colors (#1D4DFF primary blue)
  - Plus Jakarta Sans font family
  - Geometric patterns and brand assets
- **JSON-Based Data**: Easy-to-update project information in `/data/projects.json`
- **Theme Support**: Light/dark mode with next-themes
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS v4

## 🎨 Brand Assets

All Fulers branding assets are integrated:

- **Logos**: Located in `/public/assets/`
  - `logo-blue-dark-en.svg` - Main logo (dark blue)
  - `logo-blue-light-en.svg` - Light variant
  - `logo-sign-background-blue-512px.svg` - Icon version
- **Fonts**: Plus Jakarta Sans (Regular, Medium, Bold, ExtraBold) in `/assets/fonts/`
- **Colors**:
  - Primary Blue: `#1D4DFF`
  - Dark Blue: `#0033CC`
  - Light Blue: `#4D7AFF`
- **Patterns**: Geometric patterns in `/public/assets/transparent/`

## 📁 Project Structure

```
├── app/
│   ├── page.tsx                    # Portfolio homepage with tabs and charts
│   ├── project/[id]/page.tsx       # Dynamic project detail pages
│   ├── reports/page.tsx            # Executive summary report
│   ├── layout.tsx                  # Root layout with theme provider
│   └── globals.css                 # Global styles with Fulers brand colors
├── components/
│   ├── header.tsx                  # Header with Fulers logo and navigation
│   ├── project-card.tsx            # Project card component
│   ├── portfolio-overview-chart.tsx # Pie chart for portfolio progress
│   ├── project-timeline-chart.tsx  # Bar chart for phase progress
│   ├── resource-allocation-chart.tsx # Team allocation visualization
│   ├── background-pattern.tsx      # Brand pattern background
│   ├── theme-provider.tsx          # Theme context provider
│   └── ui/                         # shadcn/ui components (50+ components)
├── data/
│   └── projects.json               # Project data (IMS, MNGO, AI Vision)
├── lib/
│   ├── constants.ts                # Brand colors, logo paths, patterns
│   ├── fonts.ts                    # Plus Jakarta Sans configuration
│   └── utils.ts                    # Utility functions
├── assets/
│   └── fonts/                      # Font files (local)
└── public/
    └── assets/                     # Public brand assets (logos, patterns)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Run development server:**

   ```bash
   pnpm dev
   ```

3. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Build for production:**
   ```bash
   pnpm build
   pnpm start
   ```

## 📊 Current Projects

### 1. IMS - Inspection Management System

- **Status**: In Progress (65% complete)
- **Priority**: High
- **Team**: 7 members
- **Expected Delivery**: June 2026
- **Focus**: Enterprise-grade inspection and quality management platform

### 2. MNGO - Ticketing & Booking Solution

- **Status**: Planning (25% complete)
- **Priority**: Medium
- **Team**: 4 members
- **Expected Delivery**: September 2026
- **Focus**: Modern event ticketing platform with real-time inventory

### 3. AI Vision Project

- **Status**: Near Completion (85% complete)
- **Priority**: High
- **Team**: 6 members
- **Expected Delivery**: February 2026
- **Focus**: AI-powered computer vision for automated visual inspection

## 🔧 Updating Project Data

Edit `/data/projects.json` to update:

```json
{
  "company": {
    "name": "Fulers Technologies LLC",
    "tagline": "Advanced Technology Solutions",
    "focus": ["AI", "Computer Vision", "SaaS Platforms", "Enterprise Systems"]
  },
  "projects": [
    {
      "id": "project-id",
      "name": "Project Name",
      "status": "In Progress",
      "progress": 65,
      "timeline": { ... },
      "resources": { ... },
      "currentStatus": { ... },
      "nextSteps": { ... }
    }
  ]
}
```

### Key Fields:

- **status**: "In Progress" | "Planning" | "Near Completion"
- **progress**: 0-100 (percentage)
- **priority**: "high" | "medium" | "low"
- **timeline.phases**: Array of project phases with completion status
- **resources.team**: Team composition with roles and allocation
- **currentStatus.achievements**: List of completed milestones
- **currentStatus.risks**: Risks with severity and mitigation
- **nextSteps.boardAsks**: Decisions required from board

## 🎯 Pages

### 1. Portfolio Overview (`/`)

- Company information and focus areas
- Key metrics (total projects, active projects, average progress, team size)
- Two tabs:
  - **Portfolio Overview**: Charts and status breakdown
  - **All Projects**: Grid of project cards
- Upcoming milestones timeline

### 2. Project Details (`/project/[id]`)

- Project header with status and progress
- Overview section (problem, value proposition, strategic importance)
- Interactive timeline chart
- Phase milestones with progress bars
- Resource allocation chart
- Current status with achievements and risks
- Next steps and board asks
- Sidebar with quick stats and team composition

### 3. Executive Reports (`/reports`)

- Summary statistics (achievements, risks, blockers, board decisions)
- Detailed project reports with all key information
- Timeline and resource summaries
- Board decision highlights

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui (50+ components)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans (local fonts)
- **Theme**: next-themes
- **Package Manager**: pnpm

## 📦 Key Dependencies

```json
{
  "next": "^15.1.6",
  "react": "^19.0.0",
  "tailwindcss": "^4.0.0",
  "recharts": "^2.15.0",
  "lucide-react": "^0.562.0",
  "next-themes": "^0.4.6",
  "class-variance-authority": "^0.7.1"
}
```

## 🎨 Customization

### Brand Colors

Edit `/lib/constants.ts`:

```typescript
export const BRAND_COLORS = {
  primary: {
    blue: "#1D4DFF",
    darkBlue: "#0033CC",
    lightBlue: "#4D7AFF",
  },
  // ...
};
```

### CSS Variables

Edit `/app/globals.css`:

```css
:root {
  --primary: 227 100% 56%; /* #1D4DFF */
  /* ... */
}
```

### Fonts

Fonts are loaded from `/assets/fonts/plus-jakarta-sans/` in `/lib/fonts.ts`

## 📝 Notes

- All project data is statically generated at build time
- Images and assets are optimized with Next.js Image component
- Responsive design works on mobile, tablet, and desktop
- Dark mode support included (toggle in theme provider)
- All brand assets maintain Fulers visual identity

## 🔒 Security

This is a confidential board presentation. Ensure proper access controls are in place when deploying.

---

**© 2026 Fulers Technologies LLC. All rights reserved.**  
**Confidential Board Presentation**
