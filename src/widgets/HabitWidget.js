import React from "react";
import "../styles/HabitWidget.css";

export default function HabitWidget({ habits = [], toggleHabitCompletion, todayKey }) {
  return React.createElement(
    "div",
    { className: "habit-widget" },
    [
      React.createElement("h2", { key: "title" }, "Habits"),
      habits.length === 0
        ? React.createElement("p", { key: "noHabits" }, "No habits yet")
        : React.createElement(
            "ul",
            { key: "habit-list", className: "habit-list" },
            habits.map(h =>
              React.createElement(
                "li",
                { key: h.id, className: "habit-item" },
                [
                  React.createElement(
                    "label",
                    { key: "label" + h.id, className: "habit-label" },
                    [
                      React.createElement("input", {
                        key: "cb" + h.id,
                        type: "checkbox",
                        checked: h.lastCompleted === todayKey,
                        onChange: e => toggleHabitCompletion(h.id, e.target.checked)
                      }),
                      React.createElement("span", { key: "name" + h.id }, h.name)
                    ]
                  ),
                  React.createElement(
                    "span",
                    { key: "streak" + h.id, className: "habit-streak" },
                    `🔥 ${h.streak || 0}`
                  )
                ]
              )
            )
          )
    ]
  );
}
