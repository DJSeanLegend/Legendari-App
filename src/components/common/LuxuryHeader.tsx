import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, FontFamily, FontSize } from '../../theme';

interface Props {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  rightElement?: React.ReactNode;
  transparent?: boolean;
}

const LuxuryHeader: React.FC<Props> = ({
  title,
  showBack = false,
  onBack,
  rightElement,
  transparent = false,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 8 },
        transparent ? styles.transparent : styles.solid,
      ]}
    >
      <StatusBar barStyle="light-content" backgroundColor={Colors.richBlack} />
      <View style={styles.inner}>
        {/* Left */}
        <View style={styles.side}>
          {showBack && onBack && (
            <TouchableOpacity onPress={onBack} hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}>
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Center */}
        <View style={styles.center}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {/* Right */}
        <View style={styles.side}>{rightElement}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  solid: {
    backgroundColor: Colors.richBlack,
  },
  transparent: {
    backgroundColor: Colors.transparent,
    borderBottomWidth: 0,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  side: {
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  backArrow: {
    fontSize: 22,
    color: Colors.primaryGold,
  },
});

export default LuxuryHeader;
