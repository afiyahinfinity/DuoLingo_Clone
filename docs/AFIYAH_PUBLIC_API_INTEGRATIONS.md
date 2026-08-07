# Afiyah Public API Integrations

This branch adds three read-only external data integrations behind Afiyah-owned server routes.

## 1. ExchangeratesAPI

Purpose: currency education, money tools, country-aware financial examples, and future wallet display helpers.

Server route:

- `GET /api/integrations/exchange?base=USD&symbols=AED,BDT,GBP,SAR`
- `GET /api/integrations/exchange?from=USD&to=BDT&amount=100`

Secret:

- `EXCHANGERATES_API_KEY` — server-only. Never expose as `NEXT_PUBLIC_*` and never commit the value.

Implementation note: ExchangeratesAPI defaults to EUR and changing base can depend on plan. The Afiyah adapter fetches EUR quotes and normalizes them server-side when a different base is requested.

Caching: one hour.

## 2. REST Countries

Purpose: country, currency, language, timezone and region metadata for localized learning and money experiences.

Server route:

- `GET /api/integrations/countries/BD`
- `GET /api/integrations/countries/AE`

No API key is required.

Caching: one day.

## 3. Quran Cloud

Purpose: read-only retrieval of source text for approved learning experiences.

Server route:

- `GET /api/integrations/quran?ref=2:261`
- `GET /api/integrations/quran?ref=4:58&edition=quran-uthmani`
- `GET /api/integrations/quran?ref=4:58&edition=en.sahih`

Allowed editions are intentionally restricted to `quran-uthmani` and `en.sahih` in this first integration.

No API key is required.

Important: retrieval is not interpretation. Curriculum use, translations, explanatory copy and religious claims remain subject to Afiyah Shariah review.

Caching: one day.

## Security rules

1. External API credentials remain server-only.
2. No third-party key is returned in an Afiyah API response.
3. Input values are validated before upstream calls.
4. Upstream responses are normalized into Afiyah-owned response shapes where appropriate.
5. External services must not become authoritative sources for Shariah rulings, medical advice, or financial advice.
