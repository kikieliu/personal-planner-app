import React, { useState } from "react";
import "../styles/Calendar.css";

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function Calendar({ events, setEventModal }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekDay = firstDay.getDay();

  const cells = [];
  for (let i = 0; i < startWeekDay; i++) cells.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) cells.push(new Date(year, month, d));

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleClickDay = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    setEventModal({ open: true, event: { date: `${yyyy}-${mm}-${dd}`, time: "", name: "", allDay: false } });
  };

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  return React.createElement(
    "div",
    { className: "calendar-container" },
    [
      React.createElement("h2", { key: "page-title", className: "calendar-page-title" }, "Calendar"),

      React.createElement(
        "div",
        { key: "header", className: "calendar-header" },
        [
          React.createElement("button", { key: "prev", onClick: handlePrevMonth }, "<"),
          React.createElement("h2", { key: "title" }, monthNames[month] + " " + year),
          React.createElement("button", { key: "next", onClick: handleNextMonth }, ">")
        ]
      ),

      React.createElement(
        "div",
        { key: "weekdays", className: "calendar-grid" },
        ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((w, i) =>
          React.createElement("div", { key: "w-" + i, className: "calendar-weekday-label" }, w)
        )
      ),

      React.createElement(
        "div",
        { key: "grid", className: "calendar-grid" },
        cells.map((date, i) => {
          if (!date) return React.createElement("div", { key: "blank-" + i, className: "calendar-cell-empty" });

          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, "0");
          const dd = String(date.getDate()).padStart(2, "0");
          const dateKey = `${yyyy}-${mm}-${dd}`;

          // Sort: all-day first, then by time
          const dayEvents = events
            .filter(ev => ev.date === dateKey)
            .sort((a, b) => {
              if (a.allDay && !b.allDay) return -1;
              if (!a.allDay && b.allDay) return 1;
              if (!a.time) return 1;
              if (!b.time) return -1;
              return a.time.localeCompare(b.time);
            });

          return React.createElement(
            "div",
            {
              key: i,
              className: "calendar-cell",
              onClick: () => handleClickDay(date)
            },
            [
              React.createElement("div", { key: "num", className: "day-number" }, date.getDate()),
              ...dayEvents.map(ev => React.createElement(HoverEvent, { key: ev.id, ev, setEventModal }))
            ]
          );
        })
      )
    ]
  );
}

function HoverEvent({ ev, setEventModal }) {
  const [hover, setHover] = useState(false);
  return React.createElement(
    "div",
    {
      className: "calendar-event",
      style: { backgroundColor: hover ? "#e0f7fa" : "transparent" },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: e => { e.stopPropagation(); setEventModal({ open: true, event: ev }); }
    },
    ev.allDay ? `⭐ ${ev.name}` : `${formatTime(ev.time)} — ${ev.name}`
  );
}
