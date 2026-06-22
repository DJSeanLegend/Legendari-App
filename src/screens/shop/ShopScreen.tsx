import React from 'react';
import { View, FlatList, Text, StyleSheet, TextInput } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ShopStackParamList } from '../../types/navigation';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/shop/ProductCard';
import FilterBar from '../../components/shop/FilterBar';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { Product, ProductCategory } from '../../types/product';

type NavProp = NativeStackNavigationProp<ShopStackParamList>;
type RoutePropType = RouteProp<ShopStackParamList, 'Shop'>;

const ShopScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const route = useRoute<RoutePropType>();
  const insets = useSafeAreaInsets();
  const {
    products,
    categoryFilter,
    setCategoryFilter,
    searchQuery,
    setSearchQuery,
  } = useProducts();

  // Apply category from route params
  React.useEffect(() => {
    if (route.params?.categoryId) {
      setCategoryFilter(route.params.categoryId as ProductCategory);
    }
  }, [route.params?.categoryId]);

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { productId: product.id });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <Text style={styles.subtitle}>THE SHOP</Text>
        <View style={styles.headerAccent} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor={Colors.textDisabled}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <Text
            style={styles.clearSearch}
            onPress={() => setSearchQuery('')}
          >
            ✕
          </Text>
        )}
      </View>

      {/* Filter Bar */}
      <FilterBar
        value={categoryFilter}
        onChange={(v) => setCategoryFilter(v)}
      />

      {/* Results count */}
      <Text style={styles.resultCount}>
        {products.length} product{products.length !== 1 ? 's' : ''}
      </Text>

      {/* Product Grid */}
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.grid}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={() => handleProductPress(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>✦</Text>
            <Text style={styles.emptyText}>No products found</Text>
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
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    position: 'relative',
  },
  headerAccent: {
    position: 'absolute',
    bottom: 0,
    left: '20%',
    right: '20%',
    height: 1,
    backgroundColor: Colors.primaryGold,
    opacity: 0.25,
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.primaryGold,
    letterSpacing: 8,
  },
  subtitle: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.md,
    marginBottom: 0,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: Spacing.xs,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  clearSearch: {
    color: Colors.textSecondary,
    fontSize: 14,
    padding: 4,
  },
  resultCount: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    textTransform: 'uppercase',
  },
  grid: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing['2xl'],
  },
  row: {
    justifyContent: 'space-between',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing['3xl'],
  },
  emptyIcon: {
    fontSize: 32,
    color: Colors.textDisabled,
    marginBottom: Spacing.sm,
  },
  emptyText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textDisabled,
  },
});

export default ShopScreen;
