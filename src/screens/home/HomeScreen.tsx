import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
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

type NavProp = NativeStackNavigationProp<HomeStackParamList>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const featured = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newArrivals = getNewProducts();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  const handleCtaPress = (_promo: Promotion) => {
    // Navigate to Shop
  };

  const handleCategoryPress = (_category: Category) => {
    // Navigate to Shop with category filter
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      {/* Wordmark Header */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <Text style={styles.tagline}>Luxury Hair & Skin Care</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Hero Banner */}
        <HeroBanner onCtaPress={handleCtaPress} />

        {/* Categories */}
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
          <FeaturedProductsRow
            products={featured}
            onProductPress={handleProductPress}
          />
        </View>

        <GoldDivider style={styles.divider} />

        {/* Best Sellers */}
        <View style={styles.section}>
          <SectionHeading
            title="Best Sellers"
            subtitle="BELOVED BY ALL"
            style={styles.sectionPadded}
          />
          <FeaturedProductsRow
            products={bestSellers}
            onProductPress={handleProductPress}
          />
        </View>

        <GoldDivider style={styles.divider} />

        {/* New Arrivals */}
        <View style={styles.section}>
          <SectionHeading
            title="New Arrivals"
            subtitle="FRESHLY CRAFTED"
            style={styles.sectionPadded}
          />
          <FeaturedProductsRow
            products={newArrivals}
            onProductPress={handleProductPress}
          />
        </View>

        {/* Brand Promise Banner */}
        <View style={styles.promiseBanner}>
          <Text style={styles.promiseTitle}>THE LEGENDARI PROMISE</Text>
          <View style={styles.goldRule} />
          <Text style={styles.promiseText}>
            Every product is crafted with the finest ingredients, free from harsh chemicals,
            and tested with care. Because you deserve nothing less than legendary.
          </Text>
          <View style={styles.pillars}>
            {['CLEAN', 'VEGAN', 'LUXURY', 'RESULTS'].map((p) => (
              <View key={p} style={styles.pillar}>
                <Text style={styles.pillarText}>{p}</Text>
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
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.richBlack,
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
  scroll: {},
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
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    borderRadius: 4,
    alignItems: 'center',
  },
  promiseTitle: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.primaryGold,
    letterSpacing: 3,
    textAlign: 'center',
  },
  goldRule: {
    width: 50,
    height: 1,
    backgroundColor: Colors.primaryGold,
    marginVertical: Spacing.sm,
    opacity: 0.5,
  },
  promiseText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.sm * 1.8,
    marginBottom: Spacing.md,
  },
  pillars: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pillar: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
    borderRadius: 2,
  },
  pillarText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    letterSpacing: 2,
  },
});

export default HomeScreen;
