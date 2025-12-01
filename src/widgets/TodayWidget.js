import React from "react";

function TodayWidget() {
  // Get current date
  const today = new Date();

  // Format date as "Weekday, Month Day" (e.g., "Sunday, November 30")
  const todayString = today.toLocaleDateString("default", { 
    weekday: "long", 
    month: "long", 
    day: "numeric" 
  });

  // Inline styles for the widget box
  const boxStyle = {
    backgroundColor: "#dcceff", // light purple background
    padding: "20px",
    borderRadius: "10px",       // rounded corners
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)", // subtle shadow
    textAlign: "center",        // center text
    fontWeight: "bold",
    fontSize: "24px",           // large font for visibility
  };

  // Render the box with today's formatted date
  return React.createElement(
    "div",
    { style: boxStyle },
    `Today is ${todayString}`
  );
}

export default TodayWidget;
