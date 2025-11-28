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

  return React.createElement(
    "div",
    { style: { position: "fixed", top:0, left:0, width:"100%", height:"100%", background:"rgba(0,0,0,0.5)", display:"flex", justifyContent:"center", alignItems:"center" } },
    React.createElement(
      "div",
      { style: { background:"white", padding:"20px", borderRadius:"10px", minWidth:"300px", display:"flex", flexDirection:"column", gap:"10px" } },
      [
        React.createElement("h2", { key:"title" }, eventData?.id ? "Edit Event" : "Add Event"),
        React.createElement("input", { key:"name", type:"text", placeholder:"Event name", value:name, onChange:e=>setName(e.target.value) }),
        React.createElement("input", { key:"date", type:"date", value:date, onChange:e=>setDate(e.target.value) }),
        React.createElement("label", { key:"allDayLabel", style:{display:"flex", alignItems:"center", gap:"5px"} },
          [
            React.createElement("input", { key:"allDay", type:"checkbox", checked:allDay, onChange:e=>setAllDay(e.target.checked) }),
            "All-day"
          ]
        ),
        !allDay && React.createElement("input", { key:"time", type:"time", value:time, onChange:e=>setTime(e.target.value) }),
        React.createElement("div", { key:"buttons", style:{display:"flex", justifyContent:"space-between"} }, [
          React.createElement("button", { key:"save", onClick:handleSave, style:{background:"#4CAF50", color:"white", padding:"8px 12px", borderRadius:"6px", border:"none"} }, "Save"),
          React.createElement("button", { key:"cancel", onClick:onClose, style:{background:"#ccc", padding:"8px 12px", borderRadius:"6px", border:"none"} }, "Cancel"),
          eventData?.id && React.createElement("button", { key:"delete", onClick:handleDelete, style:{background:"#f44336", color:"white", padding:"8px 12px", borderRadius:"6px", border:"none"} }, "Delete")
        ])
      ]
    )
  );
}
