const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const appUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).href;
const axeSource = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

async function runAxe(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    const results = await window.axe.run(document, {
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa"],
      },
    });

    return results.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.length,
    }));
  });
}

test("landing page has no serious or critical axe violations", async ({ page }) => {
  await page.goto(appUrl);
  await page.waitForLoadState("domcontentloaded");

  const violations = await runAxe(page);
  const blockingViolations = violations.filter(
    (violation) => violation.impact === "serious" || violation.impact === "critical"
  );

  expect(blockingViolations).toEqual([]);
});
