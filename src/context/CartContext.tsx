import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { CartContextType, CartItem, CartState } from '../types/cart';
import { Product } from '../types/product';

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product; quantity: number }
  | { type: 'REMOVE_FROM_CART'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_FROM_CART':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const itemCount = useMemo(
    () => state.items.reduce((sum, i) => sum + i.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () => state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    [state.items]
  );

  const value: CartContextType = {
    ...state,
    itemCount,
    subtotal,
    addToCart: (product: Product, quantity = 1) =>
      dispatch({ type: 'ADD_TO_CART', product, quantity }),
    removeFromCart: (productId: string) =>
      dispatch({ type: 'REMOVE_FROM_CART', productId }),
    updateQuantity: (productId: string, quantity: number) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCartContext must be used within CartProvider');
  return ctx;
};
