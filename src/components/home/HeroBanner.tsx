import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { PROMOTIONS, Promotion } from '../../data/promotions';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const { width: SCREEN_W } = Dimensions.get('window');
const BANNER_HEIGHT = 480;

interface Props {
  onCtaPress?: (promo: Promotion) => void;
}

const HeroBanner: React.FC<Props> = ({ onCtaPress }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef<FlatList>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % PROMOTIONS.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 4000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / SCREEN_W);
    setActiveIndex(idx);
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={PROMOTIONS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              contentFit="cover"
              transition={400}
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.92)']}
              style={styles.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
            />
            <View style={styles.content}>
              <Text style={styles.headline}>{item.headline}</Text>
              <Text style={styles.subline}>{item.subline}</Text>
              <TouchableOpacity
                style={styles.cta}
                onPress={() => onCtaPress?.(item)}
                activeOpacity={0.8}
              >
                <Text style={styles.ctaText}>{item.cta}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      {/* Dots */}
      <View style={styles.dots}>
        {PROMOTIONS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_W,
    height: BANNER_HEIGHT,
  },
  slide: {
    width: SCREEN_W,
    height: BANNER_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    position: 'absolute',
    bottom: 60,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  headline: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize['2xl'],
    color: Colors.textPrimary,
    letterSpacing: 3,
    lineHeight: FontSize['2xl'] * 1.15,
    marginBottom: Spacing.sm,
  },
  subline: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.md,
    color: Colors.lightGold,
    marginBottom: Spacing.lg,
  },
  cta: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.primaryGold,
    backgroundColor: 'rgba(201,168,76,0.12)',
  },
  ctaText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.primaryGold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  dots: {
    position: 'absolute',
    bottom: 24,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.textDisabled,
  },
  dotActive: {
    backgroundColor: Colors.primaryGold,
    width: 20,
  },
});

export default HeroBanner;
