export const FontFamily = {
  displayBold: 'Cormorant-Bold',
  displayRegular: 'Cormorant-Regular',
  displayItalic: 'Cormorant-Italic',
  body: 'Montserrat-Regular',
  bodySemiBold: 'Montserrat-SemiBold',
} as const;

export const FontSize = {
  xs: 10,
  sm: 12,
  base: 14,
  md: 16,
  lg: 20,
  xl: 26,
  '2xl': 32,
  '3xl': 42,
} as const;

export const LineHeight = {
  tight: 1.1,
  normal: 1.5,
  relaxed: 1.8,
} as const;

export const LetterSpacing = {
  wide: 2,
  wider: 4,
  normal: 0.3,
} as const;
