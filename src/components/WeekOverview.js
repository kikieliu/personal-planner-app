import React, { useState } from "react";

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function WeekOverview({ events = [], onEventClick }) {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(d.getDate() + i);
    return d;
  });

  return React.createElement(
    "div",
    { style:{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"10px", width:"100%" } },
    days.map(date => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const dateKey = `${yyyy}-${mm}-${dd}`;

      const dayEvents = events.filter(ev => ev.date === dateKey);

      return React.createElement(
        "div",
        { key:dateKey, style:{ border:"1px solid #ccc", borderRadius:"6px", padding:"8px", minHeight:"120px", display:"flex", flexDirection:"column", gap:"4px" } },
        [
          React.createElement("div", { key:"label", style:{ fontWeight:"bold", marginBottom:"6px" } }, date.getDate()),
          dayEvents.length === 0
            ? React.createElement("div", { key:"none", style:{ fontSize:"12px", color:"#888" } }, "No events")
            : dayEvents.map(ev => React.createElement(HoverEvent, { key:ev.id, ev, onEventClick }))
        ]
      );
    })
  );
}

function HoverEvent({ ev, onEventClick }) {
  const [hover, setHover] = useState(false);
  return React.createElement(
    "div",
    {
      style: { fontSize:"12px", cursor:"pointer", backgroundColor: hover ? "#e0f7fa" : "transparent", padding:"2px 4px", borderRadius:"4px" },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: () => onEventClick(ev)
    },
    ev.allDay ? ev.name : formatTime(ev.time) + " — " + ev.name
  );
}
