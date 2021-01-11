import React, { useRef, useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { defaultActions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";

const EditorScreen = ({}) => {
  // const strikethrough = require("./assets/strikethrough.png"); //icon for strikethrough
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState("");

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      // console.log(
      //   "Toolbar click, selected items (insert end callback):",
      //   items
      // );
    });
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
    // you can easily add images from your gallery
    RichText.current?.insertImage(
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png"
    );
  }

  return (
      <>
        <ScrollView style={styles.container}>
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
        <RichToolbar
            style={[styles.richBar]}
            editor={RichText}
            disabled={false}
            iconTint={"black"}
            selectedIconTint={"purple"}
            disabledIconTint={"black"}
            onPressAddImage={onPressAddImage}
            iconSize={25}
            actions={[
            ...defaultActions,
            ]}
        />
    </>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  a: {
    fontWeight: "bold",
    color: "navy",
  },
  div: {
    fontFamily: "monospace",
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  editor: {
    backgroundColor: "black",
  },
  rich: {
    minHeight: 450,
    flex: 1,
  },
  richBar: {
    height: 35,
    backgroundColor: 'transparent',
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  tib: {
    textAlign: "center",
    color: "#515156",
  },
});