import React from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask } from "../store/tasksSlice";

function Task({ task }) {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleToggle = () => {
    dispatch(toggleTask(task.id));
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "important":
        return "text-yellow-500";
      case "urgent":
        return "text-orange-500";
      case "very-urgent":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div className={`p-4 border ${task.completed ? "bg-green-200" : ""}`}>
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p className={`${priorityColor(task.priority)}`}>
        Priority:{" "}
        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
      </p>
      <div>
        <button onClick={handleToggle} className="mr-2">
          {task.completed ? "Mark as Incomplete" : "Mark as Complete"}
        </button>
        <button onClick={handleDelete} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Task;
