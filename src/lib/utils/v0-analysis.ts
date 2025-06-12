// V0 Project Analysis Utilities
// Helps identify conflicts and dependencies between V0 projects

import fs from 'fs';
import path from 'path';

interface ComponentInfo {
  name: string;
  path: string;
  imports: string[];
  exports: string[];
  styles: string[];
  dependencies: string[];
}

interface AnalysisResult {
  components: ComponentInfo[];
  conflicts: {
    naming: string[];
    styles: string[];
    dependencies: string[];
  };
  sharedDependencies: string[];
  cssVariables: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
}

// Bravetto-specific V0 project paths
export const V0_PROJECTS = {
  landing: 'bravetto-recruitment-platform-tech-landing-page',
  modal: 'bravetto-recruitment-platform-modal'
} as const;

/**
 * Analyze Bravetto V0 projects for conflicts and dependencies
 */
export async function analyzeBravettoV0Projects(): Promise<AnalysisResult> {
  const landingPath = `src/components/landing/v0/${V0_PROJECTS.landing}`;
  const modalPath = `src/components/shared/Modal/${V0_PROJECTS.modal}`;
  
  return analyzeV0Projects(landingPath, modalPath);
}

/**
 * Analyze V0 project structure and identify potential conflicts
 */
export async function analyzeV0Projects(
  landingPath: string,
  modalPath: string
): Promise<AnalysisResult> {
  // This will be populated when V0 files are available
  const result: AnalysisResult = {
    components: [],
    conflicts: {
      naming: [],
      styles: [],
      dependencies: []
    },
    sharedDependencies: [],
    cssVariables: {
      light: {},
      dark: {}
    }
  };

  return result;
}

/**
 * Extract CSS variables from V0 styles
 */
export function extractCSSVariables(cssContent: string): {
  light: Record<string, string>;
  dark: Record<string, string>;
} {
  const variables = {
    light: {} as Record<string, string>,
    dark: {} as Record<string, string>
  };

  // Extract :root variables
  const rootMatch = cssContent.match(/:root\s*{([^}]+)}/);
  if (rootMatch) {
    const varMatches = rootMatch[1].matchAll(/--([^:]+):\s*([^;]+);/g);
    for (const match of varMatches) {
      variables.light[match[1].trim()] = match[2].trim();
    }
  }

  // Extract dark mode variables
  const darkMatch = cssContent.match(/\.dark\s*{([^}]+)}/);
  if (darkMatch) {
    const varMatches = darkMatch[1].matchAll(/--([^:]+):\s*([^;]+);/g);
    for (const match of varMatches) {
      variables.dark[match[1].trim()] = match[2].trim();
    }
  }

  return variables;
}

/**
 * Merge CSS variables from multiple V0 projects
 */
export function mergeCSSVariables(
  existing: { light: Record<string, string>; dark: Record<string, string> },
  v0Landing: { light: Record<string, string>; dark: Record<string, string> },
  v0Modal: { light: Record<string, string>; dark: Record<string, string> }
): string {
  const merged = {
    light: { ...existing.light },
    dark: { ...existing.dark }
  };

  // Add V0 landing variables with prefix
  Object.entries(v0Landing.light).forEach(([key, value]) => {
    if (!merged.light[key]) {
      merged.light[`v0-landing-${key}`] = value;
    }
  });

  Object.entries(v0Landing.dark).forEach(([key, value]) => {
    if (!merged.dark[key]) {
      merged.dark[`v0-landing-${key}`] = value;
    }
  });

  // Add V0 modal variables with prefix
  Object.entries(v0Modal.light).forEach(([key, value]) => {
    if (!merged.light[key]) {
      merged.light[`v0-modal-${key}`] = value;
    }
  });

  Object.entries(v0Modal.dark).forEach(([key, value]) => {
    if (!merged.dark[key]) {
      merged.dark[`v0-modal-${key}`] = value;
    }
  });

  // Generate CSS
  let css = ':root {\n';
  Object.entries(merged.light).forEach(([key, value]) => {
    css += `  --${key}: ${value};\n`;
  });
  css += '}\n\n.dark {\n';
  Object.entries(merged.dark).forEach(([key, value]) => {
    css += `  --${key}: ${value};\n`;
  });
  css += '}\n';

  return css;
}

/**
 * Identify duplicate components between V0 projects
 */
export function findDuplicateComponents(
  landingComponents: string[],
  modalComponents: string[]
): string[] {
  return landingComponents.filter(comp => 
    modalComponents.some(modal => 
      modal.toLowerCase() === comp.toLowerCase()
    )
  );
}

/**
 * Generate import map for V0 components
 */
export function generateImportMap(components: ComponentInfo[]): Record<string, string> {
  const importMap: Record<string, string> = {};
  
  components.forEach(comp => {
    const relativePath = comp.path.replace(/\.(tsx?|jsx?)$/, '');
    importMap[comp.name] = `@/components/${relativePath}`;
  });

  return importMap;
}

/**
 * Check if file is a component file
 */
export function isComponentFile(filename: string): boolean {
  return /\.(tsx?|jsx?)$/.test(filename) && 
         !filename.includes('.test.') && 
         !filename.includes('.spec.') &&
         !filename.includes('.d.ts');
}

/**
 * Extract component name from file path
 */
export function extractComponentName(filePath: string): string {
  const filename = path.basename(filePath);
  return filename.replace(/\.(tsx?|jsx?)$/, '');
} 