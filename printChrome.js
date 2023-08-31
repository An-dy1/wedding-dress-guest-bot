const puppeteer = require('puppeteer');

(async () => {
  const browserFetcher = puppeteer.createBrowserFetcher();
  const revisionInfo = browserFetcher.revisionInfo(
    puppeteer._preferredRevision
  );
  console.log(revisionInfo.executablePath);
})();
