import { Review } from '../types/product';

export const REVIEWS: Review[] = [
  {
    id: 'rev_001',
    productId: 'prod_001',
    author: 'Amara K.',
    rating: 5,
    title: 'Transformed my scalp completely',
    body: 'I\'ve been using this for 6 weeks and the difference is unbelievable. My scalp used to be so itchy and flaky, now it\'s completely balanced. I\'ve also noticed significantly less shedding.',
    date: '2025-11-20T00:00:00Z',
    verified: true,
  },
  {
    id: 'rev_002',
    productId: 'prod_001',
    author: 'Jasmine T.',
    rating: 5,
    title: 'Worth every penny',
    body: 'The texture is luxurious and it absorbs quickly without leaving residue. My hair has grown noticeably in just two months. This is now a permanent part of my routine.',
    date: '2025-10-14T00:00:00Z',
    verified: true,
  },
  {
    id: 'rev_003',
    productId: 'prod_002',
    author: 'Priya S.',
    rating: 5,
    title: 'My hair has never felt this soft',
    body: 'I bleach my hair regularly so it\'s always damaged. After just three uses of this mask my hair feels completely rebuilt. The gold sheen it leaves behind is incredible.',
    date: '2025-12-01T00:00:00Z',
    verified: true,
  },
  {
    id: 'rev_004',
    productId: 'prod_007',
    author: 'Destiny W.',
    rating: 5,
    title: 'My skin glows in the dark',
    body: 'I\'ve tried every vitamin C serum on the market. This one is leagues above the rest. My hyperpigmentation is fading, my skin is brighter, and the formula doesn\'t irritate me at all.',
    date: '2025-11-05T00:00:00Z',
    verified: true,
  },
  {
    id: 'rev_005',
    productId: 'prod_007',
    author: 'Monique L.',
    rating: 5,
    title: 'The gold really works',
    body: 'Sceptical at first about the 24K gold particles but after 4 weeks my skin tone is genuinely more even. Worth the investment.',
    date: '2025-10-22T00:00:00Z',
    verified: true,
  },
  {
    id: 'rev_006',
    productId: 'prod_008',
    author: 'Zara A.',
    rating: 5,
    title: 'Best moisturiser I\'ve ever tried',
    body: 'Rich but not heavy. My skin stays hydrated for the entire day. The black orchid scent is so elegant. I feel like I\'m doing a spa treatment every morning.',
    date: '2025-12-10T00:00:00Z',
    verified: true,
  },
];

export const getReviewsByProductId = (productId: string) =>
  REVIEWS.filter((r) => r.productId === productId);
