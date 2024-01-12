import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setPriorityFilter,
  setStatusFilter,
  setSortOrder,
} from "../store/tasksSlice";

function Filter() {
  const dispatch = useDispatch();
  const { priorityFilter, statusFilter } = useSelector((state) => state.tasks);
  const sortOrder = useSelector((state) => state.tasks.sortOrder);

  const handlePriorityChange = (e) => {
    dispatch(setPriorityFilter(e.target.value));
  };

  const handleStatusChange = (e) => {
    dispatch(setStatusFilter(e.target.value));
  };

  const toggleSortOrder = () => {
    if (sortOrder === "newest") {
      dispatch(setSortOrder("oldest"));
    } else {
      dispatch(setSortOrder("newest"));
    }
  };
  return (
    <div className="flex justify-between p-4">
      <div>
        <label htmlFor="priority-filter" className="mr-2">
          Priority:
        </label>
        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={handlePriorityChange}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="classic">Classic</option>
          <option value="important">Important</option>
          <option value="urgent">Urgent</option>
          <option value="very-urgent">Very Urgent</option>
        </select>
      </div>

      {/* <button onClick={toggleSortOrder} className="border p-2">
        Sort by: {sortOrder === "newest" ? "Oldest" : "Newest"}
      </button> */}

      <div>
        <label htmlFor="status-filter" className="mr-2">
          Status:
        </label>
        <select
          id="status-filter"
          value={statusFilter}
          onChange={handleStatusChange}
          className="border p-2"
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
