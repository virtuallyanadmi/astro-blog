# Quick Reference: SonicJS & Cloudflare R2

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Development
npm run dev

# Upload assets to R2
npm run upload-to-r2

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
astro-site/
├── src/
│   ├── lib/
│   │   ├── cdn.ts           # CDN helper functions
│   │   ├── sonicjs.ts       # SonicJS API client
│   │   └── cdn-example.astro # Usage examples
│   ├── content/
│   │   └── blog/            # Static blog posts
│   ├── pages/               # Astro pages
│   └── layouts/             # Page layouts
├── scripts/
│   └── upload-to-r2.ts      # R2 upload script
├── public/
│   ├── images/              # Images (will be uploaded to R2)
│   └── assets/              # CSS, JS (will be uploaded to R2)
├── .env.example             # Environment template
└── .env                     # Your credentials (git-ignored)
```

## 🔑 Environment Variables

```env
# Cloudflare R2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET_NAME=your-bucket-name
PUBLIC_CDN_URL=https://cdn.yourdomain.com

# SonicJS
SONICJS_API_URL=https://your-worker.workers.dev
SONICJS_API_KEY=your-api-key
```

## 💡 Usage Examples

### Using CDN for Images

```astro
---
import { getImageUrl } from '../lib/cdn';
const logo = getImageUrl('logo.png');
---
<img src={logo} alt="Logo" />
```

### Fetching from SonicJS

```astro
---
import { sonicjs } from '../lib/sonicjs';
const posts = await sonicjs.getPosts();
---
{posts.map(post => <h2>{post.title}</h2>)}
```

## 📋 Deployment Checklist

- [ ] Set up Cloudflare R2 bucket
- [ ] Generate R2 API tokens
- [ ] Configure custom domain for CDN
- [ ] Update `.env` with credentials
- [ ] Run `npm run upload-to-r2`
- [ ] Deploy SonicJS Worker (optional)
- [ ] Push code to Git
- [ ] Connect to Cloudflare Pages
- [ ] Set environment variables in Cloudflare Pages
- [ ] Deploy!

## 🔗 Important Links

- [Full Setup Guide](./SONICJS_R2_SETUP.md)
- [Cloudflare Dashboard](https://dash.cloudflare.com/)
- [SonicJS Docs](https://sonicjs.com/)
- [Astro Docs](https://docs.astro.build/)

## 🆘 Common Issues

**Images not loading from CDN?**
- Check `PUBLIC_CDN_URL` is set correctly
- Verify DNS for custom domain
- Confirm files uploaded to R2

**R2 upload failing?**
- Verify R2 credentials in `.env`
- Check bucket name is correct
- Ensure API token has write permissions

**SonicJS not connecting?**
- Verify Worker URL is correct
- Check API key is valid
- Ensure Worker is deployed
