import React, { useState } from "react";
import "../styles/HabitsPage.css";

export default function HabitsPage({ habits = [], addHabit, editHabit, deleteHabit, toggleHabitCompletion }) {
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const handleAdd = () => {
    const val = (newName || "").trim();
    if (!val) return;
    addHabit(val);
    setNewName("");
  };

  const startEdit = (h) => {
    setEditingId(h.id);
    setEditingName(h.name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const saveEdit = () => {
    if (!editingName.trim()) return;
    editHabit(editingId, { name: editingName.trim() });
    cancelEdit();
  };

  return React.createElement(
    "div",
    { className: "habits-container" },
    [
      React.createElement("h2", { key: "title" }, "Habits"),

      React.createElement(
        "div",
        { key: "add", className: "habit-add-form" },
        [
          React.createElement("input", {
            key: "input",
            value: newName,
            placeholder: "New habit name",
            onChange: (e) => setNewName(e.target.value)
          }),
          React.createElement("button", { key: "addBtn", onClick: handleAdd }, "Add")
        ]
      ),

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
                  React.createElement("input", {
                    key: "cb" + h.id,
                    type: "checkbox",
                    checked: h.lastCompleted === todayKey,
                    onChange: (e) => toggleHabitCompletion(h.id, e.target.checked)
                  }),
                  editingId === h.id
                    ? React.createElement("input", {
                        key: "editInput" + h.id,
                        type: "text",
                        value: editingName,
                        onChange: (e) => setEditingName(e.target.value)
                      })
                    : React.createElement("span", { key: "name" + h.id }, h.name),
                  React.createElement("span", { key: "streak" + h.id, className: "habit-streak" }, `🔥 ${h.streak || 0}`),
                  editingId === h.id
                    ? React.createElement("button", { key: "save" + h.id, onClick: saveEdit }, "Save")
                    : React.createElement("button", { key: "edit" + h.id, onClick: () => startEdit(h) }, "Edit"),
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
