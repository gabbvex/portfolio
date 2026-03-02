import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "..",
  outputDir: "test-results/",
  fullyParallel: true,

  // --- Timeouts ---
  timeout: parseInt(process.env.PLAYWRIGHT_TIMEOUT || "30000"),

  expect: {
    timeout: parseInt(process.env.PLAYWRIGHT_EXPECT_TIMEOUT || "5000"),
  },

  // --- CI ---
  forbidOnly: !!process.env.CI,
  retries: process.env.CI
    ? parseInt(process.env.PLAYWRIGHT_RETRIES || "2")
    : 0,
  workers: process.env.CI
    ? parseInt(process.env.PLAYWRIGHT_WORKERS || "1")
    : undefined,

  // --- Reports ---
  reporter: [
    [
      "html",
      {
        outputFolder: process.env.REPORT_OUTPUT_DIR || "reports/html-report",
        open: "never",
      },
    ],
    [
      "json",
      {
        outputFile:
          process.env.JSON_REPORT_OUTPUT || "reports/json-report/results.json",
      },
    ],
    ["list"],
    ["../reporter/VeggieReporter.ts"],
  ] as import("@playwright/test").ReporterDescription[],

  // --- Configuracoes globais ---
  use: {
    baseURL:
      process.env.BASE_URL ||
      "https://opensource-demo.orangehrmlive.com",

    trace: process.env.TRACE_ON_RETRY === "true" ? "on-first-retry" : "off",

    video:
      process.env.VIDEO_ON_FAILURE === "true" ? "retain-on-failure" : "off",

    screenshot:
      process.env.SCREENSHOT_ON_FAILURE === "true"
        ? "only-on-failure"
        : "off",


    headless: process.env.HEADLESS !== "false",
  },

  // --- Projects ---
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "Mobile Chrome",
      use: { ...devices["Pixel 5"] },
    },
    {
      name: "Mobile Safari",
      use: { ...devices["iPhone 12"] },
    },
  ],
});