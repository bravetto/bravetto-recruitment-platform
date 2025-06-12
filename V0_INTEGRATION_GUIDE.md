# V0 Integration Guide

## Quick Start

When you have your V0 files ready, follow these steps:

### 1. Place V0 Files

```bash
# For landing page components
cp -r path/to/v0-landing/* src/components/landing/v0/

# For modal components  
cp -r path/to/v0-modal/* src/components/shared/Modal/
```

### 2. Run Integration Check

```bash
# Check for conflicts and dependencies
npm run build
```

### 3. Component Integration Pattern

For each V0 component, follow this pattern:

```typescript
// src/components/landing/HeroSection.tsx
import { mergeV0Styles } from '@/lib/utils/v0-integration';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

// Import V0 component
import { Hero as V0Hero } from './v0/Hero';

// Create integrated component
export function HeroSection({ className, ...props }) {
  return (
    <motion.div
      variants={fadeIn}
      initial="initial"
      animate="animate"
      className={mergeV0Styles('relative', className)}
    >
      <V0Hero {...props} />
    </motion.div>
  );
}
```

### 4. Style Integration

When merging V0 styles into globals.css:

1. **Preserve shadcn variables** - Don't override existing CSS variables
2. **Add V0 variables with prefix** - Use `--v0-` prefix for clarity
3. **Map colors carefully** - Use the color mapping utility

Example:
```css
:root {
  /* Existing shadcn variables */
  --primary: oklch(0.205 0 0);
  
  /* V0 additions */
  --v0-gradient-start: #your-color;
  --v0-gradient-end: #your-color;
}
```

### 5. Common Issues & Solutions

#### Issue: Component name conflicts
**Solution**: Rename V0 components with `V0` prefix during import

#### Issue: Style conflicts
**Solution**: Use `mergeV0Styles` utility to ensure proper precedence

#### Issue: Missing TypeScript types
**Solution**: Generate interfaces using the utility function

#### Issue: Animation conflicts
**Solution**: Convert V0 animations to Framer Motion format

### 6. Testing Checklist

After integration, test:
- [ ] Component renders correctly
- [ ] Dark mode works
- [ ] Responsive design intact
- [ ] No console errors
- [ ] Performance metrics maintained

### 7. Final Cleanup

```bash
# Remove temporary V0 directory after successful integration
rm -rf src/components/landing/v0

# Update imports in index files
# Commit changes
git add .
git commit -m "feat: integrate V0 landing page components"
```

## Need Help?

- Check `V0_INTEGRATION_CHECKLIST.md` for detailed tracking
- Use utilities in `src/lib/utils/v0-integration.ts`
- Backup is available at `src/app/globals.css.backup` 