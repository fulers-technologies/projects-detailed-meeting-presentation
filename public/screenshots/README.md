# Project Screenshots

This folder contains HTML mockups for realistic screenshots of each project system.

## How to Capture Screenshots

### Option 1: Using Browser (Manual)

1. Open each HTML file in your browser
2. Set browser window to 1920x1080 resolution
3. Take a screenshot (Cmd+Shift+4 on Mac, or use browser dev tools)
4. Save as JPG/PNG with the corresponding name

### Option 2: Using Automated Script (Recommended)

We've created a Node.js script that automatically captures all screenshots using Puppeteer.

#### Setup:

```bash
npm install puppeteer
```

#### Run:

```bash
node public/screenshots/capture-screenshots.js
```

This will generate all screenshots automatically in the correct format.

## Screenshot Files Needed

### IMS (Inspection Management System)

- `ims-dashboard.jpg` - Dashboard overview with inspection metrics
- `ims-mobile.jpg` - Mobile field inspection interface
- `ims-analytics.jpg` - Analytics and insights dashboard

### MNGO (Ticketing & Booking)

- `mngo-events.jpg` - Event discovery and browsing
- `mngo-checkout.jpg` - Seamless checkout experience
- `mngo-organizer.jpg` - Event organizer dashboard (to be created)

### AI Vision

- `ai-vision-dashboard.jpg` - Real-time multi-model processing
- `ai-vision-query.jpg` - Natural language query interface
- `ai-vision-analytics.jpg` - Performance metrics (to be created)

## HTML Mockup Files

- `ims-dashboard.html`
- `ims-mobile.html`
- `ims-analytics.html`
- `mngo-events.html`
- `mngo-checkout.html`
- `ai-vision-dashboard.html`
- `ai-vision-query.html`

## Notes

- All mockups use Tailwind CSS CDN for styling
- Screenshots should be 1920x1080 or 16:9 aspect ratio
- Use JPG format for smaller file sizes
- Ensure good quality (80-90% compression)
