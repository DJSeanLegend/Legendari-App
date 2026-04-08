import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Spacing } from '../../theme';

interface Props {
  style?: ViewStyle;
  thickness?: number;
  opacity?: number;
}

const GoldDivider: React.FC<Props> = ({ style, thickness = 1, opacity = 0.25 }) => (
  <View
    style={[
      styles.line,
      { height: thickness, opacity },
      style,
    ]}
  />
);

const styles = StyleSheet.create({
  line: {
    width: '100%',
    backgroundColor: Colors.primaryGold,
    marginVertical: Spacing.md,
  },
});

export default GoldDivider;
