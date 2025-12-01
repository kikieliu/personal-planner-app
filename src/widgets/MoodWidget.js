import React from "react";

function MoodWidget({ currentMood, setMood }) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const todayKey = `${yyyy}-${mm}-${dd}`;

  const moodOptions = ["😁", "🙂", "😐", "😢", "☹️", "🤪", "😡", "😎"];

  return React.createElement(
    "div",
    {
      style: {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }
    },
    [
      React.createElement("h2", { key: "title" }, "Mood"),
      React.createElement(
        "div",
        { key: "row", style: { display: "flex", gap: "8px", flexWrap: "wrap" } },
        moodOptions.map(m =>
          React.createElement(
            "button",
            {
              key: "m" + m,
              onClick: () => {
                if (typeof setMood === "function") setMood(todayKey, currentMood === m ? "" : m);
              },
              style: {
                fontSize: "20px",
                padding: "6px 8px",
                borderRadius: "8px",
                border: currentMood === m ? "2px solid #4CAF50" : "1px solid #ccc",
                background: currentMood === m ? "#e8f5e9" : "white",
                cursor: "pointer"
              }
            },
            m
          )
        )
      ),
      React.createElement(
        "div",
        { key: "current", style: { marginTop: "8px", color: "#555" } },
        currentMood ? "Today's mood: " + currentMood : "No mood set for today"
      )
    ]
  );
}

export default MoodWidget;
