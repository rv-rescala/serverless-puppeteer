import { Browser } from "puppeteer-core";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export async function getBrowser(): Promise<Browser> {
    console.log("Launching browser");
    console.log("IS_LOCAL: " + process.env.IS_LOCAL);
    console.log("BROWSER_PATH: " + process.env.BROWSER_PATH);
    const executablePath = process.env.IS_LOCAL ? process.env.BROWSER_PATH: await chromium.executablePath();
    //const executablePath = process.env.IS_LOCAL ? process.env.BROWSER_PATH: "/tmp/chromium";

    console.log("ExecutablePath: " + executablePath);

    const browser = await puppeteer.launch({
        args: process.env.IS_LOCAL ? puppeteer.defaultArgs() : chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: executablePath,
        ignoreHTTPSErrors: true
    });
    return browser;
}