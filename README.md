# www.wildgracevideography.com

## Setup

Make sure to install the dependencies:

```bash
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
bun --bun run dev
```

## Production

Build the application for production:

```bash
bun --bun run build
```

Locally preview production build:

```bash
npm --bun run preview
```

Setup Stripe webhooks:
```bash
brew install stripe/stripe-cli/stripe
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
