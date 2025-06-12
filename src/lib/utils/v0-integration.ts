// V0 Integration Utilities
// Helper functions for integrating V0 components

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge V0 styles with existing component styles
 * Ensures V0 styles don't override critical shadcn styles
 */
export function mergeV0Styles(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Convert V0 color variables to shadcn format
 * V0 uses different naming conventions that need mapping
 */
export function mapV0ColorToShadcn(v0Color: string): string {
  const colorMap: Record<string, string> = {
    // Add mappings as you discover them
    'primary': 'primary',
    'secondary': 'secondary',
    'accent': 'accent',
    'background': 'background',
    'foreground': 'foreground',
    // V0 specific mappings
    'surface': 'card',
    'on-surface': 'card-foreground',
    'inverse': 'primary-foreground',
  };

  return colorMap[v0Color] || v0Color;
}

/**
 * Extract and validate V0 component props
 * Ensures type safety when integrating V0 components
 */
export function validateV0Props<T extends Record<string, any>>(
  props: T,
  requiredProps: (keyof T)[]
): { valid: boolean; missing: string[] } {
  const missing = requiredProps.filter(prop => !(prop in props));
  
  return {
    valid: missing.length === 0,
    missing: missing as string[]
  };
}

/**
 * Convert V0 animation values to Framer Motion format
 */
export function convertV0Animation(v0Animation: any) {
  // Add conversion logic as needed
  return {
    initial: v0Animation.from || v0Animation.initial,
    animate: v0Animation.to || v0Animation.animate,
    exit: v0Animation.exit,
    transition: v0Animation.transition || { duration: 0.3 }
  };
}

/**
 * Check for naming conflicts between V0 and existing components
 */
export function checkComponentNameConflict(
  v0ComponentName: string,
  existingComponents: string[]
): boolean {
  return existingComponents.includes(v0ComponentName);
}

/**
 * Generate TypeScript interface from V0 component props
 * Useful for components that don't have proper types
 */
export function generatePropsInterface(
  componentName: string,
  sampleProps: Record<string, any>
): string {
  const entries = Object.entries(sampleProps);
  const props = entries.map(([key, value]) => {
    const type = typeof value;
    return `  ${key}?: ${type};`;
  }).join('\n');

  return `interface ${componentName}Props {\n${props}\n}`;
} 