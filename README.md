# The Telephone Scrolls

An interactive timeline of the telephone, from Bell's liquid transmitter of 1876 to the foldable phones of 2026, set on an old parchment scroll.

Fifty phones across six chapters:

| Chapter | Name | Span |
|---|---|---|
| I | The Speaking Wire | 1876–1904 |
| II | The Age of the Dial | 1927–1965 |
| III | The Wireless Brick | 1973–1989 |
| IV | The Pocket Companion | 1992–2007 |
| V | The Sheet of Glass | 2007–2017 |
| VI | The Fold & the Thinking Phone | 2019–2026 |

Each phone has its date, network or OS, four key specs, and a full "tale" (story, engineering milestones, an archivist's note and sources).

## Using it

- Drag the carousel, scroll, use the arrow keys, or click the year trail.
- **Unroll the Full Tale** opens the story scroll for the phone in the centre.
- **Voyage** plays through every phone in order.
- **All Phones** opens a ledger of the whole collection.
- The sound button turns on a ring for each era.

## Running locally

It is a static site with no build step. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000. It also works as-is on GitHub Pages.

## Files

- `index.html`, `styles.css`, `app.js`: the page, the parchment theme and the carousel.
- `data/phones-a.js`, `data/phones-b.js`, `data/phones-c.js`: researched entries for 1876–1972, 1973–2007 and 2007–2026.
- `photos.js` and `img/`: one cut-out photo per phone, with its credit and licence.
- `sketches.js`, `sketchmap.js`: ink-sketch fallbacks, used if a photo is missing.

## Credits

Facts were checked against the sources listed in each phone's entry. Photo credits and licences are shown in each story scroll and listed in [CREDITS.md](CREDITS.md). Backgrounds were removed from the photos with an AI background remover.
