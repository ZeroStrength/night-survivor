import * as React from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EditorScreen from './components/Editor';

const Stack = createStackNavigator();

function TodoScreen() {
  return (
    <>
      <View>
        <TextInput placeholder="Title:" />
      </View>
      <EditorScreen />
      <Button title="Save" />
    </>
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