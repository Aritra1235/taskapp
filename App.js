import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput, Alert, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Task from './components/Task';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      const tasksData = await AsyncStorage.getItem("tasks")
      if (tasksData) {
        setTasks(JSON.parse(tasksData))
      }
    } catch (error) {
      console.log("Error loading tasks:", error)
    }
  }

  const saveTasksToStorage = async updatedTasks => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks))
    } catch (error) {
      console.log("Error saving tasks:", error)
    }
  }

  const addTask = () => {
    if (newTaskText.trim() === '') {
      Alert.alert('Error', 'Please enter a task name');
      return;
    }

    const newTask = { id: Date.now(), text: newTaskText, count: 0 };
    setTasks([...tasks, newTask]);
    saveTasksToStorage([...tasks, newTask]);
    setNewTaskText('');
    setIsAddingTask(false);
  };

  const incrementTaskCount = (taskId, updatedCount) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, count: updatedCount };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const updateTaskText = (taskId, updatedText) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: updatedText };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const resetTaskCount = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, count: 0 };
      }
      return task;
    });
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  return (
    <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {isAddingTask ? (
          <View style={styles.addTaskContainer}>
            <TextInput
              style={styles.addTaskInput}
              value={newTaskText}
              onChangeText={setNewTaskText}
              placeholder="Enter task name"
              autoFocus
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.addButton} onPress={() => setIsAddingTask(true)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        )}
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Task
              task={item}
              onIncrement={incrementTaskCount}
              onUpdateText={updateTaskText}
              onReset={resetTaskCount}
              onDelete={deleteTask}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  // Add styles here
  container: {
    flex: 1,
    padding: 20
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignSelf: "flex-end",
    marginBottom: 10,
    marginTop: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 20
  },
  addTaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  addTaskInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginRight: 10,
  },
})

export default App