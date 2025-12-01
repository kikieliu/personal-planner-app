import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Calendar from "./components/Calendar";
import EventModal from "./widgets/EventModal";
import HabitsPage from "./components/HabitsPage";
import MoodPage from "./components/MoodPage";

function getTodayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function App() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const [events, setEvents] = useState([]);
  const [eventModal, setEventModal] = useState({ open: false, event: null });

  // HABITS
  const [habits, setHabits] = useState(() => {
    try {
      const raw = localStorage.getItem("habits");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Failed to parse habits", e);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("habits", JSON.stringify(habits));
    } catch (e) {
      console.error("Failed to save habits", e);
    }
  }, [habits]);

  const addHabit = (name) => {
    if (!name || !name.trim()) return;
    const newHabit = { id: Date.now(), name: name.trim(), streak: 0, lastCompleted: null };
    setHabits(prev => [...prev, newHabit]);
  };

  const editHabit = (id, updates) => {
    setHabits(prev => prev.map(h => h.id === id ? { ...h, ...updates } : h));
  };

  const deleteHabit = (id) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  const todayKey = getTodayKey();
  const yesterdayKey = () => {
    const t = new Date();
    t.setDate(t.getDate() - 1);
    const yyyy = t.getFullYear();
    const mm = String(t.getMonth() + 1).padStart(2, "0");
    const dd = String(t.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const toggleHabitCompletion = (id, checked) => {
    setHabits(prev => {
      return prev.map(h => {
        if (h.id !== id) return h;
        const today = todayKey;
        const yesterday = yesterdayKey();
        if (checked) {
          let newStreak = 1;
          if (h.lastCompleted === yesterday) newStreak = (h.streak || 0) + 1;
          return { ...h, streak: newStreak, lastCompleted: today };
        } else {
          if (h.lastCompleted === today) {
            const newStreak = Math.max(0, (h.streak || 0) - 1);
            return { ...h, streak: newStreak, lastCompleted: null };
          }
          return h;
        }
      });
    });
  };

  // EVENTS
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

  const openAddEventForToday = () => {
    const today = todayKey;
    setEventModal({ open: true, event: { date: today, time: "", name: "", allDay: false } });
  };

  // MOODS
  const [moods, setMoods] = useState(() => {
    try {
      const raw = localStorage.getItem("moods");
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  });

  const updateMood = (date, emoji) => {
    setMoods(prev => {
      const newMoods = { ...prev, [date]: emoji };
      localStorage.setItem("moods", JSON.stringify(newMoods));
      return newMoods;
    });
  };

  // CONTENT RENDER
  const renderContent = () => {
    if (selectedTab === "Dashboard") {
      return React.createElement(Dashboard, {
        events,
        setEventModal,
        habits,
        toggleHabitCompletion,
        moods,
        setMood: updateMood,
        key: "dashboard"
      });
    }
    if (selectedTab === "Calendar") {
      return React.createElement(Calendar, { events, setEventModal, key: "calendar" });
    }
    if (selectedTab === "Habits") {
      return React.createElement(HabitsPage, { habits, addHabit, editHabit, deleteHabit, toggleHabitCompletion, key: "habitsPage" });
    }
    if (selectedTab === "Mood") {
      return React.createElement(MoodPage, { moods, setMood: updateMood, key: "moodPage" });
    }
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
        onAddEvent: openAddEventForToday
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
