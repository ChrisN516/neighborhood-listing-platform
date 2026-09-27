\# Accessibility and AI Review Evidence



\## AI Studio TypeScript Interface Review



AI Studio was asked to return only `Property` and `Sponsor` TypeScript interfaces. All property fields were accepted as required because the card depends on them. `Sponsor.description` was accepted as optional because the banner works without it.



\## Manual Keyboard Test



The final tab sequence was:



1\. Neighborhood selector

2\. Maximum price selector

3\. Apply filters button

4\. Maple Street Save property button

5\. Maple Street details link

6\. Downtown Loft Save property button

7\. Downtown Loft details link

8\. Riverside Cottage Save property button

9\. Riverside Cottage details link

10\. Habitat for Humanity link



Shift+Tab moved backward correctly. Enter and Space operated the applicable controls. Visible focus indicators appeared on the dropdowns, buttons, and links.



\## Responsive Test



\- 600 px: one property-card column

\- 900 px: two property-card columns

\- 1200 px: three property-card columns



The Tailwind breakpoints are `md` at 768 px and `lg` at 1024 px.



\## Lighthouse Audit



The desktop Lighthouse Accessibility score was 100. No automatic accessibility failures were detected. Lighthouse displayed an IndexedDB warning that could affect performance measurements, but it did not affect the accessibility score.



\## ChatGPT Semantic Review



Accepted recommendations:



\- Correct the property title from `h2` to `h3`.

\- Replace unrelated placeholder icons with a property illustration.

\- Give interactive controls property-specific accessible names.



\## Gemini Accessibility Review



Accepted recommendations:



\- Correct the heading hierarchy to `h1`, `h2`, then `h3`.

\- Make the visible property-link text include the property title.



Modified recommendation:



\- Dynamic image alt text was retained because the assignment requires property data in the alternative text. The temporary icons were replaced so the alt text accurately describes a listing illustration.



Rejected recommendation:



\- The entire card was not made clickable because it contains more than one interactive control and a card-wide overlay could interfere with keyboard interaction.



\## Final Verification



The project passed:



\- `npx tsc --noEmit`

\- `npm run lint`

\- `npm run build`

