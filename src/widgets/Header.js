import React from "react";

function Header() {
  return (
    <header style={styles.header}>
      <h1>Personal Planner</h1>
    </header>
  );
}

const styles = {
  header: {
    padding: "10px",
    backgroundColor: "#dcceff",
    color: "black",
    textAlign: "center",
    borderRadius: "12px", // added rounded corners
  },
};

export default Header;
