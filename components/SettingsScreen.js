import React, { useContext } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native'; // Make sure Text is imported
import { ThemeContext } from './ThemeContext';

const SettingsScreen = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <View style={styles.settingRow}>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          thumbColor={isDarkMode ? '#ffffff' : '#000000'}
          trackColor={{ true: '#000000', false: '#d3d3d3' }}
        />
        <Text style={styles.settingLabel}>Dark Mode</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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