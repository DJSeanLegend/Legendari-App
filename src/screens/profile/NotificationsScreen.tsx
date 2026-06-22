import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNotifications } from '../../context/NotificationsContext';
import LuxuryButton from '../../components/common/LuxuryButton';
import GoldDivider from '../../components/common/GoldDivider';
import { Colors, FontFamily, FontSize, Spacing } from '../../theme';

const HOUR_OPTIONS = [7, 8, 9, 20, 21, 22];

const NotificationsScreen: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const {
    permissionGranted,
    requestPermission,
    routineEnabled,
    routineHour,
    setRoutineReminder,
    disableRoutineReminder,
    sendPromo,
  } = useNotifications();

  const [promoEnabled, setPromoEnabled]   = useState(true);
  const [cartEnabled, setCartEnabled]     = useState(true);
  const [selectedHour, setSelectedHour]   = useState(routineHour);
  const [requesting, setRequesting]       = useState(false);

  const handleRequestPermission = async () => {
    setRequesting(true);
    const granted = await requestPermission();
    setRequesting(false);
    if (!granted) {
      Alert.alert(
        'Permission Required',
        'Please enable notifications for Legendari in your device Settings to receive updates.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleRoutineToggle = async (val: boolean) => {
    if (val) {
      await setRoutineReminder(selectedHour, 0);
    } else {
      await disableRoutineReminder();
    }
  };

  const handleHourSelect = async (hour: number) => {
    setSelectedHour(hour);
    if (routineEnabled) {
      await setRoutineReminder(hour, 0);
    }
  };

  const formatHour = (h: number) => {
    const suffix = h >= 12 ? 'PM' : 'AM';
    const display = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${display}:00 ${suffix}`;
  };

  const handleTestNotification = async () => {
    await sendPromo(
      'Legendari — Exclusive Offer 🌟',
      'Up to 30% off our Obsidian Scalp Treatment Oil. Today only.'
    );
    Alert.alert('Sent!', 'A test notification was sent. Check your notification drawer.');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={22} color={Colors.primaryGold} />
        </TouchableOpacity>
        <Text style={styles.title}>NOTIFICATIONS</Text>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* Permission status */}
        {!permissionGranted ? (
          <View style={styles.permissionCard}>
            <Ionicons name="notifications-off-outline" size={36} color={Colors.primaryGold} />
            <Text style={styles.permissionTitle}>Notifications Off</Text>
            <Text style={styles.permissionBody}>
              Enable notifications to get personalised updates, exclusive offers,
              and reminders for your luxury care routine.
            </Text>
            <LuxuryButton
              label={requesting ? 'Requesting…' : 'Enable Notifications'}
              onPress={handleRequestPermission}
              loading={requesting}
              style={{ marginTop: Spacing.md }}
            />
          </View>
        ) : (
          <View style={styles.grantedBanner}>
            <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
            <Text style={styles.grantedText}>Notifications enabled</Text>
          </View>
        )}

        <GoldDivider />

        {/* Notification types */}
        <Text style={styles.sectionLabel}>NOTIFICATION TYPES</Text>

        <SettingRow
          icon="bag-outline"
          title="Bag Reminders"
          subtitle="Reminder when items are left in your bag"
          value={cartEnabled}
          onToggle={setCartEnabled}
          disabled={!permissionGranted}
        />

        <SettingRow
          icon="pricetag-outline"
          title="Promotions & Offers"
          subtitle="Exclusive deals, sales and new collections"
          value={promoEnabled}
          onToggle={setPromoEnabled}
          disabled={!permissionGranted}
        />

        <SettingRow
          icon="sparkles-outline"
          title="Daily Ritual Reminder"
          subtitle="A daily nudge for your skin & hair routine"
          value={routineEnabled}
          onToggle={handleRoutineToggle}
          disabled={!permissionGranted}
        />

        {/* Routine time picker */}
        {routineEnabled && (
          <View style={styles.timePicker}>
            <Text style={styles.timePickerLabel}>REMINDER TIME</Text>
            <View style={styles.timeOptions}>
              {HOUR_OPTIONS.map((h) => (
                <TouchableOpacity
                  key={h}
                  style={[
                    styles.timeOption,
                    selectedHour === h && styles.timeOptionActive,
                  ]}
                  onPress={() => handleHourSelect(h)}
                  activeOpacity={0.75}
                >
                  <Text
                    style={[
                      styles.timeOptionText,
                      selectedHour === h && styles.timeOptionTextActive,
                    ]}
                  >
                    {formatHour(h)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        <GoldDivider />

        {/* Test notification */}
        <View style={styles.testSection}>
          <Text style={styles.sectionLabel}>TESTING</Text>
          <Text style={styles.testDescription}>
            Send a test notification to see how Legendari alerts look on your device.
          </Text>
          <LuxuryButton
            label="Send Test Notification"
            onPress={handleTestNotification}
            variant="outline"
            disabled={!permissionGranted}
            style={{ marginTop: Spacing.sm }}
          />
        </View>

        <View style={{ height: Spacing['3xl'] }} />
      </ScrollView>
    </View>
  );
};

const SettingRow: React.FC<{
  icon: React.ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle: string;
  value: boolean;
  onToggle: (val: boolean) => void;
  disabled?: boolean;
}> = ({ icon, title, subtitle, value, onToggle, disabled }) => (
  <View style={[rowStyles.row, disabled && rowStyles.rowDisabled]}>
    <View style={rowStyles.iconWrap}>
      <Ionicons name={icon} size={20} color={disabled ? Colors.textDisabled : Colors.primaryGold} />
    </View>
    <View style={rowStyles.text}>
      <Text style={[rowStyles.title, disabled && rowStyles.disabledText]}>{title}</Text>
      <Text style={rowStyles.subtitle}>{subtitle}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onToggle}
      disabled={disabled}
      trackColor={{ false: Colors.border, true: Colors.deepGold }}
      thumbColor={value ? Colors.primaryGold : Colors.textDisabled}
    />
  </View>
);

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
  backBtn: { width: 40 },
  title: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
    letterSpacing: 3,
  },
  content: { padding: Spacing.md },
  permissionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.goldBorder,
    padding: Spacing.xl,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  permissionTitle: {
    fontFamily: FontFamily.displayBold,
    fontSize: FontSize.lg,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    letterSpacing: 1,
  },
  permissionBody: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: FontSize.sm * 1.8,
    marginTop: Spacing.sm,
  },
  grantedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    backgroundColor: 'rgba(76,175,80,0.1)',
    borderWidth: 1,
    borderColor: Colors.success,
    borderRadius: 4,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  grantedText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.sm,
    color: Colors.success,
  },
  sectionLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  timePicker: {
    backgroundColor: Colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
  },
  timePickerLabel: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    letterSpacing: 2,
    marginBottom: Spacing.sm,
  },
  timeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  timeOption: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 7,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  timeOptionActive: {
    backgroundColor: Colors.primaryGold,
    borderColor: Colors.primaryGold,
  },
  timeOptionText: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  timeOptionTextActive: {
    color: Colors.richBlack,
    fontFamily: FontFamily.bodySemiBold,
  },
  testSection: { marginBottom: Spacing.md },
  testDescription: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: FontSize.sm * 1.7,
    marginTop: Spacing.xs,
  },
});

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: Spacing.md,
  },
  rowDisabled: { opacity: 0.5 },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1 },
  title: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.base,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: FontFamily.body,
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  disabledText: { color: Colors.textDisabled },
});

export default NotificationsScreen;
