import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import TasksTab from "./components/TasksTab";

function App() {
  const [selectedTab, setSelectedTab] = useState("Tasks");

  return (
    <div>
      <Header />
      <Navbar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      <main style={{ padding: "20px", textAlign: "center" }}>
        {selectedTab === "Tasks" && <TasksTab />}
        {selectedTab === "Habits" && <p>Habit tracker will go here</p>}
        {selectedTab === "Mood" && <p>Mood tracker will go here</p>}
        {selectedTab === "Calendar" && <p>Calendar will go here</p>}
      </main>
    </div>
  );
}

export default App;
