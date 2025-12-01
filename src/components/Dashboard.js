import React from "react";
import Header from "../widgets/Header";
import DayOverview from "../widgets/DayOverview";
import WeekOverview from "../widgets/WeekOverview";
import TasksTab from "../widgets/ToDoWidget";
import HabitWidget from "../widgets/HabitWidget";
import MoodWidget from "../widgets/MoodWidget";

function Dashboard({ events, setEventModal, habits = [], toggleHabitCompletion, moods = {}, setMood }) {
  const boxStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

  // Today's date key
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", height: "100%", gap: "20px" } },
    [
      React.createElement(Header, { key: "header" }),
      React.createElement(
        "div",
        { key: "content", style: { display: "flex", flexDirection: "column", flex: 1, gap: "20px", padding: "20px" } },
        [
          React.createElement(
            "div",
            { key: "week", style: { flex: 1, minHeight: "50%", ...boxStyle } },
            [
              React.createElement("h2", { key: "h1" }, "Week Overview"),
              React.createElement(WeekOverview, { key: "weekComponent", events, onEventClick: handleEventClick })
            ]
          ),
          React.createElement(
            "div",
            { key: "widgets", style: { flex: 1, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", minHeight: "50%" } },
            [
              React.createElement(DayOverview, { key: "dayOverview", events, onEventClick: handleEventClick }),
              React.createElement(HabitWidget, { key: "habitWidget", habits, todayKey, toggleHabitCompletion }),
              React.createElement(MoodWidget, { key: "moodWidget", moods, setMood, todayKey }),
              React.createElement(
                "div",
                { key: "todo", style: boxStyle },
                [
                  React.createElement("h2", { key: "t0" }, "To-Do List"),
                  React.createElement(TasksTab, { key: "taskComponent" })
                ]
              )
            ]
          )
        ]
      )
    ]
  );
}

export default Dashboard;
