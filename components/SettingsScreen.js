import React, { useContext } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native'; 
import { ThemeContext } from './ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode, theme } = useContext(ThemeContext);

  return (
    <View style={[styles.container, theme.container]}>
      <View style={styles.settingRow}>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#ffffff' : '#000000'}
          trackColor={{ true: '#34c659', false: '#d3d3d3' }}
        />
        <Text style={[styles.settingLabel, theme.text]}>Dark Mode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  settingLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default SettingsScreen;
