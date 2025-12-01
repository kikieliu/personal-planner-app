import React from "react";
import Header from "../widgets/Header";
import DayOverview from "../widgets/DayOverview";
import WeekOverview from "../widgets/WeekOverview";
import ToDoWidget from "../widgets/ToDoWidget";
import HabitWidget from "../widgets/HabitWidget";
import MoodWidget from "../widgets/MoodWidget";
import TodayWidget from "../widgets/TodayWidget";
import "../styles/Dashboard.css";

function Dashboard({ events, setEventModal, habits = [], toggleHabitCompletion, moods = {}, setMood }) {
  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  return React.createElement(
    "div",
    { className: "dashboard-container" },
    [
      React.createElement(Header, { key: "header" }),

      React.createElement(
        "div",
        { className: "dashboard-content", key: "content" },
        [
          React.createElement(
            "div",
            { className: "week-section", key: "week-section" },
            [
              React.createElement("h2", { key: "week-title" }, "Week Overview"),
              React.createElement(WeekOverview, { key: "weekoverview", events, onEventClick: handleEventClick })
            ]
          ),

          React.createElement(
            "div",
            { key: "today-widget-wrapper", style: { margin: "10px 0" } },
            React.createElement(TodayWidget, { key: "today-widget" })
          ),

          React.createElement(
            "div",
            { className: "widgets-row", key: "widgets-row" },
            [
              React.createElement(DayOverview, { key: "day", events, onEventClick: handleEventClick }),
              React.createElement(HabitWidget, { key: "habit", habits, toggleHabitCompletion, todayKey }),
              React.createElement(MoodWidget, { key: "mood", moods, setMood }),
              React.createElement(ToDoWidget, { key: "todo" })
            ]
          )
        ]
      )
    ]
  );
}

export default Dashboard;
