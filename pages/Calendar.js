import _ from "lodash"
import * as React from "react"
import { observer } from "mobx-react"
import {
  Platform,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Button,
  Text,
  View
} from "react-native"
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  LocaleConfig
} from "react-native-calendars"
import { createStackNavigator } from "@react-navigation/stack"
import taskStore from "../stores/taskStore"
import settingsStore from "../stores/settingsStore"
import "../languages/calendars_locales"

const testIDs = require("../testIDs")

const themeColor = "#00AAAF"
const lightThemeColor = "#EBF9F9"

const ITEMS = [
  {
    title: "2021-01-10",
    data: [{ hour: "8", duration: "abc", title: "First Yoga" }]
  },
  {
    title: "2021-01-15",
    data: [
      { hour: "4pm", duration: "1h", title: "Pilates ABC" },
      { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" }
    ]
  },
  {
    title: "2021-01-20",
    data: [
      { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
      { hour: "2pm", duration: "1h", title: "Deep Streches" },
      { hour: "3pm", duration: "1h", title: "Private Yoga" }
    ]
  }
]

const Stack = createStackNavigator()

function HorizontalCalendarList() {
  // const [items, setItems] = React.useState([])
  LocaleConfig.defaultLocale = settingsStore.getLanguage()

  const onDateChanged = (date, updateSource) => {
    console.log("ExpandableCalendarScreen onDateChanged: ", date, updateSource)
  }

  const onMonthChange = (month, updateSource) => {
    console.log("ExpandableCalendarScreen onMonthChange: ", month, updateSource)
  }

  const buttonPressed = () => {}

  const itemPressed = (id) => {
    Alert.alert(id)
  }

  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>일정이 없습니다</Text>
      </View>
    )
  }

  const renderItem = ({ item }) => {
    if (_.isEmpty(item)) {
      return renderEmptyItem()
    }

    return (
      <TouchableOpacity
        onPress={() => itemPressed(item.title)}
        style={styles.item}
        testID={testIDs.agenda.ITEM}
      >
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button color={"grey"} title={"보기"} onPress={buttonPressed} />
        </View>
      </TouchableOpacity>
    )
  }

  const getMarkedDates = () => {
    const marked = {}
    ITEMS.forEach((item) => {
      // NOTE: only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = { marked: true }
      } else {
        marked[item.title] = { disabled: true }
      }
    })
    return marked
  }

  const getTheme = () => {
    const disabledColor = "grey"

    return {
      // arrows
      arrowColor: "black",
      arrowStyle: { padding: 0 },
      // month
      monthTextColor: "black",
      textMonthFontSize: 16,
      textMonthFontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica",
      textMonthFontWeight: "bold",
      // day names
      textSectionTitleColor: "black",
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily:
        Platform.OS === "android" ? "Roboto" : "Helvetica",
      textDayHeaderFontWeight: "normal",
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: Platform.OS === "android" ? "Roboto" : "Helvetica",
      textDayFontWeight: "500",
      textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: "white",
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: "white",
      disabledDotColor: disabledColor,
      dotStyle: { marginTop: -2 }
    }
  }

  return (
    <CalendarProvider
      date={ITEMS[0].title}
      onDateChanged={onDateChanged}
      onMonthChange={onMonthChange}
      showTodayButton
      disabledOpacity={0.6}
      theme={{
        todayButtonTextColor: themeColor
      }}
      todayBottomMargin={16}
    >
      <ExpandableCalendar
        monthFormat={"yyyy.MM"}
        testID={testIDs.expandableCalendar.CONTAINER}
        // horizontal={false}
        // hideArrows
        disablePan
        // hideKnob
        initialPosition={ExpandableCalendar.positions.OPEN}
        calendarStyle={styles.calendar}
        headerStyle={styles.calendar} // for horizontal only
        // disableWeekScroll
        theme={getTheme()}
        disableAllTouchEventsForDisabledDays
        firstDay={0}
        markedDates={getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
        leftArrowImageSource={require("../assets/images/previous.png")}
        rightArrowImageSource={require("../assets/images/next.png")}
      />
      <AgendaList
        sections={ITEMS}
        extraData={{}}
        renderItem={renderItem}
        sectionStyle={styles.section}
      />
    </CalendarProvider>
  )
}

const A = observer(HorizontalCalendarList)

export default function Calendar() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={A}
        options={{ title: "Calendar" }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: lightThemeColor,
    color: "grey",
    textTransform: "capitalize"
  },
  item: {
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    flexDirection: "row"
  },
  itemHourText: {
    color: "black"
  },
  itemDurationText: {
    color: "grey",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: "black",
    marginLeft: 16,
    fontWeight: "bold",
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: "flex-end"
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey"
  },
  emptyItemText: {
    color: "lightgrey",
    fontSize: 14
  }
})
