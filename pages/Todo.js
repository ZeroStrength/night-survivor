import * as React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import EditorScreen from "./components/Editor"

const Stack = createStackNavigator()

function TodoScreen() {
  return <EditorScreen />
}

export default function Todo() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToDo"
        component={TodoScreen}
        options={{ title: "Night Survivor > ToDo" }}
      />
    </Stack.Navigator>
  )
}
