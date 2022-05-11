/** @format */

import React from 'react';
import './courses.css';
import './usercourses.css';
import CourseCard from './CourseCard';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const CoursesByTeacher = () => {
  //ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';
  const { id } = useParams();

  // pobieranie danych z bazy
  const fetchCourses = async () => {
    try {
      const response = await fetch(url + 'getCoursesByTeacher.php?data=' + id);
      const courses = await response.json();
      setCourses(courses);
      console.log(courses);
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
              <h1>
                Kursy nauczyciela <span>{courses[0].author}</span>
              </h1>
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
                      author_id={author_id}
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
              <h1>Ten użytkownik nie stworzył jeszcze żadnego kursu</h1>
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default CoursesByTeacher;
