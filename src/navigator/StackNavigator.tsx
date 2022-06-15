import React from "react";

import { InicioScreen } from '../screens/InicioScreen';
import { ModelScreen } from "../screens/ModelScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
 {/*        <Stack.Screen name="LoginScreen" component={ LoginScreen } />
        <Stack.Screen name="RegisterScreen" component={ RegisterScreen } /> */}
    </Stack.Navigator>
  );
}

