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

export default function Calendar({ events, setEventModal }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startWeekDay = firstDay.getDay();

  const cells = [];
  for (let i = 0; i < startWeekDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));

  const handlePrevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleClickDay = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    setEventModal({ open: true, event: { date: `${yyyy}-${mm}-${dd}`, time: "", name: "", allDay: false } });
  };

  const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return React.createElement(
    "div",
    { style:{ display:"flex", flexDirection:"column", gap:"10px", width:"100%" } },
    [
      React.createElement(
        "div",
        { key:"header", style:{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" } },
        [
          React.createElement("button", { key:"prev", onClick:handlePrevMonth, style:{padding:"5px 10px"} }, "<"),
          React.createElement("h2", { key:"title" }, monthNames[month] + " " + year),
          React.createElement("button", { key:"next", onClick:handleNextMonth, style:{padding:"5px 10px"} }, ">")
        ]
      ),
      React.createElement(
        "div",
        { key:"grid", style:{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"5px" } },
        cells.map((date, i) => {
          if (!date) return React.createElement("div", { key:i, style:{ padding:"10px" } }, null);

          const yyyy = date.getFullYear();
          const mm = String(date.getMonth() + 1).padStart(2, "0");
          const dd = String(date.getDate()).padStart(2, "0");
          const dateKey = `${yyyy}-${mm}-${dd}`;

          const dayEvents = events.filter(ev => ev.date === dateKey);

          return React.createElement(
            "div",
            {
              key:i,
              style:{ border:"1px solid #ccc", borderRadius:"6px", minHeight:"80px", padding:"5px", display:"flex", flexDirection:"column", gap:"2px", cursor:"pointer" },
              onClick:() => handleClickDay(date)
            },
            [
              React.createElement("div", { key:"num", style:{ fontWeight:"bold" } }, date.getDate()),
              ...dayEvents.map(ev => React.createElement(HoverEvent, { key:ev.id, ev, setEventModal }))
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
      style: { fontSize:"12px", cursor:"pointer", backgroundColor: hover ? "#e0f7fa" : "transparent", padding:"2px 4px", borderRadius:"4px" },
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      onClick: e => { e.stopPropagation(); setEventModal({ open:true, event:ev }); }
    },
    ev.allDay ? ev.name : formatTime(ev.time) + " — " + ev.name
  );
}
