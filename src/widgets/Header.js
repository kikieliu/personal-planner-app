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
  },
};

export default Header;