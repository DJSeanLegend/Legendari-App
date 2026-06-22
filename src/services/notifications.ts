import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// ── Handler: how notifications behave while the app is in the foreground ──
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// ── Android notification channel ──
export async function setupAndroidChannel() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('legendari', {
      name: 'Legendari',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#C9A84C',
      sound: 'default',
    });
    await Notifications.setNotificationChannelAsync('legendari-promos', {
      name: 'Promotions & Offers',
      importance: Notifications.AndroidImportance.DEFAULT,
      lightColor: '#C9A84C',
    });
    await Notifications.setNotificationChannelAsync('legendari-reminders', {
      name: 'Reminders',
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

// ── Request permission + return Expo push token ──
export async function registerForPushNotifications(): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('[Notifications] Push tokens only available on physical devices.');
    return null;
  }

  const { status: existing } = await Notifications.getPermissionsAsync();
  let finalStatus = existing;

  if (existing !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('[Notifications] Permission not granted.');
    return null;
  }

  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('[Notifications] Expo push token:', token);
    return token;
  } catch (e) {
    console.log('[Notifications] Failed to get push token:', e);
    return null;
  }
}

// ── Scheduled local notifications ──

/** Fired immediately after onboarding is complete */
export async function scheduleWelcomeNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Welcome to Legendari ✨',
      body: 'Your luxury hair & skin care journey begins now. Explore our collection.',
      data: { screen: 'HomeTab' },
      sound: 'default',
    },
    trigger: { seconds: 3, channelId: 'legendari' },
  });
}

/** Cart reminder — fires 30 min after adding first item if cart not cleared */
export async function scheduleCartReminder(): Promise<string> {
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Your bag is waiting 🛍',
      body: 'You left something legendary behind. Complete your order before it sells out.',
      data: { screen: 'CartTab' },
      sound: 'default',
    },
    trigger: { seconds: 60 * 30, channelId: 'legendari-reminders' }, // 30 min
  });
  return id;
}

/** Cancel a previously scheduled notification (e.g. cart reminder after checkout) */
export async function cancelNotification(id: string) {
  await Notifications.cancelScheduledNotificationAsync(id);
}

/** Weekly new arrivals nudge */
export async function scheduleNewArrivalsReminder() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'New arrivals just dropped 🌟',
      body: 'Legendari has added fresh luxury formulas to the collection. Shop now.',
      data: { screen: 'ShopTab' },
      sound: 'default',
    },
    trigger: {
      weekday: 2, // Monday
      hour: 10,
      minute: 0,
      repeats: true,
      channelId: 'legendari-promos',
    } as Notifications.WeeklyTriggerInput,
  });
}

/** One-time promotional notification (e.g. sale, discount) */
export async function sendPromoNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { screen: 'ShopTab' },
      sound: 'default',
    },
    trigger: { seconds: 1, channelId: 'legendari-promos' },
  });
}

/** Skincare routine reminder — fires daily at set time */
export async function scheduleRoutineReminder(hour: number, minute: number) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Time for your Legendari ritual 💛',
      body: 'Your skin and hair deserve the best — take a moment for your routine.',
      data: { screen: 'HomeTab' },
      sound: 'default',
    },
    trigger: {
      hour,
      minute,
      repeats: true,
      channelId: 'legendari-reminders',
    } as Notifications.DailyTriggerInput,
  });
}

/** Cancel ALL scheduled notifications */
export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/** Get all pending scheduled notifications */
export async function getPendingNotifications() {
  return Notifications.getAllScheduledNotificationsAsync();
}
