export interface Promotion {
  id: string;
  headline: string;
  subline: string;
  cta: string;
  image: string;
  categoryId?: string;
}

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo_001',
    headline: 'YOUR CROWN\nDESERVES GOLD',
    subline: 'New hair care collection — now available',
    cta: 'Shop Hair Care',
    image: 'https://images.unsplash.com/photo-1597854710053-24a6d3e67d47?w=800&q=80',
    categoryId: 'hair-care',
  },
  {
    id: 'promo_002',
    headline: 'RADIANCE\nRE-DEFINED',
    subline: 'Liquid Gold Vitamin C Serum — new arrival',
    cta: 'Discover Skin Care',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    categoryId: 'skin-care',
  },
  {
    id: 'promo_003',
    headline: 'THE LEGEND\nSTARTS HERE',
    subline: 'Free gift with orders over £100',
    cta: 'Shop Now',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80',
  },
];
