import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HeroBanner from '../../components/home/HeroBanner';
import CategoryGrid from '../../components/home/CategoryGrid';
import FeaturedProductsRow from '../../components/home/FeaturedProductsRow';
import SectionHeading from '../../components/common/SectionHeading';
import GoldDivider from '../../components/common/GoldDivider';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { getFeaturedProducts, getBestSellers, getNewProducts } from '../../data/products';
import { HomeStackParamList } from '../../types/navigation';
import { Promotion } from '../../data/promotions';
import { Category, Product } from '../../types/product';
import { useCartContext } from '../../context/CartContext';

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

const PILLARS = [
  { icon: 'leaf-outline',        label: 'CLEAN' },
  { icon: 'heart-outline',       label: 'VEGAN' },
  { icon: 'diamond-outline',     label: 'LUXURY' },
  { icon: 'trending-up-outline', label: 'RESULTS' },
] as const;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { itemCount } = useCartContext();
  const featured   = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewProducts();

  const handleProductPress = (product: Product) =>
    navigation.navigate('ProductDetail', { productId: product.id });

  const handleCtaPress    = (_promo: Promotion) => {};
  const handleCategoryPress = (_cat: Category) => {};

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      {/* ── Refined header ── */}
      <View style={styles.header}>
        {/* subtle gold gradient line at very bottom */}
        <LinearGradient
          colors={['rgba(201,168,76,0)', 'rgba(201,168,76,0.15)', 'rgba(201,168,76,0)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerAccentLine}
        />

        <View style={styles.headerInner}>
          {/* left spacer */}
          <View style={styles.headerSide} />

          {/* wordmark */}
          <View style={styles.headerCenter}>
            <Text style={styles.wordmark}>LEGENDARI</Text>
            <Text style={styles.tagline}>Luxury Hair &amp; Skin Care</Text>
          </View>

          {/* cart shortcut */}
          <TouchableOpacity style={styles.headerSide} activeOpacity={0.7}>
            <View style={styles.cartIconWrap}>
              <Ionicons name="bag-outline" size={22} color={Colors.primaryGold} />
              {itemCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>
                    {itemCount > 9 ? '9+' : itemCount}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <HeroBanner onCtaPress={handleCtaPress} />

        {/* Collections */}
        <View style={styles.section}>
          <SectionHeading
            title="Our Collections"
            subtitle="CURATED FOR YOUR RITUAL"
            style={styles.sectionPadded}
          />
          <CategoryGrid onCategoryPress={handleCategoryPress} />
        </View>

        <GoldDivider style={styles.divider} />

        {/* Featured */}
        <View style={styles.section}>
          <SectionHeading
            title="Featured"
            subtitle="EDITOR'S PICKS"
            style={styles.sectionPadded}
          />
          <FeaturedProductsRow products={featured} onProductPress={handleProductPress} />
        </View>

        <GoldDivider style={styles.divider} />

        {/* Best Sellers */}
        <View style={styles.section}>
          <SectionHeading
            title="Best Sellers"
            subtitle="BELOVED BY ALL"
            style={styles.sectionPadded}
          />
          <FeaturedProductsRow products={bestSellers} onProductPress={handleProductPress} />
        </View>

        <GoldDivider style={styles.divider} />

        {/* New Arrivals */}
        <View style={styles.section}>
          <SectionHeading
            title="New Arrivals"
            subtitle="FRESHLY CRAFTED"
            style={styles.sectionPadded}
          />
          <FeaturedProductsRow products={newArrivals} onProductPress={handleProductPress} />
        </View>

        {/* Brand Promise */}
        <View style={styles.promiseBanner}>
          <LinearGradient
            colors={['rgba(201,168,76,0.06)', 'rgba(201,168,76,0.02)']}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.promiseTitle}>THE LEGENDARI PROMISE</Text>
          <View style={styles.goldRule} />
          <Text style={styles.promiseText}>
            Every product is crafted with the finest ingredients, free from harsh
            chemicals, and tested with care. Because you deserve nothing less than legendary.
          </Text>

          <View style={styles.pillars}>
            {PILLARS.map((p) => (
              <View key={p.label} style={styles.pillar}>
                <Ionicons name={p.icon} size={18} color={Colors.primaryGold} />
                <Text style={styles.pillarText}>{p.label}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: Spacing['3xl'] }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.richBlack,
  },
  header: {
    backgroundColor: Colors.richBlack,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 10,
  },
  headerAccentLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  headerSide: {
    width: 44,
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.primaryGold,
    letterSpacing: 8,
  },
  tagline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginTop: 2,
  },
  cartIconWrap: {
    position: 'relative',
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -8,
    backgroundColor: Colors.primaryGold,
    borderRadius: 8,
    minWidth: 15,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  cartBadgeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: 8,
    color: Colors.richBlack,
  },
  section: {
    marginTop: Spacing.lg,
  },
  sectionPadded: {
    paddingHorizontal: Spacing.md,
  },
  divider: {
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.md,
  },
  promiseBanner: {
    margin: Spacing.md,
    marginTop: Spacing.lg,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    borderRadius: 4,
    alignItems: 'center',
    overflow: 'hidden',
  },
  promiseTitle: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.primaryGold,
    letterSpacing: 3,
    textAlign: 'center',
  },
  goldRule: {
    width: 60,
    height: 1,
    backgroundColor: Colors.primaryGold,
    marginVertical: Spacing.sm,
    opacity: 0.45,
  },
  promiseText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.sm * 1.9,
    marginBottom: Spacing.lg,
  },
  pillars: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pillar: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    borderRadius: 4,
    minWidth: 72,
  },
  pillarText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    letterSpacing: 1.5,
  },
});

export default HomeScreen;
