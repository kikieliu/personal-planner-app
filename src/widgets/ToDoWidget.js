import React, { useState, useEffect } from "react";
import '../styles/ToDoWidget.css';

function ToDoWidget() {
  // Load tasks from localStorage on first render, or default to empty array
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Track the value of the new task input
  const [newTask, setNewTask] = useState("");

  // Persist tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const handleAddTask = () => {
    const trimmed = newTask.trim(); // ignore empty/whitespace tasks
    if (!trimmed) return;
    const task = { id: Date.now(), name: trimmed, completed: false }; // create task object
    setTasks([...tasks, task]); // add task to state
    setNewTask(""); // clear input
  };

  // Toggle completion status for a task
  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task by ID
  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Render the widget
  return React.createElement(
    "div",
    { className: "tasks-tab", key: "todo-widget" },
    [
      // Widget title
      React.createElement("h2", { key: "title" }, "To-Do List"),

      // Input area for adding new tasks
      React.createElement(
        "div",
        { className: "add-task", key: "add-task" },
        [
          React.createElement("input", {
            key: "input",
            type: "text",
            placeholder: "New task...",
            value: newTask,
            onChange: (e) => setNewTask(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && handleAddTask(), // add on Enter
          }),
          React.createElement(
            "button",
            { key: "button", onClick: handleAddTask },
            "Add"
          ),
        ]
      ),

      // List of tasks
      React.createElement(
        "ul",
        { className: "task-list", key: "list" },
        tasks.map((task) =>
          React.createElement(
            "li",
            { key: task.id, className: "task-item" },
            [
              // Checkbox to toggle completion
              React.createElement("input", {
                key: "checkbox",
                type: "checkbox",
                checked: task.completed,
                onChange: () => handleToggleTask(task.id),
              }),
              // Task name with line-through if completed
              React.createElement(
                "span",
                {
                  className: "task-name",
                  key: "name",
                  style: {
                    textDecoration: task.completed ? "line-through" : "none",
                    color: task.completed ? "#666" : "#000",
                  },
                },
                task.name
              ),
              // Delete button
              React.createElement(
                "button",
                {
                  key: "delete",
                  onClick: () => handleDeleteTask(task.id),
                  style: {
                    marginLeft: "auto",
                    background: "transparent",
                    border: "none",
                    color: "#4b8ccf",
                    cursor: "pointer",
                  },
                },
                "Delete"
              ),
            ]
          )
        )
      ),
    ]
  );
}

export default ToDoWidget;
