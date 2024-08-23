import React, { useState } from "react";
import { GrCaretNext } from "react-icons/gr";
import { GrCaretPrevious } from "react-icons/gr";
import Form from "./Form";
import {
  LocationProvider,
  useLocationContext,
} from "../context/LocationContext";

const Calendar = ({ onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const { locations } = useLocationContext();

  const daysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = daysInMonth(year, month);

    // Izračunajte koji je dan u nedelji prvi dan meseca, ali sa ponedeljkom kao 0.
    const firstDayOfMonth = (new Date(year, month, 1).getDay() + 6) % 7;

    let data = [];
    let dayCounter = 1;

    // Postavite broj nedelja (može biti do 6).
    for (let i = 0; i < 6; i++) {
      let week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDayOfMonth) || dayCounter > totalDays) {
          week.push(null);
        } else {
          week.push(new Date(year, month, dayCounter));
          dayCounter++;
        }
      }
      data.push(week);
    }

    return data;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
    if (onDateClick) {
      onDateClick(date);
    }
  };

  const addEvent = (eventData) => {
    const newEvent = { ...eventData, date: selectedDate };
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedDate(null);
  };

  const monthData = getMonthData();
  return (
    <LocationProvider>
      <div className="container">
        <div className="header">
          <button className="cal-buttons" onClick={prevMonth}>
            <GrCaretPrevious />
          </button>
          <h2>
            {currentMonth.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button className="cal-buttons" onClick={nextMonth}>
            <GrCaretNext />
          </button>
        </div>
        <table className="calendar">
          <thead>
            <tr>
              {["Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"].map(
                (day, index) => (
                  <th key={index}>{day}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, weekIndex) => (
              <tr key={weekIndex}>
                {week.map((date, dateIndex) => (
                  <td
                    key={dateIndex}
                    className={
                      date
                        ? selectedDate &&
                          date.getTime() === selectedDate.getTime()
                          ? "selected-date"
                          : ""
                        : "empty"
                    }
                    onClick={() => date && handleDateClick(date)}
                  >
                    {date ? (
                      <div className="calendar-tr">
                        <span>{date.getDate()}</span>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {showForm && (
          <Form
            date={selectedDate}
            onClose={closeForm}
            isAdminProp={false}
            locations={locations}
          />
        )}
      </div>
    </LocationProvider>
  );
};

export default Calendar;
