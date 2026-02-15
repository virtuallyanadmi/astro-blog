# Cloudflare Pages Build Configuration

## Build Settings
- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/astro-site`

## Environment Variables
None required for basic setup.

## Deployment Steps

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
3. Go to **Pages** > **Create a project**
4. Connect your Git repository
5. Configure build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `astro-site`
6. Click **Save and Deploy**

## Custom Domain Setup

After deployment:
1. Go to your Pages project
2. Click **Custom domains**
3. Add your domain (e.g., virtuallyanadmin.com)
4. Follow DNS configuration instructions

## Notes

- The site will automatically rebuild on every git push
- Preview deployments are created for pull requests
- Production deployment happens on pushes to main/master branch
