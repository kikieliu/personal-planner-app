import React from "react";

// Navbar component: side navigation for switching tabs and adding events
function Navbar({ selectedTab, setSelectedTab, onAddEvent }) {
  // List of main tabs in the app
  const tabs = ["Dashboard", "Calendar", "Habits", "Mood"];

  return React.createElement(
    "nav",
    {
      // Inline styles for fixed sidebar
      style: {
        width: "200px",           // fixed width
        height: "100vh",          // full viewport height
        position: "fixed",        // stay fixed on screen
        left: 0,                  // align left
        top: 0,                   // align top
        backgroundColor: "#f1f1f1",
        padding: "20px 10px",
        display: "flex",          // flex layout
        flexDirection: "column",  // stack buttons vertically
        gap: "10px",              // spacing between buttons
        borderRight: "1px solid #ccc", // subtle divider
      },
    },
    [
      // Render a button for each tab
      ...tabs.map((tab) =>
        React.createElement(
          "button",
          {
            key: tab,              // unique key for React
            onClick: () => setSelectedTab(tab), // switch tab on click
            style: {
              padding: "12px",
              textAlign: "left",
              borderRadius: "6px",
              cursor: "pointer",
              border: "none",
              fontSize: "16px",
              // Highlight currently selected tab
              backgroundColor: selectedTab === tab ? "#dcceff" : "white",
              color: selectedTab === tab ? "white" : "black",
            },
          },
          tab // button label
        )
      ),

      // Add Event button at the bottom of the sidebar
      React.createElement(
        "button",
        {
          key: "addEvent",
          onClick: onAddEvent, // callback to open event modal
          style: {
            marginTop: "20px",   // space from tabs
            padding: "12px",
            borderRadius: "6px",
            backgroundColor: "#dcceff",
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
