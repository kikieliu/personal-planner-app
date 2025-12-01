import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import EventModal from "./widgets/EventModal";
import HabitsPage from "./components/HabitsPage";
import MoodPage from "./components/MoodPage";

/* -----------------------------
   PST DATE UTILITY FUNCTIONS
------------------------------ */
// Returns a YYYY-MM-DD string in PST for a given date
function getPSTKeyFromDate(date = new Date()) {
  const pst = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const yyyy = pst.getFullYear();
  const mm = String(pst.getMonth() + 1).padStart(2, "0");
  const dd = String(pst.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

// Returns a PST date string shifted by `days` from today
function getPSTDateShifted(days = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return getPSTKeyFromDate(date);
}

function App() {
  // --------------------------
  // SELECTED TAB STATE
  // --------------------------
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  // --------------------------
  // EVENTS STATE
  // --------------------------
  const [events, setEvents] = useState(() => {
    const raw = localStorage.getItem("events"); // load events from localStorage
    return raw ? JSON.parse(raw) : [];
  });

  // Persist events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Modal state for adding/editing events
  const [eventModal, setEventModal] = useState({ open: false, event: null });

  // Save or update an event
  const handleSaveEvent = (event) => {
    setEvents((prev) => {
      const exists = prev.find((ev) => ev.id === event.id);
      if (exists) {
        // Update existing event
        return prev.map((ev) => (ev.id === event.id ? event : ev));
      }
      // Add new event
      return [...prev, { ...event, id: event.id || Date.now() }];
    });
  };

  // Delete an event
  const handleDeleteEvent = (event) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== event.id));
  };

  // Open modal to add a new event for today
  const openAddEventForToday = () => {
    const todayKey = getPSTKeyFromDate();
    setEventModal({
      open: true,
      event: { date: todayKey, time: "", name: "", allDay: false },
    });
  };

  // Open modal to edit an existing event
  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

  // --------------------------
  // HABITS STATE
  // --------------------------
  const [habits, setHabits] = useState(() => {
    const raw = localStorage.getItem("habits"); // load habits from localStorage
    return raw ? JSON.parse(raw) : [];
  });

  // Persist habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Toggle habit completion for today, handle streak logic
  const toggleHabitCompletion = (id, checked) => {
    const todayKey = getPSTKeyFromDate();
    const yesterdayKey = getPSTDateShifted(-1);

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        if (checked) {
          // Mark habit as completed
          let newStreak = 1;
          if (h.lastCompleted === yesterdayKey) newStreak = (h.streak || 0) + 1;
          return { ...h, streak: newStreak, lastCompleted: todayKey };
        } else {
          // Uncheck today’s completion
          if (h.lastCompleted === todayKey) {
            const newStreak = Math.max(0, (h.streak || 0) - 1);
            return { ...h, streak: newStreak, lastCompleted: null };
          }
          return h;
        }
      })
    );
  };

  // --------------------------
  // MOODS STATE
  // --------------------------
  const [moods, setMoods] = useState(() => {
    const raw = localStorage.getItem("moods"); // load moods from localStorage
    return raw ? JSON.parse(raw) : {};
  });

  // Update mood for a specific date
  const updateMood = (date, emoji) => {
    setMoods((prev) => {
      const newMoods = { ...prev, [date]: emoji };
      localStorage.setItem("moods", JSON.stringify(newMoods));
      return newMoods;
    });
  };

  // --------------------------
  // CONTENT RENDER FUNCTION
  // --------------------------
  const renderContent = () => {
    switch (selectedTab) {
      case "Dashboard":
        return React.createElement(Dashboard, {
          events,
          setEventModal,
          habits,
          toggleHabitCompletion,
          moods,
          setMood: updateMood,
        });
      case "Calendar":
        return React.createElement(Calendar, {
          events,
          setEventModal,
          moods,
          setMood: updateMood,
        });
      case "Habits":
        return React.createElement(HabitsPage, {
          habits,
          addHabit: (name) => {
            if (!name || !name.trim()) return;
            const newHabit = {
              id: Date.now(),
              name: name.trim(),
              streak: 0,
              lastCompleted: null,
            };
            setHabits((prev) => [...prev, newHabit]);
          },
          editHabit: (id, updates) =>
            setHabits((prev) =>
              prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
            ),
          deleteHabit: (id) =>
            setHabits((prev) => prev.filter((h) => h.id !== id)),
          toggleHabitCompletion,
        });
      case "Mood":
        return React.createElement(MoodPage, { moods, setMood: updateMood });
      default:
        return React.createElement("div", null, selectedTab + " page");
    }
  };

  // --------------------------
  // APP RENDER
  // --------------------------
  return React.createElement(
    "div",
    { style: { display: "flex", height: "100vh" } },
    [
      // Left navigation bar
      React.createElement(Navbar, {
        key: "navbar",
        selectedTab,
        setSelectedTab,
        onAddEvent: openAddEventForToday,
      }),
      // Main content area
      React.createElement(
        "div",
        {
          key: "content-wrapper",
          style: { flex: 1, marginLeft: "200px", overflowY: "auto", padding: "20px" },
        },
        renderContent()
      ),
      // Event modal
      React.createElement(EventModal, {
        key: "event-modal",
        isOpen: eventModal.open,
        eventData: eventModal.event,
        onClose: () => setEventModal({ open: false, event: null }),
        onSave: handleSaveEvent,
        onDelete: handleDeleteEvent,
      }),
    ]
  );
}

export default App;
