import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import Filter from "./Filter";

function TaskList() {
  const { tasks, priorityFilter, statusFilter, sortOrder } = useSelector(
    (state) => state.tasks
  );

  const filteredTasks = tasks.filter((task) => {
    let priorityMatch =
      priorityFilter === "all" || task.priority === priorityFilter;
    let statusMatch =
      statusFilter === "all" ||
      (statusFilter === "completed" ? task.completed : !task.completed);
    return priorityMatch && statusMatch;
  });

  if (sortOrder === "newest") {
    filteredTasks.reverse();
  }
  return (
    <>
      <Filter />
      <div className="p-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => <Task key={task.id} task={task} />)
        )}
      </div>
    </>
  );
}

export default TaskList;
