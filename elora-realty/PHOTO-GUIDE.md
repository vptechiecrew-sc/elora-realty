# Elora Realty: Photo Guide

Good photos are the biggest factor in getting enquiries. Follow this guide for every listing.

## Best size to use (quick answer)

| Photo shape | Size to export | Use it for |
|---|---|---|
| **Landscape (best)** | **1600 x 1067 px** (3:2) or **1600 x 1200 px** (4:3) | Main photo of every property |
| Portrait (tall) | 1200 x 1600 px (3:4) | Extra photos, house front, gate, road |
| Minimum allowed | 1200 px on the long side | Anything smaller looks blurry on desktop |
| Maximum needed | 2000 px on the long side | Bigger files only slow the site down |

**Rule of thumb:** make the FIRST photo landscape. It is the photo shown on the home page card and the first one on the property page.

## File type and weight

- Format: **WebP** (best) or **JPG**. Avoid PNG for photos (files are huge).
- Weight per photo: **150 KB to 400 KB**. Under 600 KB is still fine.
- Name files in lowercase, no spaces: `vadasery-plot-1.webp`, `vadasery-plot-2.webp`.

## How many photos

- **Up to 3 photos per property** (the site reads the first 3 names in the sheet's Images column).
- Suggested set: 1) wide view of the plot or house, 2) the road or entrance, 3) the surroundings.

## Where each size is actually shown on the site

| Place | Shown at about | Notes |
|---|---|---|
| Home page card / Properties list | 375 x 280 px (4:3 box) | Photo is trimmed to fit this box |
| Property page, main photo (desktop) | 650 x 490 px | Whole photo is visible, never cropped |
| Property page (mobile) | full width of the phone | Whole photo is visible |
| Full-screen viewer | up to the full screen | Whole photo is visible |

Phone and retina screens show images at 2x, which is why we ask for 1600 px wide even though the biggest box on the site is about 650 px.

## Choosing which part shows on the home card (Focus)

The home card trims the photo to a 4:3 box. For a tall photo, tell the site which part to keep using the **Focus** column in the Google Sheet:

| Focus value | What stays visible |
|---|---|
| `50% 50%` (or blank) | The middle of the photo |
| `50% 25%` | Upper part (sky, building top) |
| `50% 75%` | Lower part (road, ground, plot) |

First number = left to right, second number = top to bottom. The property page always shows the full photo regardless of Focus.

## Taking good photos (Nagercoil plots and houses)

1. **Hold the phone sideways** (landscape). This single habit fixes most layout problems.
2. Shoot in morning or late afternoon light. Midday sun makes land look dull and washed out.
3. For plots: stand at a corner and show the full width, the road, and the nearby buildings or trees.
4. For houses: shoot the front straight on, one from the side, and one inside the main hall.
5. Do not use filters, collages, or text/watermarks on the photo.

## Adding photos to the website (every time)

1. Resize and save each photo using the sizes above (free tools: squoosh.app or any phone gallery "resize").
2. Open your GitHub repository, go to `public/images/`, click **Add file > Upload files**, drop the photos in, and **Commit**.
3. In the Google Sheet, write the file names in the **Images** column, separated by spaces: `vadasery-plot-1.webp vadasery-plot-2.webp`.
4. Cloudflare rebuilds the site in about a minute. If you only changed the sheet, open Cloudflare **Deployments** and choose **Retry deployment**.

Google Drive links do not work as website photos. The file must be inside `public/images/`.
