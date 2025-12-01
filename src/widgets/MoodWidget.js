import React from "react";
import "../styles/MoodWidget.css";

export default function MoodWidget({ moods = {}, setMood }) {
  const todayKey = new Date().toISOString().split("T")[0];
  const moodOptions = ["😁", "🙂", "😐", "😢", "☹️", "🤪", "😡", "😎"];
  const currentMood = moods[todayKey] || "";

  return React.createElement(
    "div",
    { className: "mood-widget" },
    [
      React.createElement("h2", { key: "title" }, "Mood"),
      React.createElement(
        "div",
        { key: "moodRow", className: "mood-row" },
        moodOptions.map(m =>
          React.createElement(
            "button",
            {
              key: m,
              onClick: () => typeof setMood === "function" && setMood(todayKey, currentMood === m ? "" : m),
              className: currentMood === m ? "mood-btn selected" : "mood-btn"
            },
            m
          )
        )
      ),
      React.createElement("div", { key: "currentMood", className: "current-mood" }, currentMood ? `Today's mood: ${currentMood}` : "No mood set for today")
    ]
  );
}
