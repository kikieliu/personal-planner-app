import React, { useState, useEffect } from "react";

export default function EventModal({ isOpen, eventData, onClose, onSave, onDelete }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [allDay, setAllDay] = useState(false);

  useEffect(() => {
    if (eventData) {
      setName(eventData.name || "");
      setDate(eventData.date || "");
      setTime(eventData.time || "");
      setAllDay(eventData.allDay || false);
    } else {
      setName(""); setDate(""); setTime(""); setAllDay(false);
    }
  }, [eventData]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!name || !date) return;
    onSave({ id: eventData?.id || Date.now(), name, date, time: allDay ? "" : time, allDay });
    onClose();
  };

  const handleDelete = () => {
    if (eventData && eventData.id) {
      onDelete(eventData);
      onClose();
    }
  };

  const modalStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const contentStyle = {
    background: "#dcceff", // match calendar purple theme
    padding: "20px",
    borderRadius: "10px",
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
    color: "#1a1a1a",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    width: "100%"
  };

  const buttonStyle = {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "background 0.2s"
  };

  return React.createElement(
    "div",
    { style: modalStyle },
    React.createElement(
      "div",
      { style: contentStyle },
      [
        React.createElement("h2", { key: "title", style: { margin: 0, textAlign: "center" } }, eventData?.id ? "Edit Event" : "Add Event"),
        React.createElement("input", { key: "name", type: "text", placeholder: "Event name", value: name, onChange: e => setName(e.target.value), style: inputStyle }),
        React.createElement("input", { key: "date", type: "date", value: date, onChange: e => setDate(e.target.value), style: inputStyle }),
        React.createElement("label", { key: "allDayLabel", style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" } },
          [
            React.createElement("input", { key: "allDay", type: "checkbox", checked: allDay, onChange: e => setAllDay(e.target.checked) }),
            "All-day"
          ]
        ),
        !allDay && React.createElement("input", { key: "time", type: "time", value: time, onChange: e => setTime(e.target.value), style: inputStyle }),
        React.createElement("div", { key: "buttons", style: { display: "flex", justifyContent: "space-between", marginTop: "8px" } }, [
          React.createElement("button", { key: "save", onClick: handleSave, style: { ...buttonStyle, background: "#4CAF50", color: "white" } }, "Save"),
          React.createElement("button", { key: "cancel", onClick: onClose, style: { ...buttonStyle, background: "#bce2ff", color: "#1a1a1a" } }, "Cancel"),
          eventData?.id && React.createElement("button", { key: "delete", onClick: handleDelete, style: { ...buttonStyle, background: "#f44336", color: "white" } }, "Delete")
        ])
      ]
    )
  );
}
