import 'react-native-gesture-handler';
import React, { useCallback, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import * as Notifications from 'expo-notifications';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import { NotificationsProvider } from './src/context/NotificationsContext';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/theme';

SplashScreen.preventAutoHideAsync();

// Maps notification data.screen → tab name the navigator can jump to
const SCREEN_TO_TAB: Record<string, string> = {
  HomeTab:      'HomeTab',
  ShopTab:      'ShopTab',
  CartTab:      'CartTab',
  FavoritesTab: 'FavoritesTab',
  ProfileTab:   'ProfileTab',
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Cormorant-Regular':  require('./assets/fonts/Cormorant-Regular.ttf'),
          'Cormorant-Bold':     require('./assets/fonts/Cormorant-Bold.ttf'),
          'Cormorant-Italic':   require('./assets/fonts/Cormorant-Italic.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-SemiBold':require('./assets/fonts/Montserrat-SemiBold.ttf'),
        });
      } catch (e) {
        console.warn('Font loading error:', e);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  // Navigate to the right tab when user taps a notification
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((response) => {
      const screen = response.notification.request.content.data?.screen as string | undefined;
      if (screen && SCREEN_TO_TAB[screen] && navigationRef.current) {
        navigationRef.current.navigate(SCREEN_TO_TAB[screen]);
      }
    });
    return () => sub.remove();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <NotificationsProvider>
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
                <NavigationContainer ref={navigationRef}>
                  <View style={styles.root} onLayout={onLayoutRootView}>
                    <StatusBar style="light" backgroundColor={Colors.richBlack} />
                    <RootNavigator />
                  </View>
                </NavigationContainer>
              </FavoritesProvider>
            </CartProvider>
          </AuthProvider>
        </NotificationsProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.richBlack },
});
