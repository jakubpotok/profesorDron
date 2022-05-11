/** @format */

import React from 'react';
import './courseevent-create.css';
import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CourseEventCreate = (courseId) => {
  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  // pobieranie zmiennych z pliku UserContext.js
  const { wait } = useContext(UserContext);

  //ustawianie stanu zmiennych
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeLink: '',
  });

  //zmiana stanu formData przy wpisywaniu danych w inpucie
  const onChangeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //zatwierdzenie formularza
  const submitForm = async (e) => {
    e.preventDefault();

    if (formData.title.trim() === '' || formData.description.trim() === '') {
      setSuccessMsg('');
      setErrMsg('Wypełnij wszystkie pola');
      return;
    }

    if (formData.title.length > 255) {
      setSuccessMsg('');
      setErrMsg('Nazwa wydarzenia jest za długa');
      return;
    }

    if (formData.title.length <= 5) {
      setSuccessMsg('');
      setErrMsg('Tytuł wydarzenia jest za krótki');
      return;
    }

    if (formData.youtubeLink.length > 0) {
      if (!formData.youtubeLink.includes('https://www.youtube.com/watch?v=')) {
        setSuccessMsg('');
        setErrMsg('Podano niepoprawny link YouTube');
        return;
      }
    }

    if (formData.description.length > 3000) {
      setSuccessMsg('');
      setErrMsg('Opis wydarzenia jest za długi');
      return;
    }

    setIsSubmitted(true);
    setErrMsg('');
  };

  // Po przyjęciu formularza, przesyła dane do bazy danych
  useEffect(() => {
    const formDataFinal = new FormData();
    formDataFinal.append('course_id', Object.values(courseId)[0]);
    formDataFinal.append('title', formData.title);
    formDataFinal.append('youtubeLink', formData.youtubeLink);
    formDataFinal.append('description', formData.description);
    formDataFinal.append('date', selectedDate.toISOString());

    const authenticate = async () => {
      axios
        .post(url + 'createCourseEvent.php/', formDataFinal)
        .then((response) => {
          console.log(response.data);
          setIsSubmitted(false);
          setSuccessMsg('Wydarzenie zostało pomyślnie dodane');
          setFormData({ title: '', description: '' });
          window.location.reload(true);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isSubmitted) {
      authenticate();
    }
  }, [isSubmitted]);

  const eventModal = document.getElementById('event-modal');

  const closeModal = () => {
    eventModal.style.display = 'none';
  };

  // ukrywa okno, jeżeli użytkownik kliknie poza oknem
  window.onclick = function (event) {
    if (event.target == eventModal) {
      eventModal.style.display = 'none';
    }
  };

  return (
    <>
      <div className='event-body'>
        <div className='event-create' id='event-modal'>
          <div className='event-create__container'>
            <div className='event-create__header'>
              <span onClick={closeModal} className='event-create__close'>
                &times;
              </span>
            </div>
            <h3 className='event-create__heading3'>Dodaj wydarzenie</h3>
            <form onSubmit={submitForm}>
              <div className='event-create__field'>
                <label htmlFor='title' className='event-create__form-label'>
                  Tytuł spotkania
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.title}
                  className='event-create__input'
                  type='text'
                  name='title'
                  placeholder='Wpisz tytuł spotkania'
                />
              </div>
              <div className='event-create__field'>
                <label htmlFor='title' className='event-create__form-label'>
                  Link do filmiku youtube (opcjonalne)
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.youtubeLink}
                  className='event-create__input'
                  type='text'
                  name='youtubeLink'
                  placeholder='Wklej link do filmiku'
                />
              </div>
              <div className='event-create__field'>
                <label
                  htmlFor='description'
                  className='event-create__form-label'
                >
                  Opis spotkania/Materiały pomocnicze
                </label>
                <textarea
                  onChange={onChangeInput}
                  value={formData.description}
                  className='event-create__description'
                  type='textarea'
                  name='description'
                  rows='7'
                  cols='59'
                  placeholder='Opisz spotkanie'
                />
              </div>
              <div className='event-create__calendar--container'>
                <div className='event-create__calendar-title'>
                  Wybierz dzień wydarzenia
                </div>
                <div className='event-create__calendar'>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    minDate={new Date()}
                    maxDate={new Date(2030, 1, 1)}
                  />
                </div>
                <div className='event-create__calendar-picked-day'>
                  Wybrany dzień to:{' '}
                  {selectedDate &&
                    `${new Intl.DateTimeFormat('pl-PL', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(selectedDate)}`}
                </div>
              </div>
              {successMsg && (
                <div className='event-create__success-msg'>{successMsg}</div>
              )}
              {errMsg && <div className='event-create__err-msg'>{errMsg}</div>}
              <button
                className='event-create__button'
                type='submit'
                disabled={wait}
              >
                Stwórz wydarzenie
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEventCreate;
