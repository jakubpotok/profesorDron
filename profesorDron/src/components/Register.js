/** @format */

import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import './register.css';
import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const Register = () => {
  //ustawianie stanu zmiennych
  const { registerUser, wait } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
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

    if (!Object.values(formData).every((val) => val.trim() !== '')) {
      setSuccessMsg(false);
      setErrMsg('Wypełnij wszystkie pola');
      return;
    }
    if (formData.password !== formData.password2) {
      setSuccessMsg(false);
      setErrMsg('Hasła nie są identyczne');
      return;
    }
    if (formData.name >= 50) {
      setSuccessMsg(false);
      setErrMsg('Nazwa użytkownika jest za długa');
      return;
    }
    if (formData.email >= 50) {
      setSuccessMsg(false);
      setErrMsg('Podany email jest za długi');
      return;
    }
    if (formData.password <= 50) {
      setSuccessMsg(false);
      setErrMsg('Podane hasło jest za długie');
      return;
    }

    const data = await registerUser(formData);
    if (data.success) {
      e.target.reset();
      setFormData({ name: '', email: '', password: '' });
      setSuccessMsg('Zarejestrowano pomyślnie');
      setErrMsg(false);
      window.location.href = '/';
    } else if (!data.success && data.message) {
      setSuccessMsg(false);
      setErrMsg(data.message);
    }
  };

  return (
    <>
      <main className='register'>
        <div className='register-container'>
          <h3 className='register__heading3'>Rejestracja</h3>
          <form onSubmit={submitForm}>
            <div className='register__field'>
              <label htmlFor='name' className='register__form-label'>
                Imię i Nazwisko
              </label>
              <input
                onChange={onChangeInput}
                value={formData.name}
                className='register__input'
                type='text'
                name='name'
                placeholder='Wpisz Imię i Nazwisko'
              />
            </div>
            <div className='register__field'>
              <label htmlFor='email' className='register__form-label'>
                Email
              </label>
              <input
                onChange={onChangeInput}
                value={formData.email}
                className='register__input'
                type='email'
                name='email'
                placeholder='Wpisz e-mail'
              />
            </div>
            <div className='register__field'>
              <label htmlFor='password' className='register__form-label'>
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
            <div className='register__field'>
              <label htmlFor='password2' className='register__form-label'>
                Powtórz Hasło
              </label>
              <input
                onChange={onChangeInput}
                value={formData.password2}
                className='register__input'
                type='password'
                name='password2'
                placeholder='Powtórz hasło'
              />
            </div>
            {successMsg && (
              <div className='register__success-msg'>{successMsg}</div>
            )}
            {errMsg && <div className='register__err-msg'>{errMsg}</div>}
            <button className='register__button' type='submit' disabled={wait}>
              Utwórz konto
            </button>
            <div className='register__already-a-member'>
              Posiadasz już konto?&nbsp;<a href='/zaloguj'>Zaloguj się</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;
