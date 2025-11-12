import React from "react";

function Navbar({ selectedTab, setSelectedTab }) {
  const tabs = ["Tasks", "Habits", "Mood", "Calendar"];

  return (
    <nav style={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setSelectedTab(tab)}
          style={{
            ...styles.button,
            ...(selectedTab === tab ? styles.activeButton : {}),
          }}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#f1f1f1",
    padding: "10px 0",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#e0e0e0",
  },
  activeButton: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
};

export default Navbar;
