import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from '../types/navigation';
import { useAuthContext } from '../context/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

const Root = createNativeStackNavigator<RootParamList>();

const RootNavigator: React.FC = () => {
  const { hasSeenOnboarding } = useAuthContext();

  return (
    <Root.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {!hasSeenOnboarding ? (
        <Root.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Root.Screen name="Main" component={MainNavigator} />
      )}
    </Root.Navigator>
  );
};

export default RootNavigator;
