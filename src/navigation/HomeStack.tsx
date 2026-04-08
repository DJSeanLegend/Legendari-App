import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types/navigation';
import HomeScreen from '../screens/home/HomeScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
  </Stack.Navigator>
);

export default HomeStack;
