import React from "react";
import "../styles/HabitWidget.css";

export default function HabitWidget({ habits = [], toggleHabitCompletion }) {
  const todayKey = new Date().toISOString().split("T")[0];

  return React.createElement(
    "div",
    { className: "habit-widget" },
    [
      React.createElement("h2", { key: "title" }, "Habits"),
      habits.length === 0
        ? React.createElement("p", { key: "noHabits" }, "No habits yet")
        : habits.map(h =>
            React.createElement(
              "label",
              { key: h.id, className: "habit-label" },
              [
                React.createElement("input", {
                  key: "cb" + h.id,
                  type: "checkbox",
                  checked: h.lastCompleted === todayKey,
                  onChange: (e) => toggleHabitCompletion(h.id, e.target.checked)
                }),
                React.createElement("span", { key: "name" + h.id }, h.name),
                React.createElement(
                  "span",
                  { key: "streak" + h.id, className: "habit-streak" },
                  `Streak: ${h.streak || 0}`
                )
              ]
            )
          )
    ]
  );
}
