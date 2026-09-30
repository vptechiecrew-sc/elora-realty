# Add properties from a Google Sheet

Once set up, adding a property means: **add a row in the sheet, then click Website > Publish changes.** The site updates in 1-2 minutes. Nobody needs to touch the code.

One-time setup takes about 15 minutes.

---

## Part 1: Create the sheet (5 min)

1. Go to **sheets.google.com** and create a new spreadsheet. Name it "Elora Realty Listings".
2. Import the template: **File > Import > Upload** and choose `docs/listings-template.csv`. Pick **Replace current sheet**.
   The first row holds the column names. **Do not rename or delete them.**
3. The template has one example row with **Show on website = No**, so it stays hidden. Copy it as a pattern for real rows.

### What goes in each column

| Column | What to write | Example |
|---|---|---|
| **Id** | Leave empty. The web address is created from the title and location. | |
| **Title** (required) | Short property name | `Corner Plot, Vadasery` |
| **Type** (required) | Exactly one of: Residential land, Agricultural land, Commercial land, House, Apartment, Commercial property | `Residential land` |
| **Location** (required) | `Nagercoil` or `Chennai` | `Chennai` |
| **Price** (required) | A number. `32 lakh`, `1.2 crore` and `3200000` all work | `32 lakh` |
| **Area** | Number only | `5` |
| **Unit** | `cents`, `acres`, `sq ft`, etc. | `cents` |
| **Status** | Available, Reserved or Sold | `Available` |
| **Description** | 2-4 lines about the property. This text is what Google reads, so make it specific. | |
| **Features** | Separate with a semicolon | `Corner plot; Road access; Clear title` |
| **Images** | Photo file names separated by spaces (see Part 4). Up to 3. | `plot-1.jpg plot-2.jpg` |
| **Focus** | Optional. Which part of a tall photo stays visible, e.g. `50% 75%` | |
| **Show on website** | Type `No` to hide a row without deleting it. Empty means shown. | |

Tips:
- **Put the newest property at the top.** The first 3 rows appear on the home page.
- Use the **dropdown** trick for Type, Location and Status: select the column, then **Data > Data validation > Dropdown**, and enter the allowed values. This prevents typos.
- **Do not change a Title after the property is live.** The property's web address is made from the title, so changing it changes the link (and breaks links already shared or indexed by Google). To change the wording without changing the link, fill in the **Id** column once, e.g. `corner-plot-vadasery`, and never change it.

---

## Part 2: Publish the sheet as CSV (2 min)

1. In the sheet: **File > Share > Publish to web**.
2. Under **Link**, choose the **listings tab** (not "Entire document") and **Comma-separated values (.csv)**.
3. Click **Publish**, then copy the link. It looks like `https://docs.google.com/spreadsheets/d/e/.../pub?output=csv`.

Only people with this link can read the sheet, and it only contains what you'd put on the website anyway. **Do not put private notes (owner phone numbers, negotiation prices) in this tab.** Keep those in a separate tab that is not published.

---

## Part 3: Connect it to the website (3 min)

In **Netlify**: Site configuration > Environment variables > Add a variable

- Key: `SHEET_CSV_URL`
- Value: the link you copied

Save, then **Deploys > Trigger deploy > Deploy site**.

If the sheet ever can't be read (link wrong, sheet unpublished), the build **stops and the live site stays as it was**. It will never publish sample or empty pages by accident. The Netlify build log says what went wrong, and lists any rows it skipped and why.

---

## Part 4: Photos

Text is easy through the sheet. Photos take one extra step because the website stores them itself (faster, and better for Google):

1. Resize each photo to about 1600 px wide and keep it under ~300 KB. Name it clearly with no spaces, e.g. `vadasery-plot-1.jpg`.
2. Upload the files into the `public/images/` folder of your GitHub repo (Add file > Upload files > Commit).
3. Write the file names in the **Images** column, separated by spaces.

A property with no photo shows a neat illustration, so you can list it first and add photos later.

Google Drive share links do **not** work as website photos (Google blocks them). The build will skip them and tell you.

---

## Part 5: The "Publish changes" button (5 min)

Netlify can rebuild the site whenever it's told to. This adds a menu item to your sheet that tells it.

1. In Netlify: Site configuration > Build & deploy > **Build hooks** > **Add build hook**. Name it "Google Sheet", branch `main`. Copy the URL it gives you.
2. In the sheet: **Extensions > Apps Script**. Delete anything there and paste:

```js
const HOOK = 'PASTE_THE_NETLIFY_BUILD_HOOK_URL_HERE';

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Website').addItem('Publish changes', 'publishSite').addToUi();
}

function publishSite() {
  const ui = SpreadsheetApp.getUi();
  const res = UrlFetchApp.fetch(HOOK, { method: 'post', muteHttpExceptions: true });
  const code = res.getResponseCode();
  if (code >= 200 && code < 300) ui.alert('Done. Your website will update in about 1-2 minutes.');
  else ui.alert('Something went wrong (code ' + code + '). Check the build hook link in the script.');
}
```

3. Save, reload the sheet, and a **Website** menu appears. The first time, Google asks you to allow the script. Choose your account, then **Advanced > Go to project (unsafe) > Allow**. That warning appears for every personal script and is normal.

**Daily use:** add or edit rows, then **Website > Publish changes**.

Notes:
- Google can take a few minutes to refresh the published sheet. If a change is missing on the site, wait a few minutes and click Publish changes again.
- Each publish is one Netlify build (about a minute). Make all your edits first, then publish once.

---

## If something looks wrong

| Problem | Fix |
|---|---|
| A property is missing on the site | Check the Netlify deploy log. It lists skipped rows, e.g. `Row 6: Type "Villa" is not one of ...` |
| A property's Type or Location was rejected | Use exactly the allowed words (case doesn't matter) |
| Price shows wrong | Write a plain number, or `32 lakh` / `1.2 crore` |
| Site didn't change after publishing | Wait a few minutes (Google's refresh), then publish again |
| Build failed | Open the deploy log. The message at the top says whether the sheet link is wrong or unpublished |
