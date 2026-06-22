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
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../types/product';
import { Colors, FontFamily, FontSize, Spacing, Shadows } from '../../theme';
import { formatCurrency } from '../../utils/formatCurrency';
import { useFavoritesContext } from '../../context/FavoritesContext';
import StarRating from '../common/StarRating';

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
      activeOpacity={0.9}
      style={[styles.card, horizontal && styles.cardHorizontal]}
    >
      {/* Image */}
      <View style={[styles.imageContainer, horizontal && styles.imageHorizontal]}>
        <Image
          source={{ uri: product.images[product.thumbnailIndex] }}
          style={styles.image}
          contentFit="cover"
          transition={350}
        />
        {/* Darker, richer gradient for luxury feel */}
        <LinearGradient
          colors={['transparent', 'rgba(5,5,5,0.55)', 'rgba(5,5,5,0.92)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.35 }}
          end={{ x: 0, y: 1 }}
        />

        {/* Badges */}
        <View style={styles.badges}>
          {product.isNew && (
            <View style={styles.badgeNew}>
              <Text style={styles.badgeNewText}>NEW</Text>
            </View>
          )}
          {product.isBestSeller && !product.isNew && (
            <View style={styles.badgeSeller}>
              <Text style={styles.badgeSellerText}>BEST SELLER</Text>
            </View>
          )}
          {product.compareAtPrice && !product.isNew && !product.isBestSeller && (
            <View style={styles.badgeSale}>
              <Text style={styles.badgeSellerText}>SALE</Text>
            </View>
          )}
        </View>

        {/* Favourite button — circular frosted pill */}
        <TouchableOpacity
          style={[styles.heartBtn, fav && styles.heartBtnActive]}
          onPress={() => toggleFavorite(product)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={15}
            color={fav ? Colors.richBlack : Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Info panel */}
      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {product.subcategory.toUpperCase()}
        </Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Rating row */}
        <StarRating rating={product.averageRating} size="sm" />

        {/* Price row */}
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatCurrency(product.price)}</Text>
          {product.compareAtPrice && (
            <Text style={styles.comparePrice}>
              {formatCurrency(product.compareAtPrice)}
            </Text>
          )}
        </View>
      </View>

      {/* Subtle gold border on the whole card */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.cardBorder} />
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: Spacing.sm,
    ...(Shadows.card as object),
  },
  cardHorizontal: {
    width: 175,
    marginRight: Spacing.sm,
    marginBottom: 0,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH * 1.28,
  },
  imageHorizontal: {
    height: 205,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badges: {
    position: 'absolute',
    top: Spacing.xs,
    left: Spacing.xs,
    gap: 4,
  },
  badgeNew: {
    backgroundColor: Colors.primaryGold,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeNewText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 8,
    color: Colors.richBlack,
    letterSpacing: 1.2,
  },
  badgeSeller: {
    backgroundColor: 'rgba(10,10,10,0.7)',
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
  },
  badgeSale: {
    backgroundColor: Colors.error,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeSellerText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 8,
    color: Colors.primaryGold,
    letterSpacing: 1.2,
  },
  heartBtn: {
    position: 'absolute',
    top: Spacing.xs,
    right: Spacing.xs,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(20,20,20,0.65)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  heartBtnActive: {
    backgroundColor: Colors.primaryGold,
    borderColor: Colors.primaryGold,
  },
  info: {
    padding: Spacing.sm,
    paddingTop: Spacing.xs + 2,
    gap: 3,
  },
  category: {
    fontFamily: FontFamily.body,
    fontSize: 9,
    color: Colors.primaryGold,
    letterSpacing: 1.8,
  },
  name: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    lineHeight: FontSize.base * 1.25,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
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
  cardBorder: {
    flex: 1,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.12)',
  },
});

ProductCard.displayName = 'ProductCard';
export default ProductCard;
