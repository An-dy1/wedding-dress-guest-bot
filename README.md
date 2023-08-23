This is a bot designed to trigger a text message when certain items are available for rent on Nuuly, a clothing rental service.

It uses puppeteer/chromium to access the site, Twilio to send text messages, and node-cron to run every other hour.

If you'd like to run, create a `.env` file with your Twilio credentials stored securely, and update the `dresses` array in index.ts. Compile and run with `node index.js`.
