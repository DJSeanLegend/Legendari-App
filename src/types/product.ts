export interface Ingredient {
  name: string;
  benefit: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export type ProductCategory = 'hair-care' | 'skin-care';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subcategory: string;
  tagline: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  thumbnailIndex: number;
  description: string;
  ingredients: Ingredient[];
  howToUse: string;
  size: string;
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  averageRating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

export interface Category {
  id: ProductCategory;
  label: string;
  description: string;
  image: string;
  productCount: number;
}
