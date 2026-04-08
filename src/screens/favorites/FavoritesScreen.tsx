import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFavoritesContext } from '../../context/FavoritesContext';
import ProductCard from '../../components/shop/ProductCard';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { Product } from '../../types/product';

const FavoritesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const { favorites } = useFavoritesContext();
  const navigation = useNavigation<any>();

  const handleProductPress = (product: Product) => {
    navigation.navigate('ShopTab', {
      screen: 'ProductDetail',
      params: { productId: product.id },
    });
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <Text style={styles.subtitle}>MY WISHLIST</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>♡</Text>
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptySubtitle}>
            Tap the heart icon on any product to save it here.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => handleProductPress(item)} />
          )}
        />
      )}
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
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  emptyIcon: {
    fontSize: 50,
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
  grid: {
    padding: Spacing.md,
    paddingBottom: Spacing['3xl'],
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default FavoritesScreen;
