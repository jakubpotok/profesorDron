/** @format */

import React from 'react';
import './footer.css';
import { IconContext } from 'react-icons';
import { FaFacebook, FaYoutube, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer__container'>
        <div className='footer__top'>
          <a href='/' className='footer__logo-container'>
            <img
              className='footer__logo'
              src='https://i.imgur.com/ge6lwse.png'
              alt='profesorDron'
            />
          </a>
          <ul className='footer__nav'>
            <li className='footer__nav-item'>
              <a href='/kursy' className='footer__nav-link'>
                Kursy
              </a>
            </li>
            <li className='footer__nav-item'>
              <a href='/' className='footer__nav-link'>
                Kontakt
              </a>
            </li>
            <li className='footer__nav-item'>
              <a href='/' className='footer__nav-link'>
                O nas
              </a>
            </li>
          </ul>
          <ul className='footer__socials'>
            <li className='footer__social-item'>
              <a
                href='https://www.facebook.com/'
                className='footer__social-link'
              >
                <IconContext.Provider
                  value={{
                    size: '35px',
                    color: '#3B5998',
                  }}
                >
                  <FaFacebook />
                </IconContext.Provider>
              </a>
            </li>
            <li className='footer__social-item'>
              <a
                href='https://www.youtube.com/'
                className='footer__social-link'
              >
                <IconContext.Provider
                  value={{
                    size: '35px',
                    color: '#FF0000',
                  }}
                >
                  <FaYoutube />
                </IconContext.Provider>
              </a>
            </li>
            <li className='footer__social-item'>
              <a href='https://twitter.com/' className='footer__social-link'>
                <IconContext.Provider
                  value={{
                    size: '35px',
                    color: '#55ACEE',
                  }}
                >
                  <FaTwitter />
                </IconContext.Provider>
              </a>
            </li>
            <li className='footer__social-item'>
              <a
                href='https://www.instagram.com/'
                className='footer__social-link'
              >
                <IconContext.Provider
                  value={{
                    size: '35px',
                    color: '#8134AF',
                  }}
                >
                  <FaInstagram />
                </IconContext.Provider>
              </a>
            </li>
          </ul>
        </div>
        <div className='footer__copyright'>
          © Copyright 2022 profesorDron. Wszelkie prawa zastrzeżone.
        </div>
      </div>
    </div>
  );
};

export default Footer;
