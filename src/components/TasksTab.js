import React, { useState, useEffect } from "react";
import "./TasksTab.css";

function TasksTab() {
  // Initialize tasks from localStorage
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTask, setNewTask] = useState("");

  // Initialize completed count from localStorage
  const [completedCount, setCompletedCount] = useState(() => {
    const saved = localStorage.getItem("completedCount");
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save tasks and completed count whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedCount", completedCount.toString());
  }, [tasks, completedCount]);

  // Add a new task
  const handleAddTask = () => {
    const trimmed = newTask.trim();
    if (!trimmed) return;

    const task = { id: Date.now(), name: trimmed, completed: false };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Mark task as complete with fade
  const handleCompleteTask = (id) => {
    // Mark as completed (triggers CSS fade)
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      )
    );

    // Remove task after fade duration
    setTimeout(() => {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setCompletedCount((count) => count + 1);
    }, 500);
  };

  return (
    <div className="tasks-tab">
      <h2>Tasks</h2>

      {/* Add Task */}
      <div className="add-task">
        <input
          type="text"
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      {/* Task List */}
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleCompleteTask(task.id)}
            />
            <span className="task-name">{task.name}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="tasks-footer">Tasks completed: {completedCount}</div>
    </div>
  );
}

export default TasksTab;
