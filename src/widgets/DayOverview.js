import React from "react";
import '../styles/DayOverview.css';

// Converts 24-hour time (HH:MM) to 12-hour format with AM/PM
function formatTime(time24) {
  if (!time24) return "";                  // Return empty string if no time
  const [hourStr, minute] = time24.split(":"); // Split into hours and minutes
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";  // Determine AM or PM
  hour = hour % 12 || 12;                 // Convert 0/12 hour to 12-hour format
  return `${hour}:${minute} ${ampm}`;
}

function DayOverview({ events = [], onEventClick }) {
  const today = new Date();                 // Get today's date
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0"); // Month 01-12
  const dd = String(today.getDate()).padStart(2, "0");      // Day 01-31
  const todayKey = `${yyyy}-${mm}-${dd}`;   // Key format matching events' date field

  // Filter events for today and sort: all-day first, then by time
  const todaysEvents = events
    .filter(ev => ev.date === todayKey)
    .sort((a, b) => {
      if (a.allDay && !b.allDay) return -1; // all-day before timed
      if (!a.allDay && b.allDay) return 1;
      if (!a.time) return 1;                 // events with no time go after timed events
      if (!b.time) return -1;
      return a.time.localeCompare(b.time);   // compare times in HH:MM string format
    });

  return React.createElement(
    "div",
    { className: "day-overview" },           // Container div
    [
      // Title of the widget
      React.createElement("h2", { key: "title" }, "Today's Overview"),

      // Render message if no events today
      todaysEvents.length === 0
        ? React.createElement("p", { key: "noEvents", className: "no-events" }, "No events today")
        : todaysEvents.map(ev =>
            // Render each event as a clickable div
            React.createElement(
              "div",
              {
                key: ev.id,
                className: "event",
                onClick: () => onEventClick && onEventClick(ev) // trigger callback if provided
              },
              [
                // Event name: show star if all-day
                React.createElement(
                  "span",
                  { key: "name", className: "event-name" },
                  ev.allDay ? `⭐ ${ev.name}` : ev.name
                ),
                // Event time: empty for all-day events
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