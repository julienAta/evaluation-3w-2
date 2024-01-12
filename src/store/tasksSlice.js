import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  priorityFilter: "all",
  statusFilter: "all",
  sortOrder: "newest",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      },
      prepare: ({ title, description, priority }) => ({
        payload: {
          id: nanoid(),
          title,
          description,
          priority,
          completed: false,
        },
      }),
    },
    updateTask: (state, action) => {
      const { id, title, description, priority } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.priority = priority;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      }
    },
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTask,
  setPriorityFilter,
  setStatusFilter,
  setSortOrder,
} = tasksSlice.actions;

export default tasksSlice.reducer;
