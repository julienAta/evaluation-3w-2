import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import Filter from "./Filter";

function TaskList() {
  const { tasks, priorityFilter, statusFilter, sortOrder } = useSelector(
    (state) => state.tasks
  );
  let filteredTasks = tasks.filter((task) => {
    let priorityMatch =
      priorityFilter === "all" || task.priority === priorityFilter;

    let statusMatch =
      statusFilter === "all" ||
      (statusFilter === "completed" ? task.completed : !task.completed);

    return priorityMatch && statusMatch;
  });
  if (sortOrder === "oldest") {
    filteredTasks = [...filteredTasks].reverse();
  }
  return (
    <>
      <Filter />

      <div className="p-4">
        {filteredTasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </>
  );
}

export default TaskList;
