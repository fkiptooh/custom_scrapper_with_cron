import { exec } from 'child_process';
import cron from 'node-cron';

// Function to run the scraper script
function runScraper() {
  console.log('Starting scraper script...');
  exec('node index.js', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing scraper: ${error.message}`);
      return;
    }
    if (stderr) {
        if (stderr.includes('data.map is not a function')) {
          console.info('Data is up to date. No asins to scrape.');
        } else {
          console.error(`Scraper stderr: ${stderr}`);
        }
        return;
      }
    console.log(`Scraper output: ${stdout}`);
  });
}

// Schedule the scraper to run every 1 minute
cron.schedule('* * * * *', () => {
  console.log('Running scheduled scraper task');
  runScraper();
});

console.log('Scheduler is running, scraper will execute every 1 minute');
