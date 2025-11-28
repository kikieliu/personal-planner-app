import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";

function App() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [events, setEvents] = useState([]); // events stored as array
  const [eventModal, setEventModal] = useState({ open: false, event: null });

  const handleSaveEvent = (event) => {
    setEvents(prev => {
      const exists = prev.find(ev => ev.id === event.id);
      if (exists) {
        return prev.map(ev => ev.id === event.id ? event : ev);
      }
      return [...prev, { ...event, id: event.id || Date.now() }];
    });
  };

  const handleDeleteEvent = (event) => {
    setEvents(prev => prev.filter(ev => ev.id !== event.id));
  };

  const renderContent = () => {
    if (selectedTab === "Dashboard")
      return React.createElement(Dashboard, { events, setEventModal });
    if (selectedTab === "Calendar")
      return React.createElement(Calendar, { events, setEventModal });
    return React.createElement("div", null, selectedTab + " page");
  };

  return React.createElement(
    "div",
    { style: { display: "flex", height: "100vh" } },
    [
      React.createElement(Navbar, {
        key: "navbar",
        selectedTab,
        setSelectedTab,
        onAddEvent: () => {
          const today = new Date();
          const yyyy = today.getFullYear();
          const mm = String(today.getMonth() + 1).padStart(2, "0");
          const dd = String(today.getDate()).padStart(2, "0");
          setEventModal({ open: true, event: { date: `${yyyy}-${mm}-${dd}`, time: "", name: "", allDay: false } });
        }
      }),
      React.createElement(
        "div",
        { key: "content", style: { flex: 1, marginLeft: "200px", overflowY: "auto", padding: "20px" } },
        renderContent()
      ),
      React.createElement(EventModal, {
        key: "eventModal",
        isOpen: eventModal.open,
        eventData: eventModal.event,
        onClose: () => setEventModal({ open: false, event: null }),
        onSave: handleSaveEvent,
        onDelete: handleDeleteEvent
      })
    ]
  );
}

export default App;
