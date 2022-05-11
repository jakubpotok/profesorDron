/** @format */

import React from 'react';
import './coursemanage.css';
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import CourseEventCreate from './CourseEventCreate';
import CourseEventEdit from './CourseEventEdit';
import CourseEdit from './CourseEdit';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const CourseManage = () => {
  const { id } = useParams();

  //ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendarEventModal, setShowCalendarEventModal] = useState(false);
  const [course, setCourse] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState({});
  const [eventEditInfo, setEventEditInfo] = useState({
    id: '',
    courseId: '',
    title: '',
    description: '',
    youtubeLink: '',
  });
  const [courseEditInfo, setCourseEditInfo] = useState({
    courseId: '',
    title: '',
    description: '',
    price: '',
  });

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  const { user } = useContext(UserContext);
  let today = new Date();

  // pobieranie danych o kursach z bazy
  const fetchCourse = async () => {
    try {
      const response = await fetch(url + 'getCourseSingle.php?data=' + id);
      const course = await response.json();
      setCourse(course);

      // jezeli uzytkownik nie jest autorem kursu przenosi go do strony glownej
      if (user.id != course[0].author_id && user.role != 2) {
        window.location.href = '/';
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // pobieranie danych o wydarzeniach z bazy
  const fetchCourseEvents = async () => {
    try {
      const response = await fetch(url + 'getCourseEventsAll.php?data=' + id);
      const events = await response.json();
      setEvents(events);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // wywołanie metody po pobraniu danych o zalogowanym uzytkowniku
  useEffect(() => {
    if (user) {
      fetchCourse();
      fetchCourseEvents();
    }
  }, [user]);

  // tworzenie nowego wydarzenia do tego kursu
  const createEvent = () => {
    const eventModal = document.getElementById('event-modal');
    eventModal.style.display = 'block';
  };

  // usuwanie kursu
  const deleteCourse = (e, courseId) => {
    e.preventDefault();
    if (
      window.confirm(
        'Czy na pewno chcesz usunąć ten kurs i wszystkie wydarzenia z nim związane? Tego działania nie da się cofnąć.',
      )
    ) {
      const data = JSON.stringify({ course_id: courseId });
      const deleteCourse = async () => {
        axios
          .post(url + 'deleteCourse.php/', data)
          .then((response) => {
            console.log(response.data);
            window.location.href = '/zarzadzaj-kursami';
          })
          .catch((err) => {
            console.log(err);
          });
      };
      deleteCourse();
    }
  };

  // po wybraniu wydarzenia na kalendarzu
  const showCalendarEventInfo = (clickInfo) => {
    // ustawia wartości zmiennych wydarzenia na podstawie wybranego i pasującego z tablicy obiektów events wydarzenia
    const selectedCalendarEvent = events
      .slice()
      .filter((event) => event.id == clickInfo.event.id)[0];

    setSelectedCalendarEvent(selectedCalendarEvent);
    setShowCalendarEventModal(true);
  };

  useEffect(() => {
    if (showCalendarEventModal) {
      const eventInfoModal = document.getElementById(
        'user-calendar__event-info-modal',
      );
      eventInfoModal.style.display = 'block';
    }
  });

  const closeCalendarEventModal = () => {
    const eventInfoModal = document.getElementById(
      'user-calendar__event-info-modal',
    );
    eventInfoModal.style.display = 'none';
    setShowCalendarEventModal(false);
  };

  // const eventInfoModal = document.querySelectorAll(
  //   '.single-course__event-info',
  // );
  const showEventInfoModal = (
    i,
    id,
    courseId,
    title,
    description,
    youtubeLink,
  ) => {
    const eventInfoModal = document.querySelectorAll(
      '.single-course__event-info',
    );
    eventInfoModal[i].style.display = 'block';
    setEventEditInfo({
      id: id,
      courseId: courseId,
      title: title,
      description: description,
      youtubeLink: youtubeLink,
    });
  };

  const closeEventInfoModal = (i) => {
    const eventInfoModal = document.querySelectorAll(
      '.single-course__event-info',
    );
    eventInfoModal[i].style.display = 'none';
  };

  const editCourse = (e, courseId, title, description, price) => {
    setCourseEditInfo({
      courseId: courseId,
      title: title,
      description: description,
      price: price,
    });

    const eventModal = document.getElementById('course-edit-modal');
    eventModal.style.display = 'block';
  };

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

  // ukrywa okno, jeżeli użytkownik kliknie poza oknem
  window.onclick = function (event) {
    // if (event.target == signUpModal) {
    //   signUpModal.style.display = 'none';
    //   setErrMsg(false);
    // }
    // for (let i = 0; i < eventInfoModal.length; i++) {
    //   if (event.target == eventInfoModal[i]) {
    //     eventInfoModal[i].style.display = 'none';
    //   }
    // }

    if (showCalendarEventModal) {
      const eventInfoModal = document.getElementById(
        'user-calendar__event-info-modal',
      );
      if (event.target == eventInfoModal) {
        setShowCalendarEventModal(false);
        eventInfoModal.style.display = 'none';
      }
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (course[0]) {
    return (
      <main className='single-course__main'>
        <CourseEventCreate courseId={course[0].id} />
        <CourseEventEdit
          eventId={eventEditInfo.id}
          courseId={eventEditInfo.courseId}
          title={eventEditInfo.title}
          youtubeLink={eventEditInfo.youtubeLink}
          description={eventEditInfo.description}
        />
        <CourseEdit
          courseId={courseEditInfo.courseId}
          title={courseEditInfo.title}
          description={courseEditInfo.description}
          price={courseEditInfo.price}
        />

        {/* Edit Event Modal */}
        {selectedCalendarEvent.id && (
          <>
            <div className='user-calendar__event-info-body'>
              <div
                className='user-calendar__event-info'
                id='user-calendar__event-info-modal'
              >
                <div className='user-calendar__event-info-container'>
                  <div className='event-create__header'>
                    <span
                      onClick={() => closeCalendarEventModal()}
                      className='user-calendar__event-info-close'
                    >
                      &times;
                    </span>
                  </div>
                  <div className='user-calendar__event-info-header'></div>
                  <h3 className='user-calendar__event-info-h3'>
                    {selectedCalendarEvent.title}
                  </h3>
                  <p className='user-calendar__event-info-date-container'>
                    Data spotkania:{' '}
                    <span className='user-calendar__event-info-date'>
                      {`${new Intl.DateTimeFormat('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(selectedCalendarEvent.date))}`}
                    </span>
                  </p>
                  {selectedCalendarEvent.youtubeLink.length > 0 && (
                    <iframe
                      width='480'
                      height='270'
                      src={
                        'https://www.youtube.com/embed/' +
                        selectedCalendarEvent.youtubeLink.slice(-11)
                      }
                      frameBorder='0'
                    ></iframe>
                  )}
                  <div className='user-calendar__event-underline'></div>
                  <p className='user-calendar__event-info-description'>
                    {selectedCalendarEvent.description}
                  </p>
                  <div className='single-course__event-info-buttons'>
                    <button
                      onClick={() =>
                        editEvent(
                          selectedCalendarEvent.id,
                          selectedCalendarEvent.course_id,
                          selectedCalendarEvent.title,
                          selectedCalendarEvent.youtubeLink,
                          selectedCalendarEvent.description,
                        )
                      }
                      className='single-course__event-info-edit-btn'
                    >
                      Edytuj
                    </button>
                    <button
                      onClick={() => deleteEvent(selectedCalendarEvent.id)}
                      className='single-course__event-info-delete-btn'
                    >
                      Usuń
                    </button>
                    <button
                      onClick={() => closeCalendarEventModal()}
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

        {/*  */}
        <div className='single-course__container'>
          <div className='single-course'>
            <div className='single-course__info'>
              <div className='single-course__left-side'>
                <h1 className='single-course__title'>{course[0].title}</h1>
                <p className='single-course__description'>
                  {course[0].description}
                </p>
                <p className='single-course__price--tag'>
                  Cena:{' '}
                  <span className='single-course__price'>
                    {course[0].price} zł
                  </span>
                </p>
              </div>
              <div className='single-course__right-side'>
                <img
                  src={url + 'images/courses/' + course[0].image}
                  alt=''
                  className='single-course__image'
                />
              </div>
            </div>
            <div className='single-course__underline'></div>
            <div className='single-course__manage-buttons'>
              <div>
                <button
                  onClick={createEvent}
                  className='single-course__manage-course-btn'
                >
                  Dodaj nowe wydarzenie i materiały do tego kursu
                </button>
              </div>
              <button
                onClick={(e) =>
                  editCourse(
                    e,
                    course[0].id,
                    course[0].title,
                    course[0].description,
                    course[0].price,
                  )
                }
                className='single-course__edit-course-btn'
              >
                Edytuj kurs
              </button>
              <button
                onClick={(e) => {
                  deleteCourse(e, course[0].id);
                }}
                className='single-course__delete-course-btn'
              >
                Usuń kurs
              </button>
            </div>
            <div className='single-course__underline'></div>

            {events.length > 0 ? (
              <div className='single-course__events-container'>
                <div className='single-course__events-title'>
                  <h1>Nadchodzące wydarzenia</h1>
                </div>

                <div className='single-course__calendar-container'>
                  <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    events={events}
                    displayEventTime={false}
                    eventClick={showCalendarEventInfo}
                    eventDisplay='block'
                    eventBackgroundColor='#2198ff'
                    eventBorderColor='#2198ff'
                    aspectRatio='2.5'
                    firstDay='1'
                  />
                </div>

                <div className='single-course__events'>
                  {/* iteruje przez wszystkie wydarzenia */}
                  {/* filtruje tylko wydarzenia, które jeszcze się datowo nie odbyły oraz sortuje je od najbliższych */}
                  {events
                    .slice()
                    .filter(
                      (event) =>
                        new Date(event.date) >= today.setHours(0, 0, 0, 0),
                    )
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((event, i) => {
                      const {
                        id,
                        course_id,
                        title,
                        description,
                        date,
                        youtubeLink,
                      } = event;

                      return (
                        <div key={id}>
                          {/* Modal Wydarzeń (pojawia się po kliknięciu przycisku Przeglądaj) */}
                          <div className='single-course__event-info-body'>
                            <div
                              className='single-course__event-info'
                              id='single-course__event-info-modal'
                            >
                              <div className='single-course__event-info__container'>
                                <div className='event-create__header'>
                                  <span
                                    onClick={() => closeEventInfoModal(i)}
                                    className='single-course__event-info__close'
                                  >
                                    &times;
                                  </span>
                                </div>
                                <div className='single-course__event-info__header'></div>
                                <h3 className='single-course__event-info__h3'>
                                  {title}
                                </h3>
                                <p className='single-course__event-info-date-container'>
                                  Data spotkania:{' '}
                                  <span className='single-course__event-info-date'>
                                    {`${new Intl.DateTimeFormat('pl-PL', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                    }).format(new Date(date))}`}
                                  </span>
                                </p>
                                {youtubeLink.length > 0 && (
                                  <iframe
                                    width='480'
                                    height='270'
                                    src={
                                      'https://www.youtube.com/embed/' +
                                      youtubeLink.slice(-11)
                                    }
                                    frameBorder='0'
                                  ></iframe>
                                )}

                                <div className='single-course__event-underline'></div>
                                <p className='single-course__event-info-description'>
                                  {description}
                                </p>
                                <div className='single-course__event-info-buttons'>
                                  <button
                                    onClick={() =>
                                      editEvent(
                                        id,
                                        course_id,
                                        title,
                                        youtubeLink,
                                        description,
                                      )
                                    }
                                    className='single-course__event-info-edit-btn'
                                  >
                                    Edytuj
                                  </button>
                                  <button
                                    onClick={() => deleteEvent(id)}
                                    className='single-course__event-info-delete-btn'
                                  >
                                    Usuń
                                  </button>
                                  <button
                                    onClick={() => closeEventInfoModal(i)}
                                    className='single-course__event-info-cancel-btn'
                                  >
                                    Anuluj
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Single Event */}
                          <div className='single-course__single-event'>
                            <p className='single-course__single-event-date'>
                              {`${new Intl.DateTimeFormat('pl-PL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }).format(new Date(date))}`}
                            </p>
                            <p className='single-course__single-event-title'>
                              {title}
                            </p>
                            <button
                              onClick={() =>
                                showEventInfoModal(
                                  i,
                                  id,
                                  course_id,
                                  title,
                                  description,
                                  youtubeLink,
                                )
                              }
                              className='single-course__single-event-manage-btn'
                            >
                              Zarządzaj
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <h3>Nie dodałeś jeszcze żadnych wydarzeń do tego kursu</h3>
            )}
          </div>
        </div>
      </main>
    );
  }
};

export default CourseManage;
