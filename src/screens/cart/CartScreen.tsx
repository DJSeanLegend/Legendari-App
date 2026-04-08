import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCartContext } from '../../context/CartContext';
import CartLineItem from '../../components/cart/CartLineItem';
import LuxuryButton from '../../components/common/LuxuryButton';
import GoldDivider from '../../components/common/GoldDivider';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatCurrency';
import { SHIPPING_THRESHOLD, SHIPPING_COST } from '../../utils/constants';

const CartScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { items, itemCount, subtotal, clearCart } = useCartContext();

  const shippingFree = subtotal >= SHIPPING_THRESHOLD;
  const shipping = shippingFree ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const remaining = SHIPPING_THRESHOLD - subtotal;

  if (items.length === 0) {
    return (
      <View style={[styles.container, styles.empty, { paddingTop: insets.top }]}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <Text style={styles.emptyIcon}>✦</Text>
        <Text style={styles.emptyTitle}>Your Bag is Empty</Text>
        <Text style={styles.emptySubtitle}>
          Discover our luxury hair &amp; skin care collections and add something legendary.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>MY BAG ({itemCount})</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Free Shipping Banner */}
      {!shippingFree && (
        <View style={styles.shippingBanner}>
          <Text style={styles.shippingText}>
            Add {formatCurrency(remaining)} more for free shipping
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.min((subtotal / SHIPPING_THRESHOLD) * 100, 100)}%` },
              ]}
            />
          </View>
        </View>
      )}
      {shippingFree && (
        <View style={[styles.shippingBanner, styles.shippingFree]}>
          <Text style={styles.shippingFreeText}>✓ You qualify for free shipping!</Text>
        </View>
      )}

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CartLineItem item={item} />}
        ListFooterComponent={
          <View>
            <GoldDivider />
            {/* Order Summary */}
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{formatCurrency(subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Shipping</Text>
                <Text style={[styles.summaryValue, shippingFree && styles.freeText]}>
                  {shippingFree ? 'FREE' : formatCurrency(shipping)}
                </Text>
              </View>
              <GoldDivider thickness={1} opacity={0.15} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
              </View>
            </View>

            <LuxuryButton
              label="Proceed to Checkout"
              onPress={() => {}}
              style={styles.checkoutBtn}
            />
            <Text style={styles.secureBadge}>🔒 Secure Checkout · SSL Encrypted</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.richBlack,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  header: {
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.primaryGold,
    letterSpacing: 8,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Spacing.md,
  },
  headerTitle: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  clearText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  shippingBanner: {
    margin: Spacing.md,
    marginBottom: 0,
    padding: Spacing.sm,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
  },
  shippingFree: {
    borderColor: Colors.success,
  },
  shippingText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  progressBar: {
    height: 2,
    backgroundColor: Colors.border,
    borderRadius: 1,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.primaryGold,
    borderRadius: 1,
  },
  shippingFreeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.success,
    textAlign: 'center',
    letterSpacing: 1,
  },
  list: {
    padding: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  summary: {
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  summaryTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  summaryLabel: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  summaryValue: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  freeText: {
    color: Colors.success,
  },
  totalLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  totalValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.md,
    color: Colors.primaryGold,
  },
  checkoutBtn: {
    marginBottom: Spacing.sm,
  },
  secureBadge: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textDisabled,
    textAlign: 'center',
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  emptyIcon: {
    fontSize: 40,
    color: Colors.textDisabled,
    marginBottom: Spacing.md,
  },
  emptyTitle: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptySubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.base * 1.8,
  },
});

export default CartScreen;
