import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { CATEGORIES } from '../../data/categories';
import { Category } from '../../types/product';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
const TILE_W = (SCREEN_W - Spacing.md * 2 - Spacing.sm) / 2;

interface Props {
  onCategoryPress: (category: Category) => void;
}

const CategoryGrid: React.FC<Props> = ({ onCategoryPress }) => (
  <View style={styles.grid}>
    {CATEGORIES.map((cat) => (
      <TouchableOpacity
        key={cat.id}
        style={styles.tile}
        onPress={() => onCategoryPress(cat)}
        activeOpacity={0.85}
      >
        <Image
          source={{ uri: cat.image }}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0.3 }}
          end={{ x: 0, y: 1 }}
        />
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{cat.label}</Text>
          <View style={styles.accent} />
          <Text style={styles.count}>{cat.productCount} products</Text>
        </View>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  tile: {
    width: TILE_W,
    height: TILE_W * 1.4,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  labelContainer: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    right: Spacing.sm,
  },
  label: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  accent: {
    width: 30,
    height: 2,
    backgroundColor: Colors.primaryGold,
    marginVertical: 4,
  },
  count: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
});

export default CategoryGrid;
