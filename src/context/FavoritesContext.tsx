import React, { createContext, useContext, useState, useCallback } from 'react';
import { Product } from '../types/product';

interface FavoritesContextType {
  favorites: Product[];
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  const isFavorite = useCallback(
    (productId: string) => favorites.some((p) => p.id === productId),
    [favorites]
  );

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavoritesContext must be used within FavoritesProvider');
  return ctx;
};
