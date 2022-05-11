/** @format */

import React from 'react';
import './courses.css';
import './usercourses.css';
import CourseCard from './CourseCard';
import { useContext, useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import { UserContext } from '../context/UserContext';

const UserCourses = () => {
  //ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';
  const { user } = useContext(UserContext);

  // pobieranie danych z bazy
  const fetchCourses = async () => {
    try {
      const response = await fetch(url + 'getUserCourses.php?data=' + user.id);
      const courses = await response.json();
      setCourses(courses);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // wywołanie metody po załadowaniu componentu
  useEffect(() => {
    fetchCourses();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }

  if (courses.length > 0) {
    return (
      <>
        <main className='courses'>
          <div className='courses__container'>
            <div className='courses__container--title'>
              <h1>Twoje szkolenia</h1>
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
                    expireDate,
                  } = course;

                  return (
                    // renderowanie pojedyńczych komponentów z przekazaniem danych
                    <CourseCard
                      key={id}
                      id={id}
                      author={author}
                      authorId={author_id}
                      title={title}
                      description={description}
                      price={price}
                      img={url + 'images/courses/' + image}
                      expireDate={expireDate}
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
              <h1>Nie wykupiłeś jeszcze żadnego kursu</h1>
            </div>
            <div className='courses__container-link'>
              <a href='/kursy' className='courses__link'>
                Kliknij tutaj, aby przeglądać dostępne kursy
              </a>
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default UserCourses;
