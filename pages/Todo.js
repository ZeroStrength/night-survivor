import * as React from "react"
import { observer } from "mobx-react"
import { createStackNavigator } from "@react-navigation/stack"
import EditorScreen from "./components/Editor"
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  ScrollView,
  TouchableOpacity
} from "react-native"
import { FloatingAction } from "react-native-floating-action"
import taskStore from "../stores/taskStore"
import Toast from "react-native-toast-message"
import HTML from "react-native-render-html"

const Stack = createStackNavigator()

const actions = [
  {
    text: "Add task",
    name: "bt_addtask",
    position: 0
  }
]

function TodoScreen() {
  const [openEditor, setOpenEditor] = React.useState({
    display: false,
    type: ""
  })
  const [note, setNote] = React.useState({})
  return (
    <>
      {taskStore.tasks.length === 0 ? (
        <View style={styles.taskList}>
          <Text>- No task -</Text>
        </View>
      ) : (
        [...taskStore.tasks].reverse().map((task, index) => (
          <TouchableOpacity
            onPress={() => {
              setOpenEditor({ display: true, type: "view" })
              setNote(task)
            }}
            key={`${task.title}_${index}`}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text>{task.title}</Text>
              </View>
              <View style={{ flex: 0.4 }}>
                <Text>{String(task.start)}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))
      )}
      <Modal animationType="slide" visible={openEditor.display}>
        <Button
          onPress={() =>
            setOpenEditor({ ...openEditor, ...{ display: false } })
          }
          title="Close"
        />
        {/* HTML view */}
        {openEditor.type === "view" ? (
          <View>
            <Text>{note.title}</Text>
            <HTML
              source={{
                html: note.description
              }}
            />
          </View>
        ) : (
          <EditorScreen
            onSuccess={() => {
              setOpenEditor({ ...openEditor, ...{ display: false } })
              Toast.show({
                text1: "Successfully saved !"
              })
            }}
          />
        )}
      </Modal>
      {/* floating action button to add task */}
      <FloatingAction
        actions={actions}
        onPressItem={(name) => {
          if (name === "bt_addtask") {
            setOpenEditor({ display: true, type: "edit" })
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
    backgroundColor: "white",
    display: "flex"
  }
})
