import * as React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import EditorScreen from "./components/Editor"
import { FloatingAction } from "react-native-floating-action"
import Favicon from "../assets/favicon.png"

const Stack = createStackNavigator()

const actions = [
  {
    text: "Add task",
    name: "bt_addtask",
    position: 0
  }
]

function TodoScreen() {
  const [openEditor, setOpenEditor] = React.useState(false)
  return (
    <>
      {openEditor && <EditorScreen />}
      {/* floating action button to add task */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === "bt_addtask") {
            setOpenEditor(true)
          }
        }}
      />
    </>
  )
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
