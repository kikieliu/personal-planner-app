import React from "react";

function Navbar({ selectedTab, setSelectedTab, onAddEvent }) {
  const tabs = ["Dashboard", "Habits", "Mood", "Calendar"];

  return React.createElement(
    "nav",
    {
      style: {
        width: "200px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        backgroundColor: "#f1f1f1",
        padding: "20px 10px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        borderRight: "1px solid #ccc",
      },
    },
    [
      ...tabs.map((tab) =>
        React.createElement(
          "button",
          {
            key: tab,
            onClick: () => setSelectedTab(tab),
            style: {
              padding: "12px",
              textAlign: "left",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              backgroundColor: selectedTab === tab ? "#4CAF50" : "#e0e0e0",
              color: selectedTab === tab ? "white" : "black",
            },
          },
          tab
        )
      ),
      React.createElement(
        "button",
        {
          key: "addEvent",
          onClick: onAddEvent,
          style: {
            marginTop: "20px",
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
          },
        },
        "Add Event"
      ),
    ]
  );
}

export default Navbar;
