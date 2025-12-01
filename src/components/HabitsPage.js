import React, { useState, useEffect } from "react";

/*
 Props expected:
 - habits: array [{id, name, streak, lastCompleted}]
 - addHabit(name)
 - editHabit(id, updates)
 - deleteHabit(id)
 - toggleHabitCompletion(id, checked)
*/

function getTodayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function HabitsPage(props) {
  const { habits = [], addHabit, editHabit, deleteHabit, toggleHabitCompletion } = props;

  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  // Local copy so the page updates immediately even if parent persists
  useEffect(() => {
    // no-op: page reads directly from props.habits
  }, [habits]);

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

  const todayKey = getTodayKey();

  return React.createElement(
    "div",
    { style: { padding: "20px" } },
    [
      React.createElement("h2", { key: "title" }, "Habits"),
      // Add form
      React.createElement(
        "div",
        { key: "add", style: { display: "flex", gap: "8px", marginBottom: "12px" } },
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

      // Habits list
      habits.length === 0
        ? React.createElement("p", { key: "none" }, "No habits yet")
        : React.createElement(
            "ul",
            { key: "list", style: { listStyle: "none", padding: 0 } },
            habits.map(h => React.createElement(
              "li",
              { key: h.id, style: { display: "flex", alignItems: "center", gap: "8px", padding: "6px 0", borderBottom: "1px solid #eee" } },
              [
                // checkbox for today
                React.createElement("input", {
                  key: "cb" + h.id,
                  type: "checkbox",
                  checked: h.lastCompleted === todayKey,
                  onChange: (e) => toggleHabitCompletion(h.id, e.target.checked)
                }),

                // name or edit input
                editingId === h.id
                  ? React.createElement("input", {
                      key: "editInput" + h.id,
                      value: editingName,
                      onChange: (e) => setEditingName(e.target.value)
                    })
                  : React.createElement("span", { key: "name" + h.id, style: { flex: "1 1 auto" } }, h.name),

                // streak
                React.createElement("span", { key: "streak" + h.id, style: { minWidth: 80, textAlign: "right", color: "#666" } }, `Streak: ${h.streak || 0}`),

                // edit / save / cancel
                editingId === h.id
                  ? React.createElement("button", { key: "save" + h.id, onClick: saveEdit }, "Save")
                  : React.createElement("button", { key: "edit" + h.id, onClick: () => startEdit(h) }, "Edit"),

                editingId === h.id
                  ? React.createElement("button", { key: "cancel" + h.id, onClick: cancelEdit }, "Cancel")
                  : React.createElement("button", { key: "del" + h.id, onClick: () => deleteHabit(h.id) }, "Delete")
              ]
            ))
          )
    ]
  );
}
