import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { ThemeContext } from './ThemeContext';

const Task = ({ task, onIncrement, onUpdateText, onReset, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const { theme } = useContext(ThemeContext);

  const handleIncrement = () => {
    setEditing(false);
    onIncrement(task.id, task.count + 1);
  };

  const handleTextUpdate = () => {
    setEditing(false);
    onUpdateText(task.id, text);
  };

  const handleLongPress = () => {
    Alert.alert(
      'Task Options',
      'Choose an option',
      [
        { text: 'Reset', onPress: () => onReset(task.id) },
        { text: 'Delete', onPress: () => onDelete(task.id), style: 'destructive' },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={[styles.taskContainer, theme.container]}>
      {editing ? (
        <TextInput
          style={[styles.taskTextInput, { color: theme.text.color, borderColor: theme.text.color }]}
          value={text}
          onChangeText={setText}
          onBlur={handleTextUpdate}
          autoFocus
        />
      ) : (
        <TouchableOpacity
          style={styles.taskTextContainer}
          onPress={() => setEditing(true)}
          onLongPress={handleLongPress}
        >
          <Text style={[styles.taskText, theme.text]}>{text}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.counterContainer}>
        <Text style={[styles.counterText, theme.text]}>{task.count}</Text>
        <TouchableOpacity style={styles.tickButton} onPress={handleIncrement}>
          <Text style={styles.tickButtonText}>✓</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  taskText: {
    fontSize: 16
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  counterText: {
    fontSize: 16,
    marginRight: 10
  },
  tickButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5
  },
  tickButtonText: {
    color: "white",
    fontSize: 16
  },
  taskTextInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  taskTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Task;
