import React from "react";
import TasksTab from "./TasksTab";
import WeekOverview from "./WeekOverview";
import DayOverview from "./DayOverview";
import Header from "./Header";

function Dashboard({
  setSelectedTab,
  events,
  setEventModal,
  habits = [],
  toggleHabitCompletion,
  moods = {},
  setMood
}) {
  const boxStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  };

  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

  // today's date key
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const moodOptions = ["😁", "🙂", "😐", "😢", "☹️", "🤪", "😡", "😎"]
  const currentMood = moods[todayKey] || "";

  return React.createElement(
    "div",
    { style: { display: "flex", flexDirection: "column", height: "100%", gap: "20px" } },
    [
      React.createElement(Header, { key: "header" }),

      React.createElement(
        "div",
        {
          key: "content",
          style: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
            gap: "20px",
            padding: "20px"
          }
        },
        [

          // WEEK OVERVIEW
          React.createElement(
            "div",
            { key: "week", style: { flex: 1, minHeight: "50%", ...boxStyle } },
            [
              React.createElement("h2", { key: "h1" }, "Week Overview"),
              React.createElement(WeekOverview, {
                key: "weekComponent",
                events,
                onEventClick: handleEventClick
              })
            ]
          ),

          // WIDGET GRID
          React.createElement(
            "div",
            {
              key: "widgets",
              style: {
                flex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px",
                minHeight: "50%"
              }
            },
            [

              // DAY OVERVIEW
              React.createElement(DayOverview, {
                key: "dayOverview",
                events,
                onEventClick: handleEventClick
              }),

              // ---------------------------
              // HABITS WIDGET (FIXED)
              // ---------------------------
              React.createElement(
                "div",
                { key: "habits", style: boxStyle },
                [
                  React.createElement("h2", { key: "hh" }, "Habits"),

                  habits.length === 0
                    ? React.createElement("p", { key: "none" }, "No habits yet")
                    : habits.map(h =>
                        React.createElement(
                          "label",
                          {
                            key: h.id,
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              cursor: "pointer",
                              padding: "4px 0"
                            }
                          },
                          [
                            // FIX: checkbox now calls toggleHabitCompletion
                            React.createElement("input", {
                              key: "cb" + h.id,
                              type: "checkbox",
                              checked: h.lastCompleted === todayKey,
                              onChange: (e) =>
                                toggleHabitCompletion(h.id, e.target.checked)
                            }),
                            React.createElement("span", { key: "sn" + h.id }, h.name),
                            React.createElement(
                              "span",
                              {
                                key: "sk" + h.id,
                                style: {
                                  marginLeft: "auto",
                                  fontSize: "0.9em",
                                  color: "#666"
                                }
                              },
                              "Streak: " + (h.streak || 0)
                            )
                          ]
                        )
                      )
                ]
              ),

              // ---------------------------
              // MOOD WIDGET
              // ---------------------------
              React.createElement(
                "div",
                { key: "mood", style: boxStyle },
                [
                  React.createElement("h2", { key: "mm" }, "Mood"),

                  React.createElement(
                    "div",
                    {
                      key: "moodBtns",
                      style: {
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap"
                      }
                    },
                    moodOptions.map(m =>
                      React.createElement(
                        "button",
                        {
                          key: "btn" + m,
                          onClick: () =>
                            setMood(
                              todayKey,
                              currentMood === m ? "" : m
                            ),
                          style: {
                            fontSize: "20px",
                            padding: "6px 8px",
                            cursor: "pointer",
                            borderRadius: "8px",
                            border:
                              currentMood === m
                                ? "2px solid #4CAF50"
                                : "1px solid #ccc",
                            background:
                              currentMood === m ? "#e8f5e9" : "white"
                          }
                        },
                        m
                      )
                    )
                  ),

                  React.createElement(
                    "div",
                    { key: "cm", style: { marginTop: "10px" } },
                    currentMood
                      ? "Today's mood: " + currentMood
                      : "No mood selected"
                  )
                ]
              ),

              // TO-DO WIDGET
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
