/** @format */

import React from 'react';
import './courseevent-edit.css';
import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CourseEventEdit = ({
  eventId,
  courseId,
  title,
  description,
  youtubeLink,
}) => {
  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  const eventModal = document.getElementById('event-edit-modal');

  const closeModal = () => {
    eventModal.style.display = 'none';
  };

  // ukrywa okno, jeżeli użytkownik kliknie poza oknem
  window.onclick = function (event) {
    if (event.target == eventModal) {
      eventModal.style.display = 'none';
    }
  };

  // pobieranie zmiennych z pliku UserContext.js
  const { wait } = useContext(UserContext);

  //ustawianie stanu zmiennych
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    youtubeLink: '',
    description: '',
  });

  useEffect(() => {
    setFormData({
      title: title,
      description: description,
      youtubeLink: youtubeLink,
    });
  }, [eventId]);

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
      if (
        !formData.youtubeLink.includes('https://www.youtube.com/watch?v=') &&
        !formData.youtubeLink.length == 43
      ) {
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
    formDataFinal.append('event_id', eventId);
    formDataFinal.append('title', formData.title);
    formDataFinal.append('youtubeLink', formData.youtubeLink);
    formDataFinal.append('description', formData.description);
    formDataFinal.append('date', selectedDate.toISOString());

    const authenticate = async () => {
      axios
        .post(url + 'updateCourseEvent.php/', formDataFinal)
        .then((response) => {
          console.log(response.data);
          setIsSubmitted(false);
          setSuccessMsg('Wydarzenie zostało pomyślnie zedytowane');
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

  return (
    <>
      <div className='event-body'>
        <div className='event-edit' id='event-edit-modal'>
          <div className='event-edit__container'>
            <div className='event-edit__header'>
              <span onClick={closeModal} className='event-edit__close'>
                &times;
              </span>
            </div>
            <h3 className='event-edit__heading3'>Edytuj wydarzenie</h3>
            <form onSubmit={submitForm}>
              <div className='event-edit__field'>
                <label htmlFor='title' className='event-edit__form-label'>
                  Tytuł spotkania
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.title}
                  className='event-edit__input'
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
              <div className='event-edit__field'>
                <label htmlFor='description' className='event-edit__form-label'>
                  Opis spotkania/Materiały pomocnicze
                </label>
                <textarea
                  onChange={onChangeInput}
                  value={formData.description}
                  className='event-edit__description'
                  type='textarea'
                  name='description'
                  rows='7'
                  cols='59'
                  placeholder='Opisz spotkanie'
                />
              </div>
              <div className='event-edit__calendar--container'>
                <div className='event-edit__calendar-title'>
                  Wybierz dzień wydarzenia
                </div>
                <div className='event-edit__calendar'>
                  <Calendar
                    onChange={setSelectedDate}
                    value={selectedDate}
                    minDate={new Date()}
                    maxDate={new Date(2030, 1, 1)}
                  />
                </div>
                <div className='event-edit__calendar-picked-day'>
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
                <div className='event-edit__success-msg'>{successMsg}</div>
              )}
              {errMsg && <div className='event-edit__err-msg'>{errMsg}</div>}
              <button
                className='event-edit__button'
                type='submit'
                disabled={wait}
              >
                Edytuj wydarzenie
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEventEdit;
