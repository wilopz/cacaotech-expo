import React from "react";

import { InicioScreen } from '../screens/InicioScreen';
import { ModelScreen } from "../screens/ModelScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RegisterScreen } from "../screens/RegisterScreen";
import { HistoryScreen } from "../screens/HistoryScreen";
import { StorageScreen } from "../screens/StorageScreen";

const Stack = createNativeStackNavigator();

export const StackNavigator =() => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <Stack.Screen name="InicioScreen" component={ InicioScreen } />
        <Stack.Screen name="ModelScreen" component={ ModelScreen } />
        <Stack.Screen name="RegisterScreen" component={ RegisterScreen } />
        <Stack.Screen name="HistoryScreen" component={ HistoryScreen } />
        <Stack.Screen name="StorageScreen" component={ StorageScreen } />
    </Stack.Navigator>
  );
}

