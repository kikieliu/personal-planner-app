import React from "react";
import Header from "../widgets/Header";
import DayOverview from "../widgets/DayOverview";
import WeekOverview from "../widgets/WeekOverview";
import ToDoWidget from "../widgets/ToDoWidget";
import HabitWidget from "../widgets/HabitWidget";
import MoodWidget from "../widgets/MoodWidget";
import TodayWidget from "../widgets/TodayWidget";
import "../styles/Dashboard.css";

// Dashboard component: main container for all widgets on the dashboard
function Dashboard({ events, setEventModal, habits = [], toggleHabitCompletion, moods = {}, setMood }) {
  
  // Handler when an event is clicked: opens the modal with event details
  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

  // Get today's date as a string key "YYYY-MM-DD" for reference (used for habits, events, etc.)
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  return React.createElement(
    "div",
    { className: "dashboard-container" }, // main container
    [
      // Header component at the top
      React.createElement(Header, { key: "header" }),

      // Main content area for widgets
      React.createElement(
        "div",
        { className: "dashboard-content", key: "content" },
        [
          // Week overview section
          React.createElement(
            "div",
            { className: "week-section", key: "week-section" },
            [
              React.createElement("h2", { key: "week-title" }, "Week Overview"),
              // WeekOverview widget shows events for the week
              React.createElement(WeekOverview, { key: "weekoverview", events, onEventClick: handleEventClick })
            ]
          ),

          // TodayWidget section (small summary of today)
          React.createElement(
            "div",
            { key: "today-widget-wrapper", style: { margin: "10px 0" } },
            React.createElement(TodayWidget, { key: "today-widget" })
          ),

          // Row of other widgets: DayOverview, HabitWidget, MoodWidget, ToDoWidget
          React.createElement(
            "div",
            { className: "widgets-row", key: "widgets-row" },
            [
              // Shows today's events in detail
              React.createElement(DayOverview, { key: "day", events, onEventClick: handleEventClick }),
              // Habit tracker widget
              React.createElement(HabitWidget, { key: "habit", habits, toggleHabitCompletion, todayKey }),
              // Mood tracker widget
              React.createElement(MoodWidget, { key: "mood", moods, setMood }),
              // To-do list widget
              React.createElement(ToDoWidget, { key: "todo" })
            ]
          )
        ]
      )
    ]
  );
}

export default Dashboard;
