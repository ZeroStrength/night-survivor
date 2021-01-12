import * as React from 'react';
import { CalendarList } from 'react-native-calendars';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HorizontalCalendarList = () => {
  const [selectedDate, setSelectedDate] = React.useState('2021-01-16');
  const [markedDates, setMarkedDates] = React.useState({});

  const setNewDaySelected = date => {
    const markedDate = Object.assign({});
    markedDate[date] = {
      selected: true,
      selectedColor: '#DFA460'
    };
    setSelectedDate(date);
    setMarkedDates(markedDate);
  };

  return (
    <CalendarList
      markedDates={markedDates}
      current={selectedDate}
      pastScrollRange={24}
      futureScrollRange={24}
      horizontal
      pagingEnabled
      onDayPress={day => {
        setNewDaySelected(day.dateString);
      }}
    />
  );
};

export default function Calendar() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Calendar"
        component={HorizontalCalendarList}
        options={{ title: 'Night Survivor > Calendar' }}
      />
    </Stack.Navigator>
  );
}