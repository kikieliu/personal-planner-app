import React from "react";
import "../styles/HabitWidget.css";

// HabitWidget displays a list of habits with checkboxes and streaks
export default function HabitWidget({ habits = [], toggleHabitCompletion, todayKey }) {
  return React.createElement(
    "div",
    { className: "habit-widget" }, // main container for the widget
    [
      // Widget title
      React.createElement("h2", { key: "title" }, "Habits"),

      // Conditional: if no habits, show a message
      habits.length === 0
        ? React.createElement("p", { key: "noHabits" }, "No habits yet")
        : React.createElement(
            "ul",
            { key: "habit-list", className: "habit-list" }, // list container
            habits.map(h =>
              React.createElement(
                "li",
                { key: h.id, className: "habit-item" }, // each habit item
                [
                  // Label contains checkbox and habit name
                  React.createElement(
                    "label",
                    { key: "label" + h.id, className: "habit-label" },
                    [
                      React.createElement("input", {
                        key: "cb" + h.id,
                        type: "checkbox",
                        // Checkbox is checked if lastCompleted matches today's date
                        checked: h.lastCompleted === todayKey,
                        // Call toggleHabitCompletion when checkbox is clicked
                        onChange: e => toggleHabitCompletion(h.id, e.target.checked)
                      }),
                      // Habit name displayed next to checkbox
                      React.createElement("span", { key: "name" + h.id }, h.name)
                    ]
                  ),
                  // Display the current streak for this habit
                  React.createElement(
                    "span",
                    { key: "streak" + h.id, className: "habit-streak" },
                    `🔥 ${h.streak || 0}` // default to 0 if streak is undefined
                  )
                ]
              )
            )
          )
    ]
  );
}
