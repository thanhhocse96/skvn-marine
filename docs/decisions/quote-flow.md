# Request a Quote Flow

## Decision

The Request a Quote flow stays on the same website.

Do not redirect users to a separate contact site in V1.

Human scope update on 2026-05-26:

- 0.5.1 focuses on page display/sidebar controls.
- 0.6.0 focuses on quote UI and editor/sidebar-controlled visual editing.
- CF7/CFDB7 implementation is deferred until after 0.6.0.
- n8n automation is deferred until after version 1.0.0.

## 0.6.0 Flow

```txt
Product page / Product grid
→ Request a Quote CTA
→ /request-a-quote/?product_id=123
→ Same-site quote UI/page surface
```

## Future Flow

```txt
Product page / Product grid
→ Request a Quote CTA
→ /request-a-quote/?product_id=123
→ Contact Form 7 form
→ CFDB7 stores submission
→ /quote-thank-you/
→ n8n webhook processes lead after 1.0.0
```

## Future Recommended Form Fields

Required:

- Full name
- Company name
- Email
- Country
- Product interest
- Quantity / estimated volume
- Message

Optional:

- Phone / WhatsApp
- Destination port
- Packaging requirement
- Certification requirement

Hidden/context fields:

- product_id
- product_sku
- product_name
- product_url
- source_url
- utm_source
- utm_medium
- utm_campaign
- utm_content
- utm_term

## Business UX Contexts

The canonical quote endpoint remains:

```txt
/request-a-quote/
```

Different marketing or product pages may route buyers into the same quote flow with different context. These examples are for UX design and future hidden-field mapping; they do not create separate form handlers.

Product-specific quote:

```txt
/request-a-quote/?product_id=123
```

Use when the buyer starts from a single product page or product card.

Category quote:

```txt
/request-a-quote/?category=frozen-fish
```

Use when the buyer is comparing a category such as frozen fish, shrimp, squid, crab, or value-added seafood.

Packing/private-label quote:

```txt
/request-a-quote/?intent=packing
```

Use when the buyer needs carton size, private label, packing specification, documentation, or cold-chain support.

Export inquiry:

```txt
/request-a-quote/?intent=export
```

Use when the buyer is asking about export capability, certificates, destination market, logistics, or company qualification.

Sample request:

```txt
/request-a-quote/?intent=sample
```

Use when the buyer wants a sample before container-scale quotation.

Campaign or landing-page quote:

```txt
/request-a-quote/?source=campaign-vn-seafood
```

Use when the buyer arrives from a campaign, homepage section, or dedicated landing page. Standard UTM fields may also be carried.

Rule:

- Many marketing pages may exist.
- Keep one quote flow and one canonical quote endpoint.
- Use query/context fields to preserve buyer intent.
- Future CF7 hidden fields should capture the context when form handling returns to scope.

## Caching

Cache product pages.

Do not cache:

- `/request-a-quote/`
- `/quote-thank-you/`
- CF7 AJAX endpoints if caching causes issues

## V2/V3 Ideas

- Quote modal on desktop
- Multi-product quote form
- Add-to-quote basket
- CRM integration
- Sales dashboard
