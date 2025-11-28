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

export default function DayOverview({ events = [], onEventClick }) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const todayEvents = events.filter(ev => ev.date === todayKey);

  return React.createElement(
    "div",
    { style:{ border:"1px solid #ddd", borderRadius:"8px", padding:"10px", background:"#fff", display:"flex", flexDirection:"column", gap:"5px" } },
    [
      React.createElement("h2", { key:"title" }, "Day Overview"),
      todayEvents.length === 0
        ? React.createElement("p", { key:"none" }, "No events today")
        : todayEvents.map(ev => React.createElement(HoverEvent, { key: ev.id, ev, onEventClick }))
    ]
  );
}

function HoverEvent({ ev, onEventClick }) {
  const [hover, setHover] = useState(false);
  return React.createElement(
    "p",
    {
      style: { cursor: "pointer", backgroundColor: hover ? "#e0f7fa" : "transparent", padding: "2px 4px", borderRadius: "4px" },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: () => onEventClick && onEventClick(ev)
    },
    ev.allDay ? ev.name : formatTime(ev.time) + " — " + ev.name
  );
}
