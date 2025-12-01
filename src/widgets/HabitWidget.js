import React from "react";

export default function HabitWidget({ habits = [], todayKey, toggleHabitCompletion }) {
  const boxStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  return React.createElement(
    "div",
    { style: boxStyle },
    [
      React.createElement("h2", { key: "hh" }, "Habits"),
      habits.length === 0
        ? React.createElement("p", { key: "noHabits" }, "No habits yet")
        : habits.map((h) =>
            React.createElement(
              "label",
              {
                key: h.id,
                style: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "4px 0" },
              },
              [
                React.createElement("input", {
                  key: "cb" + h.id,
                  type: "checkbox",
                  checked: h.lastCompleted === todayKey,
                  onChange: (e) => {
                    if (typeof toggleHabitCompletion === "function")
                      toggleHabitCompletion(h.id, e.target.checked);
                  },
                }),
                React.createElement("span", { key: "name" + h.id }, h.name),
                React.createElement(
                  "span",
                  { key: "streak" + h.id, style: { marginLeft: "auto", fontSize: "0.9em", color: "#666" } },
                  `Streak: ${h.streak || 0}`
                ),
              ]
            )
          ),
    ]
  );
}
