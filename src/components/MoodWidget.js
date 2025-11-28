import React from "react";

export default function MoodWidget() {
  return React.createElement(
    "div",
    {
      style: {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        background: "#fff",
        textAlign: "center",
      },
    },
    "Mood"
  );
}
