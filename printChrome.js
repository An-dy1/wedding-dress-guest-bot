const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const browserVersion = await browser.version();
  console.log(`Browser version: ${browserVersion}`);

  const wsEndpoint = browser.wsEndpoint();
  console.log(`WebSocket Endpoint: ${wsEndpoint}`);

  //   const executablePath = browser.executablePath;
  //   console.log(`Executable Path: ${executablePath}`);

  await browser.close();
})();
