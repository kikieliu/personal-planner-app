import React, { useState, useEffect } from "react";
import '../styles/ToDoWidget.css';

function ToDoWidget() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    const task = { id: Date.now(), name: trimmed, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleToggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return React.createElement(
    "div",
    { className: "tasks-tab", key: "todo-widget" },
    [
      React.createElement("h2", { key: "title" }, "To-Do List"),

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
            onKeyDown: (e) => e.key === "Enter" && handleAddTask(),
          }),
          React.createElement(
            "button",
            { key: "button", onClick: handleAddTask },
            "Add"
          ),
        ]
      ),

      React.createElement(
        "ul",
        { className: "task-list", key: "list" },
        tasks.map((task) =>
          React.createElement(
            "li",
            { key: task.id, className: "task-item" },
            [
              React.createElement("input", {
                key: "checkbox",
                type: "checkbox",
                checked: task.completed,
                onChange: () => handleToggleTask(task.id),
              }),
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
