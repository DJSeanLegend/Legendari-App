import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types/navigation';
import HomeStack from './HomeStack';
import ShopStack from './ShopStack';
import CartScreen from '../screens/cart/CartScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import ProfileStack from './ProfileStack';
import { useCartContext } from '../context/CartContext';
import { Colors, FontFamily, FontSize } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

const tabIcon = (name: string, focused: boolean) => {
  const icons: Record<string, string> = {
    HomeTab: focused ? '⌂' : '⌂',
    ShopTab: focused ? '◈' : '◈',
    CartTab: focused ? '⊞' : '⊞',
    FavoritesTab: focused ? '♥' : '♡',
    ProfileTab: focused ? '◉' : '◎',
  };
  return (
    <Text style={[styles.tabIcon, focused && styles.tabIconActive]}>
      {icons[name] ?? '●'}
    </Text>
  );
};

const CartTabIcon = ({ focused }: { focused: boolean }) => {
  const { itemCount } = useCartContext();
  return (
    <View>
      {tabIcon('CartTab', focused)}
      {itemCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{itemCount > 9 ? '9+' : itemCount}</Text>
        </View>
      )}
    </View>
  );
};

const MainNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: styles.tabBar,
      tabBarIcon: ({ focused }) =>
        route.name === 'CartTab' ? (
          <CartTabIcon focused={focused} />
        ) : (
          tabIcon(route.name, focused)
        ),
    })}
  >
    <Tab.Screen name="HomeTab" component={HomeStack} />
    <Tab.Screen name="ShopTab" component={ShopStack} />
    <Tab.Screen name="CartTab" component={CartScreen} />
    <Tab.Screen name="FavoritesTab" component={FavoritesScreen} />
    <Tab.Screen name="ProfileTab" component={ProfileStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.richBlack,
    borderTopWidth: 1,
    borderTopColor: Colors.primaryGold,
    height: 62,
    paddingBottom: 8,
    paddingTop: 8,
    opacity: 0.98,
  },
  tabIcon: {
    fontSize: 22,
    color: Colors.textDisabled,
  },
  tabIconActive: {
    color: Colors.primaryGold,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: Colors.primaryGold,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: FontFamily.bodySemiBold,
    fontSize: FontSize.xs - 2,
    color: Colors.richBlack,
  },
});

export default MainNavigator;
