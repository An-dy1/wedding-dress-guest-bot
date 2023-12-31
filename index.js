"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var puppeteer = require("puppeteer-core");
var dotenv = require("dotenv");
var twilio = require("twilio");
dotenv.config();
var winston = require('winston');
var logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf(function (_a) {
        var timestamp = _a.timestamp, level = _a.level, message = _a.message;
        return "".concat(timestamp, " [").concat(level, "]: ").concat(message);
    })),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' }),
    ],
});
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var twilioAccountSid, twilioAuthToken, twilioPhoneNumber, recipientPhoneNumber, dresses, browser, _i, dresses_1, dress, page, element, isAvailable, currentDate, currentDayOfMonth, currentMonth, currentYear, dateString, client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
                    twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
                    twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
                    recipientPhoneNumber = process.env.RECIPIENT_PHONE_NUMBER;
                    dresses = [
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
                    return [4 /*yield*/, puppeteer.launch({
                            headless: true,
                            executablePath: '/usr/bin/chromium-browser',
                        })];
                case 1:
                    browser = _a.sent();
                    _i = 0, dresses_1 = dresses;
                    _a.label = 2;
                case 2:
                    if (!(_i < dresses_1.length)) return [3 /*break*/, 9];
                    dress = dresses_1[_i];
                    return [4 /*yield*/, browser.newPage()];
                case 3:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto(dress.url)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, page.$('[aria-label="M"]:not([disabled])')];
                case 5:
                    element = _a.sent();
                    isAvailable = element !== null;
                    currentDate = new Date();
                    currentDayOfMonth = currentDate.getDate();
                    currentMonth = currentDate.getMonth();
                    currentYear = currentDate.getFullYear();
                    dateString = currentMonth + 1 + '-' + currentDayOfMonth + '-' + currentYear;
                    if (!!isAvailable) return [3 /*break*/, 7];
                    logger.info("The item '".concat(dress.name, "' in size ").concat(dress.size, " is available on ").concat(dateString, "! ").concat(dress.url, "}. A message was sent to ").concat(process.env.RECIPIENT_PHONE_NUMBER));
                    client = twilio(twilioAccountSid, twilioAuthToken);
                    return [4 /*yield*/, client.messages.create({
                            to: recipientPhoneNumber,
                            from: twilioPhoneNumber,
                            body: "The item '".concat(dress.name, "' in size ").concat(dress.size, " is available on ").concat(dateString, "! ").concat(dress.url, "}"),
                        })];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    // for local
                    console.log("The item '".concat(dress.name, "' in size ").concat(dress.size, " is not available on ").concat(dateString, "!"));
                    // for ec2
                    logger.info("The item '".concat(dress.name, "' in size ").concat(dress.size, " is not available on ").concat(dateString, "!"));
                    _a.label = 8;
                case 8:
                    _i++;
                    return [3 /*break*/, 2];
                case 9: return [4 /*yield*/, browser.close()];
                case 10:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
run();
