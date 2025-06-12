# Bravetto Recruitment Platform - Project Structure

## Directory Overview

```
bravetto-recruitment-platform/
├── src/
│   ├── app/                    # Next.js App Router pages and API routes
│   │   ├── api/               # API endpoints
│   │   │   └── submit-application/  # Job application submission endpoint
│   │   └── careers/           # Careers page route
│   │
│   ├── components/            # React components organized by feature
│   │   ├── landing/          # Landing page specific components
│   │   ├── careers/          # Careers page specific components
│   │   ├── shared/           # Shared components used across pages
│   │   └── ui/               # shadcn/ui components
│   │
│   └── lib/                   # Utilities and business logic
│       ├── animations/        # Framer Motion variants and animations
│       ├── hooks/            # Custom React hooks
│       ├── services/         # API services and external integrations
│       └── utils/            # Utility functions and helpers
│
└── public/                    # Static assets
    ├── images/               # Image assets
    └── fonts/                # Custom fonts
```

## Directory Purposes

### `/src/app`
Next.js 13+ App Router directory containing pages and API routes.

### `/src/components`
- **landing/**: Components specific to the landing page (hero, features, testimonials)
- **careers/**: Job listings, filters, application forms
- **shared/**: Reusable components (navigation, footer, layouts)
- **ui/**: Base UI components from shadcn/ui

### `/src/lib`
- **animations/**: Centralized Framer Motion animation configurations
- **hooks/**: Custom React hooks for state management and side effects
- **services/**: API calls, data fetching, and business logic
- **utils/**: Helper functions, formatters, and utilities

### `/public`
Static assets served directly by Next.js.

## Component Naming Conventions

- PascalCase for component files: `HeroSection.tsx`
- Barrel exports through index files
- Co-locate component styles and tests

## Import Aliases

The project uses `@/*` import alias configured in `tsconfig.json` for clean imports:

```typescript
import { Button } from '@/components/ui/button'
import { fadeIn } from '@/lib/animations'
``` 