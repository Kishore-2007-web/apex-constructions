# Support Guide

Thank you for purchasing the **Apex Infrastructure & Construction Website Template**. 

This document explains how to resolve issues and how to contact us for technical assistance.

## Support Policy
We are committed to providing support for the Template's default features, layouts, and codebase.
- **What is covered:** 
  - Resolving template rendering bugs and layout defects.
  - Answering technical questions about the default HTML structure and CSS variables.
  - Fixing browser compatibility issues conforming to our specifications.
- **What is NOT covered:**
  - Standard web server configuration or domain management.
  - Deep customization, adding new page designs, or modifying aesthetics.
  - Installation or integration of third-party plugins, platforms (WordPress, Joomla, etc.), or contact form email senders.

## Troubleshooting FAQ

### 1. The contact form does not send emails. Why?
The Template is a static HTML/CSS/JS template. The included contact form validates fields and displays a loading/success state, but does not send emails out of the box because static templates cannot handle backend server functions.
- **Solution:** You must integrate the form with a third-party serverless form handler (such as Formspree, Netlify Forms, Formcarry, Web3Forms, or custom PHP/Node.js script). See the `Documentation/` folder for instructions.

### 2. The scroll animations (Reveal) are not loading.
- Verify that your browser supports `IntersectionObserver` (all modern desktop and mobile browsers support it).
- Ensure that the CSS class `body.preload` has been removed. The script automatically removes it after the page has fully loaded (`window.addEventListener('load')`). If you are running javascript-disabled environments, you can manually remove `class="preload"` from the `<body>` tag.

### 3. Images are loading slowly.
- We have optimized all included demo images using the WebP format. If you have replaced these images with your own high-resolution files, make sure you resize and compress them (using toolsets like TinyPNG, Photoshop, or Squoosh) before uploading.

## Contacting Support
If you have audited this guide and the main documentation, and still need help, feel free to contact us through:
- **Marketplace Profile:** [Your Marketplace Profile URL Placeholder]
- **Email Support:** `support@yourdomain.com`

*Please provide your purchase code, a description of the issue, and screenshots or a link to your live development server for faster response times.*
