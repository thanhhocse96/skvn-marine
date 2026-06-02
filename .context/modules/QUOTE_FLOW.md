# QUOTE FLOW

## [manual] Decision

Use same-site Request a Quote page.

Quote UI/page surface is deferred to V1 / 0.6.0.

CF7/CFDB7 implementation is deferred until after 0.6.0.

n8n automation is deferred until after version 1.0.0.

## [manual] Stack

- 0.6.0: visual quote path, request quote page surface, CTA styling, editor/sidebar-controlled UI.
- After 0.6.0: Contact Form 7 + CFDB7.
- After 1.0.0: n8n webhook automation.

## [manual] Flow

0.6.0:

Product CTA → `/request-a-quote/?product_id=123` → same-site quote UI/page surface.

Future:

Product CTA → `/request-a-quote/?product_id=123` → CF7 → CFDB7 → thank-you page → n8n after 1.0.0.

## [manual] Business UX Contexts

Canonical endpoint remains `/request-a-quote/`.

Multiple marketing pages may route into the same quote flow with query/context fields:

- Product-specific quote: `/request-a-quote/?product_id=123`
- Category quote: `/request-a-quote/?category=frozen-fish`
- Packing/private-label quote: `/request-a-quote/?intent=packing`
- Export inquiry: `/request-a-quote/?intent=export`
- Sample request: `/request-a-quote/?intent=sample`
- Campaign or landing-page quote: `/request-a-quote/?source=campaign-vn-seafood`

Rule: many marketing pages are allowed, but keep one canonical quote flow. Future CF7 hidden fields should capture this context when form handling returns to scope.

## [manual] Cache Rule

Do not cache request quote or thank-you pages.
