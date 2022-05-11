/** @format */

import React from 'react';
import './coursesingle.css';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!

const CourseSingle = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const url = 'http://localhost/szkolenia-drony/';
  const today = new Date();

  //ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [alreadyBought, setAlreadyBought] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [course, setCourse] = useState([]);
  const [events, setEvents] = useState([]);
  const [userCourseData, setUserCourseData] = useState([]);
  const [expireDateCourse, setExpireDateCourse] = useState(new Date());
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState({});
  const [showCalendarEventModal, setShowCalendarEventModal] = useState(false);

  // pobieranie danych z bazy
  const fetchCourse = async () => {
    try {
      const response = await fetch(url + 'getCourseSingle.php?data=' + id);
      const course = await response.json();
      setCourse(course);
      setIsLoading(false);
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

  // pobieranie danych czy użytkownik jest już zapisany do kursu
  const fetchUserCourse = async () => {
    // setIsLoading(true);
    // setError(null);
    const data = new FormData();
    data.append('user_id', user.id);
    data.append('course_id', id);
    const href =
      url + 'getUserCourseSingle.php?user= ' + user.id + '&course_id= ' + id;

    try {
      const resp = await fetch(href).then((r) => r.json());
      setUserCourseData(resp);
      setIsLoading(false);

      // jeżeli użytkownik zapisał się już do kursu
      if (resp.length > 0) {
        // jeżeli data wygaśnięcia kursu jeszcze nie nastąpiła to przyznaje prawa użytkownikowi do korzystania z tego kursu
        if (new Date(resp[0].expireDate) >= new Date()) {
          setAlreadyBought(true);
        }
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  // wywołanie metody po załadowaniu componentu
  useEffect(() => {
    fetchCourse();
    fetchCourseEvents();
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserCourse();
    }
  }, [user]);

  useEffect(() => {
    // jeżeli użytkownik jest autorem kursu to dostaje uprawnienia do przeglądania materiałów i nie może go kupić
    //TODO: buguje się po kilkukrotnym odświeżaniu
    if (course[0] && user) {
      if (user.id == course[0].author_id) {
        setAlreadyBought(true);
      }
    }
  });

  const signUpModal = document.getElementById('single-course__sign-up-modal');
  const eventInfoModal = document.querySelectorAll(
    '.single-course__event-info',
  );

  const showSignUpModal = (e) => {
    e.preventDefault();

    if (!user) {
      window.location.href = '/zaloguj';
      return;
    }

    const signUpModal = document.getElementById('single-course__sign-up-modal');
    signUpModal.style.display = 'block';
    setErrMsg(false);
  };

  const closeSignupModal = () => {
    signUpModal.style.display = 'none';
    setErrMsg(false);
  };

  // ukrywa okno, jeżeli użytkownik kliknie poza oknem
  window.onclick = function (event) {
    if (event.target == signUpModal) {
      signUpModal.style.display = 'none';
      setErrMsg(false);
    }
    for (let i = 0; i < eventInfoModal.length; i++) {
      if (event.target == eventInfoModal[i]) {
        eventInfoModal[i].style.display = 'none';
      }
    }

    if (showCalendarEventModal) {
      const eventInfoModal = document.getElementById(
        'user-calendar__event-info-modal',
      );
      if (event.target == eventInfoModal) {
        eventInfoModal.style.display = 'none';
        setShowCalendarEventModal(false);
      }
    }
  };

  // po wybraniu wydarzenia na kalendarzu
  const showCalendarEventInfo = (clickInfo) => {
    // jeżeli użytkownik nie jest zalogowany lub nie kupił kursu to nie wyświetla info
    if (!user || !alreadyBought) return;

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

  /////////////////////////////////////////////////
  const showEventInfoModal = (i) => {
    eventInfoModal[i].style.display = 'block';
  };

  const closeEventInfoModal = (i) => {
    eventInfoModal[i].style.display = 'none';
  };

  const signUp = (e) => {
    e.preventDefault();

    if (parseInt(user.money) < parseInt(course[0].price)) {
      setErrMsg(
        'Nie posiadasz wystarczających środków na koncie, aby zapisać się do tego kursu. Udaj się do swojego konta, aby doładować portfel.',
      );
      return;
    }

    setExpireDateCourse(new Date());
    expireDateCourse.setMonth(expireDateCourse.getMonth() + 1);

    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('course_id', id);
    formData.append('expire_date', expireDateCourse.toISOString());
    formData.append('buyer_id', user.id);
    formData.append('author_id', course[0].author_id);
    formData.append('money', course[0].price);

    const authenticate = async () => {
      axios
        .post(url + 'signUpCourse.php/', formData)
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

  const signUpEvent = (eventId, courseId) => {
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

  if (isLoading) {
    return <LoadingPage />;
  }

  if (course[0]) {
    return (
      <main className='single-course__main'>
        {/* Sign Up Modal */}
        {user && (
          <>
            <div className='single-course__sign-up-body'>
              <div
                className='single-course__sign-up'
                id='single-course__sign-up-modal'
              >
                <div className='single-course__sign-up__container'>
                  <div className='single-course__sign-up__header'></div>
                  <h3 className='single-course__sign-up__h3'>
                    Czy na pewno chcesz zapisać się do tego kursu?
                  </h3>
                  <p className='single-course__sign-up-money'>
                    Posiadasz <span id='user-money'>{user.money} zł</span> na
                    koncie
                    <br />
                    Koszt kursu:{' '}
                    <span id='course-price'>{course[0].price} zł</span>
                    {errMsg && (
                      <div className='single-course__sign-up-err-msg'>
                        {errMsg}
                      </div>
                    )}
                  </p>
                  <p className='single-course__sign-up-expire-date'>
                    Po dokonaniu opłaty kurs i jego materiały będą dostępne do:
                    <br />
                    <span className='single-course__sign-up-date'>
                      {`${new Intl.DateTimeFormat('pl-PL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      }).format(
                        new Date().setMonth(new Date().getMonth() + 1),
                      )}`}
                    </span>
                  </p>
                  <div className='single-course__sign-up-buttons'>
                    <button
                      onClick={signUp}
                      className='single-course__sign-up-accept-btn'
                    >
                      Zapisz się
                    </button>
                    <button
                      onClick={closeSignupModal}
                      className='single-course__sign-up-cancel-btn'
                    >
                      Anuluj
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Calendar Event Modal */}
        {user && alreadyBought && selectedCalendarEvent.id && (
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
                  {new Date(selectedCalendarEvent.date) >=
                    today.setHours(0, 0, 0, 0) && (
                    <div className='single-course__event-info-buttons'>
                      <button
                        onClick={(e) =>
                          signUpEvent(
                            selectedCalendarEvent.id,
                            selectedCalendarEvent.course_id,
                          )
                        }
                        className='single-course__event-info-accept-btn'
                      >
                        Zapisuję się
                      </button>
                      <button
                        onClick={() => closeCalendarEventModal()}
                        className='single-course__event-info-cancel-btn'
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

        {/*  */}
        <div className='single-course__container'>
          <div className='single-course'>
            <div className='single-course__info'>
              <div className='single-course__left-side'>
                <h1 className='single-course__title'>{course[0].title}</h1>
                <p className='single-course__description'>
                  {course[0].description}
                </p>
                <p className='single-course__author'>
                  Autor kursu:{' '}
                  <a href={'/nauczyciel/kursy/' + course[0].author_id}>
                    {course[0].author}
                  </a>
                  {user && user.id == course[0].author_id && (
                    <>
                      <br />
                      Jesteś autorem tego kursu, aby go edytować{' '}
                      <a href={`/zarzadzaj-kursem/${course[0].id}`}>
                        kliknij tutaj
                      </a>
                    </>
                  )}
                </p>
                {!alreadyBought && (
                  <>
                    <p className='single-course__price--tag'>
                      Cena:{' '}
                      <span className='single-course__price'>
                        {course[0].price} zł
                      </span>
                    </p>

                    <button
                      onClick={showSignUpModal}
                      className='single-course__sign-up--btn'
                    >
                      Zapisz się
                    </button>
                  </>
                )}
                {/* jeżeli użytkownik kupił kurs to wyświetla do kiedy jest dostępny */}
                {alreadyBought && (
                  <>
                    <p className='single-course__expire-date-container'>
                      Kurs i jego materiały będą dostępne do:{' '}
                      <span className='single-course__expire-date'>
                        {`${new Intl.DateTimeFormat('pl-PL', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                        }).format(new Date(userCourseData[0].expireDate))}`}
                      </span>
                    </p>
                  </>
                )}
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

            {events.length > 0 ? (
              <div className='single-course__events-container'>
                <div className='single-course__events-title'>
                  <h1>Nadchodzące wydarzenia</h1>
                  {!alreadyBought && (
                    <p>
                      Wykup kurs, aby zapisywać się do wydarzeń i przeglądać ich
                      materiały naukowe.
                    </p>
                  )}
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
                  {/* filtruje tylko wydarzenia, które jeszcze się datowo nie odbyły oraz sortuje je od najbliższych (wyłączone) */}
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
                                    onClick={() => signUpEvent(id, course_id)}
                                    className='single-course__event-info-accept-btn'
                                  >
                                    Zapisuję się
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

                          {/* Single event */}
                          <div className='single-course__single-event-info'>
                            <p className='single-course__single-event-info-date'>
                              {`${new Intl.DateTimeFormat('pl-PL', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              }).format(new Date(date))}`}
                            </p>
                            <p className='single-course__single-event-info-title'>
                              {title}
                            </p>
                            {/* jeżeli użytkownik kupił kurs lub jest jego właścicielem to ma dostęp do jego materiałów */}
                            {alreadyBought && (
                              <button
                                onClick={() => showEventInfoModal(i)}
                                className='single-course__single-event-read-more-btn'
                              >
                                Przeglądaj
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ) : (
              <h3>Autor tego kursu nie dodał jeszcze żadnych wydarzeń</h3>
            )}
          </div>
        </div>
      </main>
    );
  }
};

export default CourseSingle;
