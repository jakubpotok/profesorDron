/** @format */

import React from 'react';
import './courseevent-edit.css';
import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const CourseEdit = ({ courseId, title, description, price }) => {
  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  const eventModal = document.getElementById('course-edit-modal');

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
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  useEffect(() => {
    setFormData({ title: title, description: description, price: price });
  }, [courseId]);

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

    if (!Object.values(formData).every((val) => val.trim() !== '')) {
      setSuccessMsg('');
      setErrMsg('Wypełnij wszystkie pola');
      return;
    }

    if (isNaN(formData.price)) {
      setErrMsg('Cena produktu musi być liczbą');
      return;
    }

    if (formData.title.length > 150) {
      setSuccessMsg('');
      setErrMsg('Nazwa wydarzenia jest za długa');
      return;
    }

    if (formData.title.length <= 5) {
      setSuccessMsg('');
      setErrMsg('Tytuł wydarzenia jest za krótki');
      return;
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
    formDataFinal.append('course_id', courseId);
    formDataFinal.append('title', formData.title);
    formDataFinal.append('description', formData.description);
    formDataFinal.append('price', formData.price);

    const authenticate = async () => {
      axios
        .post(url + 'updateCourse.php/', formDataFinal)
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
        <div className='event-edit' id='course-edit-modal'>
          <div className='event-edit__container'>
            <div className='event-edit__header'>
              <span onClick={closeModal} className='event-edit__close'>
                &times;
              </span>
            </div>
            <h3 className='event-edit__heading3'>Edytuj kurs</h3>
            <form onSubmit={submitForm}>
              <div className='event-edit__field'>
                <label htmlFor='title' className='event-edit__form-label'>
                  Tytuł kursu
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.title}
                  className='event-edit__input'
                  type='text'
                  name='title'
                  placeholder='Wpisz tytuł kursu'
                />
              </div>
              <div className='event-edit__field'>
                <label htmlFor='description' className='event-edit__form-label'>
                  Opis kursu
                </label>
                <textarea
                  onChange={onChangeInput}
                  value={formData.description}
                  className='event-edit__description'
                  type='textarea'
                  name='description'
                  rows='7'
                  cols='59'
                  placeholder='Opisz kurs'
                />
              </div>
              <div className='event-edit__field'>
                <label htmlFor='title' className='event-edit__form-label'>
                  Cena kursu
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.price}
                  className='event-edit__input'
                  type='text'
                  name='price'
                  placeholder='Wpisz cenę kursu'
                />
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
                Edytuj kurs
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseEdit;
