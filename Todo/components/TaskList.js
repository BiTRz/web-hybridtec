import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, toggleTask }) => {
    return (
        <FlatList
            data={tasks}
            renderItem={({ item }) => <TaskItem task={item} toggleTask={toggleTask} />}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default TaskList;