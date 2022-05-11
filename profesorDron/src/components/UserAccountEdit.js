/** @format */

import React from 'react';
import './courseevent-edit.css';
import { UserContext } from '../context/UserContext';
import { useState, useContext, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

const UserAccountEdit = ({ userId, name, email }) => {
  const { updateUser, wait } = useContext(UserContext);

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  const userEditModal = document.getElementById('user-edit-modal');

  const closeModal = () => {
    userEditModal.style.display = 'none';
  };

  // ukrywa okno, jeżeli użytkownik kliknie poza oknem
  window.onclick = function (event) {
    if (event.target == userEditModal) {
      userEditModal.style.display = 'none';
    }
  };

  //ustawianie stanu zmiennych
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    setFormData({ id: userId, name: name, email: email });
  }, [userId]);

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

    // if (!Object.values(formData).every((val) => val.trim() !== '')) {
    //   setSuccessMsg('');
    //   setErrMsg('Wypełnij wszystkie pola');
    //   return;
    // }

    if (formData.name.length > 30) {
      setSuccessMsg('');
      setErrMsg('Nazwa użytkownika jest za długa (max 30)');
      return;
    }

    if (formData.name.length < 4) {
      setSuccessMsg('');
      setErrMsg('Nazwa użytkownika jest za krótka (min 4)');
      return;
    }

    if (formData.password && formData.password.length < 5) {
      setSuccessMsg('');
      setErrMsg('Hasło jest za krótkie (min 5)');
      return;
    }

    if (formData.email.length > 50) {
      setSuccessMsg('');
      setErrMsg('Adres email jest za długi');
      return;
    }

    if (formData.email.length < 5) {
      setSuccessMsg('');
      setErrMsg('Adres email jest za krótki');
      return;
    }

    const data = await updateUser(formData);
    if (data.success) {
      e.target.reset();
      setFormData({ id: '', name: '', email: '', password: '' });
      setErrMsg(false);
      setSuccessMsg('Zaktualizowano pomyślnie');
      window.location.reload(true);
    } else if (!data.success && data.message) {
      setSuccessMsg(false);
      setErrMsg(data.message);
    }
  };

  return (
    <>
      <div className='event-body'>
        <div className='event-edit' id='user-edit-modal'>
          <div className='event-edit__container'>
            <div className='event-edit__header'>
              <span onClick={closeModal} className='event-edit__close'>
                &times;
              </span>
            </div>
            <h3 className='event-edit__heading3'>Edytuj konto</h3>
            <form onSubmit={submitForm}>
              <div className='event-edit__field'>
                <label htmlFor='title' className='event-edit__form-label'>
                  Nowa nazwa użytkownika
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.name}
                  className='event-edit__input'
                  type='text'
                  name='name'
                  placeholder='Wpisz nową nazwę użytkownika'
                />
              </div>
              <div className='event-edit__field'>
                <label htmlFor='title' className='event-edit__form-label'>
                  Nowy email
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.email}
                  className='event-edit__input'
                  type='email'
                  name='email'
                  placeholder='Wpisz nowy email'
                />
              </div>
              <div className='event-edit__field'>
                <label htmlFor='password' className='event-edit__form-label'>
                  Hasło
                </label>
                <input
                  onChange={onChangeInput}
                  value={formData.password}
                  className='register__input'
                  type='password'
                  name='password'
                  placeholder='Wpisz hasło'
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
                Zatwierdź zmiany
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccountEdit;
