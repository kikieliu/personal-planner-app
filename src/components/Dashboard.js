import React from "react";
import TasksTab from "./TasksTab";
import WeekOverview from "./WeekOverview";
import DayOverview from "./DayOverview";
import Header from "./Header";

function Dashboard({ setSelectedTab, events, setEventModal }) {
  const boxStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  };

  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

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
              React.createElement(
                "div",
                { key: "habits", style: boxStyle },
                [
                  React.createElement("h2", { key: "hh" }, "Habits"),
                  React.createElement("p", { key: "ha2" }, "☐ 8 hours sleep"),
                  React.createElement("p", { key: "ha3" }, "☐ Read 20 pages")
                ]
              ),
              React.createElement(
                "div",
                { key: "mood", style: boxStyle },
                [
                  React.createElement("h2", { key: "mm" }, "Mood"),
                  React.createElement("p", { key: "m2" }, "🙂 😐 ☹️")
                ]
              ),
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
