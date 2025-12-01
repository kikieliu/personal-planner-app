import React from "react";
import '../styles/DayOverview.css';

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

function DayOverview({ events = [], onEventClick }) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const todaysEvents = events
    .filter(ev => ev.date === todayKey)
    .sort((a, b) => {
      // all-day events first
      if (a.allDay && !b.allDay) return -1;
      if (!a.allDay && b.allDay) return 1;
      // sort by time
      if (!a.time) return 1;
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);
    });

  return React.createElement(
    "div",
    { className: "day-overview" },
    [
      React.createElement("h2", { key: "title" }, "Today's Overview"),
      todaysEvents.length === 0
        ? React.createElement("p", { key: "noEvents", className: "no-events" }, "No events today")
        : todaysEvents.map(ev =>
            React.createElement(
              "div",
              {
                key: ev.id,
                className: "event",
                onClick: () => onEventClick && onEventClick(ev)
              },
              [
                React.createElement(
                  "span",
                  { key: "name", className: "event-name" },
                  ev.allDay ? `⭐ ${ev.name}` : ev.name
                ),
                React.createElement(
                  "span",
                  { key: "time", className: "event-time" },
                  ev.allDay ? "" : formatTime(ev.time)
                )
              ]
            )
          )
    ]
  );
}

export default DayOverview;
