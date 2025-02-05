import React from "react";
import {View, Text, TouchableOpacity, StyleSheet} from "react-native";

const TaskItem = ({ task, toggleTask }) => {
    return (
        <TouchableOpacity onPress={() => toggleTask(task.id)}>
            <View style={styles.Item}>
                <Text style={task.done ? styles.done : styles.notDone}>{task.text}</Text>
            </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    taskItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc"
    },
    done: {
        textDecorationLine: "line-through"
    },
    notDone: {
        textDecorationLine: "none"
    }
})

export default TaskItem;