import React, { useState } from "react";
import "../styles/HabitsPage.css";

// HabitsPage component: allows user to view, add, edit, delete, and mark habits as completed
export default function HabitsPage({ habits = [], addHabit, editHabit, deleteHabit, toggleHabitCompletion }) {
  // State for new habit input
  const [newName, setNewName] = useState("");
  // State for editing habit: currently editing habit's ID
  const [editingId, setEditingId] = useState(null);
  // State for editing habit: input value
  const [editingName, setEditingName] = useState("");

  // Get today's date in "YYYY-MM-DD" format to check completion
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  // Handle adding a new habit
  const handleAdd = () => {
    const val = (newName || "").trim();
    if (!val) return; // prevent empty habits
    addHabit(val); // call prop function to add habit
    setNewName(""); // clear input field
  };

  // Start editing an existing habit
  const startEdit = (h) => {
    setEditingId(h.id);
    setEditingName(h.name);
  };

  // Cancel editing mode
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  // Save edited habit
  const saveEdit = () => {
    if (!editingName.trim()) return; // prevent saving empty name
    editHabit(editingId, { name: editingName.trim() }); // call prop function
    cancelEdit(); // exit edit mode
  };

  return React.createElement(
    "div",
    { className: "habits-container" }, // main container
    [
      // Page title
      React.createElement("h2", { key: "title" }, "Habits"),

      // Add habit form: input + button
      React.createElement(
        "div",
        { key: "add", className: "habit-add-form" },
        [
          React.createElement("input", {
            key: "input",
            value: newName,
            placeholder: "New habit name",
            onChange: (e) => setNewName(e.target.value) // update input state
          }),
          React.createElement("button", { key: "addBtn", onClick: handleAdd }, "Add")
        ]
      ),

      // Render habits list or message if empty
      habits.length === 0
        ? React.createElement("p", { key: "none" }, "No habits yet")
        : React.createElement(
            "ul",
            { key: "list", className: "habits-list" },
            habits.map(h =>
              React.createElement(
                "li",
                { key: h.id, className: "habit-item" },
                [
                  // Checkbox to mark habit completed for today
                  React.createElement("input", {
                    key: "cb" + h.id,
                    type: "checkbox",
                    checked: h.lastCompleted === todayKey, // checked if completed today
                    onChange: (e) => toggleHabitCompletion(h.id, e.target.checked) // call prop function
                  }),
                  // Either edit input or habit name
                  editingId === h.id
                    ? React.createElement("input", {
                        key: "editInput" + h.id,
                        type: "text",
                        value: editingName,
                        onChange: (e) => setEditingName(e.target.value)
                      })
                    : React.createElement("span", { key: "name" + h.id }, h.name),
                  // Display streak
                  React.createElement("span", { key: "streak" + h.id, className: "habit-streak" }, `🔥 ${h.streak || 0}`),
                  // Edit / Save buttons
                  editingId === h.id
                    ? React.createElement("button", { key: "save" + h.id, onClick: saveEdit }, "Save")
                    : React.createElement("button", { key: "edit" + h.id, onClick: () => startEdit(h) }, "Edit"),
                  // Cancel / Delete buttons
                  editingId === h.id
                    ? React.createElement("button", { key: "cancel" + h.id, onClick: cancelEdit }, "Cancel")
                    : React.createElement("button", { key: "del" + h.id, onClick: () => deleteHabit(h.id) }, "Delete")
                ]
              )
            )
          )
    ]
  );
}
