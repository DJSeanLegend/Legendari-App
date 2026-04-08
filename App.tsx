import 'react-native-gesture-handler';
import React, { useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import { AuthProvider } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import RootNavigator from './src/navigation/RootNavigator';
import { Colors } from './src/theme';

// Keep the splash screen visible while fonts load
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = React.useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'Cormorant-Regular': require('./assets/fonts/Cormorant-Regular.ttf'),
          'Cormorant-Bold': require('./assets/fonts/Cormorant-Bold.ttf'),
          'Cormorant-Italic': require('./assets/fonts/Cormorant-Italic.ttf'),
          'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        });
      } catch (e) {
        console.warn('Font loading error:', e);
      } finally {
        setFontsLoaded(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <NavigationContainer>
                <View style={styles.root} onLayout={onLayoutRootView}>
                  <StatusBar style="light" backgroundColor={Colors.richBlack} />
                  <RootNavigator />
                </View>
              </NavigationContainer>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.richBlack,
  },
});
