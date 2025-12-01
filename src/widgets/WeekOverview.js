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

// Returns a PST Date object for today
function getPSTToday() {
  return new Date(new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
}

// Returns a YYYY-MM-DD string in PST
function getPSTKey(date = new Date()) {
  const pst = new Date(date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" }));
  const yyyy = pst.getFullYear();
  const mm = String(pst.getMonth() + 1).padStart(2, "0");
  const dd = String(pst.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function WeekOverview({ events = [], onEventClick }) {
  const today = getPSTToday();
  const todayKey = getPSTKey(today);

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday as start

  const days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    return d;
  });

  return React.createElement(
    "div",
    { className: "week-overview" },
    days.map((date) => {
      const dateKey = getPSTKey(date);

      const dayEvents = events
        .filter((ev) => ev.date === dateKey)
        .sort((a, b) => {
          if (a.allDay && !b.allDay) return -1;
          if (!a.allDay && b.allDay) return 1;
          if (!a.time) return 1;
          if (!b.time) return -1;
          return a.time.localeCompare(b.time);
        });

      const isToday = dateKey === todayKey;

      return React.createElement(
        "div",
        { key: dateKey, className: `week-day${isToday ? " today" : ""}` },
        [
          // Header: weekday left, day number right
          React.createElement(
            "div",
            {
              key: "header",
              className: "week-day-header",
              style: { display: "flex", justifyContent: "space-between", alignItems: "center" }
            },
            [
              React.createElement(
                "div",
                { key: "name", className: "week-day-name" },
                date.toLocaleString("en-US", { timeZone: "America/Los_Angeles", weekday: "short" })
              ),
              React.createElement(
                "div",
                { key: "date", className: "week-day-date" },
                date.toLocaleString("en-US", { timeZone: "America/Los_Angeles", day: "numeric" })
              )
            ]
          ),
          // Events container
          React.createElement(
            "div",
            { key: "events", className: "week-events" },
            dayEvents.length === 0
              ? React.createElement("div", { key: "none", className: "no-events" }, "No events")
              : dayEvents.map((ev) =>
                  React.createElement(HoverEvent, { key: ev.id, ev, onEventClick })
                )
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
      className: "week-event",
      style: {
        backgroundColor: hover ? "#dcceff" : "#fafafa",
        borderRadius: "8px",
        padding: "6px 10px",
        cursor: "pointer",
        transition: "background 0.2s"
      },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: () => onEventClick(ev)
    },
    ev.allDay ? `⭐ ${ev.name}` : `${formatTime(ev.time)} — ${ev.name}`
  );
}
