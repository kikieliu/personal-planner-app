import React, { useState, useEffect } from "react";
import "../styles/MoodPage.css";

function getPSTDateKey(dateObj) {
  const pst = new Date(
    dateObj.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const yyyy = pst.getFullYear();
  const mm = String(pst.getMonth() + 1).padStart(2, "0");
  const dd = String(pst.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function pstDate(year, month, day) {
  const utc = new Date(Date.UTC(year, month, day, 12, 0, 0));
  return new Date(
    utc.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
}

export default function MoodPage({ moods, setMood }) {
  const now = new Date();
  const pstNow = new Date(
    now.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );

  const [year, setYear] = useState(pstNow.getFullYear());
  const [month, setMonth] = useState(pstNow.getMonth());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const moodOptions = ["😁", "🙂", "😐", "😢", "☹️", "🤪", "😡", "😎"];

  const prevMonth = () => {
    if (month === 0) {
      setYear(y => y - 1);
      setMonth(11);
    } else setMonth(month - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear(y => y + 1);
      setMonth(0);
    } else setMonth(month + 1);
  };

  const firstPstDay = pstDate(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarCells = [];
  for (let i = 0; i < firstPstDay; i++) calendarCells.push(null);

  for (let d = 1; d <= daysInMonth; d++) {
    const pstObj = pstDate(year, month, d);
    const key = getPSTDateKey(pstObj);
    calendarCells.push({ day: d, dateStr: key, mood: moods[key] || "" });
  }

  const openModal = (dateStr) => {
    setSelectedDate(dateStr);
    setModalOpen(true);
  };

  const handleMoodSelect = (emoji) => {
    if (selectedDate) setMood(selectedDate, emoji);
    setModalOpen(false);
    setSelectedDate(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedDate(null);
  };

  useEffect(() => {
    for (const key in moods) {
      const [y, m] = key.split("-").map(Number);
      if (y && m) {
        const monthIndex = m - 1;
        if (y !== year || monthIndex !== month) {
          setYear(y);
          setMonth(monthIndex);
        }
        break;
      }
    }
  }, [moods]);

  return React.createElement(
    "div",
    { className: "mood-calendar-container" },
    [
      React.createElement("h2", { key: "title", className: "mood-page-title" }, "Mood Calendar"),

      React.createElement(
        "div",
        { key: "header", className: "mood-calendar-header" },
        [
          React.createElement("button", { key: "p", onClick: prevMonth }, "<"),
          React.createElement(
            "h3",
            { key: "m", className: "mood-month-title" },
            pstDate(year, month, 1).toLocaleString("default", { month: "long", year: "numeric" })
          ),
          React.createElement("button", { key: "n", onClick: nextMonth }, ">")
        ]
      ),

      React.createElement(
        "div",
        { key: "grid", className: "mood-calendar-grid" },
        [
          ...["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((w,i) =>
            React.createElement("div", { key: "w"+i, className: "mood-weekday-label" }, w)
          ),
          ...calendarCells.map((cell,i) => {
            if (!cell) return React.createElement("div", { key: "e"+i, className: "mood-cell-empty" });

            return React.createElement(
              "div",
              {
                key: "d"+i,
                className: "mood-cell",
                onClick: () => openModal(cell.dateStr)
              },
              [
                React.createElement("div", { key: "num", className: "mood-day-number" }, cell.day),
                React.createElement("div", { key: "emo", className: "mood-emoji" }, cell.mood)
              ]
            );
          })
        ]
      ),

      modalOpen && React.createElement(
        "div",
        { key: "modal", className: "mood-modal-overlay", onClick: closeModal },
        React.createElement(
          "div",
          { className: "mood-modal-content", onClick: e => e.stopPropagation() },
          [
            React.createElement("h3", { key: "mt" }, "Select Mood"),
            React.createElement(
              "div",
              { key: "opts", className: "mood-modal-options" },
              moodOptions.map(emo =>
                React.createElement(
                  "button",
                  { key: emo, className: "mood-option-btn", onClick: () => handleMoodSelect(emo) },
                  emo
                )
              )
            ),
            React.createElement("button", { key: "c", className: "mood-modal-close", onClick: closeModal }, "Cancel")
          ]
        )
      )
    ]
  );
}
