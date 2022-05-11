/** @format */

import React from 'react';
import './adminteacherapplications.css';
import { useState, useEffect, useContext } from 'react';
import LoadingPage from './LoadingPage';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const AdminManageTeachers = () => {
  const { user } = useContext(UserContext);
  const url = 'http://localhost/szkolenia-drony/';

  const [isLoading, setIsLoading] = useState(true);
  const [teacherApplications, setTeacherApplications] = useState([]);
  const [teachers, setTeachers] = useState([]);

  // pobieranie danych z bazy
  const fetchTeachers = async () => {
    try {
      const response = await fetch(url + 'getTeachers.php/');
      const teachers = await response.json();
      setTeachers(teachers);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // wywołanie metody po załadowaniu componentu
  useEffect(() => {
    fetchTeachers();
  }, []);

  const takeTeacherPermissions = (userId, name) => {
    if (
      window.confirm(
        `Czy na pewno chcesz zabrać uprawnienia nauczyciela użytkownikowi '${name}'?`,
      )
    ) {
      const data = JSON.stringify({ user_id: userId });

      const takePermissions = async () => {
        axios
          .post(url + 'adminTakeTeacherPermissions.php/', data)
          .then((response) => {
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      takePermissions();
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
                    Wszyscy nauczyciele
                  </p>
                  <div className='teacher-applications__underline'></div>
                </div>
              </div>
              {/* <div className='teacher-applications__underline'></div> */}
              {teachers.length > 0 ? (
                <div className='teacher-applications__application-container'>
                  <div className='teacher-applications__applications'>
                    {/* iteruje przez wszystkie wydarzenia */}
                    {/* filtruje tylko wydarzenia, które jeszcze się datowo nie odbyły oraz sortuje je od najbliższych */}
                    {teachers.map((teacher) => {
                      const { id, name, email } = teacher;

                      return (
                        <div
                          className='teacher-applications__single-application'
                          key={id}
                        >
                          <p className='teacher-applications__single-application-title'>
                            {name} - {email}
                          </p>
                          <div className='teacher-applications-single-application-button-container'>
                            <button
                              onClick={() => takeTeacherPermissions(id, name)}
                              className='teacher-applications__single-application-button teacher-applications__single-application-deny-btn'
                            >
                              Zabierz uprawnienia nauczyciela
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <h3>Brak nauczycieli</h3>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default AdminManageTeachers;
