// Shared design tokens for every toy's screens: the RogueLore palette, not
// Thursday Interactive branding ([[DEC-260928-roguelore-branding]]). Names
// and values match the curriculum app's own tokens, so a toy's screens can
// serve there unchanged.

export const color = {
  text: '#1a1a1a',
  textMuted: '#555555',
  border: '#cccccc',
  surface: '#ffffff',

  primary: '#204153',              // Structural (UI): header band, primary buttons, repeated chrome.
  primaryTint: '#EDF0F1',          // Very light tint of primary.
  secondary: '#4A6472',            // Lower-emphasis buttons, muted text.
  destructive: '#9E382C',          // Delete and discard actions only, never decorative.
  destructiveText: '#9E382C',      // Destructive color used as text, such as validation messages.
  warningAccent: '#B18443',        // Warning: non-blocking notices.
  warningIconAccent: '#8A661F',    // Warning icon shade.
  bannerBg: '#EFF2F0',             // Warning and danger banner background.
  divider: '#C8DEDD',              // List-row dividers.
  offWhite: '#FAF9F5',             // Screen background.
  structuralDeep: '#152E3C',       // Structural (deep): behind the logo and app icon.
  featureAccentOnDark: '#F0B23C',  // Gold accent on dark surfaces.
  featureAccentOnLight: '#B47A1B', // Gold accent on light surfaces.
  characterInlineBannerBg: '#FCF0DB', // Light gold behind a character banner.
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const radius = {
  sm: 4,
  md: 8,
} as const;

export const font = {
  size: {
    sm: 12,
    base: 14,
    lg: 16,
    xl: 20,
  },
  weight: {
    regular: '400',
    medium: '600',
    bold: '700',
  },
} as const;
