import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Product } from '../../types/product';
import { Colors, FontFamily, FontSize, Spacing, Shadows } from '../../theme';
import { formatCurrency } from '../../utils/formatCurrency';
import { useFavoritesContext } from '../../context/FavoritesContext';

const CARD_WIDTH = (Dimensions.get('window').width - Spacing.md * 2 - Spacing.sm) / 2;

interface Props {
  product: Product;
  onPress: () => void;
  horizontal?: boolean;
}

const ProductCard: React.FC<Props> = memo(({ product, onPress, horizontal = false }) => {
  const { isFavorite, toggleFavorite } = useFavoritesContext();
  const fav = isFavorite(product.id);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.88}
      style={[styles.card, horizontal && styles.cardHorizontal]}
    >
      {/* Image */}
      <View style={[styles.imageContainer, horizontal && styles.imageHorizontal]}>
        <Image
          source={{ uri: product.images[product.thumbnailIndex] }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['transparent', 'rgba(10,10,10,0.85)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.4 }}
          end={{ x: 0, y: 1 }}
        />
        {/* Badges */}
        <View style={styles.badges}>
          {product.isNew && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>NEW</Text>
            </View>
          )}
          {product.isBestSeller && !product.isNew && (
            <View style={[styles.badge, styles.badgeSeller]}>
              <Text style={[styles.badgeText, styles.badgeTextSeller]}>BEST SELLER</Text>
            </View>
          )}
        </View>
        {/* Favourite */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleFavorite(product)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.heart, fav && styles.heartFilled]}>
            {fav ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.subcategory.toUpperCase()}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {product.compareAtPrice && (
            <Text style={styles.comparePrice}>
              {formatCurrency(product.compareAtPrice)}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    ...(Shadows.card as object),
  },
  cardHorizontal: {
    width: 170,
    marginRight: Spacing.sm,
    marginBottom: 0,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.25,
  },
  imageHorizontal: {
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badges: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    flexDirection: 'column',
    gap: 4,
  },
  badge: {
    backgroundColor: Colors.primaryGold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  badgeSeller: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
  },
  badgeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 8,
    color: Colors.richBlack,
    letterSpacing: 1,
  },
  badgeTextSeller: {
    color: Colors.primaryGold,
  },
  heartBtn: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heart: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  heartFilled: {
    color: Colors.primaryGold,
  },
  info: {
    padding: Spacing.sm,
  },
  category: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    letterSpacing: 1.5,
    marginBottom: 2,
  },
  name: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    lineHeight: FontSize.base * 1.3,
    marginBottom: Spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.primaryGold,
  },
  comparePrice: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textDisabled,
    textDecorationLine: 'line-through',
  },
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
