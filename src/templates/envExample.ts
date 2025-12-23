import { ProjectConfig } from '../types.js';

export function getEnvExample(config: ProjectConfig): string {
  let envVars = '# Environment Variables\n';

  if (config.database === 'postgresql') {
    envVars += '\n# PostgreSQL\nDATABASE_URL=postgresql://user:password@localhost:5432/dbname\n';
  }

  if (config.database === 'supabase') {
    envVars += '\n# Supabase\nPUBLIC_SUPABASE_URL=your-supabase-url\nSUPABASE_SERVICE_ROLE_KEY=your-service-role-key\n';
  }

  if (config.auth === 'authjs') {
    envVars += '\n# Auth.js\nGITHUB_ID=your-github-id\nGITHUB_SECRET=your-github-secret\nAUTH_SECRET=your-auth-secret\n';
  }

  if (config.payment === 'stripe') {
    envVars += '\n# Stripe\nSTRIPE_SECRET_KEY=your-stripe-secret-key\nPUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key\n';
  }

  if (config.payment === 'paddle') {
    envVars += '\n# Paddle\nPADDLE_API_KEY=your-paddle-api-key\nPADDLE_VENDOR_ID=your-paddle-vendor-id\n';
  }

  if (config.seo) {
    envVars += '\n# SEO\nPUBLIC_SITE_URL=https://yourdomain.com\n';
  }

  return envVars;
}
