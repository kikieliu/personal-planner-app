import React from "react";
import '../styles/DayOverview.css';

function DayOverview({ events = [], onEventClick }) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const todaysEvents = events.filter(ev => ev.date === todayKey);

  return React.createElement(
    "div",
    { className: "day-overview" },  // Removed background/padding
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
                React.createElement("span", { key: "name", className: "event-name" }, ev.name),
                React.createElement("span", { key: "time", className: "event-time" }, ev.time)
              ]
            )
          )
    ]
  );
}

export default DayOverview;
