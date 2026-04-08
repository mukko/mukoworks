import { chromium } from "playwright";
import { execSync, spawn } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const outputDir = path.resolve(projectRoot, "public/ogp");

const pages = [
  {
    path: "/mukoworks/products/bitflip",
    output: "bitflip.png",
  },
  {
    path: "/mukoworks/products/eight",
    output: "eight.png",
  },
];

const PORT = 4321;

function buildSite() {
  console.log("Building site...");
  execSync("npm run build", { cwd: projectRoot, stdio: "inherit" });
}

function startPreview() {
  return new Promise((resolve, reject) => {
    const proc = spawn("npx", ["astro", "preview", "--port", String(PORT)], {
      cwd: projectRoot,
      stdio: ["ignore", "pipe", "pipe"],
    });

    const timeout = setTimeout(() => {
      reject(new Error("Preview server did not start within 15s"));
    }, 15000);

    proc.stdout.on("data", (data) => {
      const text = data.toString();
      if (text.includes("localhost")) {
        clearTimeout(timeout);
        resolve(proc);
      }
    });

    proc.stderr.on("data", (data) => {
      const text = data.toString();
      if (text.includes("localhost")) {
        clearTimeout(timeout);
        resolve(proc);
      }
    });

    proc.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });
  });
}

async function generateOgpImages() {
  buildSite();

  console.log("Starting preview server...");
  const previewProc = await startPreview();

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext({
      viewport: { width: 1200, height: 630 },
    });

    for (const page of pages) {
      const tab = await context.newPage();
      const url = `http://localhost:${PORT}${page.path}`;
      console.log(`Capturing: ${url}`);

      await tab.goto(url, { waitUntil: "networkidle" });

      const outputPath = path.join(outputDir, page.output);
      await tab.screenshot({
        path: outputPath,
        clip: { x: 0, y: 0, width: 1200, height: 630 },
      });

      console.log(`Saved: ${outputPath}`);
      await tab.close();
    }

    await browser.close();
    console.log("Done!");
  } finally {
    previewProc.kill();
  }
}

generateOgpImages().catch((err) => {
  console.error(err);
  process.exit(1);
});
