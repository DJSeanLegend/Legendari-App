import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../types/navigation';
import { Colors, FontFamily, FontSize } from '../../theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList>;

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.85);
  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(16);
  const lineWidth = useSharedValue(0);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));

  const lineStyle = useAnimatedStyle(() => ({
    width: lineWidth.value,
  }));

  useEffect(() => {
    // Logo fades in + scales up
    logoOpacity.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.quad) });
    logoScale.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.quad) });
    // Gold line expands
    lineWidth.value = withDelay(600, withTiming(80, { duration: 600 }));
    // Tagline slides up
    taglineOpacity.value = withDelay(800, withTiming(1, { duration: 800 }));
    taglineY.value = withDelay(800, withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) }));

    // Navigate after animation
    const timer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <Animated.View style={[styles.line, lineStyle]} />
        <Animated.Text style={[styles.tagline, taglineStyle]}>
          Luxury Hair &amp; Skin Care
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.trueBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['3xl'],
    color: Colors.primaryGold,
    letterSpacing: 12,
  },
  line: {
    height: 1,
    backgroundColor: Colors.primaryGold,
    marginVertical: 12,
    opacity: 0.6,
  },
  tagline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    letterSpacing: 3,
  },
});

export default SplashScreen;
