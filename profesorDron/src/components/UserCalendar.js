/** @format */

import React from 'react';
import './usercalendar.css';
import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { click } from '@testing-library/user-event/dist/click';
import axios from 'axios';

const UserCalendar = () => {
  const url = 'http://localhost/szkolenia-drony/';
  const { user } = useContext(UserContext);
  const today = new Date();

  // ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [eventsAll, setEventsAll] = useState([]);
  const [canSignUp, setCanSignUp] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [showEventModal, setShowEventModal] = useState(false);

  // pobieranie danych o wydarzeniach z bazy
  const fetchEvents = async () => {
    try {
      const response = await fetch(url + 'getUserEvents.php?data=' + user.id);
      const events = await response.json();
      setEvents(events);
      setCalendarEvents(events);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const fetchEventsAll = async () => {
    try {
      const response = await fetch(
        url + 'getUserEventsCourses.php?data=' + user.id,
      );
      const events = await response.json();
      setEventsAll(events);
      console.log(events);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // po wczytaniu komponentu pobiera dane o wydarzeniach
  useEffect(() => {
    fetchEvents();
    fetchEventsAll();
  }, []);

  // po wybraniu wydarzenia na kalendarzu
  const showEventInfo = (clickInfo) => {
    // ustawia wartości zmiennych wydarzenia na podstawie wybranego i pasującego z tablicy obiektów events wydarzenia
    const selectedEvent = calendarEvents
      .slice()
      .filter((event) => event.id == clickInfo.event.id)[0];

    setSelectedEvent(selectedEvent);
    setShowEventModal(true);
  };

  useEffect(() => {
    if (showEventModal) {
      const eventInfoModal = document.getElementById(
        'user-calendar__event-info-modal',
      );
      eventInfoModal.style.display = 'block';
    }
  });

  const closeEventModal = () => {
    const eventInfoModal = document.getElementById(
      'user-calendar__event-info-modal',
    );
    eventInfoModal.style.display = 'none';
    setShowEventModal(false);
  };

  // ukrywa okno, jeżeli użytkownik kliknie poza oknem wydarzenia
  window.onclick = function (event) {
    if (showEventModal) {
      const eventInfoModal = document.getElementById(
        'user-calendar__event-info-modal',
      );
      if (event.target == eventInfoModal) {
        eventInfoModal.style.display = 'none';
        setShowEventModal(false);
      }
    }
  };

  const showMyEvents = () => {
    setCalendarEvents(events);
    setCanSignUp(false);
  };

  const showAllEvents = () => {
    setCalendarEvents(eventsAll);
    setCanSignUp(true);
  };

  const signUpEvent = (eventId, courseId) => {
    console.log(user.id, eventId, courseId);

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('event_id', eventId);
    formData.append('course_id', courseId);

    const authenticate = async () => {
      axios
        .post(url + 'signUpEvent.php/', formData)
        .then((response) => {
          console.log(response.data);
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    authenticate();
  };

  const signOutEvent = (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const authenticate = async () => {
      axios
        .post(url + 'signOutEvent.php/', formData)
        .then((response) => {
          console.log(response.data);
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    authenticate();
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  // renderuje po wczytaniu danych o wydarzeniach
  if (!isLoading) {
    return (
      <>
        {/* po wybraniu wydarzenia z kalendarza pojawia się okno z jego opisem */}
        {selectedEvent.id && (
          <>
            {/* Modal Wydarzeń (pojawia się po kliknięciu przycisku Przeglądaj) */}
            <div className='user-calendar__event-info-body'>
              <div
                className='user-calendar__event-info'
                id='user-calendar__event-info-modal'
              >
                <div className='user-calendar__event-info-container'>
                  <div className='event-create__header'>
                    <span
                      onClick={() => closeEventModal()}
                      className='user-calendar__event-info-close'
                    >
                      &times;
                    </span>
                  </div>
                  <div className='user-calendar__event-info-header'></div>
                  <h3 className='user-calendar__event-info-h3'>
                    {selectedEvent.title}
                  </h3>
                  <p className='user-calendar__event-info-course-title'>
                    Z kursu:{' '}
                    <a href={'/kurs/' + selectedEvent.courseId}>
                      {selectedEvent.courseTitle}
                    </a>
                  </p>
                  <p className='user-calendar__event-info-date-container'>
                    Data spotkania:{' '}
                    <span className='user-calendar__event-info-date'>
                      {`${new Intl.DateTimeFormat('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(selectedEvent.date))}`}
                    </span>
                  </p>
                  {selectedEvent.youtubeLink.length > 0 && (
                    <iframe
                      width='480'
                      height='270'
                      src={
                        'https://www.youtube.com/embed/' +
                        selectedEvent.youtubeLink.slice(-11)
                      }
                      frameBorder='0'
                    ></iframe>
                  )}
                  <div className='user-calendar__event-underline'></div>
                  <p className='user-calendar__event-info-description'>
                    {selectedEvent.description}
                  </p>
                  {new Date(selectedEvent.date) >=
                    today.setHours(0, 0, 0, 0) && (
                    <div className='user-calendar__event-info-buttons'>
                      {canSignUp ? (
                        <button
                          onClick={() =>
                            signUpEvent(
                              selectedEvent.id,
                              selectedEvent.courseId,
                            )
                          }
                          className='user-calendar__event-info-accept-btn'
                        >
                          Zapisz się
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => signOutEvent(selectedEvent.id)}
                            className='user-calendar__event-info-signOut-btn'
                          >
                            Wypisz się
                          </button>
                        </>
                      )}
                      <button
                        onClick={closeEventModal}
                        className='user-calendar__event-info-cancel-btn'
                      >
                        Anuluj
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <main className='user-calendar__main'>
          <div className='user-calendar__container'>
            {events.length == 0 && (
              <>
                <p className='user-calendar__no-events-found'>
                  Nie jesteś jeszcze zapisany do żadnego wydarzenia.
                  <br />
                  <a href='/kursy'>Wykup dostęp do kursu</a> lub przeglądaj
                  dostępne wydarzenia
                </p>
                <div className='user-calendar__event-underline'></div>
              </>
            )}
            <div className='user-calendar__choice-buttons'>
              <button
                onClick={showMyEvents}
                className='user-calendar__events-button'
              >
                Moje wydarzenia
              </button>
              <button
                onClick={showAllEvents}
                className='user-calendar__events-button'
              >
                Dostępne wydarzenia
              </button>
            </div>
          </div>
          <div className='user-calendar__my-events-calendar-container'>
            <p className='user-calendar__events-type'>
              {!canSignUp ? 'Moje wydarzenia' : 'Dostępne wydarzenia'}
            </p>
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView='dayGridMonth'
              events={calendarEvents}
              displayEventTime={false}
              eventClick={showEventInfo}
              eventDisplay='block'
              eventBackgroundColor='#2198ff'
              eventBorderColor='#2198ff'
              aspectRatio='2.3'
              firstDay='1'
            />
          </div>
        </main>
      </>
    );
  }
};

export default UserCalendar;
