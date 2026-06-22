import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types/navigation';
import HomeStack from './HomeStack';
import ShopStack from './ShopStack';
import CartScreen from '../screens/cart/CartScreen';
import FavoritesScreen from '../screens/favorites/FavoritesScreen';
import ProfileStack from './ProfileStack';
import { useCartContext } from '../context/CartContext';
import { Colors, FontFamily, FontSize } from '../theme';

const Tab = createBottomTabNavigator<MainTabParamList>();

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  HomeTab:      { active: 'home',          inactive: 'home-outline' },
  ShopTab:      { active: 'grid',          inactive: 'grid-outline' },
  CartTab:      { active: 'bag',           inactive: 'bag-outline' },
  FavoritesTab: { active: 'heart',         inactive: 'heart-outline' },
  ProfileTab:   { active: 'person-circle', inactive: 'person-circle-outline' },
};

const CartTabIcon = ({ focused }: { focused: boolean }) => {
  const { itemCount } = useCartContext();
  return (
    <View style={styles.iconWrap}>
      <Ionicons
        name={focused ? 'bag' : 'bag-outline'}
        size={24}
        color={focused ? Colors.primaryGold : Colors.textDisabled}
      />
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
      tabBarIcon: ({ focused }) => {
        if (route.name === 'CartTab') return <CartTabIcon focused={focused} />;
        const icons = TAB_ICONS[route.name];
        return (
          <Ionicons
            name={focused ? icons.active : icons.inactive}
            size={24}
            color={focused ? Colors.primaryGold : Colors.textDisabled}
          />
        );
      },
    })}
  >
    <Tab.Screen name="HomeTab"      component={HomeStack} />
    <Tab.Screen name="ShopTab"      component={ShopStack} />
    <Tab.Screen name="CartTab"      component={CartScreen} />
    <Tab.Screen name="FavoritesTab" component={FavoritesScreen} />
    <Tab.Screen name="ProfileTab"   component={ProfileStack} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.richBlack,
    borderTopWidth: 1,
    borderTopColor: 'rgba(201,168,76,0.4)',
    height: 64,
    paddingBottom: 8,
    paddingTop: 8,
  },
  iconWrap: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -9,
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
