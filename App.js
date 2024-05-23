import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import { ThemeProvider, ThemeContext } from './components/ThemeContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ isDarkMode, theme }) => (
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: theme.navigation.backgroundColor,
                },
                headerTintColor: theme.navigation.headerTintColor,
                headerTitleStyle: {
                  color: theme.navigation.headerTitleColor,
                },
              }}
            >
              <Stack.Screen
                name="Tasks"
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
