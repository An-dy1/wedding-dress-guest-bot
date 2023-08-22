import * as puppeteer from 'puppeteer';
import * as twilio from 'twilio';
import * as dotenv from 'dotenv';

dotenv.config();

export const handler = async (): Promise<void> => {
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
  const recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;

  const url =
    'https://www.nuuly.com/rent/products/november-strapless-gown?color=001'; // Replace with your URL

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const element = await page.$('[aria-label="M"]:not([disabled])');
  const isAvailable = element !== null;

  await browser.close();

  // If the element is not disabled, send a text message using Twilio
  if (isAvailable) {
    console.log('Item is available');
    const client = twilio(twilioAccountSid, twilioAuthToken);
    await client.messages.create({
      to: recipientPhoneNumber!,
      from: twilioPhoneNumber!,
      body: 'Your item is available!',
    });
  } else {
    console.log('Item is not available');
  }
};

handler();
