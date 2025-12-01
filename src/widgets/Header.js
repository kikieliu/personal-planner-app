import React from "react";

// Header component: displays the title of the app at the top
function Header() {
  return (
    <header style={styles.header}>
      <h1>Personal Planner</h1>
    </header>
  );
}

// Styling
const styles = {
  header: {
    padding: "10px",
    backgroundColor: "#dcceff",
    color: "black",
    textAlign: "center",
    borderRadius: "12px",
  },
};

export default Header;
