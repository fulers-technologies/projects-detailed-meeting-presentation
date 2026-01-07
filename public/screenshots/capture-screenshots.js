const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const screenshots = [
    { html: 'ims-dashboard.html', output: 'ims-dashboard.jpg' },
    { html: 'ims-mobile.html', output: 'ims-mobile.jpg' },
    { html: 'ims-analytics.html', output: 'ims-analytics.jpg' },
    { html: 'mngo-pos-event-selection.html', output: 'mngo-event-selection.jpg' },
    { html: 'mngo-pos-payment.html', output: 'mngo-payment.jpg' },
    { html: 'mngo-pos-ticket-selection.html', output: 'mngo-ticket-selection.jpg' },
    { html: 'ai-vision-dashboard.html', output: 'ai-vision-dashboard.jpg' },
    { html: 'ai-vision-query.html', output: 'ai-vision-query.jpg' },
    { html: 'ai-vision-analytics.html', output: 'ai-vision-analytics.jpg' },
];

async function captureScreenshots() {
    console.log('Starting screenshot capture...\n');

    const browser = await puppeteer.launch({
        headless: 'new',
        defaultViewport: {
            width: 1920,
            height: 1080,
        },
    });

    const page = await browser.newPage();

    for (const screenshot of screenshots) {
        try {
            const htmlPath = path.join(__dirname, screenshot.html);
            const outputPath = path.join(__dirname, screenshot.output);

            console.log(`Capturing: ${screenshot.html}`);

            await page.goto(`file://${htmlPath}`, {
                waitUntil: 'networkidle0',
            });

            // Wait a bit for any animations or dynamic content
            await new Promise(resolve => setTimeout(resolve, 2000));

            await page.screenshot({
                path: outputPath,
                type: 'jpeg',
                quality: 90,
                fullPage: false,
            });

            console.log(`✓ Saved: ${screenshot.output}\n`);
        } catch (error) {
            console.error(`✗ Error capturing ${screenshot.html}:`, error.message, '\n');
        }
    }

    await browser.close();
    console.log('Screenshot capture complete!');
}

captureScreenshots().catch(console.error);
