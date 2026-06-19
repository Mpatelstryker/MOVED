const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new'
  });

  try {
    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({
      width: 1200,
      height: 1600,
      deviceScaleFactor: 2
    });

    // Load the HTML file
    const htmlPath = path.join(__dirname, 'MOVED_Brochure.html');
    const htmlUrl = 'file://' + htmlPath.replace(/\\/g, '/');

    await page.goto(htmlUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000
    });

    // Generate PDF with print settings
    const pdfPath = path.join(__dirname, 'MOVED_Brochure.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true,
      preferCSSPageSize: true,
      scale: 1,
      displayHeaderFooter: false
    });

    console.log(`✓ PDF generated successfully: ${pdfPath}`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
