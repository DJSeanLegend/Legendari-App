import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, FontFamily, FontSize, Spacing, Shadows } from '../../theme';

type Variant = 'primary' | 'outline' | 'ghost';

interface Props {
  label: string;
  onPress: () => void;
  variant?: Variant;
  compact?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
}

const LuxuryButton: React.FC<Props> = ({
  label,
  onPress,
  variant = 'primary',
  compact = false,
  disabled = false,
  loading = false,
  style,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      disabled={isDisabled}
      style={[
        styles.base,
        compact && styles.compact,
        variant === 'primary' && styles.primary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? Colors.richBlack : Colors.primaryGold}
          size="small"
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.labelPrimary,
            variant === 'outline' && styles.labelOutline,
            variant === 'ghost' && styles.labelGhost,
            isDisabled && styles.labelDisabled,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: 52,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  } as ViewStyle,
  compact: {
    width: 'auto',
    paddingHorizontal: Spacing.lg,
    height: 44,
  } as ViewStyle,
  primary: {
    backgroundColor: Colors.primaryGold,
    ...(Shadows.goldGlow as ViewStyle),
  } as ViewStyle,
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
  } as ViewStyle,
  ghost: {
    backgroundColor: Colors.transparent,
  } as ViewStyle,
  disabled: {
    opacity: 0.45,
  } as ViewStyle,
  label: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    letterSpacing: 2,
    textTransform: 'uppercase',
  } as TextStyle,
  labelPrimary: { color: Colors.richBlack } as TextStyle,
  labelOutline: { color: Colors.primaryGold } as TextStyle,
  labelGhost: { color: Colors.textSecondary } as TextStyle,
  labelDisabled: { opacity: 0.6 } as TextStyle,
});

export default LuxuryButton;
