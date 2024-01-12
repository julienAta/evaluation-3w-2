import React from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import Filter from "./Filter";
import { Link } from "react-router-dom";

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
      <div className="p-4">
        {filteredTasks.length === 0 ? (
          <>
            <div className="flex flex-col h-40 items-center ">
              <p className="text-center">No tasks found.</p>
              <Link to="/add" className="mt-8 mx-2 hover:text-blue-200">
                Add your first task
              </Link>
            </div>
          </>
        ) : (
          filteredTasks.map((task) => (
            <>
              <div className="p-4">
                <Filter /> <Task key={task.id} task={task} />
              </div>
            </>
          ))
        )}
      </div>
    </>
  );
}

export default TaskList;
