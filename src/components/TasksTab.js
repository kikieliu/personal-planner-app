// components/TasksTab.js
import React, { useState, useEffect } from "react";
import "./TasksTab.css";

function TasksTab() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");
  const [completedCount, setCompletedCount] = useState(() => {
    const saved = localStorage.getItem("completedCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedCount", completedCount.toString());
  }, [tasks, completedCount]);

  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;
    const task = { id: Date.now(), name: trimmed, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const handleCompleteTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setCompletedCount((count) => count + 1);
    }, 500);
  };

  return React.createElement(
    "div",
    { className: "tasks-tab" },
    [
      // Add task input
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

      // Task list
      React.createElement(
        "ul",
        { className: "task-list", key: "list" },
        tasks.map((task) =>
          React.createElement(
            "li",
            {
              key: task.id,
              className: `task-item ${task.completed ? "completed" : ""}`,
            },
            [
              React.createElement("input", {
                key: "checkbox",
                type: "checkbox",
                checked: task.completed,
                onChange: () => handleCompleteTask(task.id),
              }),
              React.createElement(
                "span",
                { className: "task-name", key: "name" },
                task.name
              ),
            ]
          )
        )
      ),

      // Footer
      React.createElement(
        "div",
        { className: "tasks-footer", key: "footer" },
        "Tasks completed: " + completedCount
      ),
    ]
  );
}

export default TasksTab;
