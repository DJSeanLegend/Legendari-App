import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OrderHistoryScreen from '../screens/profile/OrderHistoryScreen';
import AboutScreen from '../screens/profile/AboutScreen';
import NotificationsScreen from '../screens/profile/NotificationsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Profile"       component={ProfileScreen} />
    <Stack.Screen name="OrderHistory"  component={OrderHistoryScreen} />
    <Stack.Screen name="About"         component={AboutScreen} />
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

export default ProfileStack;
