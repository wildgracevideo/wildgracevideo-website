# Wild Grace Video Website

Nuxt application for the business [website](https://www.wildgracevideo.com/) of Wild Grace Videography, a Denver-based video production company.
There are two main sections of the website the public-facing section setup to give an overview of the business and acquire new clients, and the
admin section (all /admin/\* paths) setup for admins to manage the website.

The website is built using Nuxt3, Tailwind CSS, and Prisma. The website is hosted using Netlify, the database is hosted using PlanetScale,
the site's shop is using Stripe for payment processing, and transactional emails are sent using SendGrid. The admin section of the site contains
pages for managing customer inquiries, an overview of products purchased on the shop, and a CMS for the website built using DecapCMS.

## Developer Guide

### Setup

Make sure to install the dependencies:

```bash
npm install
```

### Development Server

Start the development server on `http://localhost:3000`:

```bash
npm run dev
```

### Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

### DB Setup

Mac CLI Installation:

```bash
brew install planetscale/tap/pscale
```

Authenticate with DB:

```bash
pscale auth login
```

Get Shell for DB:

```bash
pscale shell wildgracevideoadmin main
```

### Prisma Updates

Generate new models after updating the prisma/schema.prisma file:

```bash
npx prisma generate
```

Push updates to the production database:

```bash
npx prisma db push
```
