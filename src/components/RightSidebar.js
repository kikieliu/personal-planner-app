// components/RightSidebar.js
import React from "react";

export default function RightSidebar() {
  return React.createElement(
    "div",
    {
      style: {
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        padding: "10px",
      },
    },
    [
      React.createElement(
        "button",
        {
          key: "calendar",
          style: {
            fontSize: "24px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
          },
        },
        "📅"
      ),

      React.createElement(
        "button",
        {
          key: "mood",
          style: {
            fontSize: "24px",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
          },
        },
        "❤️"
      ),

      React.createElement(
        "button",
        {
          key: "add",
          style: {
            fontSize: "30px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "12px",
            padding: "10px",
            cursor: "pointer",
          },
        },
        "+"
      ),
    ]
  );
}
