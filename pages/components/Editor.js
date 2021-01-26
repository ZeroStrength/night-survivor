import React, { useRef, useState } from "react"
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  Button
} from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import {
  defaultActions,
  RichEditor,
  RichToolbar
} from "react-native-pell-rich-editor"
import Toast from "react-native-toast-message"
import taskStore from "../../stores/taskStore"

const EditorScreen = ({ onSuccess }) => {
  // const strikethrough = require("./assets/strikethrough.png"); //icon for strikethrough
  const RichText = useRef() //reference to the RichEditor component
  const [article, setArticle] = useState("")
  const [text, onChangeText] = useState("")
  const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState("date")
  const [isStart, setIsStart] = useState(true)

  const onChange = (event, input) => {
    setShow(Platform.OS === "ios")
    if (mode === "date" && isStart) {
      setStartDate(input)
    } else if (mode === "date") {
      setEndDate(input)
    } else if (mode === "time" && isStart) {
      setStartTime(input)
    } else if (mode === "time") {
      setEndTime(input)
    }
  }

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const showDatepicker = (isStart) => {
    if (isStart) setDate(startDate)
    else setDate(endDate)

    setIsStart(isStart)
    showMode("date")
  }

  const showTimepicker = (isStart) => {
    if (isStart) setDate(startDate)
    else setDate(endDate)

    setIsStart(isStart)
    showMode("time")
  }

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      // console.log(
      //   "Toolbar click, selected items (insert end callback):",
      //   items
      // );
    })
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    // RichText.current?.insertImage(
    //   "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    // )
    Toast.show({
      text1: "Not available now.."
    })
  }

  function onSave() {
    taskStore.addTask({
      title: text,
      start: startDate,
      end: endDate,
      description: article
    })
    onSuccess()
  }

  return (
    <>
      <View style={styles.datetimeLayout}>
        <View style={{ flex: 0.75 }}>
          <TextInput
            style={styles.titleInput}
            value={text}
            onChangeText={(text) => onChangeText(text)}
            placeholder="Title:"
          />
        </View>
        <View style={{ flex: 0.25 }}>
          <Button title="Save" onPress={onSave} />
        </View>
      </View>
      <View style={styles.datetimeLayout}>
        <View style={{ flex: 0.2 }}>
          <Text>Start</Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Text onPress={() => showDatepicker(true)}>
            {startDate?.toISOString().split("T")[0]}
          </Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Text onPress={() => showTimepicker(true)}>
            {startTime?.toTimeString().split(" ")[0]}
          </Text>
        </View>
      </View>
      <View style={styles.datetimeLayout}>
        <View style={{ flex: 0.2 }}>
          <Text>End</Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Text onPress={() => showDatepicker(false)}>
            {endDate?.toISOString().split("T")[0]}
          </Text>
        </View>
        <View style={{ flex: 0.4 }}>
          <Text onPress={() => showTimepicker(false)}>
            {endTime?.toTimeString().split(" ")[0]}
          </Text>
        </View>
      </View>
      {show && (
        <View>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        </View>
      )}
      <ScrollView style={styles.container}>
        <RichToolbar
          style={[styles.richBar]}
          editor={RichText}
          disabled={false}
          iconTint={"black"}
          selectedIconTint={"purple"}
          disabledIconTint={"black"}
          onPressAddImage={onPressAddImage}
          iconSize={25}
          actions={[...defaultActions]}
        />
        <RichEditor
          disabled={false}
          containerStyle={styles.editor}
          ref={RichText}
          style={styles.rich}
          placeholder={"Task todo here"}
          onChange={(text) => setArticle(text)}
          editorInitializedCallback={editorInitializedCallback}
          onHeightChange={handleHeightChange}
        />
      </ScrollView>
    </>
  )
}

export default EditorScreen

const styles = StyleSheet.create({
  a: {
    fontWeight: "bold",
    color: "navy"
  },
  div: {
    fontFamily: "monospace"
  },
  p: {
    fontSize: 30
  },
  /*******************************/
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
  titleInput: {
    height: 40,
    borderColor: "#aaa",
    backgroundColor: "#fff",
    padding: 10
  },
  editor: {
    backgroundColor: "black"
  },
  rich: {
    minHeight: 350,
    flex: 1
  },
  richBar: {
    height: 35,
    backgroundColor: "transparent"
  },
  text: {
    fontWeight: "bold",
    fontSize: 20
  },
  tib: {
    textAlign: "center",
    color: "#515156"
  },
  datetimeLayout: { flexDirection: "row", margin: 20 }
})
