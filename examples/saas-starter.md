# Example: SaaS Starter

This example creates a SvelteKit application optimized for building a SaaS product.

## Configuration

When running the CLI, select:

1. **Project Name**: `saas-starter`
2. **Development Tools**: TypeScript, ESLint, Vitest, Playwright
3. **UI Framework**: `svelte-shadcn UI`
4. **Database**: `Supabase`
5. **Backend Tools**: tRPC-SvelteKit, Zod
6. **Payment**: `Stripe`
7. **Analytics**: Yes (Plausible)
8. **SEO**: Yes
9. **Blog**: Yes (for marketing content)
10. **Auth**: `Auth.js`

## What You Get

This configuration includes everything you need for a SaaS:

### Core Features
- ✅ **Type-safe APIs** with tRPC
- ✅ **Real-time Database** with Supabase
- ✅ **Payment Processing** with Stripe
- ✅ **User Authentication** with Auth.js
- ✅ **Beautiful UI** with shadcn components

### Business Features
- ✅ **Marketing Blog** for content marketing
- ✅ **SEO Optimization** for organic growth
- ✅ **Analytics** to track user behavior

### Developer Experience
- ✅ **TypeScript** for type safety
- ✅ **Validation** with Zod
- ✅ **Testing** with Vitest and Playwright
- ✅ **Linting** with ESLint

## Common SaaS Patterns to Implement

### 1. Subscription Management

Add to your tRPC router:

\`\`\`typescript
// src/lib/trpc/router.ts
import { z } from 'zod';

export const appRouter = router({
  subscription: {
    create: protectedProcedure
      .input(z.object({ priceId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        // Create Stripe subscription
      }),
    
    cancel: protectedProcedure
      .mutation(async ({ ctx }) => {
        // Cancel subscription
      }),
    
    status: protectedProcedure
      .query(async ({ ctx }) => {
        // Get subscription status
      })
  }
});
\`\`\`

### 2. User Dashboard

Create a protected dashboard route:

\`\`\`svelte
<!-- src/routes/dashboard/+page.svelte -->
<script lang="ts">
  import { page } from '$app/stores';
  
  export let data;
</script>

<div class="dashboard">
  <h1>Welcome, {data.user.name}</h1>
  <!-- Dashboard content -->
</div>
\`\`\`

### 3. Pricing Page

Create a pricing page that integrates with Stripe:

\`\`\`svelte
<!-- src/routes/pricing/+page.svelte -->
<script lang="ts">
  import { trpc } from '$lib/trpc/client';
  
  const plans = [
    { name: 'Starter', price: '$9/mo', priceId: 'price_xxx' },
    { name: 'Pro', price: '$29/mo', priceId: 'price_yyy' },
  ];
  
  async function subscribe(priceId: string) {
    await trpc.subscription.create.mutate({ priceId });
  }
</script>
\`\`\`

## Environment Variables

Make sure to set these in your `.env`:

\`\`\`bash
# Supabase
PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Auth.js
GITHUB_ID=your-github-id
GITHUB_SECRET=your-github-secret
AUTH_SECRET=your-auth-secret

# Stripe
STRIPE_SECRET_KEY=sk_test_xxx
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# SEO
PUBLIC_SITE_URL=https://yoursaas.com

# Plausible (optional)
PUBLIC_PLAUSIBLE_DOMAIN=yoursaas.com
\`\`\`

## Next Steps

1. Set up your Supabase project
2. Configure Stripe products and prices
3. Set up Auth.js providers
4. Create database tables for user data
5. Implement subscription logic
6. Build your core features
7. Set up Stripe webhooks
8. Deploy to Vercel/Netlify

## Recommended Additions

- Add email service (Resend, SendGrid)
- Add feature flags (LaunchDarkly, PostHog)
- Add error tracking (Sentry)
- Add monitoring (Axiom, Datadog)
- Add rate limiting
- Add admin panel

## Resources

- [Stripe SaaS Guide](https://stripe.com/docs/billing/subscriptions/overview)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [tRPC SaaS Example](https://github.com/trpc/examples-next-prisma-starter)
