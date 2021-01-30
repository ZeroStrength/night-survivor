import * as React from "react"
import { observer } from "mobx-react"
import { Text, View } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import settingsStore from "../stores/settingsStore"
import styled from "styled-components/native"
import { Picker } from "@react-native-picker/picker"
// import { SwitchToggle } from "dooboo-ui"

const Stack = createStackNavigator()

function SettingsComponent() {
  const [selectedValue, onSelectedValue] = React.useState(
    settingsStore.getLanguage()
  )

  return (
    <>
      <Row>
        <Text>Language ({settingsStore.getLanguage()})</Text>
      </Row>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => {
          onSelectedValue(itemValue)
          settingsStore.setLanguage(itemValue)
        }}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Korean" value="ko" />
      </Picker>
      <Row>
        <Text>Night Survivor 2021. Changyun Lee</Text>
      </Row>
    </>
  )
}

const SettingsScreen = observer(SettingsComponent)

export default function Settings() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Night Survivor > Settings" }}
      />
    </Stack.Navigator>
  )
}

const Row = styled.View`
  margin: 10px;
`
