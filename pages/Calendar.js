import * as React from "react"
import { observer } from "mobx-react"
import { Button, Text, View } from "react-native"
import { CalendarList } from "react-native-calendars"
import { createStackNavigator } from "@react-navigation/stack"
import taskStore from "../stores/taskStore"

const Stack = createStackNavigator()

function HorizontalCalendarList() {
  const [selectedDate, setSelectedDate] = React.useState("2021-01-16")
  const [markedDates, setMarkedDates] = React.useState({})

  const setNewDaySelected = (date) => {
    const markedDate = Object.assign({})
    markedDate[date] = {
      selected: true,
      selectedColor: "#DFA460"
    }
    setSelectedDate(date)
    setMarkedDates(markedDate)
  }

  return (
    <>
      <CalendarList
        markedDates={markedDates}
        current={selectedDate}
        pastScrollRange={24}
        futureScrollRange={24}
        horizontal
        pagingEnabled
        onDayPress={(day) => {
          setNewDaySelected(day.dateString)
        }}
      />
      <Button
        title="Add task test"
        onPress={() => taskStore.addTask({ aa: "good" })}
      />
      <Text>{JSON.stringify(taskStore.tasks)}</Text>
      <Button title="Reset task test" onPress={() => taskStore.removeAll()} />
    </>
  )
}

const A = observer(HorizontalCalendarList)

export default function Calendar() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={A}
        options={{ title: "Night Survivor > Calendar" }}
      />
    </Stack.Navigator>
  )
}
