/** @format */

import React from 'react';
import './adminteacherapplications.css';
import { useState, useEffect, useContext } from 'react';
import LoadingPage from './LoadingPage';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AdminTeacherApplications = () => {
  const { user } = useContext(UserContext);
  const url = 'http://localhost/szkolenia-drony/';

  const [isLoading, setIsLoading] = useState(true);
  const [teacherApplications, setTeacherApplications] = useState([]);

  // pobieranie danych z bazy
  const fetchTeacherApplications = async () => {
    try {
      const response = await fetch(url + 'getTeacherApplicationsAll.php/');
      const applications = await response.json();
      setTeacherApplications(applications);
      // console.log(applications);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // wywołanie metody po załadowaniu componentu
  useEffect(() => {
    fetchTeacherApplications();
  }, []);

  const acceptApplication = (userId) => {
    if (window.confirm('Czy na pewno chcesz zaakceptować to podanie?')) {
      const data = JSON.stringify({ user_id: userId });
      console.log(data);
      const acceptApplication = async () => {
        axios
          .post(url + 'teacherApplicationAccept.php/', data)
          .then((response) => {
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      acceptApplication();
    }
  };

  const denyApplication = (userId) => {
    if (window.confirm('Czy na pewno chcesz odrzucić to podanie?')) {
      const data = JSON.stringify({ user_id: userId });
      console.log(data);
      const denyApplication = async () => {
        axios
          .post(url + 'teacherApplicationDeny.php/', data)
          .then((response) => {
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      denyApplication();
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isLoading) {
    return (
      <>
        <main className='teacher-applications__main'>
          <div className='teacher-applications__container'>
            <div className='teacher-applications'>
              <div className='teacher-applications__info'>
                <div className='teacher-applications__info-container'>
                  <p className='teacher-applications-info-text'>
                    Podania użytkowników o zostanie nauczycielem
                  </p>
                  <div className='teacher-applications__underline'></div>
                </div>
              </div>
              {/* <div className='teacher-applications__underline'></div> */}
              {teacherApplications.length > 0 ? (
                <div className='teacher-applications__application-container'>
                  <div className='single-course__events-title'>
                    <h1>Oczekujące Podania</h1>
                  </div>
                  <div className='teacher-applications__applications'>
                    {/* iteruje przez wszystkie wydarzenia */}
                    {/* filtruje tylko wydarzenia, które jeszcze się datowo nie odbyły oraz sortuje je od najbliższych */}
                    {teacherApplications.map((application) => {
                      const { id, user_id, username } = application;

                      return (
                        <div
                          className='teacher-applications__single-application'
                          key={id}
                        >
                          <p className='teacher-applications__single-application-title'>
                            {username}
                          </p>
                          <div className='teacher-applications-single-application-button-container'>
                            <button
                              onClick={() => acceptApplication(user_id)}
                              className='teacher-applications__single-application-button teacher-applications__single-application-accept-btn'
                            >
                              Akceptuj
                            </button>
                            <button
                              onClick={() => denyApplication(user_id)}
                              className='teacher-applications__single-application-button teacher-applications__single-application-deny-btn'
                            >
                              Odrzuć
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <h3>Brak podań</h3>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default AdminTeacherApplications;
