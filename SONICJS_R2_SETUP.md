# SonicJS & Cloudflare R2 Setup Guide

## Overview

This guide will help you set up:
1. **SonicJS** - A headless CMS running on Cloudflare Workers
2. **Cloudflare R2** - Object storage for your static assets with CDN delivery

## Part 1: Setting up Cloudflare R2 for Assets

### Step 1: Create an R2 Bucket

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **R2 Object Storage** in the sidebar
3. Click **Create bucket**
4. Name your bucket (e.g., `virtuallyanadmin-assets`)
5. Click **Create bucket**

### Step 2: Generate R2 API Tokens

1. In R2, go to **Manage R2 API Tokens**
2. Click **Create API token**
3. Give it a name (e.g., `astro-site-upload`)
4. Set permissions to **Object Read & Write**
5. (Optional) Restrict to your specific bucket
6. Click **Create API Token**
7. **Save these credentials** - you'll need them:
   - Access Key ID
   - Secret Access Key
   - Account ID (shown in the R2 overview)

### Step 3: Enable Public Access (Optional)

If you want direct public access to your bucket:

1. Go to your bucket settings
2. Under **Public Access**, click **Allow Access**
3. Note the public bucket URL

### Step 4: Set up Custom Domain for CDN

For better performance and branding:

1. In your bucket settings, go to **Custom Domains**
2. Click **Connect Domain**
3. Enter your subdomain (e.g., `cdn.virtuallyanadmin.com`)
4. Follow the DNS setup instructions
5. Wait for DNS propagation (usually a few minutes)

### Step 5: Configure Environment Variables

Create a `.env` file in your `astro-site` directory:

```bash
# Copy from .env.example
cp .env.example .env
```

Edit `.env` and add your R2 credentials:

```env
# Cloudflare R2 Configuration
R2_ACCOUNT_ID=your-account-id-here
R2_ACCESS_KEY_ID=your-access-key-here
R2_SECRET_ACCESS_KEY=your-secret-key-here
R2_BUCKET_NAME=virtuallyanadmin-assets

# Public CDN URL (use custom domain or R2 public URL)
PUBLIC_CDN_URL=https://cdn.virtuallyanadmin.com
```

### Step 6: Upload Assets to R2

Run the upload script:

```bash
npm run upload-to-r2
```

This will upload all files from `public/images` and `public/assets` to your R2 bucket.

### Step 7: Update Your Site to Use CDN URLs

The CDN helper functions are already set up in `src/lib/cdn.ts`. To use them in your components:

```astro
---
import { getImageUrl } from '../lib/cdn';

const imageUrl = getImageUrl('logo.png');
---

<img src={imageUrl} alt="Logo" />
```

## Part 2: Setting up SonicJS Headless CMS

### What is SonicJS?

SonicJS is an edge-native headless CMS built specifically for Cloudflare Workers. It provides:
- Sub-100ms API response times
- Zero cold starts
- TypeScript-first development
- Built on Cloudflare D1 (database) and R2 (storage)

### Step 1: Deploy SonicJS Backend

1. Clone the SonicJS repository:
```bash
git clone https://github.com/SonicJs-Org/sonicjs.git
cd sonicjs
```

2. Install dependencies:
```bash
npm install
```

3. Configure Cloudflare:
```bash
npx wrangler login
```

4. Create D1 database:
```bash
npx wrangler d1 create sonicjs-db
```

5. Update `wrangler.toml` with your database ID

6. Deploy to Cloudflare Workers:
```bash
npm run deploy
```

7. Note your Worker URL (e.g., `https://sonicjs.your-subdomain.workers.dev`)

### Step 2: Configure SonicJS in Your Astro Site

Update your `.env` file:

```env
# SonicJS Configuration
SONICJS_API_URL=https://sonicjs.your-subdomain.workers.dev
SONICJS_API_KEY=your-api-key-here
```

### Step 3: Using SonicJS in Your Astro Pages

The SonicJS client is already set up in `src/lib/sonicjs.ts`. Here's how to use it:

#### Fetch all posts:

```astro
---
import { sonicjs } from '../lib/sonicjs';

const posts = await sonicjs.getPosts();
---

<div>
  {posts.map(post => (
    <article>
      <h2>{post.title}</h2>
      <p>{post.excerpt}</p>
      <a href={`/blog/${post.slug}`}>Read more</a>
    </article>
  ))}
</div>
```

#### Fetch a single post:

```astro
---
import { sonicjs } from '../lib/sonicjs';

const { slug } = Astro.params;
const post = await sonicjs.getPost(slug);
---

<article>
  <h1>{post.title}</h1>
  <div set:html={post.content} />
</article>
```

### Step 4: Hybrid Approach (Static + Dynamic)

You can use both Astro content collections (for existing posts) and SonicJS (for new posts):

```astro
---
import { getCollection } from 'astro:content';
import { sonicjs } from '../lib/sonicjs';

// Get static posts from content collections
const staticPosts = await getCollection('blog');

// Get dynamic posts from SonicJS
const dynamicPosts = await sonicjs.getPosts();

// Combine and sort
const allPosts = [...staticPosts, ...dynamicPosts].sort(
  (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---
```

## Part 3: Deployment Workflow

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Deploy to Cloudflare Pages

1. Push your code to Git
2. Connect repository in Cloudflare Pages
3. Set environment variables in Cloudflare Pages dashboard:
   - `PUBLIC_CDN_URL`
   - `SONICJS_API_URL`
   - `SONICJS_API_KEY`
4. Deploy!

## Troubleshooting

### R2 Upload Issues

- Verify your R2 credentials are correct
- Check that your bucket name matches
- Ensure your API token has the correct permissions

### SonicJS Connection Issues

- Verify your Worker URL is correct
- Check that your API key is valid
- Ensure your Worker is deployed and running

### CDN Images Not Loading

- Verify your custom domain DNS is configured correctly
- Check that PUBLIC_CDN_URL is set correctly
- Ensure files were uploaded to R2 successfully

## Additional Resources

- [SonicJS Documentation](https://sonicjs.com/)
- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Astro Documentation](https://docs.astro.build/)
