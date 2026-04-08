import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthContext } from '../../context/AuthContext';
import LuxuryButton from '../../components/common/LuxuryButton';
import GoldDivider from '../../components/common/GoldDivider';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';
import { ProfileStackParamList } from '../../types/navigation';

type NavProp = NativeStackNavigationProp<ProfileStackParamList>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { user, mockLogin, logout, isLoading } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const menuItems = [
    { icon: '📦', label: 'Order History', onPress: () => navigation.navigate('OrderHistory') },
    { icon: '♡', label: 'My Wishlist', onPress: () => {} },
    { icon: '📍', label: 'Saved Addresses', onPress: () => {} },
    { icon: '💳', label: 'Payment Methods', onPress: () => {} },
    { icon: 'ℹ️', label: 'About Legendari', onPress: () => navigation.navigate('About') },
    { icon: '📩', label: 'Contact Us', onPress: () => {} },
  ];

  if (!user) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Text style={styles.wordmark}>LEGENDARI</Text>
          <Text style={styles.subtitle}>MY ACCOUNT</Text>
        </View>
        <ScrollView contentContainerStyle={styles.loginContent}>
          <Text style={styles.loginTitle}>Sign In</Text>
          <Text style={styles.loginSubtitle}>
            Access your account to manage orders, wishlist, and preferences.
          </Text>
          <GoldDivider />
          <TextInput
            style={styles.input}
            placeholder="Email address"
            placeholderTextColor={Colors.textDisabled}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={Colors.textDisabled}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <LuxuryButton
            label="Sign In"
            onPress={() => mockLogin(email, password)}
            loading={isLoading}
            style={styles.signInBtn}
          />
          <LuxuryButton
            label="Create Account"
            onPress={() => {}}
            variant="outline"
          />
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.wordmark}>LEGENDARI</Text>
        <Text style={styles.subtitle}>MY ACCOUNT</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {user.firstName[0]}{user.lastName[0]}
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.firstName} {user.lastName}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <Text style={styles.memberSince}>
              Member since {new Date(user.memberSince).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </Text>
          </View>
        </View>

        <GoldDivider style={styles.divider} />

        {/* Menu */}
        <View style={styles.menu}>
          {menuItems.map((item, i) => (
            <TouchableOpacity
              key={i}
              style={styles.menuItem}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <GoldDivider style={styles.divider} />

        <View style={styles.logoutSection}>
          <LuxuryButton
            label="Sign Out"
            onPress={logout}
            variant="outline"
          />
        </View>

        <View style={{ height: Spacing['3xl'] }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.richBlack,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  wordmark: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.primaryGold,
    letterSpacing: 8,
  },
  subtitle: {
    fontFamily: FontFamily.displayItalic,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
  },
  loginContent: {
    padding: Spacing.xl,
  },
  loginTitle: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.xl,
    color: Colors.textPrimary,
    letterSpacing: 1,
    marginBottom: Spacing.xs,
  },
  loginSubtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.8,
  },
  input: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 2,
    height: 52,
    paddingHorizontal: Spacing.md,
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  signInBtn: {
    marginBottom: Spacing.sm,
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: Spacing.md,
  },
  forgotText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textDecorationLine: 'underline',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primaryGold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.richBlack,
  },
  userInfo: { flex: 1 },
  userName: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
  },
  userEmail: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  memberSince: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.primaryGold,
    marginTop: 4,
  },
  divider: {
    marginHorizontal: Spacing.lg,
  },
  menu: {
    paddingHorizontal: Spacing.md,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.md,
  },
  menuIcon: {
    fontSize: 18,
    width: 28,
    textAlign: 'center',
  },
  menuLabel: {
    flex: 1,
    fontFamily: FontFamily.body,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  menuChevron: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  logoutSection: {
    padding: Spacing.lg,
  },
});

export default ProfileScreen;
