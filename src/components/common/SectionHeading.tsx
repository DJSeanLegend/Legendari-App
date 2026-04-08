import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

interface Props {
  title: string;
  subtitle?: string;
  style?: ViewStyle;
  centered?: boolean;
}

const SectionHeading: React.FC<Props> = ({ title, subtitle, style, centered = false }) => (
  <View style={[styles.container, centered && styles.centered, style]}>
    <Text style={[styles.title, centered && styles.titleCentered]}>{title}</Text>
    <View style={[styles.accent, centered && styles.accentCentered]} />
    {subtitle && <Text style={[styles.subtitle, centered && styles.subtitleCentered]}>{subtitle}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  centered: {
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    letterSpacing: 1,
  },
  titleCentered: {
    textAlign: 'center',
  },
  accent: {
    width: 40,
    height: 2,
    backgroundColor: Colors.primaryGold,
    marginTop: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  accentCentered: {
    alignSelf: 'center',
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
  },
  subtitleCentered: {
    textAlign: 'center',
  },
});

export default SectionHeading;
