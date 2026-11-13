# QA report — 13 November 2026

## Verified by executable checks

- `npm test`: seven passing tests covering IST countdown arithmetic and post-event clamp, UTC calendar bounds and escaped address, both WhatsApp response options, explicit Google Maps textual search, and all six unique source assets assigned to independent sections.
- `npm run build`: successful static build containing index, application modules, stylesheet and eight original WebP assets.
- `node --check app.js`: successful JavaScript syntax check.
- Source review: fifteen experience sections (opening plus fourteen main sections); English UI; no gallery, carousel, invented reception schedule, generated replacement photography, backend delivery claims or fabricated coordinates.
- Original source images were visually inspected individually: stone portrait, both beach portraits, hands, flower field and black-and-white portrait. No original image was modified.

## Implemented, but not browser-verified

Envelope open/skip/Escape, focus containment, inert background, reduced-motion bypass, one-second countdown rendering, expandable ceremony, ICS download, clipboard fallback, native sharing fallback, attendance selection, wish validation, lantern animation and re-release.

Responsive CSS covers 320px upwards, mobile landscape, portrait image focal positions, safe-area padding, readable labels and 44px-plus primary touch targets. Visual overflow, crop correctness and animation timing still require rendering on the actual browsers below.

## Unverified environments

Android Chrome, iPhone Safari, desktop Chrome, desktop Firefox, narrow mobile, landscape mobile, throttled networks and reduced-motion runtime behavior. No physical-device testing was performed. Browser host access was unavailable. Native Windows browser inspection was attempted through the Computer Use skill, but the tool stopped because it could not determine Chrome's current URL sufficiently to enforce policy. No browser interactions were performed after that stop.

The reference URL could not be fetched by web tools; the supplied brief was used for interaction requirements. No claim of visual reference inspection is made.

## Content and launch blockers

The original card image was not present, but the family supplied its printed details and then confirmed the celebration date/start. Both parental names and addresses, the exact sign-off and Vimal & Harsha acknowledgments are now displayed. Ceremony: 10 January 2027, 11:00–11:30 AM IST, Kattuparamba House, Beypore, Kozhikode. Celebration: same Sunday, from 1:00 PM onwards, VIBGYOR Auditorium & Convention Centre; only its ending time remains unconfirmed.

The supplied QR link `https://maps.app.goo.gl/n56xQ4fDVavrNHdeA` was checked using Node fetch with redirect set to manual. Its HTTP 302 Location names `VIBGYOR+Auditorium+%26+Convention+centre`; the place-marker coordinates are `!3d11.2390991!4d76.0081802`. The viewport longitude is different and was not used. The QR destination is attached only to the celebration, never the ceremony. The fuller postal address was corroborated with https://www.mandap.com/malappuram/vibgyor-auditorium-and-convention-centre-in-malappuram and matches other directory results. The house's exact pin remains unknown, so its action is an explicitly labeled textual Maps search.

New executable checks verify distinct venue links and separate calendar UIDs, the celebration's 07:30 UTC start, absence of invented DTEND/DURATION, and the ceremony calendar's independent venue. Seven tests pass. Syntax validation and the static build pass after the corrections. No additional browser/device QA was claimed.

Before sending publicly: confirm the precise house pin and celebration ending time when readable, review every section on the target browsers, test calendar import in Apple/Google/Outlook calendars, test WhatsApp handoff and native share on devices, confirm the final public URL, and set absolute Open Graph image/canonical metadata. Verify all six independent photographs in both orientations, no horizontal scroll at 320px, text clear of faces, and keyboard behavior in the opening and wish form.

## Performance and privacy

Original optimized WebP photography totals approximately 1.1 MB; only the hero preloads, other photographs lazy-load. There are no runtime package dependencies or analytics trackers. The embedded celebration map requests Google Maps only when lazy-loaded; Google may receive normal request information. The optional external Google Fonts stylesheet has local font fallbacks. No Lighthouse scores, network profiles or screen-reader results were measured.

## Deployment status

A private Sites project was registered, but source publication was blocked by automatic approval review. The stated reason was that committing and pushing the couple photographs and contact details to the externally managed Sites repository requires explicit approval for that destination. No successful source push, saved version or live deployment was confirmed. Project identity is retained in `.openai/hosting.json` so a later approved attempt can reuse it. Vercel configuration and the complete local source remain available.

Local preview HTTP check returned 200. The preview server is stopped after handoff; restart with `npm run dev`.


## Latest ceremony venue correction

Updated the ceremony everywhere to Kattuparamba House, Beypore, Kozhikode, Kerala, identified as Bride?s Home ? Wedding Ceremony. Removed the previous street-level address from current ceremony and bride-family displays because it was not reconfirmed with the corrected house name. Countdown remains 10 January 2027 at 11:00 AM IST; calendar remains 11:00?11:30 AM IST and uses the corrected house and event label. Ceremony Maps uses a textual search for the corrected address. The verified VIBGYOR QR, celebration venue and 1:00 PM start remain separate.

## Creative photography refinement

Added individual chapter headings, section links and distinct editorial treatments for every original photograph. Mobile portrait sections now let the complete photograph determine its height, with separate readable captions; the hands section uses a subject-focused oversized crop. Desktop uses alternating image/text compositions, restrained arches and generous negative space. Added a date itinerary linking ceremony and celebration, an ornamental hero monogram and paper/envelope refinements. All six original photograph files are included in dist and were byte-compared with their sources: unchanged. Seven automated checks, JavaScript syntax validation and static build pass. This refinement has not been visually verified in a browser or on physical devices; the prior browser-access limitations still apply. No deployment was attempted.
