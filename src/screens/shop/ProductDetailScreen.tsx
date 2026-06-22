import React, { useState } from 'react';
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
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
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

const AccordionRow: React.FC<{
  title: string;
  icon: React.ComponentProps<typeof Ionicons>['name'];
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ title, icon, open, onToggle, children }) => (
  <View>
    <TouchableOpacity
      style={styles.accordion}
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.accordionLeft}>
        <Ionicons name={icon} size={16} color={Colors.primaryGold} style={{ marginRight: 8 }} />
        <Text style={styles.accordionTitle}>{title}</Text>
      </View>
      <Ionicons
        name={open ? 'chevron-up' : 'chevron-down'}
        size={16}
        color={Colors.primaryGold}
      />
    </TouchableOpacity>
    {open && <View style={styles.accordionContent}>{children}</View>}
  </View>
);

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

  const [activeImg, setActiveImg]           = useState(0);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [howToOpen, setHowToOpen]           = useState(false);
  const [addedToCart, setAddedToCart]       = useState(false);
  const [qty, setQty]                       = useState(1);

  const onImageScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setActiveImg(idx);
  };

  const handleAddToCart = () => {
    addToCart(product, qty);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2200);
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>

      {/* ── Floating header (back + heart) ── */}
      <View style={[styles.floatingHeader, { top: insets.top + 10 }]}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-back" size={19} color={Colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.iconBtn, fav && styles.iconBtnActive]}
          onPress={() => toggleFavorite(product)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={fav ? 'heart' : 'heart-outline'}
            size={19}
            color={fav ? Colors.richBlack : Colors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ── Image carousel ── */}
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
                transition={350}
              />
            )}
          />
          {/* Bottom fade into page background */}
          <LinearGradient
            colors={['transparent', Colors.richBlack]}
            style={styles.imageFade}
            start={{ x: 0, y: 0.6 }}
            end={{ x: 0, y: 1 }}
          />
          {/* Dot indicators */}
          <View style={styles.imageDots}>
            {product.images.map((_, i) => (
              <View key={i} style={[styles.dot, i === activeImg && styles.dotActive]} />
            ))}
          </View>
        </View>

        {/* ── Content ── */}
        <View style={styles.content}>
          {/* Badges */}
          <View style={styles.badgeRow}>
            {product.isNew && (
              <View style={styles.badgeNew}>
                <Text style={styles.badgeText}>NEW ARRIVAL</Text>
              </View>
            )}
            {product.isBestSeller && (
              <View style={styles.badgeSeller}>
                <Text style={[styles.badgeText, { color: Colors.primaryGold }]}>BEST SELLER</Text>
              </View>
            )}
          </View>

          <Text style={styles.category}>{product.subcategory.toUpperCase()}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.tagline}>{product.tagline}</Text>

          <View style={styles.ratingRow}>
            <StarRating
              rating={product.averageRating}
              reviewCount={product.reviewCount}
              size="md"
            />
          </View>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatCurrency(product.price)}</Text>
            {product.compareAtPrice && (
              <Text style={styles.comparePrice}>
                {formatCurrency(product.compareAtPrice)}
              </Text>
            )}
            <Text style={styles.size}>{product.size}</Text>
          </View>

          <GoldDivider />

          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity stepper */}
          <View style={styles.qtyRow}>
            <Text style={styles.qtyLabel}>QUANTITY</Text>
            <View style={styles.stepper}>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
              <Text style={styles.qtyValue}>{qty}</Text>
              <TouchableOpacity
                style={styles.stepBtn}
                onPress={() => setQty((q) => q + 1)}
              >
                <Ionicons name="add" size={18} color={Colors.textPrimary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* CTA buttons */}
          <LuxuryButton
            label={addedToCart ? '✓  Added to Bag' : 'Add to Bag'}
            onPress={handleAddToCart}
            style={styles.addBtn}
          />
          <LuxuryButton
            label={fav ? '♥  Saved to Wishlist' : 'Save to Wishlist'}
            onPress={() => toggleFavorite(product)}
            variant="outline"
            style={styles.wishBtn}
          />

          <GoldDivider />

          {/* Accordions */}
          <AccordionRow
            title="KEY INGREDIENTS"
            icon="flask-outline"
            open={ingredientsOpen}
            onToggle={() => setIngredientsOpen(!ingredientsOpen)}
          >
            {product.ingredients.map((ing, i) => (
              <View key={i} style={styles.ingredientRow}>
                <View style={styles.ingDot} />
                <View style={styles.ingInfo}>
                  <Text style={styles.ingName}>{ing.name}</Text>
                  <Text style={styles.ingBenefit}>{ing.benefit}</Text>
                </View>
              </View>
            ))}
          </AccordionRow>

          <GoldDivider opacity={0.15} />

          <AccordionRow
            title="HOW TO USE"
            icon="hand-left-outline"
            open={howToOpen}
            onToggle={() => setHowToOpen(!howToOpen)}
          >
            <Text style={styles.howToText}>{product.howToUse}</Text>
          </AccordionRow>

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
                    {r.verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={12} color={Colors.success} />
                        <Text style={styles.verified}> Verified</Text>
                      </View>
                    )}
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

          <View style={{ height: 48 }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.richBlack },

  // Floating header
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
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(10,10,10,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  iconBtnActive: {
    backgroundColor: Colors.primaryGold,
    borderColor: Colors.primaryGold,
  },

  // Image carousel
  imageCarousel: {
    height: SCREEN_W * 1.1,
    position: 'relative',
  },
  productImage: {
    width: SCREEN_W,
    height: SCREEN_W * 1.1,
  },
  imageFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
  },
  imageDots: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: Colors.primaryGold,
    width: 18,
  },

  // Content
  content: { padding: Spacing.md },
  badgeRow: { flexDirection: 'row', gap: Spacing.xs, marginBottom: Spacing.xs },
  badgeNew: {
    backgroundColor: Colors.primaryGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeSeller: {
    borderWidth: 1,
    borderColor: Colors.primaryGold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  badgeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 9,
    color: Colors.richBlack,
    letterSpacing: 1.2,
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
    lineHeight: FontSize['2xl'] * 1.12,
    marginTop: Spacing.xs,
  },
  tagline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  ratingRow: { marginTop: Spacing.sm },
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
    lineHeight: FontSize.base * 1.85,
    marginBottom: Spacing.md,
  },

  // Qty stepper
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
    borderRadius: 4,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceElevated,
  },
  stepText: { fontSize: 18, color: Colors.textPrimary },
  qtyValue: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    width: 38,
    textAlign: 'center',
  },

  addBtn: { marginBottom: Spacing.sm },
  wishBtn: { marginBottom: Spacing.sm },

  // Accordions
  accordion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm + 2,
  },
  accordionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accordionTitle: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.textPrimary,
    letterSpacing: 1.5,
  },
  accordionContent: { paddingBottom: Spacing.md },
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
    lineHeight: FontSize.xs * 1.7,
  },
  howToText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.85,
  },

  // Reviews
  reviewsSection: { marginBottom: Spacing.md },
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
    borderRadius: 6,
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
    borderRadius: 6,
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
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
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
    lineHeight: FontSize.sm * 1.75,
  },
  reviewDate: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textDisabled,
    marginTop: Spacing.xs,
  },
});

export default ProductDetailScreen;
