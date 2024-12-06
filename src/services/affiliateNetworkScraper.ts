import puppeteer from 'puppeteer';

interface AffiliateProgram {
  name: string;
  description: string;
  commission: string;
  category: string;
}

export async function scrapeAffiliatePrograms(url: string): Promise<AffiliateProgram[]> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const programs = await page.evaluate(() => {
    const programElements = document.querySelectorAll('.affiliate-program');
    return Array.from(programElements).map((el) => ({
      name: el.querySelector('.program-name')?.textContent || '',
      description: el.querySelector('.program-description')?.textContent || '',
      commission: el.querySelector('.program-commission')?.textContent || '',
      category: el.querySelector('.program-category')?.textContent || '',
    }));
  });

  await browser.close();
  return programs;
}

export async function saveAffiliatePrograms(programs: AffiliateProgram[], filePath: string): Promise<void> {
  const fs = require('fs').promises;
  await fs.writeFile(filePath, JSON.stringify(programs, null, 2));
}