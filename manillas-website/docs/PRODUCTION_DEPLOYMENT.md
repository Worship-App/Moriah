# Production Deployment Configuration

## Overview

This document describes the production deployment configuration for the Manillas Website. The deployment is automated through GitHub Actions and deploys to Vercel when code is pushed to the `main` branch.

## Deployment Flow

```
Push to main branch
    ↓
Run tests & linting
    ↓
Build application
    ↓
Deploy to Vercel Production
    ↓
Verify deployment
    ↓
Send notifications
```

## Environment Configuration

### Production Environment Variables

The following environment variables are configured for production:

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_API_URL` | Production API endpoint | No | `https://api.manillas-premium.com` |
| `VITE_ENVIRONMENT` | Environment name | Yes | `production` |
| `VITE_ENABLE_ANALYTICS` | Enable Google Analytics | Yes | `true` |
| `VITE_GA_TRACKING_ID` | Google Analytics tracking ID | Yes | From secrets |
| `VITE_SENTRY_DSN` | Sentry error tracking DSN | Yes | From secrets |
| `VITE_CONTACT_EMAIL` | Business contact email | Yes | From secrets |
| `VITE_WHATSAPP_NUMBER` | Business WhatsApp number | Yes | From secrets |

### Required GitHub Secrets

Configure these secrets in your GitHub repository settings (`Settings > Secrets and variables > Actions`):

#### Vercel Configuration
- `VERCEL_TOKEN` - Vercel authentication token
- `VERCEL_ORG_ID` - Vercel organization ID
- `VERCEL_PROJECT_ID` - Vercel project ID

#### Production Environment
- `PRODUCTION_API_URL` - Production API endpoint (optional, has default)
- `GA_TRACKING_ID` - Google Analytics 4 tracking ID
- `SENTRY_DSN` - Sentry Data Source Name for error tracking
- `CONTACT_EMAIL` - Business contact email address
- `WHATSAPP_NUMBER` - Business WhatsApp number (format: +1234567890)

## Deployment Features

### 1. Automated Deployment
- Triggers automatically on push to `main` branch
- Only deploys if tests and build pass successfully
- Uses GitHub Actions for CI/CD

### 2. Production-Specific Configuration
- **Analytics Enabled**: Google Analytics tracking is enabled in production
- **Error Tracking**: Sentry integration for monitoring errors
- **Production API**: Uses production API endpoint
- **Contact Information**: Production contact details configured

### 3. Deployment Verification
- Waits 10 seconds for deployment to stabilize
- Performs HTTP health check on deployed URL
- Fails deployment if site is not accessible (non-200 response)

### 4. Notifications & Status Checks

#### Success Notifications
- Creates GitHub commit status with deployment URL
- Adds comment to commit with deployment details
- Generates deployment summary with:
  - Deployment URL
  - Configuration status
  - Post-deployment checklist

#### Failure Notifications
- Creates GitHub commit status indicating failure
- Automatically creates GitHub issue with:
  - Title: "🚨 Production Deployment Failed"
  - Labels: `deployment`, `production`, `urgent`
  - Details about the failed deployment
  - Link to workflow run for debugging

### 5. Deployment Summary

After successful deployment, a summary is generated with:

```markdown
## 🚀 Production Deployment Successful

**Environment:** Production
**URL:** [deployment-url]
**Branch:** main
**Commit:** [commit-sha]
**Deployed at:** [timestamp]

### Configuration
- ✅ Analytics enabled
- ✅ Error tracking enabled (Sentry)
- ✅ Production API configured

### Post-Deployment Checklist
- [ ] Verify site is accessible
- [ ] Check analytics tracking
- [ ] Test contact form
- [ ] Verify product catalog loads
- [ ] Monitor error tracking dashboard
```

## How to Deploy

### Automatic Deployment
1. Merge your changes to the `main` branch
2. GitHub Actions will automatically:
   - Run tests
   - Build the application
   - Deploy to production
   - Verify the deployment
   - Send notifications

### Manual Deployment
If you need to manually trigger a deployment:
1. Go to GitHub Actions tab
2. Select "CI/CD Pipeline" workflow
3. Click "Run workflow"
4. Select `main` branch
5. Click "Run workflow"

## Monitoring Production

### Post-Deployment Checklist

After each deployment, verify:

1. **Site Accessibility**
   - Visit the production URL
   - Ensure the site loads correctly
   - Check all pages are accessible

2. **Analytics Tracking**
   - Open Google Analytics dashboard
   - Verify events are being tracked
   - Check real-time data

3. **Contact Form**
   - Submit a test message
   - Verify email is received
   - Check form validation works

4. **Product Catalog**
   - Verify all 4 products load
   - Check images display correctly
   - Test product detail pages

5. **Error Tracking**
   - Open Sentry dashboard
   - Verify no new errors
   - Check error rate is normal

### Monitoring Tools

- **Vercel Dashboard**: Monitor deployment status and performance
- **Google Analytics**: Track user behavior and traffic
- **Sentry**: Monitor errors and performance issues
- **GitHub Actions**: View deployment history and logs

## Rollback Procedure

If a deployment causes issues:

1. **Immediate Rollback via Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login to Vercel
   vercel login
   
   # List deployments
   vercel ls
   
   # Rollback to previous deployment
   vercel rollback [previous-deployment-url]
   ```

2. **Rollback via Git**
   ```bash
   # Revert the problematic commit
   git revert [commit-sha]
   
   # Push to main
   git push origin main
   ```

3. **Verify Rollback**
   - Check production URL
   - Verify site is working
   - Monitor error tracking

## Troubleshooting

### Deployment Fails

**Issue**: Deployment fails during Vercel deploy step

**Solutions**:
1. Check Vercel token is valid
2. Verify project ID and org ID are correct
3. Check Vercel dashboard for errors
4. Review GitHub Actions logs

### Site Not Accessible After Deployment

**Issue**: Deployment succeeds but site returns non-200 status

**Solutions**:
1. Check Vercel deployment logs
2. Verify environment variables are set correctly
3. Check for build errors in Vercel dashboard
4. Verify DNS configuration

### Environment Variables Not Working

**Issue**: Features not working due to missing environment variables

**Solutions**:
1. Verify all required secrets are set in GitHub
2. Check secret names match exactly (case-sensitive)
3. Redeploy after adding missing secrets
4. Check Vercel environment variables

### Analytics Not Tracking

**Issue**: Google Analytics not receiving data

**Solutions**:
1. Verify `VITE_ENABLE_ANALYTICS` is `true`
2. Check `GA_TRACKING_ID` is correct
3. Verify analytics code is included in build
4. Check browser console for errors

## Best Practices

1. **Test Before Merging**
   - Always test changes in staging first
   - Merge to `develop` branch before `main`
   - Run integration tests on staging

2. **Monitor After Deployment**
   - Check deployment summary
   - Verify all checklist items
   - Monitor error tracking for 30 minutes

3. **Use Feature Flags**
   - For major features, use feature flags
   - Enable gradually in production
   - Easy rollback if issues occur

4. **Keep Secrets Updated**
   - Rotate tokens regularly
   - Update expired credentials
   - Document secret changes

5. **Review Deployment Logs**
   - Check GitHub Actions logs
   - Review Vercel deployment logs
   - Monitor for warnings

## Support

For deployment issues:
1. Check GitHub Actions logs
2. Review Vercel dashboard
3. Check Sentry for errors
4. Review this documentation
5. Contact DevOps team if needed

## Related Documentation

- [Staging Deployment Guide](./STAGING_QUICK_START.md)
- [CI/CD Build Configuration](./CI_CD_BUILD_CONFIGURATION.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)
