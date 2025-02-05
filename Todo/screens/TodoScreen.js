import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TaskList from "../components/TaskList";

const TodoScreen = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            const savedTasks = await AsyncStorage.getItem('tasks');
            if (savedTasks) {
                setTasks(JSON.parse(savedTasks));
            }
        }   catch (error) {
            console.error(error);
        }
    }

    const saveTasks = async (tasks) => {
        try {
          await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        } catch (error) {
          console.error(error);
        }
      };

    const addTask = () => {
        if (newTask.trim()) {
            const newTasks = [...tasks, { id: Date.now(), text: newTask, done: false}];
            setTasks(newTasks)
            saveTasks(newTasks);
            setNewTask("");
        }
    };

    const toggleTask = (taskId) => {
        const newTasks = tasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        );
        setTasks(newTasks);
        saveTasks(newTasks);
      };

      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Add new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Button title="Save" onPress={addTask} />
          <TaskList tasks={tasks} toggleTask={toggleTask} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 30,
      },
      input: {
        height: 40, 
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
      },
    });
    
    export default TodoScreen;



    