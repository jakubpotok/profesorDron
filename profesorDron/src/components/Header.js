/** @format */

import React, { useEffect } from 'react';
import './header.css';
import { IconContext } from 'react-icons';
import { HiMenu } from 'react-icons/hi';
import { MdOutlineArrowDropDown } from 'react-icons/md';
import { MdOutlineArrowDropUp } from 'react-icons/md';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Header = () => {
  // pobieranie zmiennej i metody z pliku UserContext.js
  const { user, logout } = useContext(UserContext);

  const toggleSidebar = () => {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.display !== 'flex') {
      sidebar.style.display = 'flex';
    } else {
      sidebar.style.display = 'none';
    }
  };

  // odpowiada za kliknięcie rozszerzany sidebar
  useEffect(() => {
    const headerMenuBtn = document.querySelector('.header__menu-icon');
    headerMenuBtn.addEventListener('click', toggleSidebar);

    return () => {
      headerMenuBtn.removeEventListener('click', toggleSidebar);
    };
  });

  return (
    <>
      <header className='header'>
        <div className='container header__container'>
          <a className='header__logo-container' href='/'>
            <img
              className='header__logo'
              src='https://i.imgur.com/ge6lwse.png'
              alt='profesorDron'
            />
          </a>
          <div className='header__items'>
            <a href='/kursy' className='header__item'>
              Kursy
            </a>
            {user && (
              <>
                <a href='/kalendarz' className='header__item'>
                  Kalendarz
                </a>
              </>
            )}
          </div>
          <div className='header__right-section'>
            {!user && (
              <>
                <a href='/zaloguj'>
                  <button className='header__btns header__login-btn'>
                    Zaloguj się
                  </button>
                </a>
                <a href='/zarejestruj'>
                  <button className='header__btns header__register-btn'>
                    Zarejestruj się
                  </button>
                </a>
              </>
            )}
            {user && (
              <>
                <div className='header__items'>
                  {user.role != 0 && (
                    <>
                      <div className='header__dropdown'>
                        <div className='header__dropdown-main'>
                          <span className='header__item'>Zarządzaj</span>
                          <IconContext.Provider
                            value={{
                              size: '30px',
                              className: 'header__dropdown-icon',
                            }}
                          >
                            <MdOutlineArrowDropDown />
                          </IconContext.Provider>
                          <IconContext.Provider
                            value={{
                              size: '30px',
                              className: 'header__dropup-icon',
                            }}
                          >
                            <MdOutlineArrowDropUp />
                          </IconContext.Provider>
                        </div>
                        <div className='header__dropdown-content'>
                          {user.role == 2 && (
                            <>
                              <p className='header__dropdown-admin-title'>
                                Panel administratora
                              </p>
                              <div className='header__dropdown-items'>
                                <a
                                  href='/zarzadzaj-wszystkimi-kursami'
                                  className='header__dropdown-item'
                                >
                                  Zarządzaj wszystkimi kursami
                                </a>
                                <a
                                  href='/zarzadzaj-nauczycielami'
                                  className='header__dropdown-item'
                                >
                                  Zarządzaj nauczycielami
                                </a>
                                <a
                                  href='/podania-nauczyciel'
                                  className='header__dropdown-item'
                                >
                                  Podania o nauczyciela
                                </a>
                              </div>
                              <div className='header__dropdown-underline'></div>
                            </>
                          )}
                          <p className='header__dropdown-teacher-title'>
                            Panel nauczyciela
                          </p>
                          <div className='header__dropdown-items'>
                            <a
                              href='/utworz-kurs'
                              className='header__dropdown-item'
                            >
                              Utwórz kurs
                            </a>
                            <a
                              href='/zarzadzaj-kursami'
                              className='header__dropdown-item'
                            >
                              Zarządzaj moimi kursami
                            </a>
                            <a
                              href='/zarzadzaj-wydarzeniami'
                              className='header__dropdown-item'
                            >
                              Zarządzaj moimi wydarzeniami
                            </a>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  <a href='/moje-kursy' className='header__item'>
                    Moje kursy
                  </a>
                  <a href='/moje-konto' className='header__item'>
                    Moje konto
                  </a>
                </div>
                <button
                  onClick={logout}
                  className='header__btns header__logout-btn'
                >
                  Wyloguj
                </button>
              </>
            )}
            <IconContext.Provider
              value={{ size: '40px', className: 'header__menu-icon' }}
            >
              <HiMenu />
            </IconContext.Provider>
          </div>
        </div>
      </header>
      <nav id='sidebar' className='sidebar'>
        <div className='sidebar__items'>
          <div className='sidebar__item-menu'>Menu</div>
          <a href='/' className='sidebar__item'>
            Strona główna
          </a>
          <a href='/kursy' className='sidebar__item'>
            Kursy
          </a>
          {user && (
            <>
              <a href='/kalendarz' className='sidebar__item'>
                Kalendarz
              </a>
            </>
          )}
          {/* Jeżeli użytkownik jest wylogowany: */}
          {!user && (
            <>
              <a href='/zaloguj' className='sidebar__item'>
                Zaloguj się
              </a>
              <a href='/zarejestruj' className='sidebar__item'>
                Zarejestruj się
              </a>
            </>
          )}
          {/* Jeżeli użytkownik jest zalogowany: */}
          {user && (
            <>
              <a href='/moje-kursy' className='sidebar__item'>
                Moje kursy
              </a>
              <a href='/moje-konto' className='sidebar__item'>
                Moje konto
              </a>
              <div onClick={logout} className='sidebar__item'>
                Wyloguj się
              </div>
            </>
          )}
          {user && user.role == 2 && (
            <>
              <div className='header__dropdown-underline'></div>
              <p className='sidebar__admin-panel'>Panel administratora</p>
              <a href='/zarzadzaj-wszystkimi-kursami' className='sidebar__item'>
                Zarządzaj wszystkimi kursami
              </a>
              <a href='/zarzadzaj-nauczycielami' className='sidebar__item'>
                Zarządzaj nauczycielami
              </a>
              <a href='/podania-nauczyciel' className='sidebar__item'>
                Podania o nauczyciela
              </a>
            </>
          )}
          {user && user.role != 0 && (
            <>
              <div className='header__dropdown-underline'></div>
              <p className='sidebar__teacher-panel'>Panel nauczyciela</p>
              <a href='/utworz-kurs' className='sidebar__item'>
                Utwórz Kurs
              </a>
              <a href='/zarzadzaj-kursami' className='sidebar__item'>
                Zarządzaj moimi kursami
              </a>
              <a href='/zarzadzaj-wydarzeniami' className='sidebar__item'>
                Zarządzaj moimi wydarzeniami
              </a>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Header;
