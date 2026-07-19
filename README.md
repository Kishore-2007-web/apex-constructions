# Apex Infrastructure & Construction — Premium Website Template

Apex Infrastructure & Construction is a professional, modern, fully responsive, and marketplace-ready website template designed specifically for construction companies, architectural firms, general contractors, and civil/industrial developers.

Built with clean, structured, and modern semantic HTML5, CSS3 variables, and pure ES6 vanilla JavaScript, it meets strict commercial marketplace review guidelines (such as ThemeForest, TemplateMonster, etc.).

## Table of Contents
- [Features](#features)
- [Package Structure](#package-structure)
- [Getting Started](#getting-started)
- [Customization Guide](#customization-guide)
- [Browser Support](#browser-support)
- [SEO & Accessibility](#seo--accessibility)
- [Credits & Licensing](#credits--licensing)
- [Support](#support)

## Features
- **100% Responsive Layout:** Pixel-perfect grids scaling across 320px to 1920px+ viewports.
- **Vibrant & Premium Aesthetics:** Harmonious dark/accent colors, smooth gradients, and sleek modern typography.
- **Dynamic Background Slider:** Pure CSS & JS fading slide component.
- **Fast Scroll Counters:** Animating statistics triggering on viewport visibility.
- **Interactive Portfolio Gallery:** Real-time client-side category filtering with CSS transitions.
- **Accessible Detail Modals:** Fully navigable dialog popups with keyboard focus trapping.
- **Optimized Performance:** 95+ Lighthouse ratings achieved via local WebP assets, lazy loading, and non-blocking font pipelines.
- **WCAG AA Compliance:** Keyboard-navigable mobile menus, ARIA labels, semantic landmark layout structure, and focus outlines.
- **SEO Ready:** Rich JSON-LD LocalBusiness schema, complete Open Graph details, and sitemap/robots configurations.

## Package Structure
```text
/
├── Template/                  # Source files for the website template
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css      # Core stylesheet (Design Tokens, variables, and media queries)
│   │   ├── js/
│   │   │   └── main.js        # Main JavaScript logic (ES6 strict, modular, and accessible)
│   │   ├── images/            # Local optimized WebP image files
│   │   ├── favicons/          # Icons package (favicons, manifest, touch icons)
│   │   ├── fonts/             # Custom fonts (empty folder - ready for offline fonts)
│   │   └── icons/             # Asset icon files (empty folder - ready for asset storage)
│   ├── index.html             # Core semantic layout structure and JSON-LD schema
│   ├── robots.txt             # Search crawler directives
│   └── sitemap.xml            # Search index map configuration
├── Documentation/             # Styled HTML Help/Documentation site
│   └── index.html             # Standalone buyer instruction manual
├── README.md                  # Quick start information (this file)
├── CHANGELOG.md               # Version releases tracking
├── LICENSE.txt                # Commercial Template License
├── SUPPORT.md                 # FAQ, troubleshooting, and contact channels
└── CREDITS.md                 # Credits for photographs, typography, and assets
```

## Getting Started
To view the website template locally:
1. Extract the purchased package zip file.
2. Locate the `Template/` directory.
3. Open `Template/index.html` in any web browser to view the template offline.
4. (Optional) Run a local development server for live reloading:
   - **Python:** Run `python -m http.server 8080` in the `Template/` folder, then visit `http://localhost:8080`.
   - **Node.js:** Run `npx http-server` or `npx live-server`.

## Customization Guide
Refer to the detailed guide inside the [Documentation/](Documentation/index.html) folder or the [SUPPORT.md](SUPPORT.md) file to modify features:
- **Changing Colors:** Edit values inside `:root` block in [style.css](Template/assets/css/style.css).
- **Changing Fonts:** Update links in [index.html](Template/index.html) and variables in [style.css](Template/assets/css/style.css).
- **Replacing Images:** Replace files in [assets/images/](Template/assets/images/) keeping the same filenames, or edit paths in index.html and main.js.

## Browser Support
Fully compatible with the last two versions of all major browsers:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Apple Safari (Desktop & iOS)

## SEO & Accessibility
This template has been built with search visibility and inclusivity in mind:
- Structured JSON-LD schema handles indexing metadata out of the box.
- Open Graph tags support social media previews.
- Screen readers are protected by managing `aria-hidden` when modals open, and utilizing `visibility: hidden;` on the mobile nav drawer when closed.

## Credits & Licensing
Refer to [CREDITS.md](CREDITS.md) for full license details on the typography, icons, and photographs, and [LICENSE.txt](LICENSE.txt) for commercial usage permissions.

## Support
If you have any questions or require support, check out the [SUPPORT.md](SUPPORT.md) file or email us at `support@yourdomain.com`.
