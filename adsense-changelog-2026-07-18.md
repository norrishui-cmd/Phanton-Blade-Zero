# AdSense ownership configuration

Date: 2026-07-18  
Publisher: `ca-pub-9505220977121599`

## Installed

- AdSense loader script in the `<head>` of every HTML page.
- `google-adsense-account` meta tag in the `<head>` of every HTML page.
- Root-level `ads.txt` publisher record.
- Idempotent installer: `node scripts/install-adsense.mjs`.
- Audit checks requiring exactly one script and one meta tag per page plus the exact `ads.txt` record.

## Verification URLs

- `https://phantombladezerowiki.wiki/ads.txt`
- `view-source:https://phantombladezerowiki.wiki/`

Expected `ads.txt` response:

```text
google.com, pub-9505220977121599, DIRECT, f08c47fec0942fa0
```

The account code enables ownership verification and Auto Ads eligibility. It does not insert manually positioned ad units into article layouts.
