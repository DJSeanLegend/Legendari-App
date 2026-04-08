import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontFamily, FontSize } from '../../theme';

interface Props {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md';
}

const StarRating: React.FC<Props> = ({ rating, reviewCount, size = 'sm' }) => {
  const starSize = size === 'sm' ? 12 : 16;
  const filled = Math.floor(rating);
  const partial = rating % 1 >= 0.5;

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text
          key={i}
          style={[
            styles.star,
            { fontSize: starSize },
            i <= filled || (i === filled + 1 && partial)
              ? styles.filled
              : styles.empty,
          ]}
        >
          ★
        </Text>
      ))}
      {reviewCount !== undefined && (
        <Text style={[styles.count, size === 'md' && styles.countMd]}>
          {' '}({reviewCount})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  star: { marginRight: 1 },
  filled: { color: Colors.primaryGold },
  empty: { color: Colors.border },
  count: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  countMd: { fontSize: FontSize.sm },
});

export default StarRating;
