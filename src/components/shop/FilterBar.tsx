import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { ProductCategory } from '../../types/product';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

type FilterValue = ProductCategory | 'all';

interface FilterOption {
  value: FilterValue;
  label: string;
}

const OPTIONS: FilterOption[] = [
  { value: 'all', label: 'ALL' },
  { value: 'hair-care', label: 'HAIR CARE' },
  { value: 'skin-care', label: 'SKIN CARE' },
];

interface Props {
  value: FilterValue;
  onChange: (val: FilterValue) => void;
}

const FilterBar: React.FC<Props> = ({ value, onChange }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    style={styles.scroll}
    contentContainerStyle={styles.content}
  >
    {OPTIONS.map((opt) => {
      const active = opt.value === value;
      return (
        <TouchableOpacity
          key={opt.value}
          onPress={() => onChange(opt.value)}
          activeOpacity={0.7}
          style={[styles.pill, active && styles.pillActive]}
        >
          <Text style={[styles.label, active && styles.labelActive]}>{opt.label}</Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  pill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
  },
  pillActive: {
    backgroundColor: Colors.primaryGold,
  },
  label: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    letterSpacing: 1.5,
  },
  labelActive: {
    color: Colors.richBlack,
  },
});

export default FilterBar;
