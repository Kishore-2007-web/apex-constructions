# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-19

### Added
- Initial release of the **Apex Infrastructure & Construction Website Template**.
- Structural folder layout (`Template/`, `Documentation/`) conforming to marketplace packaging specifications.
- Localized and optimized high-performance WebP image assets in `assets/images/`.
- Local favicons package (`favicon.ico`, `favicon.svg`, `apple-touch-icon.png`, `site.webmanifest`) in `assets/favicons/`.
- Interactive scroll reveal transitions, counter animations, filterable portfolio gallery, and inquiry form validation.
- JSON-LD LocalBusiness structured data for search engine rich snippets.
- Open Graph and Twitter Card tags to index social media sharing cards.
- Accessibility improvements (tab focus trap in details modal, screen reader landmark containment, improved mobile nav drawer hide behavior).
- Premium, standalone HTML documentation site.
- SEO baseline helper files (`robots.txt` and `sitemap.xml` placeholders).

### Changed
- Shifted external CDNs for Google Fonts into HTML asynchronous `<link>` elements to eliminate CSS render-blocking.
- Replaced inline CSS stylings with semantic CSS variables and utility classes.
- Standardized HTML headings hierarchy for WCAG AA access compliance.
