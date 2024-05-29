import React, { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider, ThemeContext } from './components/ThemeContext';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Ionicons } from '@expo/vector-icons';


const Stack = createStackNavigator();
const TASK_NAME = "BACKGROUND_NOTIFICATION_TASK";

// Request notification permissions
const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('You need to enable notifications in your settings');
  }
};

// Schedule daily notification
const scheduleDailyNotification = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync(); // Clear any existing notifications

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Check Your Goals",
      body: "Have you continued following your goals?",
    },
    trigger: {
      hour: 23,
      minute: 0,
      repeats: true,
    },
  });
};

// Define background fetch task
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    await scheduleDailyNotification();
    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

// Register background fetch task
const registerBackgroundFetch = async () => {
  return BackgroundFetch.registerTaskAsync(TASK_NAME, {
    minimumInterval: 60 * 60 * 24, // 24 hours
    stopOnTerminate: false,
    startOnBoot: true,
  });
};

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode, theme }) => (
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={MainScreen}
                options={({ navigation }) => ({
                  headerLeft: () => (
                    <TouchableOpacity
                      style={styles.settingsButton}
                      onPress={() => navigation.navigate('Settings')}
                    >
                      <Ionicons
                        name="settings-outline"
                        size={24}
                        color={isDarkMode ? '#ffffff' : '#000000'}
                      />
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>

    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  settingsButton: {
    marginLeft: 10,
  },
});

export default App;
