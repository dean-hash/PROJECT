import { Builder, By, until } from 'selenium-webdriver';
import fs from 'fs/promises';

const NETWORKS = [
  { name: 'ShareASale', url: 'https://www.shareasale.com/info/affiliate/' },
  { name: 'CJ Affiliate', url: 'https://signup.cj.com/member/signup/publisher/' },
  { name: 'Amazon Associates', url: 'https://affiliate-program.amazon.com/' },
  // Add more networks as needed
];

async function scrapeNetwork(driver, network) {
  console.log(`Scraping ${network.name}...`);
  await driver.get(network.url);

  // Wait for the page to load
  await driver.wait(until.titleContains(network.name), 10000);

  // Example: Scrape form fields
  const formFields = await driver.findElements(By.css('form input, form select'));
  const fieldData = await Promise.all(formFields.map(async (field) => {
    const name = await field.getAttribute('name');
    const type = await field.getAttribute('type');
    return { name, type };
  }));

  return {
    name: network.name,
    url: network.url,
    fields: fieldData,
  };
}

async function main() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    const results = [];
    for (const network of NETWORKS) {
      const data = await scrapeNetwork(driver, network);
      results.push(data);
    }

    // Save results to a file
    await fs.writeFile('affiliate_network_data.json', JSON.stringify(results, null, 2));
    console.log('Scraping completed. Results saved to affiliate_network_data.json');
  } finally {
    await driver.quit();
  }
}

main().catch(console.error);