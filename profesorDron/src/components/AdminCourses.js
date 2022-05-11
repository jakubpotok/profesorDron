/** @format */

import React from 'react';
import './teachercourses.css';
import CourseCard from './CourseCard';
import { useContext, useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import { UserContext } from '../context/UserContext';

const AdminCourses = () => {
  //ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';

  const { user } = useContext(UserContext);

  // pobieranie danych z bazy
  const fetchCourses = async () => {
    try {
      const response = await fetch(url + 'getCoursesAll.php/');
      const courses = await response.json();
      setCourses(courses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // wywołanie metody po pobraniu danych o zalogowanym uzytkowniku
  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (courses.length > 0) {
    return (
      <>
        <main className='courses'>
          <div className='courses__container'>
            <div className='courses__container--title'>
              <h1>Wszystkie kursy</h1>
            </div>
            <div className='courses__container--subtitle'>
              <p>Zarządzaj materiałami i kursami</p>
            </div>
            <div className='courses__container--grid'>
              <div className='courses__grid'>
                {/* iteruje przez wszystkie kursy */}
                {courses.map((course) => {
                  const {
                    id,
                    author,
                    author_id,
                    title,
                    description,
                    price,
                    image,
                  } = course;

                  return (
                    // renderowanie pojedyńczych komponentów z przekazaniem danych
                    <CourseCard
                      key={id}
                      id={id}
                      author={author}
                      author_id={author_id}
                      title={title}
                      description={description}
                      price={price}
                      isAuthor={true}
                      img={url + 'images/courses/' + image}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </main>
      </>
    );
  } else {
    return (
      <>
        <main className='courses'>
          <div className='courses__container'>
            <div className='courses__container--title'>
              <h1>Moje Kursy</h1>
            </div>
            <div className='courses__container-link'>
              <a href='/utworz-kurs' className='courses__link'>
                Kliknij tutaj, aby stworzyć swój pierwszy kurs
              </a>
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default AdminCourses;
