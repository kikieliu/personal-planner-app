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

  return React.createElement(
    "div",
    { className: "dashboard-container" },
    [
      React.createElement(Header, { key: "header" }),

      React.createElement(
        "div",
        { className: "dashboard-content", key: "content" },
        [
          // Week overview (title inside the widget)
          React.createElement(
            "div",
            { className: "week-section", key: "week-section" },
            [
              React.createElement(WeekOverview, { key: "weekoverview", events, onEventClick: handleEventClick })
            ]
          ),

          // Today widget
          React.createElement(TodayWidget, { key: "today" }),

          // Widgets row — no extra boxes, just flex alignment
          React.createElement(
            "div",
            { className: "widgets-row", key: "widgets-row" },
            [
              React.createElement(DayOverview, { key: "day", events, onEventClick: handleEventClick }),
              React.createElement(HabitWidget, { key: "habit", habits, toggleHabitCompletion }),
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
