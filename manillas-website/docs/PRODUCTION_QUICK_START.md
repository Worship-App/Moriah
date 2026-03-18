# Production Deployment - Quick Start Guide

## 🚀 Quick Overview

Production deployment is **fully automated** and triggers when you push to the `main` branch.

## Prerequisites

Before your first production deployment, configure these GitHub secrets:

### Required Secrets (Settings > Secrets and variables > Actions)

```
VERCEL_TOKEN          - Your Vercel authentication token
VERCEL_ORG_ID         - Your Vercel organization ID
VERCEL_PROJECT_ID     - Your Vercel project ID
GA_TRACKING_ID        - Google Analytics 4 tracking ID
SENTRY_DSN            - Sentry error tracking DSN
CONTACT_EMAIL         - Business contact email
WHATSAPP_NUMBER       - Business WhatsApp number (format: +1234567890)
PRODUCTION_API_URL    - (Optional) Production API endpoint
```

## How to Deploy

### Automatic Deployment (Recommended)

```bash
# 1. Ensure you're on main branch
git checkout main

# 2. Merge your changes
git merge develop

# 3. Push to GitHub
git push origin main

# 4. GitHub Actions will automatically:
#    ✅ Run tests
#    ✅ Build application
#    ✅ Deploy to production
#    ✅ Verify deployment
#    ✅ Send notifications
```

### What Happens During Deployment

1. **Tests Run** - All unit and integration tests execute
2. **Build** - Application is built with production optimizations
3. **Deploy** - Code is deployed to Vercel production
4. **Verify** - Health check confirms site is accessible
5. **Notify** - Commit status and comments are created

## Monitoring Your Deployment

### GitHub Actions
- Go to **Actions** tab in GitHub
- Click on the running workflow
- Monitor each job's progress

### Deployment Summary
After deployment, check the workflow summary for:
- ✅ Deployment URL
- ✅ Configuration status
- ✅ Post-deployment checklist

### Commit Status
- Green checkmark ✅ = Deployment successful
- Red X ❌ = Deployment failed (issue auto-created)

## Post-Deployment Checklist

After each deployment, verify:

- [ ] Site is accessible at production URL
- [ ] Analytics tracking works (check Google Analytics)
- [ ] Contact form sends emails
- [ ] All 4 products load correctly
- [ ] Product images display properly
- [ ] WhatsApp and email links work
- [ ] No errors in Sentry dashboard

## If Something Goes Wrong

### Rollback via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# List deployments
vercel ls

# Rollback to previous
vercel rollback [previous-deployment-url]
```

### Rollback via Git

```bash
# Revert the problematic commit
git revert [commit-sha]

# Push to trigger new deployment
git push origin main
```

## Production Environment

### What's Different in Production?

| Feature | Staging | Production |
|---------|---------|------------|
| Analytics | ❌ Disabled | ✅ Enabled |
| Error Tracking | Optional | ✅ Sentry |
| API | Staging | Production |
| Domain | staging-manillas.vercel.app | Custom domain |

### Environment Variables

Production automatically sets:
- `VITE_ENVIRONMENT=production`
- `VITE_ENABLE_ANALYTICS=true`
- Plus all configured secrets

## Common Issues

### "Deployment Failed" Issue Created

**What it means**: Deployment encountered an error

**What to do**:
1. Check the GitHub issue that was auto-created
2. Click the workflow run link in the issue
3. Review the error logs
4. Fix the issue and push again

### Site Returns Non-200 Status

**What it means**: Site deployed but not accessible

**What to do**:
1. Check Vercel dashboard for errors
2. Verify environment variables are set
3. Check for build errors
4. Review deployment logs

### Environment Variables Not Working

**What it means**: Features not working as expected

**What to do**:
1. Verify all secrets are set in GitHub
2. Check secret names match exactly (case-sensitive)
3. Redeploy after adding missing secrets

## Best Practices

✅ **Always test in staging first** - Merge to `develop` before `main`
✅ **Monitor after deployment** - Check the post-deployment checklist
✅ **Review deployment summary** - Ensure all configurations are correct
✅ **Keep secrets updated** - Rotate tokens regularly
✅ **Use feature flags** - For major features, enable gradually

## Need Help?

1. Check [Production Deployment Documentation](./PRODUCTION_DEPLOYMENT.md)
2. Review [CI/CD Build Configuration](./CI_CD_BUILD_CONFIGURATION.md)
3. Check GitHub Actions logs
4. Review Vercel dashboard
5. Check Sentry for errors

## Quick Commands

```bash
# Check current branch
git branch

# Switch to main
git checkout main

# Pull latest changes
git pull origin main

# Merge from develop
git merge develop

# Push to trigger deployment
git push origin main

# View deployment status
# Go to: https://github.com/[your-repo]/actions
```

## Success Indicators

✅ Green checkmark on commit
✅ Deployment summary generated
✅ Site accessible at production URL
✅ No errors in Sentry
✅ Analytics tracking events

---

**Remember**: Production deployment is automatic. Just push to `main` and let GitHub Actions handle the rest! 🚀
