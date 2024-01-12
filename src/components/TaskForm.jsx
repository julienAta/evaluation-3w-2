import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../store/tasksSlice";
import { useNavigate, useParams } from "react-router-dom";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "classic",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id;

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === "") {
      setError("Title cannot be empty");
      return;
    } else {
      setError("");
    }

    if (isEditing) {
      dispatch(updateTask({ ...task, id }));
    } else {
      dispatch(addTask(task));
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {error && <p className="text-red-500">{error}</p>}{" "}
      <input
        type="text"
        name="title"
        value={task.title}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
        placeholder="Description"
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className="border p-2 mb-2 w-full"
      >
        <option value="classic">Classic</option>
        <option value="important">Important</option>
        <option value="urgent">Urgent</option>
        <option value="very-urgent">Very Urgent</option>
      </select>
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        {isEditing ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}

export default TaskForm;
