import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import * as Notifications from 'expo-notifications';
import {
  registerForPushNotifications,
  setupAndroidChannel,
  scheduleWelcomeNotification,
  scheduleCartReminder,
  cancelNotification,
  scheduleRoutineReminder,
  cancelAllNotifications,
  sendPromoNotification,
} from '../services/notifications';

interface NotificationsContextType {
  expoPushToken: string | null;
  permissionGranted: boolean;
  cartReminderId: string | null;
  routineEnabled: boolean;
  routineHour: number;
  routineMinute: number;
  requestPermission: () => Promise<boolean>;
  triggerWelcome: () => Promise<void>;
  startCartReminder: () => Promise<void>;
  clearCartReminder: () => Promise<void>;
  setRoutineReminder: (hour: number, minute: number) => Promise<void>;
  disableRoutineReminder: () => Promise<void>;
  sendPromo: (title: string, body: string) => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expoPushToken, setExpoPushToken]   = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [cartReminderId, setCartReminderId] = useState<string | null>(null);
  const [routineEnabled, setRoutineEnabled] = useState(false);
  const [routineHour, setRoutineHour]       = useState(8);
  const [routineMinute, setRoutineMinute]   = useState(0);

  const notificationListener = useRef<Notifications.EventSubscription | null>(null);
  const responseListener     = useRef<Notifications.EventSubscription | null>(null);

  useEffect(() => {
    setupAndroidChannel();

    // Listen for notifications received while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('[Notifications] Received:', notification.request.content.title);
      }
    );

    // Listen for user tapping a notification
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const screen = response.notification.request.content.data?.screen as string | undefined;
        console.log('[Notifications] Tapped → navigate to:', screen ?? 'Home');
        // Navigation handled in App.tsx via navigationRef
      }
    );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    const token = await registerForPushNotifications();
    const granted = token !== null;
    setPermissionGranted(granted);
    if (token) setExpoPushToken(token);
    return granted;
  }, []);

  const triggerWelcome = useCallback(async () => {
    await scheduleWelcomeNotification();
  }, []);

  const startCartReminder = useCallback(async () => {
    if (cartReminderId) return; // already running
    const id = await scheduleCartReminder();
    setCartReminderId(id);
  }, [cartReminderId]);

  const clearCartReminder = useCallback(async () => {
    if (!cartReminderId) return;
    await cancelNotification(cartReminderId);
    setCartReminderId(null);
  }, [cartReminderId]);

  const setRoutineReminder = useCallback(async (hour: number, minute: number) => {
    // Cancel any existing routine first
    await cancelAllNotifications();
    await scheduleRoutineReminder(hour, minute);
    setRoutineEnabled(true);
    setRoutineHour(hour);
    setRoutineMinute(minute);
  }, []);

  const disableRoutineReminder = useCallback(async () => {
    await cancelAllNotifications();
    setRoutineEnabled(false);
  }, []);

  const sendPromo = useCallback(async (title: string, body: string) => {
    await sendPromoNotification(title, body);
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        expoPushToken,
        permissionGranted,
        cartReminderId,
        routineEnabled,
        routineHour,
        routineMinute,
        requestPermission,
        triggerWelcome,
        startCartReminder,
        clearCartReminder,
        setRoutineReminder,
        disableRoutineReminder,
        sendPromo,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
};
