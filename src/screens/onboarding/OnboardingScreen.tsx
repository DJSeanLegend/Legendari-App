import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { useAuthContext } from '../../context/AuthContext';
import LuxuryButton from '../../components/common/LuxuryButton';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const { width: SCREEN_W, height: SCREEN_H } = Dimensions.get('window');

const OnboardingScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { completeOnboarding } = useAuthContext();

  const logoOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(24);
  const btnOpacity = useSharedValue(0);
  const btnY = useSharedValue(24);

  const logoStyle = useAnimatedStyle(() => ({ opacity: logoOpacity.value }));
  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));
  const btnStyle = useAnimatedStyle(() => ({
    opacity: btnOpacity.value,
    transform: [{ translateY: btnY.value }],
  }));

  useEffect(() => {
    const ease = Easing.out(Easing.quad);
    logoOpacity.value = withTiming(1, { duration: 1000, easing: ease });
    taglineOpacity.value = withDelay(500, withTiming(1, { duration: 800, easing: ease }));
    taglineY.value = withDelay(500, withTiming(0, { duration: 800, easing: ease }));
    btnOpacity.value = withDelay(1100, withTiming(1, { duration: 700, easing: ease }));
    btnY.value = withDelay(1100, withTiming(0, { duration: 700, easing: ease }));
  }, []);

  const handleDiscover = () => {
    completeOnboarding();
  };

  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1597854710053-24a6d3e67d47?w=900&q=80' }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.25)', 'rgba(0,0,0,0.65)', 'rgba(0,0,0,0.96)']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Content */}
      <View style={styles.content}>
        <Animated.View style={[styles.logoArea, logoStyle]}>
          <Text style={styles.wordmark}>LEGENDARI</Text>
          <View style={styles.goldLine} />
        </Animated.View>

        <Animated.View style={[styles.taglineArea, taglineStyle]}>
          <Text style={styles.headline}>Your Crown,{'\n'}Your Legacy.</Text>
          <Text style={styles.subline}>
            Luxury hair &amp; skin care crafted{'\n'}for the exceptionally legendary.
          </Text>
        </Animated.View>

        <Animated.View style={[styles.btnArea, btnStyle]}>
          <LuxuryButton label="Discover Legendari" onPress={handleDiscover} />
          <Text style={styles.skipText} onPress={handleDiscover}>
            Skip
          </Text>
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
    padding: Spacing.xl,
    paddingBottom: Spacing['3xl'],
  },
  logoArea: {
    marginBottom: Spacing.xl,
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.primaryGold,
    letterSpacing: 10,
  },
  goldLine: {
    width: 60,
    height: 2,
    backgroundColor: Colors.primaryGold,
    marginTop: Spacing.sm,
    opacity: 0.6,
  },
  taglineArea: {
    marginBottom: Spacing.xl,
  },
  headline: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.textPrimary,
    lineHeight: FontSize['3xl'] * 1.1,
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  subline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: 1,
    lineHeight: FontSize.md * 1.7,
  },
  btnArea: {},
  skipText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textDisabled,
    textAlign: 'center',
    marginTop: Spacing.md,
    letterSpacing: 1,
  },
});

export default OnboardingScreen;
