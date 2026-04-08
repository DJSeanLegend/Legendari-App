import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ShopStackParamList } from '../types/navigation';
import ShopScreen from '../screens/shop/ShopScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const Stack = createNativeStackNavigator<ShopStackParamList>();

const ShopStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Shop" component={ShopScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

export default ShopStack;
