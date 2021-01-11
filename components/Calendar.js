import * as React from 'react';
import { Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function CalendarScreen() {
  return (
    <View>
      <Text>Calendar here ..</Text>
    </View>
  );
}

export default function Calendar() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{ title: 'Night Survivor > Calendar' }}
      />
    </Stack.Navigator>
  );
}