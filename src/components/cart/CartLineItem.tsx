import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { CartItem } from '../../types/cart';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartContext } from '../../context/CartContext';

interface Props {
  item: CartItem;
}

const CartLineItem: React.FC<Props> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCartContext();
  const { product, quantity } = item;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.images[product.thumbnailIndex] }}
        style={styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.info}>
        <Text style={styles.category}>{product.subcategory.toUpperCase()}</Text>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.size}>{product.size}</Text>
        <Text style={styles.price}>{formatCurrency(product.price)}</Text>

        {/* Qty Stepper */}
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() =>
              quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, quantity - 1)
            }
          >
            <Text style={styles.stepIcon}>{quantity === 1 ? '🗑' : '−'}</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => updateQuantity(product.id, quantity + 1)}
          >
            <Text style={styles.stepIcon}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.lineTotal}>
        {formatCurrency(product.price * quantity)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 100,
    height: 130,
  },
  info: {
    flex: 1,
    padding: Spacing.sm,
    justifyContent: 'space-between',
  },
  category: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    letterSpacing: 1.5,
  },
  name: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    lineHeight: FontSize.base * 1.3,
    marginTop: 2,
  },
  size: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  price: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.primaryGold,
    marginTop: 4,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepIcon: {
    fontSize: 14,
    color: Colors.textPrimary,
  },
  qty: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    width: 32,
    textAlign: 'center',
  },
  lineTotal: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    padding: Spacing.sm,
    paddingTop: Spacing.md,
  },
});

export default CartLineItem;
