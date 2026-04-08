import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import GoldDivider from '../../components/common/GoldDivider';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const PILLARS = [
  { icon: '🌿', title: 'CLEAN', desc: 'No sulfates, parabens, or harmful chemicals' },
  { icon: '🐾', title: 'VEGAN', desc: 'Completely cruelty-free, always' },
  { icon: '✨', title: 'LUXURY', desc: 'Only the finest global ingredients' },
  { icon: '📊', title: 'RESULTS', desc: 'Clinically tested formulas that deliver' },
];

const AboutScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>OUR STORY</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80' }}
            style={styles.heroImage}
            contentFit="cover"
            transition={400}
          />
          <LinearGradient
            colors={['transparent', Colors.richBlack]}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0, y: 1 }}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>LEGENDARI</Text>
            <Text style={styles.heroTagline}>Crafted for the Legendary</Text>
          </View>
        </View>

        <View style={styles.content}>
          {/* Origin Story */}
          <Text style={styles.sectionTitle}>Born from Passion</Text>
          <View style={styles.goldAccent} />
          <Text style={styles.body}>
            Legendari was founded on a simple but powerful belief: every person deserves access to
            truly luxurious hair and skin care that delivers real, visible results. Too often, luxury
            meant choosing between efficacy and ethics — we refuse to accept that compromise.
          </Text>
          <Text style={styles.body}>
            Our founders spent years studying the world's most potent botanical and biotechnological
            ingredients — from Moroccan argan orchards to Korean beauty labs — curating formulas that
            honour both tradition and innovation.
          </Text>

          <GoldDivider />

          {/* Values */}
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.goldAccent} />
          <View style={styles.pillarsGrid}>
            {PILLARS.map((p) => (
              <View key={p.title} style={styles.pillarCard}>
                <Text style={styles.pillarIcon}>{p.icon}</Text>
                <Text style={styles.pillarTitle}>{p.title}</Text>
                <Text style={styles.pillarDesc}>{p.desc}</Text>
              </View>
            ))}
          </View>

          <GoldDivider />

          {/* The Promise */}
          <View style={styles.quoteBox}>
            <Text style={styles.quoteText}>
              "We believe that caring for yourself is the most legendary thing you can do."
            </Text>
            <Text style={styles.quoteAuthor}>— The Legendari Founders</Text>
          </View>

          <GoldDivider />

          {/* Certifications */}
          <Text style={styles.sectionTitle}>Our Commitments</Text>
          <View style={styles.goldAccent} />
          {[
            'Certified Cruelty-Free by PETA',
            'Vegan Society Registered',
            'Dermatologically Tested',
            'Sustainably Sourced Ingredients',
            'Recyclable Packaging',
            'Carbon Neutral Shipping',
          ].map((item) => (
            <View key={item} style={styles.commitmentRow}>
              <Text style={styles.commitmentCheck}>✓</Text>
              <Text style={styles.commitmentText}>{item}</Text>
            </View>
          ))}

          <View style={{ height: Spacing['3xl'] }} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.richBlack },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backIcon: { fontSize: 22, color: Colors.primaryGold, width: 32 },
  title: { fontFamily: FontFamily.displayBold, fontSize: FontSize.md, color: Colors.textPrimary, letterSpacing: 3 },
  heroContainer: { height: 320, position: 'relative' },
  heroImage: { width: '100%', height: '100%' },
  heroOverlay: { position: 'absolute', bottom: Spacing.lg, left: 0, right: 0, alignItems: 'center' },
  heroTitle: { fontFamily: FontFamily.displayBold, fontSize: FontSize['2xl'], color: Colors.primaryGold, letterSpacing: 10 },
  heroTagline: { fontFamily: FontFamily.displayItalic, fontSize: FontSize.md, color: Colors.textSecondary, letterSpacing: 2, marginTop: 4 },
  content: { padding: Spacing.lg },
  sectionTitle: { fontFamily: FontFamily.displayBold, fontSize: FontSize.xl, color: Colors.textPrimary, letterSpacing: 1 },
  goldAccent: { width: 40, height: 2, backgroundColor: Colors.primaryGold, marginTop: 6, marginBottom: Spacing.md },
  body: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
    lineHeight: FontSize.base * 1.9,
    marginBottom: Spacing.md,
  },
  pillarsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  pillarCard: {
    width: '47%',
    backgroundColor: Colors.surface,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    padding: Spacing.md,
    alignItems: 'center',
  },
  pillarIcon: { fontSize: 28, marginBottom: Spacing.xs },
  pillarTitle: { fontFamily: FontFamily.bodySemiBold, fontSize: FontSize.xs, color: Colors.primaryGold, letterSpacing: 2, marginBottom: Spacing.xs },
  pillarDesc: { fontFamily: FontFamily.body, fontSize: FontSize.xs, color: Colors.textSecondary, textAlign: 'center', lineHeight: FontSize.xs * 1.7 },
  quoteBox: {
    backgroundColor: Colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primaryGold,
    padding: Spacing.lg,
    borderRadius: 2,
    marginVertical: Spacing.sm,
  },
  quoteText: { fontFamily: FontFamily.displayItalic, fontSize: FontSize.lg, color: Colors.textPrimary, lineHeight: FontSize.lg * 1.5, marginBottom: Spacing.sm },
  quoteAuthor: { fontFamily: FontFamily.body, fontSize: FontSize.sm, color: Colors.primaryGold },
  commitmentRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm, marginBottom: Spacing.sm },
  commitmentCheck: { fontSize: 14, color: Colors.primaryGold, width: 20 },
  commitmentText: { fontFamily: FontFamily.body, fontSize: FontSize.sm, color: Colors.textSecondary },
});

export default AboutScreen;
