import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Task = ({ task, onIncrement, onUpdateText }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);

  const handleIncrement = () => {
    setEditing(false);
    onIncrement(task.id, task.count + 1);
  };

  const handleTextUpdate = () => {
    setEditing(false);
    onUpdateText(task.id, text);
  };

  return (
    <View style={styles.taskContainer}>
      {editing ? (
        <TextInput
          style={styles.taskTextInput}
          value={text}
          onChangeText={setText}
          onBlur={handleTextUpdate}
          autoFocus
        />
      ) : (
        <TouchableOpacity
          style={styles.taskTextContainer}
          onPress={() => setEditing(true)}
          onLongPress={() => setEditing(true)}
        >
          <Text style={styles.taskText}>{text}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{task.count}</Text>
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
    backgroundColor: "#f2f2f2",
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
    borderColor: 'gray',
    borderRadius: 5,
  },
  taskTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Task
