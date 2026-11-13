# Rohith & Akhila — The Wedding Experience

A complete English-language, royal-blue and ivory wedding invitation. Fifteen experience sections include a fold-and-seal envelope opening, six independent editorial photo compositions, live countdown, expandable ceremony information, venue search, separate ceremony and celebration calendar downloads, WhatsApp RSVP, local wish-lantern animation and native sharing with copy fallback.

## Run locally

Requires Node.js 20 or newer. There are no package dependencies.

```sh
npm run dev
```

Visit http://127.0.0.1:5173. Use the HTTP server rather than opening index.html directly, because JavaScript modules require HTTP. Run `npm test` for functional checks and `npm run build` to generate `dist/`.

## Wedding information and required corrections

Edit `wedding-config.js`. It centralizes the couple, both families and their addresses, sign-off and acknowledgments, ceremony schedule, separate celebration schedule, both venues, source/verification notes, Maps URLs, phone and photograph assignments.

The family supplied the printed-card transcription. Groom: son of Ravindran Kunnath and Geetha Ravindran, Kunnummal House, Hajiyarpadi, Urupuram P.O., Areekode, Malappuram. Bride: daughter of Jagathi and Babitha Jagathi, Kattuparamba House, Beypore, Kozhikode. The exact requested sign-off is Kunnath Ravindran & Geetha Ravindran; acknowledgments include Vimal & Harsha.

The wedding ceremony is Sunday, 10 January 2027, 11:00–11:30 AM IST, at the bride's house. Its Maps action is explicitly an address search until the house pin is verified.

The separate celebration is Sunday, 10 January 2027, from 1:00 PM onwards at VIBGYOR Auditorium & Convention Centre, Areekode–Edavannappara Road. Only its ending time is unconfirmed. The original QR short URL was resolved through HTTP 302 and identifies VIBGYOR, not the ceremony house. Its marker coordinates are 11.2390991, 76.0081802; the full postal address is corroborated by the linked venue directory in the configuration. Celebration directions use that verified original QR link, and an embedded map appears only for this verified venue.

The celebration calendar file contains the confirmed start but deliberately omits DTEND and DURATION; no ending time is invented. Each event has its own calendar UID, venue, address, directions and copy action. The two remaining pending items are listed under `verification.pending`: the celebration ending time obscured on the printed card, and the precise ceremony house pin. The original card image was not supplied; these content corrections use the family's transcription, not a claim of visual OCR verification.

Set `canonicalUrl` to the final public origin. Update static metadata in `index.html` with that origin and an absolute `og:image` URL before public launch: social crawlers may not execute JavaScript. The supplied image can be used as the social image without alteration.

## Deploy on Vercel

1. Import this folder into a Git repository connected to Vercel, or run the official Vercel CLI in this folder with your own authenticated account.
2. Framework preset: Other. The included `vercel.json` sets `npm run build` and the `dist` output folder.
3. No environment variables or backend are required.
4. Add the public deployment URL to the central configuration and static Open Graph tags, then deploy again.
5. Test the resulting link from a phone without an authenticated developer session before sending to guests.

A Sites deployment, if available, preserves its default private audience. It is a review link for the owner; it is not a public guest invitation. Use Vercel for the requested broadly shareable guest URL unless Site sharing is explicitly changed.

## Source organization

- `app.js`: reusable photo/family/action render functions and section composition; opening, countdown, calendar, RSVP, copy, share and lantern behavior.
- `styles.css`: responsive editorial layouts, envelope fold geometry, lantern animation and reduced-motion alternatives.
- `wedding-config.js`: authoritative editable event data and pure event utilities.
- `tests/wedding.test.mjs`: meaningful time, calendar, link and asset checks.
- `build.mjs`: copies only required application assets to `dist`.
- `server.mjs`: dependency-free local preview server.

The existing static architecture was retained instead of introducing React/TypeScript/Tailwind dependencies. Original WebP photographs are untouched; offscreen photographs lazy-load, hero preloads. Six portraits are never combined into a gallery. On wide screens whole portraits use cinematic negative space; on mobile the flower-field and intimate finale captions sit outside the faces.

## Interaction and privacy

Calendar files use UTC instants: ceremony 05:30–06:00 UTC (11:00–11:30 AM IST); celebration starts 07:30 UTC (1:00 PM IST), with no unverified end time. Guests open the downloaded ICS file in their chosen calendar. WhatsApp receives a prefilled attendance message only when the guest follows the link; the guest must send it. Wishes animate locally and are not stored or transmitted. Share uses the current URL unless `canonicalUrl` is set. Clipboard failures fall back to selectable text. External fonts load from Google Fonts; the verified celebration map loads from Google Maps; no analytics, attendee database, tracking scripts or cookies are used. Georgia and Arial are offline fallbacks.

See `QA-REPORT.md` for verified checks and the remaining browser/device validation.
