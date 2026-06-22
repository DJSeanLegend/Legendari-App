import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthContext } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationsContext';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const { height: SCREEN_H } = Dimensions.get('window');

const FEATURES = [
  { icon: 'leaf-outline' as const,     label: 'Clean & Vegan' },
  { icon: 'diamond-outline' as const,  label: 'Luxury Grade' },
  { icon: 'trending-up-outline' as const, label: 'Proven Results' },
];

const OnboardingScreen: React.FC = () => {
  const { completeOnboarding } = useAuthContext();
  const { requestPermission, triggerWelcome } = useNotifications();
  const insets = useSafeAreaInsets();

  const handleDiscover = async () => {
    const granted = await requestPermission();
    if (granted) await triggerWelcome();
    completeOnboarding();
  };

  // Animation values
  const bgScale      = useSharedValue(1.08);
  const logoOpacity  = useSharedValue(0);
  const logoY        = useSharedValue(-12);
  const lineWidth    = useSharedValue(0);
  const copyOpacity  = useSharedValue(0);
  const copyY        = useSharedValue(20);
  const pillsOpacity = useSharedValue(0);
  const btnOpacity   = useSharedValue(0);
  const btnY         = useSharedValue(18);

  const bgStyle     = useAnimatedStyle(() => ({ transform: [{ scale: bgScale.value }] }));
  const logoStyle   = useAnimatedStyle(() => ({ opacity: logoOpacity.value, transform: [{ translateY: logoY.value }] }));
  const lineStyle   = useAnimatedStyle(() => ({ width: lineWidth.value }));
  const copyStyle   = useAnimatedStyle(() => ({ opacity: copyOpacity.value, transform: [{ translateY: copyY.value }] }));
  const pillsStyle  = useAnimatedStyle(() => ({ opacity: pillsOpacity.value }));
  const btnStyle    = useAnimatedStyle(() => ({ opacity: btnOpacity.value, transform: [{ translateY: btnY.value }] }));

  const ease = Easing.out(Easing.cubic);

  useEffect(() => {
    bgScale.value     = withTiming(1, { duration: 5000, easing: Easing.out(Easing.quad) });
    logoOpacity.value = withTiming(1, { duration: 900, easing: ease });
    logoY.value       = withTiming(0, { duration: 900, easing: ease });
    lineWidth.value   = withDelay(500, withTiming(70, { duration: 700 }));
    copyOpacity.value = withDelay(700, withTiming(1, { duration: 800, easing: ease }));
    copyY.value       = withDelay(700, withTiming(0, { duration: 800, easing: ease }));
    pillsOpacity.value = withDelay(1100, withTiming(1, { duration: 700 }));
    btnOpacity.value  = withDelay(1300, withTiming(1, { duration: 700, easing: ease }));
    btnY.value        = withDelay(1300, withTiming(0, { duration: 700, easing: ease }));
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated background image */}
      <Animated.View style={[StyleSheet.absoluteFill, bgStyle]}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1597854710053-24a6d3e67d47?w=900&q=80' }}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
        />
      </Animated.View>

      {/* Multi-stop gradient — darker at bottom for text legibility */}
      <LinearGradient
        colors={[
          'rgba(0,0,0,0.1)',
          'rgba(0,0,0,0.3)',
          'rgba(0,0,0,0.72)',
          'rgba(0,0,0,0.97)',
        ]}
        locations={[0, 0.35, 0.65, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Content anchored to bottom */}
      <View style={[styles.content, { paddingBottom: insets.bottom + Spacing.xl }]}>

        {/* Wordmark */}
        <Animated.View style={[styles.logoArea, logoStyle]}>
          <Text style={styles.wordmark}>LEGENDARI</Text>
          <Animated.View style={[styles.goldLine, lineStyle]} />
        </Animated.View>

        {/* Headline copy */}
        <Animated.View style={[styles.copyArea, copyStyle]}>
          <Text style={styles.headline}>
            Your Crown,{'\n'}Your Legacy.
          </Text>
          <Text style={styles.subline}>
            Luxury hair &amp; skin care crafted{'\n'}for the exceptionally legendary.
          </Text>
        </Animated.View>

        {/* Feature pills */}
        <Animated.View style={[styles.pills, pillsStyle]}>
          {FEATURES.map((f) => (
            <View key={f.label} style={styles.pill}>
              <Ionicons name={f.icon} size={12} color={Colors.primaryGold} />
              <Text style={styles.pillText}>{f.label}</Text>
            </View>
          ))}
        </Animated.View>

        {/* CTA */}
        <Animated.View style={btnStyle}>
          <TouchableOpacity
            style={styles.ctaBtn}
            onPress={handleDiscover}
            activeOpacity={0.82}
          >
            <Text style={styles.ctaText}>DISCOVER LEGENDARI</Text>
            <Ionicons name="arrow-forward" size={16} color={Colors.richBlack} style={{ marginLeft: 8 }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipBtn} onPress={handleDiscover} activeOpacity={0.7}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.trueBlack,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Spacing.xl,
  },
  logoArea: {
    marginBottom: Spacing.lg,
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.primaryGold,
    letterSpacing: 10,
  },
  goldLine: {
    height: 2,
    backgroundColor: Colors.primaryGold,
    marginTop: Spacing.sm,
    opacity: 0.55,
  },
  copyArea: {
    marginBottom: Spacing.lg,
  },
  headline: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['3xl'] * 1.08,
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  subline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: 0.5,
    lineHeight: FontSize.md * 1.75,
  },
  pills: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
    flexWrap: 'wrap',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(201,168,76,0.35)',
    backgroundColor: 'rgba(201,168,76,0.08)',
  },
  pillText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.lightGold,
    letterSpacing: 0.5,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryGold,
    height: 54,
    borderRadius: 2,
  },
  ctaText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    color: Colors.richBlack,
    letterSpacing: 2.5,
  },
  skipBtn: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
  },
  skipText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textDisabled,
    letterSpacing: 1,
  },
});

export default OnboardingScreen;
