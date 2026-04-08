export const Colors = {
  // Gold palette
  primaryGold: '#C9A84C',
  deepGold: '#A6862C',
  lightGold: '#E8D48B',
  paleGoldTint: '#F5EFD6',

  // Black palette
  trueBlack: '#000000',
  richBlack: '#0A0A0A',
  surface: '#141414',
  surfaceElevated: '#1E1E1E',
  border: '#2A2A2A',
  goldBorder: 'rgba(201, 168, 76, 0.2)',

  // Text
  textPrimary: '#F0EAD6',
  textSecondary: '#A89878',
  textDisabled: '#4A4A4A',

  // Functional
  success: '#4CAF50',
  error: '#CF6679',
  white: '#FFFFFF',
  transparent: 'transparent',
} as const;

export type ColorKey = keyof typeof Colors;
