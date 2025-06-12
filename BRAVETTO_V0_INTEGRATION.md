# Bravetto V0 Integration Guide

## 📁 Expected V0 Folders

1. **Landing Page**: `bravetto-recruitment-platform-tech-landing-page`
   - Drop into: `src/components/landing/v0/`
   
2. **Modal**: `bravetto-recruitment-platform-modal`
   - Drop into: `src/components/shared/Modal/`

## 🚀 Quick Integration Commands

Once files are in place, run these commands:

```bash
# 1. Check file structure
find src/components/landing/v0 -name "*.tsx" -o -name "*.jsx" | head -10
find src/components/shared/Modal -name "*.tsx" -o -name "*.jsx" | head -10

# 2. Build to check for errors
npm run build

# 3. Start dev server
npm run dev
```

## 📋 Integration Checklist

### Phase 1: File Placement
- [ ] Place `bravetto-recruitment-platform-tech-landing-page` in `src/components/landing/v0/`
- [ ] Place `bravetto-recruitment-platform-modal` in `src/components/shared/Modal/`

### Phase 2: Analysis (I'll do this automatically)
- [ ] Scan for component files
- [ ] Extract CSS/styles
- [ ] Identify dependencies
- [ ] Check for conflicts

### Phase 3: Integration
- [ ] Merge globals.css
- [ ] Update component imports
- [ ] Add TypeScript types
- [ ] Set up routing

### Phase 4: Cleanup
- [ ] Remove duplicate code
- [ ] Optimize imports
- [ ] Test all components
- [ ] Remove v0 directories

## 🎨 Expected Component Structure

### Landing Page Components
```
src/components/landing/
├── HeroSection.tsx
├── Features.tsx
├── TechStack.tsx
├── Testimonials.tsx
├── CTASection.tsx
└── index.ts
```

### Modal Components
```
src/components/shared/Modal/
├── Modal.tsx
├── ModalProvider.tsx
├── useModal.ts
└── index.ts
```

## 🔧 Common V0 to Production Conversions

### 1. Import Updates
```typescript
// V0 import
import { Button } from './button'

// Production import
import { Button } from '@/components/ui/button'
```

### 2. Style Conversions
```typescript
// V0 inline styles
<div style={{ marginTop: '2rem' }}>

// Production Tailwind
<div className="mt-8">
```

### 3. Type Safety
```typescript
// Add proper types to V0 components
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}
```

## 🚨 Potential Issues & Solutions

### Issue: Missing dependencies
**Solution**: Check package.json in V0 folders for additional deps

### Issue: Style conflicts
**Solution**: Use CSS variable prefixes (v0-landing-, v0-modal-)

### Issue: Component name conflicts
**Solution**: Rename with specific prefixes or merge functionality

### Issue: Different React versions
**Solution**: Update to React 19 (already installed)

## 📝 Notes

- Both V0 projects likely use Tailwind CSS
- May include custom fonts or assets
- Could have animation libraries
- Might use different state management

Ready to integrate once files are in place! 