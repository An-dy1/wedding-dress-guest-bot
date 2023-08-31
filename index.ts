import * as puppeteer from 'puppeteer-core';
import * as dotenv from 'dotenv';
import * as twilio from 'twilio';

dotenv.config();

async function run() {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;

  const dresses = [
    {
      url: 'https://www.nuuly.com/rent/products/november-strapless-gown?color=001',
      name: 'November Strapless Gown',
      size: 'M',
    },
    {
      url: 'https://www.nuuly.com/rent/products/pleated-tulle-sweetheart-dress?color=266',
      name: 'Pleated Tulle Sweetheart Dress',
      size: '6',
    },
  ];

  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/usr/bin/chromium-browser',
  });

  for (const dress of dresses) {
    const page = await browser.newPage();
    await page.goto(dress.url);

    const element = await page.$('[aria-label="M"]:not([disabled])');
    const isAvailable = element !== null;

    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // Be careful! January is 0, not 1
    const currentYear = currentDate.getFullYear();

    const dateString =
      currentMonth + 1 + '-' + currentDayOfMonth + '-' + currentYear;

    // If the element is not disabled, send a text message using Twilio
    if (isAvailable) {
      const client = twilio(twilioAccountSid!, twilioAuthToken!); // Use the ! operator to assert non-null
      await client.messages.create({
        to: recipientPhoneNumber!,
        from: twilioPhoneNumber!,
        body: `The item '${dress.name}' in size ${dress.size} is available on ${dateString}! ${dress.url}}`,
      });
    } else {
      console.log(
        `The item '${dress.name}' in size ${dress.size} is not available on ${dateString}!`
      );
    }
  }

  await browser.close();
}

run();
