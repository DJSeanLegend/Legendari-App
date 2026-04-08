import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Product } from '../../types/product';
import ProductCard from '../shop/ProductCard';
import { Spacing } from '../../theme';

interface Props {
  products: Product[];
  onProductPress: (product: Product) => void;
}

const FeaturedProductsRow: React.FC<Props> = ({ products, onProductPress }) => (
  <FlatList
    data={products}
    horizontal
    showsHorizontalScrollIndicator={false}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.content}
    renderItem={({ item }) => (
      <ProductCard
        product={item}
        onPress={() => onProductPress(item)}
        horizontal
      />
    )}
    ItemSeparatorComponent={() => <View style={styles.separator} />}
  />
);

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  separator: {
    width: Spacing.sm,
  },
});

export default FeaturedProductsRow;
