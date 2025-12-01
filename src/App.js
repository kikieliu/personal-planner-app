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
function getPSTKeyFromDate(date = new Date()) {
  const pst = new Date(
    date.toLocaleString("en-US", { timeZone: "America/Los_Angeles" })
  );
  const yyyy = pst.getFullYear();
  const mm = String(pst.getMonth() + 1).padStart(2, "0");
  const dd = String(pst.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getPSTDateShifted(days = 0) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return getPSTKeyFromDate(date);
}

function App() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  // --------------------------
  // EVENTS
  // --------------------------
  const [events, setEvents] = useState(() => {
    const raw = localStorage.getItem("events");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const [eventModal, setEventModal] = useState({ open: false, event: null });

  const handleSaveEvent = (event) => {
    setEvents((prev) => {
      const exists = prev.find((ev) => ev.id === event.id);
      if (exists) {
        return prev.map((ev) => (ev.id === event.id ? event : ev));
      }
      return [...prev, { ...event, id: event.id || Date.now() }];
    });
  };

  const handleDeleteEvent = (event) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== event.id));
  };

  const openAddEventForToday = () => {
    const todayKey = getPSTKeyFromDate();
    setEventModal({
      open: true,
      event: { date: todayKey, time: "", name: "", allDay: false },
    });
  };

  const handleEventClick = (ev) => setEventModal({ open: true, event: ev });

  // --------------------------
  // HABITS
  // --------------------------
  const [habits, setHabits] = useState(() => {
    const raw = localStorage.getItem("habits");
    return raw ? JSON.parse(raw) : [];
  });

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const toggleHabitCompletion = (id, checked) => {
    const todayKey = getPSTKeyFromDate();
    const yesterdayKey = getPSTDateShifted(-1);

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        if (checked) {
          let newStreak = 1;
          if (h.lastCompleted === yesterdayKey) newStreak = (h.streak || 0) + 1;
          return { ...h, streak: newStreak, lastCompleted: todayKey };
        } else {
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
  // MOODS
  // --------------------------
  const [moods, setMoods] = useState(() => {
    const raw = localStorage.getItem("moods");
    return raw ? JSON.parse(raw) : {};
  });

  const updateMood = (date, emoji) => {
    setMoods((prev) => {
      const newMoods = { ...prev, [date]: emoji };
      localStorage.setItem("moods", JSON.stringify(newMoods));
      return newMoods;
    });
  };

  // --------------------------
  // CONTENT RENDER
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

  return React.createElement(
    "div",
    { style: { display: "flex", height: "100vh" } },
    [
      React.createElement(Navbar, {
        key: "navbar",
        selectedTab,
        setSelectedTab,
        onAddEvent: openAddEventForToday,
      }),
      React.createElement(
        "div",
        {
          key: "content-wrapper",
          style: { flex: 1, marginLeft: "200px", overflowY: "auto", padding: "20px" },
        },
        renderContent()
      ),
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
