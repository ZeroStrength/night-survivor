import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Calendar from './pages/Calendar';
import Todo from './pages/Todo';
import Settings from './pages/Settings';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'ToDo') {
              iconName = focused
                ? 'checkbox'
                : 'checkbox-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-settings' : 'ios-settings-outline';
            } else if (route.name === 'Calendar') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="ToDo" component={Todo} />
        {/* <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarBadge: 3 }} /> */}
        <Tab.Screen name="Calendar" component={Calendar} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}