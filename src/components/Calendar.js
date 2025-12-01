import React, { useState } from "react";
import "../styles/Calendar.css";

// Helper function to convert 24-hour time to 12-hour format with AM/PM
function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

// Main Calendar component
export default function Calendar({ events, setEventModal }) {
  // Current month being displayed
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Get first and last day of the month
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = firstDay.getDay(); // 0 = Sunday, 6 = Saturday

  // Create calendar cells array
  const cells = [];
  // Add blank cells for days before the first of the month
  for (let i = 0; i < startWeekDay; i++) cells.push(null);
  // Add Date objects for each day of the month
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, month, d));

  // Handlers for navigating months
  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // When a day is clicked, open the modal to create a new event
  const handleClickDay = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    setEventModal({
      open: true,
      event: { date: `${yyyy}-${mm}-${dd}`, time: "", name: "", allDay: false }
    });
  };

  // Month names for display
  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return React.createElement(
    "div",
    { className: "calendar-container" },
    [
      // Page title
      React.createElement("h2", { key: "page-title", className: "calendar-page-title" }, "Calendar"),

      // Month navigation header
      React.createElement(
        "div",
        { key: "header", className: "calendar-header" },
        [
          React.createElement("button", { key: "prev", onClick: handlePrevMonth }, "<"),
          React.createElement("h2", { key: "title" }, monthNames[month] + " " + year),
          React.createElement("button", { key: "next", onClick: handleNextMonth }, ">")
        ]
      ),

      // Weekday labels (Sun-Sat)
      React.createElement(
        "div",
        { key: "weekdays", className: "calendar-grid" },
        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((w, i) =>
          React.createElement("div", { key: "w-" + i, className: "calendar-weekday-label" }, w)
        )
      ),

      // Calendar grid cells
      React.createElement(
        "div",
        { key: "grid", className: "calendar-grid" },
        cells.map((date, i) => {
          // Render empty cells for padding
          if (!date) return React.createElement("div", { key: "blank-" + i, className: "calendar-cell-empty" });

          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, "0");
          const dd = String(date.getDate()).padStart(2, "0");
          const dateKey = `${yyyy}-${mm}-${dd}`;

          // Filter and sort events for this day (all-day events first)
          const dayEvents = events
            .filter(ev => ev.date === dateKey)
            .sort((a, b) => {
              if (a.allDay && !b.allDay) return -1;
              if (!a.allDay && b.allDay) return 1;
              if (!a.time) return 1;
              if (!b.time) return -1;
              return a.time.localeCompare(b.time);
            });

          // Render day cell with date and events
          return React.createElement(
            "div",
            {
              key: i,
              className: "calendar-cell",
              onClick: () => handleClickDay(date)
            },
            [
              // Day number at the top
              React.createElement("div", { key: "num", className: "day-number" }, date.getDate()),
              // Render each event inside the day cell
              ...dayEvents.map(ev => React.createElement(HoverEvent, { key: ev.id, ev, setEventModal }))
            ]
          );
        })
      )
    ]
  );
}

// Individual event component with hover effect
function HoverEvent({ ev, setEventModal }) {
  const [hover, setHover] = useState(false);
  return React.createElement(
    "div",
    {
      className: "calendar-event",
      style: { backgroundColor: hover ? "#e0f7fa" : "transparent" },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: e => { 
        e.stopPropagation(); // Prevent opening day modal when clicking event
        setEventModal({ open: true, event: ev }); 
      }
    },
    // Display ⭐ for all-day events, otherwise show time and name
    ev.allDay ? `⭐ ${ev.name}` : `${formatTime(ev.time)} — ${ev.name}`
  );
}