import { useState, useMemo } from 'react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types/product';

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const useProducts = () => {
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let result: Product[] = PRODUCTS;

    if (categoryFilter !== 'all') {
      result = result.filter((p) => p.category === categoryFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    switch (sortOption) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...result].sort((a, b) => b.averageRating - a.averageRating);
      case 'newest':
        return [...result].filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
      default:
        return result;
    }
  }, [categoryFilter, sortOption, searchQuery]);

  return {
    products: filtered,
    categoryFilter,
    setCategoryFilter,
    sortOption,
    setSortOption,
    searchQuery,
    setSearchQuery,
  };
};
