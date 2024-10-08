import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUserObject, getToken } from "../context/AuthContext";

const sendNotificationEmail = async (eventId) => {
  try {
    const token = getToken();
    const response = await axios.post(
      "http://localhost:8000/api/send-email",
      {
        eventId: eventId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Notifikacija je uspešno poslata na vašu email adresu!");
  } catch (error) {
    console.error("Greška prilikom slanja notifikacije na email:", error);
    alert("Došlo je do greške prilikom slanja notifikacije na email.");
  }
};

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${formattedDay}/${formattedMonth}/${year}`;
};

const formatDateGoogle = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  return `${year}${formattedMonth}${formattedDay}/${year}${formattedMonth}${formattedDay}`;
};

const formattedDateForApi = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);
  const [updatedEvent, setUpdatedEvent] = useState({});
  const user = getUserObject();

  const fetchEvents = async () => {
    const token = getToken();
    try {
      const responseEvents = await axios.get(
        `http://localhost:8000/api/dogadjaji`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      let eventData = responseEvents.data.data;

      console.log("Event Data:", eventData); // Check the structure

      if (eventData && eventData.length > 0) {
        // Sort events by datum (date)
        eventData.sort((a, b) => {
          console.log(`Comparing dates: ${a.datum} and ${b.datum}`);
          return new Date(b.datum) - new Date(a.datum);
        });
      }

      setEvents(eventData);
    } catch (error) {
      console.error("Greška prilikom dohvatanja događaja ili lokacija:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDeleteEvent = async (id) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Korisnik nije pravilno prijavljen!");
        return;
      }
      const confirmDelete = window.confirm(
        "Da li ste sigurni da želite da obrišete ovaj događaj?"
      );
      if (!confirmDelete) {
        return;
      }

      await axios.delete(`http://localhost:8000/api/dogadjaji/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter((event) => event.id !== id));
      alert("Događaj je uspešno obrisan!");
    } catch (error) {
      console.error("Greška prilikom brisanja događaja:", error);
      alert(
        "Došlo je do greške prilikom brisanja događaja. Korisnik može da briše samo događaje koje je on napravio!"
      );
    }
  };

  const handleUpdateEvent = async (d) => {
    try {
      const token = getToken();
      if (!token) {
        alert("Korisnik nije pravilno prijavljen!");
        return;
      }

      console.log(user.id);
      console.log(d);

      if (user.id !== d.user_id.id) {
        alert("Korisnik može menjati samo svoje događaje!");
        return;
      }

      const updatedEventData = {
        naziv: updatedEvent.naziv,
        opis: updatedEvent.opis,
        datum: formattedDateForApi(new Date(updatedEvent.datum)),
      };

      const response = await axios.put(
        `http://localhost:8000/api/dogadjaji/${d.id}`,
        updatedEventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Fetch events again after successful update
        await fetchEvents();

        setEditingEventId(null);
        setUpdatedEvent({});
        alert("Događaj je uspešno ažuriran!");
      } else {
        alert("Izmena događaja nije uspela.");
      }
    } catch (error) {
      console.error("Greška prilikom izmene događaja:", error);
      alert("Došlo je do greške prilikom izmene događaja.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUpdatedEvent({ ...updatedEvent, [name]: value || "" });
  };

  const handleExportICS = async () => {
    try {
      axios
        .get("http://localhost:8000/api/export", { responseType: "blob" })
        .then((r) => {
          // create file link in browser's memory
          const href = URL.createObjectURL(r.data);

          // create "a" HTML element with href to file & click
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "calendar.ics");
          document.body.appendChild(link);
          link.click();

          // clean up "a" element & remove ObjectURL
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        });
    } catch (error) {
      console.error("Greška prilikom eksportovanja .ics fajla:", error);
      alert("Došlo je do greške prilikom eksportovanja .ics fajla.");
    }
  };

  const handleCancelEdit = () => {
    setEditingEventId(null);
    setUpdatedEvent({});
  };

  if (loading) {
    return <div className="container">Učitavanje događaja...</div>;
  }

  if (!events || events.length === 0) {
    return (
      <div className="container">
        {" "}
        Događaji se ne prikazuju administratorima i neautorizovanim korisnicima.
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Svi događaji</h1>
      <div className="events-container">
        <div className="export-button">
          <button onClick={handleExportICS}>Eksportuj .ics</button>
        </div>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="event-item">
              {editingEventId === event.id ? (
                <div className="edit-event-form">
                  <input
                    type="text"
                    name="naziv"
                    value={updatedEvent.naziv || event.naziv}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="opis"
                    value={updatedEvent.opis || event.opis}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="date"
                    name="datum"
                    value={
                      updatedEvent.datum || formatDate(new Date(event.datum))
                    }
                    onChange={handleInputChange}
                    required
                  />
                  <div>
                    <button onClick={() => handleUpdateEvent(event)}>
                      Sačuvaj
                    </button>
                    <button onClick={() => handleCancelEdit()}>Odustani</button>
                  </div>
                </div>
              ) : (
                <div className="event-details">
                  <div>Datum: {formatDate(new Date(event.datum))}</div>
                  <div>Naziv: {event.naziv}</div>
                  <div>Opis: {event.opis}</div>
                  <div>Naziv lokacije: {event.lokacija_id.naziv}</div>
                  <div>Kreirao korisnik: {event.user_id.name}</div>
                  <div>
                    <a
                      className="btn"
                      target="_blank"
                      href={`https://calendar.google.com/calendar/u/0/r/eventedit?text=${window.encodeURIComponent(
                        event.naziv
                      )}&location=${window.encodeURIComponent(
                        event.lokacija_id.naziv
                      )}&details=${window.encodeURIComponent(
                        event.opis
                      )}&dates=${window.encodeURIComponent(
                        formatDateGoogle(new Date(event.datum))
                      )}`}
                    >
                      Dodaj u Google kalendar
                    </a>
                  </div>
                  <div className="button-container">
                    <button onClick={() => setEditingEventId(event.id)}>
                      Izmeni
                    </button>
                    <button onClick={() => handleDeleteEvent(event.id)}>
                      Obriši
                    </button>
                    <button onClick={() => sendNotificationEmail(event.id)}>
                      Pošalji notifikaciju na email
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Events;
