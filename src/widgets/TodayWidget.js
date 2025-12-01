import React from "react";

function TodayWidget() {
  const today = new Date();
  const todayString = today.toLocaleDateString("default", { weekday: "long", month: "long", day: "numeric" });

  const boxStyle = {
    backgroundColor: "#dcceff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "16px",
  };

  return React.createElement("div", { style: boxStyle }, `Today is ${todayString}!`);
}

export default TodayWidget;
