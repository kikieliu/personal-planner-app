import React from "react";
import "../styles/MoodWidget.css";

/* --------------------------------------------------------
   Generate date key in PST to avoid UTC shift issues
--------------------------------------------------------- */
function getPSTDateKey(dateObj) {
  const pst = new Date(
    dateObj.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const yyyy = pst.getFullYear();
  const mm = String(pst.getMonth() + 1).padStart(2, "0");
  const dd = String(pst.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function MoodWidget({ moods = {}, setMood }) {
  const todayKey = getPSTDateKey(new Date()); // fixed to PST
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
        moodOptions.map((m) =>
          React.createElement(
            "button",
            {
              key: m,
              onClick: () =>
                typeof setMood === "function" &&
                setMood(todayKey, currentMood === m ? "" : m),
              className: currentMood === m ? "mood-btn selected" : "mood-btn",
            },
            m
          )
        )
      ),

      React.createElement(
        "div",
        { key: "currentMood", className: "current-mood" },
        currentMood
          ? `Today's mood: ${currentMood}`
          : "No mood set for today"
      ),
    ]
  );
}
