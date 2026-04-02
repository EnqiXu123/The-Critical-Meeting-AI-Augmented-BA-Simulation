const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const appUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).href;

async function openMeetingRoom(page) {
  await page.goto(appUrl);
  await page.waitForLoadState("domcontentloaded");
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation: none !important;
        transition: none !important;
        scroll-behavior: auto !important;
      }
    `,
  });
  await page.evaluate(() => {
    window.startMeeting();
  });
  await expect(page.locator("#meetingScreen")).toBeVisible();
  await expect(page.locator("#notesPanel")).toBeVisible();
}

test("AI Meeting Notes toggle and close button open and close the panel", async ({ page }) => {
  await openMeetingRoom(page);

  const notesToggle = page.getByRole("button", { name: "AI Meeting Notes" });
  const notesPanel = page.locator("#notesPanel");
  const notesClose = page.locator("#closeNotesButton");

  await expect(notesPanel).toBeVisible();

  await notesToggle.click();
  await expect(notesPanel).toBeHidden();

  await notesToggle.click();
  await expect(notesPanel).toBeVisible();

  await notesClose.click();
  await expect(notesPanel).toBeHidden();
});

test("AI Assist expands to fill the sidebar when opened alone", async ({ page }) => {
  await openMeetingRoom(page);

  const notesToggle = page.getByRole("button", { name: "AI Meeting Notes" });
  const assistToggle = page.getByRole("button", { name: "AI Assist" }).first();
  const notesPanel = page.locator("#notesPanel");
  const assistPanel = page.locator("#assistantPanel");

  const notesOnlyBox = await notesPanel.boundingBox();
  expect(notesOnlyBox).not.toBeNull();

  await notesToggle.click();
  await expect(notesPanel).toBeHidden();

  await assistToggle.click();
  await expect(assistPanel).toHaveClass(/is-open/);

  const assistOnlyBox = await assistPanel.boundingBox();
  expect(assistOnlyBox).not.toBeNull();

  const heightDelta = Math.abs(assistOnlyBox.height - notesOnlyBox.height);
  expect(heightDelta).toBeLessThan(12);
});
