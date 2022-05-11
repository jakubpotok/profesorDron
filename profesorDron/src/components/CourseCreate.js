/** @format */

import React, { useEffect } from 'react';
import './coursecreate.css';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';

const CourseCreate = () => {
  // pobieranie zmiennych z pliku UserContext.js
  const { user, wait } = useContext(UserContext);

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  //ustawianie stanu zmiennych
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });

  //ustawianie zmiennej pliku
  const [selectedFile, setSelectedFile] = useState();
  const fileSelectedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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
      setErrMsg('Wypełnij wszystkie pola');
      return;
    }

    if (!selectedFile) {
      setErrMsg('Zdjęcie nie zostało wybrane');
      return;
    }

    if (isNaN(formData.price)) {
      setErrMsg('Cena produktu musi być liczbą');
      return;
    }

    if (formData.title.length > 150) {
      setSuccessMsg('');
      setErrMsg('Tytuł kursu jest za długi');
      return;
    }

    if (formData.title.length <= 5) {
      setSuccessMsg('');
      setErrMsg('Tytuł kursu jest za krótki');
      return;
    }

    if (formData.description.length > 3000) {
      setSuccessMsg('');
      setErrMsg('Opis kursu jest za długi');
      return;
    }

    setIsSubmitted(true);
    setErrMsg('');
  };

  // Po przyjęciu formularza, przesyła dane do bazy danych
  useEffect(() => {
    const formDataFinal = new FormData();
    formDataFinal.append('author_id', user.id);
    formDataFinal.append('author', user.name);
    formDataFinal.append('title', formData.title);
    formDataFinal.append('description', formData.description);
    formDataFinal.append('price', formData.price);
    formDataFinal.append('image', selectedFile);

    const authenticate = async () => {
      console.log(formDataFinal);
      console.log(formDataFinal.entries());
      axios
        .post(url + 'createCourse.php/', formDataFinal)
        .then((response) => {
          console.log(response.data);
          setIsSubmitted(false);
          setSuccessMsg('Kurs został pomyślnie utworzony');
          window.location.href = '/zarzadzaj-kursami';
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isSubmitted) authenticate();
  }, [isSubmitted]);

  return (
    <main className='course-create'>
      <div className='course-create__container'>
        <h3 className='course-create__heading3'>Utwórz Kurs</h3>
        <form onSubmit={submitForm}>
          <div className='course-create__field'>
            <label htmlFor='title' className='course-create__form-label'>
              Tytuł
            </label>
            <input
              onChange={onChangeInput}
              value={formData.title}
              className='course-create__input'
              type='text'
              name='title'
              placeholder='Wpisz tytuł kursu'
            />
          </div>
          <div className='course-create__field'>
            <label htmlFor='description' className='course-create__form-label'>
              Opis kursu
            </label>
            <textarea
              onChange={onChangeInput}
              value={formData.description}
              className='course-create__description'
              type='textarea'
              name='description'
              rows='7'
              cols='59'
              placeholder='Opisz swój kurs'
            />
          </div>
          <div className='course-create__field'>
            <label htmlFor='price' className='course-create__form-label'>
              Cena
            </label>
            <input
              onChange={onChangeInput}
              value={formData.price}
              className='course-create__input'
              type='text'
              name='price'
              placeholder='Wpisz cenę kursu (PLN)'
            />
          </div>
          <div className='course-create__field'>
            <label htmlFor='image' className='course-createform-label'>
              Zdjęcie kursu
              <br />
            </label>
            <input
              id='image'
              type='file'
              name='image'
              accept='.jpg,.jpeg,.png'
              className='form-input'
              value={formData.image}
              onChange={fileSelectedHandler}
            />
          </div>
          {successMsg && (
            <div className='create-course__success-msg'>{successMsg}</div>
          )}
          {errMsg && <div className='create-course__err-msg'>{errMsg}</div>}
          <button
            className='create-course__button'
            type='submit'
            disabled={wait}
          >
            Utwórz Kurs
          </button>
        </form>
      </div>
    </main>
  );
};

export default CourseCreate;
