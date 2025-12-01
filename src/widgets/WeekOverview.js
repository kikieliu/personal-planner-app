import React, { useState } from "react";
import "../styles/WeekOverview.css";

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
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
    { className: "week-overview" },
    days.map((date) => {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      const dateKey = `${yyyy}-${mm}-${dd}`;

      const dayEvents = events.filter((ev) => ev.date === dateKey);

      return React.createElement(
        "div",
        { key: dateKey, className: "week-day" },
        [
          React.createElement(
            "div",
            { key: "label", className: "week-day-label" },
            date.getDate()
          ),

          dayEvents.length === 0
            ? React.createElement("div", { key: "none", className: "no-events" }, "No events")
            : dayEvents.map((ev) =>
                React.createElement(HoverEvent, { key: ev.id, ev, onEventClick })
              )
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
      className: "event-item",
      style: { backgroundColor: hover ? "#dcceff" : "transparent" },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: () => onEventClick(ev)
    },
    ev.allDay ? ev.name : formatTime(ev.time) + " — " + ev.name
  );
}

