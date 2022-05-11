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
import CourseEventEdit from './CourseEventEdit';

const TeacherEventsCalendar = () => {
  const url = 'http://localhost/szkolenia-drony/';
  const { user } = useContext(UserContext);
  const today = new Date();

  // ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [showEventModal, setShowEventModal] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  // const [eventEditInfo, setEventEditInfo] = useState(['', '', '', '', '']);
  const [eventEditInfo, setEventEditInfo] = useState({
    id: '',
    courseId: '',
    title: '',
    description: '',
    youtubeLink: '',
  });

  // pobieranie danych o wydarzeniach z bazy
  const fetchEvents = async () => {
    try {
      const response = await fetch(
        url + 'getTeacherEvents.php?data=' + user.id,
      );
      const events = await response.json();
      setCalendarEvents(events);
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
  }, []);

  const editEvent = (id, courseId, title, youtubeLink, description) => {
    setEventEditInfo({
      id: id,
      courseId: courseId,
      title: title,
      description: description,
      youtubeLink: youtubeLink,
    });
    const eventModal = document.getElementById('event-edit-modal');
    eventModal.style.display = 'block';
  };

  const deleteEvent = (id) => {
    const formData = new FormData();
    formData.append('id', id);

    const authenticate = async () => {
      axios
        .post(url + 'deleteEvent.php/', formData)
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
      // console.log('in');
      const eventInfoModal = document.getElementById(
        'user-calendar__event-info-modal',
      );
      if (event.target == eventInfoModal) {
        // console.log('deep');
        eventInfoModal.style.display = 'none';
        setShowEventModal(false);
      }
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  // renderuje po wczytaniu danych o wydarzeniach
  if (!isLoading) {
    return (
      <>
        <CourseEventEdit
          eventId={eventEditInfo.id}
          courseId={eventEditInfo.courseId}
          title={eventEditInfo.title}
          youtubeLink={eventEditInfo.youtubeLink}
          description={eventEditInfo.description}
        />
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
                      onClick={closeEventModal}
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
                  <div className='single-course__event-info-buttons'>
                    <button
                      onClick={() =>
                        editEvent(
                          selectedEvent.id,
                          selectedEvent.courseId,
                          selectedEvent.title,
                          selectedEvent.youtubeLink,
                          selectedEvent.description,
                        )
                      }
                      className='single-course__event-info-edit-btn'
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => deleteEvent(selectedEvent.id)}
                      className='single-course__event-info-delete-btn'
                    >
                      Usuń
                    </button>
                    <button
                      onClick={closeEventModal}
                      className='single-course__event-info-cancel-btn'
                    >
                      Anuluj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        <main className='user-calendar__main'>
          <div className='user-calendar__container'>
            {calendarEvents.length == 0 && (
              <>
                <p className='user-calendar__no-events-found'>
                  Nie dodałeś jeszcze żadnych wydarzeń do swoich kursów
                  <br />
                  <a href='/zarzadzaj-kursami'>Zarządzaj swoimi kursami</a>, aby
                  dodać do nich wydarzenia.
                </p>
                <div className='user-calendar__event-underline'></div>
              </>
            )}
          </div>
          <div className='user-calendar__my-events-calendar-container'>
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

export default TeacherEventsCalendar;
