import * as React from "react"
import { observer } from "mobx-react"
import { createStackNavigator } from "@react-navigation/stack"
import EditorScreen from "./components/Editor"
import { StyleSheet, Text, View, Modal, Button } from "react-native"
import { FloatingAction } from "react-native-floating-action"
import taskStore from "../stores/taskStore"
import Toast from "react-native-toast-message"

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
      {taskStore.tasks.length === 0 ? (
        <View style={styles.taskList}>
          <Text>- No task -</Text>
        </View>
      ) : (
        taskStore.tasks.map((task, index) => (
          <View style={styles.taskList} key={`${task.title}_${index}`}>
            <Text>{task.title}</Text>
          </View>
        ))
      )}
      <Modal animationType="slide" visible={openEditor}>
        <Button onPress={() => setOpenEditor(false)} title="Close" />
        <EditorScreen
          onSuccess={() => {
            setOpenEditor(false)
            Toast.show({
              text1: "Successfully saved !"
            })
          }}
        />
      </Modal>
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

const TodoObserver = observer(TodoScreen)

export default function Todo() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ToDo"
        component={TodoObserver}
        options={{ title: "Night Survivor > ToDo" }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  taskList: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "white"
  }
})
