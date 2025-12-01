import React, { useState, useEffect } from "react";

export default function EventModal({ isOpen, eventData, onClose, onSave, onDelete }) {
  // Local state for the modal inputs
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [allDay, setAllDay] = useState(false);

  // Populate local state whenever eventData changes
  useEffect(() => {
    if (eventData) {
      setName(eventData.name || "");
      setDate(eventData.date || "");
      setTime(eventData.time || "");
      setAllDay(eventData.allDay || false);
    } else {
      // Reset state if no eventData (new event)
      setName(""); 
      setDate(""); 
      setTime(""); 
      setAllDay(false);
    }
  }, [eventData]);

  // Do not render modal if not open
  if (!isOpen) return null;

  // Handle saving the event
  const handleSave = () => {
    if (!name || !date) return; // Require name and date
    onSave({
      id: eventData?.id || Date.now(), // Use existing id or generate new
      name,
      date,
      time: allDay ? "" : time,        // Clear time if all-day
      allDay
    });
    onClose(); // Close modal after saving
  };

  // Handle deleting the event
  const handleDelete = () => {
    if (eventData && eventData.id) {
      onDelete(eventData); // Call delete callback
      onClose();           // Close modal
    }
  };

  // Styles for modal overlay and content
  const modalStyle = {
    position: "fixed",
    top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0,0,0,0.5)", // semi-transparent overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000
  };

  const contentStyle = {
    background: "#dcceff",         // match calendar purple theme
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
        // Modal title changes based on new/edit mode
        React.createElement(
          "h2",
          { key: "title", style: { margin: 0, textAlign: "center" } },
          eventData?.id ? "Edit Event" : "Add Event"
        ),
        // Event name input
        React.createElement("input", {
          key: "name",
          type: "text",
          placeholder: "Event name",
          value: name,
          onChange: e => setName(e.target.value),
          style: inputStyle
        }),
        // Event date input
        React.createElement("input", {
          key: "date",
          type: "date",
          value: date,
          onChange: e => setDate(e.target.value),
          style: inputStyle
        }),
        // All-day checkbox
        React.createElement("label", {
          key: "allDayLabel",
          style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }
        }, [
          React.createElement("input", {
            key: "allDay",
            type: "checkbox",
            checked: allDay,
            onChange: e => setAllDay(e.target.checked)
          }),
          "All-day"
        ]),
        // Time input only if not all-day
        !allDay && React.createElement("input", {
          key: "time",
          type: "time",
          value: time,
          onChange: e => setTime(e.target.value),
          style: inputStyle
        }),
        // Buttons row: Save, Cancel, and Delete (if editing existing event)
        React.createElement("div", {
          key: "buttons",
          style: { display: "flex", justifyContent: "space-between", marginTop: "8px" }
        }, [
          React.createElement("button", {
            key: "save",
            onClick: handleSave,
            style: { ...buttonStyle, background: "#4CAF50", color: "white" }
          }, "Save"),
          React.createElement("button", {
            key: "cancel",
            onClick: onClose,
            style: { ...buttonStyle, background: "#bce2ff", color: "#1a1a1a" }
          }, "Cancel"),
          eventData?.id && React.createElement("button", {
            key: "delete",
            onClick: handleDelete,
            style: { ...buttonStyle, background: "#f44336", color: "white" }
          }, "Delete")
        ])
      ]
    )
  );
}
