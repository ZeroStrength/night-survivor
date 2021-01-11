import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function TodoScreen() {
  return (
    <View>
      <Text>HTML Editor here ..</Text>
    </View>
  );
}

export default function Todo() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToDo"
        component={TodoScreen}
        options={{ title: 'Night Survivor > ToDo' }}
      />
    </Stack.Navigator>
  );
}