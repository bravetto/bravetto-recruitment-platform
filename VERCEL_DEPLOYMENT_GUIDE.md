# Vercel Deployment Guide for Bravetto Recruitment Platform

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- GitHub/GitLab/Bitbucket repository connected
- ClickUp API credentials

## Deployment Steps

### 1. Connect Repository

1. Log in to Vercel Dashboard
2. Click "Add New Project"
3. Import your Git repository
4. Select the `bravetto-recruitment-platform` repository

### 2. Configure Build Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### 3. Set Environment Variables

In the Vercel dashboard, go to Settings → Environment Variables and add:

#### Required Variables:

```bash
# ClickUp API Configuration
CLICKUP_API_KEY=<your-clickup-api-key>
CLICKUP_LIST_ID=<your-clickup-list-id>

# ClickUp Field IDs
CLICKUP_FIELD_ID_FIRST_NAME=<field-id>
CLICKUP_FIELD_ID_LAST_NAME=<field-id>
CLICKUP_FIELD_ID_EMAIL=<field-id>
CLICKUP_FIELD_ID_PHONE=<field-id>
CLICKUP_FIELD_ID_PORTFOLIO=<field-id>
CLICKUP_FIELD_ID_RATING_REACT=<field-id>
CLICKUP_FIELD_ID_RATING_DB=<field-id>
CLICKUP_FIELD_ID_RATING_AI=<field-id>
CLICKUP_FIELD_ID_RATING_EDGE=<field-id>
CLICKUP_FIELD_ID_SUPERPOWER=<field-id>

# Notification Configuration
NOTIFICATION_WEBHOOK_URL=<your-webhook-url>

# Public Variables (accessible in browser)
NEXT_PUBLIC_CLICKUP_ENDPOINT=/api/submit-application
```

### 4. Deploy

1. Click "Deploy" button
2. Wait for build to complete (usually 2-3 minutes)
3. Your app will be available at `https://your-project.vercel.app`

## Post-Deployment

### Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables per Environment

Set different values for Production, Preview, and Development:

1. Go to Settings → Environment Variables
2. Click on a variable
3. Select which environments should use this value

### Monitoring

1. Check Functions tab for API route performance
2. Monitor Analytics for Core Web Vitals
3. Set up alerts for errors

## Troubleshooting

### Build Failures

1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify TypeScript has no errors: `npm run build` locally

### Environment Variables Not Working

1. Ensure variables are set for the correct environment
2. Redeploy after adding new variables
3. Check variable names match exactly (case-sensitive)

### API Routes Not Working

1. Check function logs in Vercel dashboard
2. Ensure API routes follow Next.js App Router conventions
3. Verify CORS settings if calling from external domains

## Performance Optimization

The deployment is configured with:

- **Edge Network**: Global CDN distribution
- **Image Optimization**: Automatic WebP/AVIF conversion
- **Static Generation**: Pages pre-rendered at build time
- **API Route Caching**: 10-second max duration for API routes
- **Security Headers**: XSS, clickjacking, and MIME type protection

## Maintenance

### Updating Dependencies

```bash
npm update
npm audit fix
git commit -am "Update dependencies"
git push
```

### Monitoring Recommendations

1. Set up Vercel Analytics (free tier available)
2. Configure error tracking (e.g., Sentry)
3. Monitor ClickUp API rate limits
4. Set up uptime monitoring

## Support

- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- ClickUp API: https://clickup.com/api 