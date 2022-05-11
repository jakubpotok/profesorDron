/** @format */

import { wait } from '@testing-library/user-event/dist/utils';
import React from 'react';
import './login.css';
import { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Login = () => {
  // pobieranie metod z pliku UserContext.js
  const { loginUser, wait, loggedInCheck } = useContext(UserContext);

  //ustawianie stanu zmiennych
  const [redirect, setRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      setErrMsg('Wypełnij wszystkie pola');
      return;
    }

    const data = await loginUser(formData);
    if (data.success) {
      e.target.reset();
      setRedirect('Zalogowano pomyślnie');
      await loggedInCheck();
      window.location.href = '/';
      return;
    }
    setErrMsg(data.message);
  };

  return (
    <>
      <main className='login'>
        <div className='login-container'>
          <h3 className='login__heading3'>Logowanie</h3>
          <form onSubmit={submitForm}>
            <div className='login__field'>
              <label htmlFor='email' className='login__form-label'>
                Email
              </label>
              <input
                onChange={onChangeInput}
                value={formData.email}
                className='login__input'
                type='email'
                name='email'
                placeholder='Wpisz e-mail'
              />
            </div>
            <div className='login__field'>
              <label htmlFor='password' className='login__form-label'>
                Hasło
              </label>
              <input
                onChange={onChangeInput}
                value={formData.password}
                className='login__input'
                type='password'
                name='password'
                placeholder='Wpisz hasło'
              />
            </div>
            {errMsg && <div className='login__err-msg'>{errMsg}</div>}
            {redirect ? (
              <>
                <div className='login__success-msg'>{redirect}</div>
                <a href='/' className='login__redirect'>
                  Kliknij, aby przejść do strony głównej
                </a>
              </>
            ) : (
              <>
                <button className='login__button' type='submit' disabled={wait}>
                  Zaloguj się
                </button>
                <div className='login__no-account'>
                  Nie posiadasz konta?&nbsp;
                  <a href='/zarejestruj'>Zarejestruj się</a>
                </div>
              </>
            )}
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;
