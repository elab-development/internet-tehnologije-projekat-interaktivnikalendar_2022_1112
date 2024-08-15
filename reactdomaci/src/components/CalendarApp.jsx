import { useState } from "react";

const CalendarApp = () => {
  const daysOfWeek = ["Pon", "Uto", "Sre", "Cet", "Pet", "Sub", "Ned"];
  const monthsOfYear = [
    "Januar",
    "Februar",
    "Mart",
    "April",
    "Maj",
    "Jun",
    "Jul",
    "Avgust",
    "Septembar",
    "Octobar",
    "Novembar",
    "Decembar",
  ];
  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEventPopup, setShowEventPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventTime, setEventTime] = useState({ hours: "00", minutes: "00" });
  const [eventText, setEventText] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); //koliko mesec ima dana
  const firstDayOfMonth =
    (new Date(currentYear, currentMonth, 1).getDay() + 6) % 7; //kojim danom se pocinje mesec, ako racunamo da je prvi dan u mesecu ponedeljak!

  //iteriranje za prelazak na prethodni mesec
  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  //iteriranje za prelazak na sledeci mesec
  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  //interakcija kada se klikne na neki od dana u kalendaru
  const handleDayClick = (day) => {
    const clickedDate = new Date(currentYear, currentMonth, day);
    const today = new Date();
    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setSelectedDate(clickedDate);
      setShowEventPopup(true);
      setEventTime({ hours: "00", minutes: "00" });
      setEventText("");
      setEditingEvent(null);
    }
  };

  // pomocna funkcija za handleDayClick kako bi omogucili da se unose i dogadjaji za danasnji dan!
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(), //id nam je vreme kada se editovanje pokrene
      date: selectedDate,
      time: `${eventTime.hours.padStart(2, "0")}:${eventTime.minutes.padStart(
        2,
        "0"
      )}`, //dodajemo nulu kako bi uvek imali 2 karaktera ukupno za vreme
      text: eventText,
    };

    let updatedEvents = [...events];
    if (editingEvent) {
      //ako nije null, znaci da editujemo
      updatedEvents = updatedEvents.map(
        (event) => (event.id === editingEvent.id ? newEvent : event) //ovime osiguravamo da dogadjaj sa id-jem koji je isti kao editing id se menja sa detaljima koje korisnik zeli da promeni
      );
    } else {
      updatedEvents.push(newEvent); //i dalje kreiramo novi dogadjaj kada nije izmena u pitanju
    }

    updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date)); //sortiramo dogadjaje hronoloski
    // ako je rezultat oduzimanja negativan, znaci da prvo ide dogadjaj a pa b
    // ako je rezultat oduzimanja 0, znaci da nema izmene, u isto vreme su kreirani
    // ako je rezultat oduzimanja pozitivan, znaci da prvo ide dogadjaj b pa a

    setEvents(updatedEvents);
    setEventTime({ hours: "00", minutes: "00" });
    setEventText("");
    setShowEventPopup(false);
    setEditingEvent(null);
  };

  //Funkcija za editovanje dogadjaja, sa parametrom event koji se odnosi na dogadjaj koji se azurira
  const handleEditEvent = (event) => {
    setSelectedDate(new Date(event.date));
    setEventTime({
      //azuriranje vremena dogadjaja
      hours: event.time.split(":")[0],
      minutes: event.time.split(":")[1],
    });
    setEventText(event.text); //azuriranje teksta dogadjaja
    setEditingEvent(event);
    setShowEventPopup(true);
  };

  return (
    <div className="calendar-app">
      <div className="calendar">
        <h1 className="heading"> Calendar </h1>
        <div className="navigate-date">
          <h2 className="month">{monthsOfYear[currentMonth]},</h2>
          <h2 className="year">{currentYear}</h2>
          <div className="buttons">
            <i className="bx bx-chevron-left" onClick={prevMonth}></i>
            <i className="bx bx-chevron-right" onClick={nextMonth}></i>
          </div>
        </div>
        <div className="weekdays">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="days">
          {[...Array(firstDayOfMonth).keys()].map((_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <span
              key={day + 1}
              className={
                day + 1 === currentDate.getDate() &&
                currentMonth === currentDate.getMonth() &&
                currentYear === currentDate.getFullYear()
                  ? "current-day"
                  : ""
              }
              onClick={() => handleDayClick(day + 1)}
            >
              {day + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="events">
        {showEventPopup && (
          <div className="event-popup">
            <div className="time-input">
              <div className="event-popup-time">Time</div>
              <input
                type="number"
                name="hours"
                min={0}
                max={24}
                className="hours"
                value={eventTime.hours}
                onChange={
                  (e) => setEventTime({ ...eventTime, hours: e.target.value }) //na ovaj nacin sinhronizujemo vrednost prikazanu u pretrazivacu sa promenljivom koju ovde pratimo za sate!
                }
              />
              <input
                type="number"
                name="minutes"
                min={0}
                max={60}
                className="minutes"
                value={eventTime.minutes}
                onChange={
                  (e) => setEventTime({ ...eventTime, minutes: e.target.value }) //na ovaj nacin sinhronizujemo vrednost prikazanu u pretrazivacu sa promenljivom koju ovde pratimo za minute!
                }
              />
            </div>
            <textarea
              placeholder="Unesi tekst dogadjaja sa maksimalno 60 karaktera..."
              value={eventText}
              onChange={(e) => {
                if (e.target.value.length <= 60) {
                  setEventText(e.target.value);
                }
              }}
            ></textarea>
            <button className="event-popup-btn" onClick={handleEventSubmit}>
              {editingEvent ? "Azuriraj dogadjaj!" : "Dodaj novi dogadjaj!"}
            </button>
            <button
              className="close-event-popup"
              onClick={() => setShowEventPopup(false)}
            >
              <i className="bx bx-x"></i>
            </button>
          </div>
        )}
        {events.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{`${
                monthsOfYear[event.date.getMonth()]
              } ${event.date.getDate()}, ${event.date.getFullYear()}`}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i
                className="bx bxs-edit-alt"
                onClick={() => handleEditEvent(event)}
              ></i>
              <i className="bx bxs-message-alt-x"></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarApp;
