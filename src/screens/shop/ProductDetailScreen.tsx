import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopStackParamList } from '../../types/navigation';
import { getProductById } from '../../data/products';
import { getReviewsByProductId } from '../../data/reviews';
import { useCartContext } from '../../context/CartContext';
import { useFavoritesContext } from '../../context/FavoritesContext';
import LuxuryButton from '../../components/common/LuxuryButton';
import GoldDivider from '../../components/common/GoldDivider';
import StarRating from '../../components/common/StarRating';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { formatCurrency } from '../../utils/formatCurrency';

type RoutePropType = RouteProp<ShopStackParamList, 'ProductDetail'>;

const { width: SCREEN_W } = Dimensions.get('window');

const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<RoutePropType>();
  const insets = useSafeAreaInsets();
  const { addToCart } = useCartContext();
  const { isFavorite, toggleFavorite } = useFavoritesContext();

  const product = getProductById(route.params.productId);
  if (!product) return null;

  const reviews = getReviewsByProductId(product.id);
  const fav = isFavorite(product.id);

  const [activeImg, setActiveImg] = useState(0);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [howToOpen, setHowToOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [qty, setQty] = useState(1);

  const onImageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setActiveImg(idx);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* Back + Fav Header */}
      <View style={[styles.floatingHeader, { top: insets.top + 8 }]}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Text style={styles.iconBtnText}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => toggleFavorite(product)}>
          <Text style={[styles.iconBtnText, fav && styles.iconBtnGold]}>
            {fav ? '♥' : '♡'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image Carousel */}
        <View style={styles.imageCarousel}>
          <FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onImageScroll}
            scrollEventThrottle={16}
            keyExtractor={(_, i) => String(i)}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                style={styles.productImage}
                contentFit="cover"
                transition={300}
              />
            )}
          />
          <View style={styles.imageDots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImg && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.content}>
          {/* Badges */}
          <View style={styles.badgeRow}>
            {product.isNew && <Text style={styles.badge}>NEW ARRIVAL</Text>}
            {product.isBestSeller && <Text style={[styles.badge, styles.badgeOutline]}>BEST SELLER</Text>}
          </View>

          {/* Name & Category */}
          <Text style={styles.category}>{product.subcategory.toUpperCase()}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <StarRating rating={product.averageRating} reviewCount={product.reviewCount} size="md" />
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {product.compareAtPrice && (
              <Text style={styles.comparePrice}>{formatCurrency(product.compareAtPrice)}</Text>
            )}
            <Text style={styles.size}>{product.size}</Text>
          </View>

          <GoldDivider />

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity */}
          <View style={styles.qtyRow}>
            <Text style={styles.qtyLabel}>QUANTITY</Text>
            <View style={styles.stepper}>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Text style={styles.stepText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => q + 1)}
              >
                <Text style={styles.stepText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Add to Cart */}
          <LuxuryButton
            label={addedToCart ? '✓ Added to Bag' : 'Add to Bag'}
            onPress={handleAddToCart}
            style={styles.addBtn}
          />
          <LuxuryButton
            label="Add to Wishlist"
            onPress={() => toggleFavorite(product)}
            variant="outline"
            style={styles.wishBtn}
          />

          <GoldDivider />

          {/* Ingredients Accordion */}
          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setIngredientsOpen(!ingredientsOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.accordionTitle}>KEY INGREDIENTS</Text>
            <Text style={styles.accordionChevron}>{ingredientsOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {ingredientsOpen && (
            <View style={styles.accordionContent}>
              {product.ingredients.map((ing, i) => (
                <View key={i} style={styles.ingredientRow}>
                  <View style={styles.ingDot} />
                  <View style={styles.ingInfo}>
                    <Text style={styles.ingName}>{ing.name}</Text>
                    <Text style={styles.ingBenefit}>{ing.benefit}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          <GoldDivider />

          {/* How To Use Accordion */}
          <TouchableOpacity
            style={styles.accordion}
            onPress={() => setHowToOpen(!howToOpen)}
            activeOpacity={0.7}
          >
            <Text style={styles.accordionTitle}>HOW TO USE</Text>
            <Text style={styles.accordionChevron}>{howToOpen ? '▲' : '▼'}</Text>
          </TouchableOpacity>
          {howToOpen && (
            <View style={styles.accordionContent}>
              <Text style={styles.howToText}>{product.howToUse}</Text>
            </View>
          )}

          <GoldDivider />

          {/* Reviews */}
          {reviews.length > 0 && (
            <View style={styles.reviewsSection}>
              <Text style={styles.reviewsTitle}>REVIEWS</Text>
              <View style={styles.reviewsSummary}>
                <Text style={styles.reviewsAvg}>{product.averageRating}</Text>
                <View>
                  <StarRating rating={product.averageRating} size="md" />
                  <Text style={styles.reviewsCount}>{product.reviewCount} reviews</Text>
                </View>
              </View>
              {reviews.map((r) => (
                <View key={r.id} style={styles.reviewCard}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewAuthor}>{r.author}</Text>
                    {r.verified && <Text style={styles.verified}>✓ Verified</Text>}
                  </View>
                  <StarRating rating={r.rating} />
                  <Text style={styles.reviewTitle}>{r.title}</Text>
                  <Text style={styles.reviewBody}>{r.body}</Text>
                  <Text style={styles.reviewDate}>
                    {new Date(r.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={{ height: 40 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.richBlack,
  },
  floatingHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(10,10,10,0.7)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconBtnText: {
    fontSize: 20,
    color: Colors.textPrimary,
  },
  iconBtnGold: {
    color: Colors.primaryGold,
  },
  imageCarousel: {
    height: SCREEN_W * 1.1,
    position: 'relative',
  },
  productImage: {
    width: SCREEN_W,
    height: SCREEN_W * 1.1,
  },
  imageDots: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.textDisabled,
  },
  dotActive: {
    backgroundColor: Colors.primaryGold,
    width: 16,
  },
  content: {
    padding: Spacing.md,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  badge: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.richBlack,
    backgroundColor: Colors.primaryGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    letterSpacing: 1,
  },
  badgeOutline: {
    backgroundColor: Colors.transparent,
    color: Colors.primaryGold,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
  },
  category: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    letterSpacing: 2,
    marginTop: Spacing.sm,
  },
  name: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['2xl'] * 1.15,
    marginTop: Spacing.xs,
  },
  tagline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  ratingRow: {
    marginTop: Spacing.sm,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  price: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xl,
    color: Colors.primaryGold,
  },
  comparePrice: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.md,
    color: Colors.textDisabled,
    textDecorationLine: 'line-through',
  },
  size: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginLeft: 'auto',
  },
  description: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.8,
    marginBottom: Spacing.md,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  qtyLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 2,
  },
  stepBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    fontSize: 18,
    color: Colors.textPrimary,
  },
  qtyValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    width: 36,
    textAlign: 'center',
  },
  addBtn: {
    marginBottom: Spacing.sm,
  },
  wishBtn: {
    marginBottom: Spacing.sm,
  },
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  accordionTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  accordionChevron: {
    fontSize: 10,
    color: Colors.primaryGold,
  },
  accordionContent: {
    paddingBottom: Spacing.md,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
    gap: Spacing.sm,
  },
  ingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryGold,
    marginTop: 6,
  },
  ingInfo: { flex: 1 },
  ingName: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  ingBenefit: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  howToText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.8,
  },
  reviewsSection: {
    marginBottom: Spacing.md,
  },
  reviewsTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    letterSpacing: 2,
    marginBottom: Spacing.md,
  },
  reviewsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewsAvg: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.primaryGold,
  },
  reviewsCount: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  reviewAuthor: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
  },
  verified: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.success,
  },
  reviewTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
    marginBottom: Spacing.xs,
  },
  reviewBody: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.7,
  },
  reviewDate: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textDisabled,
    marginTop: Spacing.xs,
  },
});

export default ProductDetailScreen;
