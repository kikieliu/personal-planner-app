import React from "react";

function MoodPage(props) {
    const { moods, setMood } = props; // setMood should come from App.js
    const [year, setYear] = React.useState(new Date().getFullYear());
    const [month, setMonth] = React.useState(new Date().getMonth());

    const moodOptions = ["😁", "🙂", "😐", "😢", "☹️", "🤪", "😡", "😎"];

    function nextMonth() {
        setMonth(prev => {
            if (prev === 11) { setYear(y => y + 1); return 0; }
            return prev + 1;
        });
    }

    function prevMonth() {
        setMonth(prev => {
            if (prev === 0) { setYear(y => y - 1); return 11; }
            return prev - 1;
        });
    }

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarCells = [];
    for (let i = 0; i < firstDay; i++) calendarCells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
        calendarCells.push({
            day: d,
            dateStr,
            mood: moods[dateStr] || ""
        });
    }

    return React.createElement(
        "div",
        { style: { padding: "20px" } },

        // Title
        React.createElement("h2", null, "Mood Calendar"),

        // Navigation with only < and >
        React.createElement(
            "div",
            { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" } },
            [
                React.createElement("button", { key: "prev", onClick: prevMonth, style: { fontSize: "20px", padding: "5px 10px" } }, "<"),
                React.createElement("h3", { key: "title" }, new Date(year, month).toLocaleString("default", { month:"long", year:"numeric" })),
                React.createElement("button", { key: "next", onClick: nextMonth, style: { fontSize: "20px", padding: "5px 10px" } }, ">")
            ]
        ),

        // Calendar Grid
        React.createElement(
            "div",
            {
                style: {
                    display: "grid",
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "10px",
                    textAlign: "center"
                }
            },

            // Weekday labels
            ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(w =>
                React.createElement("div", { key: w, style:{ fontWeight:"bold" } }, w)
            ),

            // Days
            calendarCells.map((cell, i) => {
                if (cell === null) return React.createElement("div", { key: "blank-" + i });
                return React.createElement(
                    "div",
                    {
                        key: "day-" + i,
                        style: {
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            minHeight: "60px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: "20px",
                            cursor: "pointer",
                            background: cell.mood ? "#e0f7fa" : "white"
                        },
                        onClick: () => {
                            const selected = prompt("Select mood for this day: " + moodOptions.join(" "));
                            if (selected && moodOptions.includes(selected) && typeof setMood === "function") {
                                setMood(cell.dateStr, selected);
                            }
                        }
                    },
                    React.createElement("div", null, cell.day),
                    React.createElement("div", null, cell.mood)
                );
            })
        )
    );
}

export default MoodPage;
