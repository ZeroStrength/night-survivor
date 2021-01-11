import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function SettingsScreen() {
  return (
    <View>
      <Text>Settings here ..</Text>
      <Text>Night Survivor 2021</Text>
      <Text>Changyun Lee</Text>
    </View>
  );
}

export default function Settings() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Night Survivor > Settings' }}
      />
    </Stack.Navigator>
  );
}