import React from "react";
import "../styles/MoodWidget.css";

function getPSTDateKey(dateObj) {
  // Convert the date to PST using toLocaleString with timezone
  const pst = new Date(
    dateObj.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );

  const yyyy = pst.getFullYear();
  const mm = String(pst.getMonth() + 1).padStart(2, "0");
  const dd = String(pst.getDate()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd}`; // Return as YYYY-MM-DD string
}

export default function MoodWidget({ moods = {}, setMood }) {
  const todayKey = getPSTDateKey(new Date()); // get today's date key in PST
  const moodOptions = ["😁", "🙂", "😐", "😢", "☹️", "🤪", "😡", "😎"]; // available moods
  const currentMood = moods[todayKey] || ""; // today's current mood

  return React.createElement(
    "div",
    { className: "mood-widget" },
    [
      // Widget title
      React.createElement("h2", { key: "title" }, "Mood"),

      // Row of mood buttons
      React.createElement(
        "div",
        { key: "moodRow", className: "mood-row" },
        moodOptions.map((m) =>
          React.createElement(
            "button",
            {
              key: m,
              onClick: () =>
                // Toggle mood: deselect if same as current, else select
                typeof setMood === "function" &&
                setMood(todayKey, currentMood === m ? "" : m),
              className: currentMood === m ? "mood-btn selected" : "mood-btn",
            },
            m // emoji label
          )
        )
      ),

      // Display current mood
      React.createElement(
        "div",
        { key: "currentMood", className: "current-mood" },
        currentMood
          ? `Today's mood: ${currentMood}` // show mood if set
          : "No mood set for today"       // placeholder if none
      ),
    ]
  );
}
