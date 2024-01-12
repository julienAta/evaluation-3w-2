import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  priorityFilter: "all",
  statusFilter: "all",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Add a new task
    addTask: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
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

    // Update an existing task
    updateTask: (state, action) => {
      const { id, title, description, priority } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
        existingTask.description = description;
        existingTask.priority = priority;
      }
    },

    // Delete a task
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.tasks.splice(index, 1);
      }
    },

    // Toggle the completion status of a task
    toggleTask: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    // Set the priority filter
    setPriorityFilter: (state, action) => {
      state.priorityFilter = action.payload;
    },

    // Set the status filter
    setStatusFilter: (state, action) => {
      state.statusFilter = action.payload;
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
} = tasksSlice.actions;

export default tasksSlice.reducer;
