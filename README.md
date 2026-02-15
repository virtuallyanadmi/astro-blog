# Virtually an Admin - Astro Site

This is the Astro version of the Virtually an Admin blog, migrated from Jekyll.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:4321` to see your site.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
/
├── public/          # Static assets (images, CSS, JS)
├── src/
│   ├── components/  # Reusable Astro components
│   ├── content/     # Content collections (blog posts)
│   ├── layouts/     # Page layouts
│   ├── pages/       # File-based routing
│   └── styles/      # SASS styles
├── astro.config.mjs # Astro configuration
└── package.json
```

## Deployment

See [CLOUDFLARE_DEPLOYMENT.md](./CLOUDFLARE_DEPLOYMENT.md) for deployment instructions.

## Migration Notes

- All 55 blog posts have been migrated from Jekyll
- Frontmatter has been preserved and adapted for Astro
- Images and assets have been copied to the public directory
- SASS styles have been migrated
- Navigation and footer components created
- Dynamic routing set up for blog posts

## Features

- Static site generation with Astro
- MDX support for blog posts
- Content collections for type-safe content
- Cloudflare Pages deployment ready
- Responsive design
