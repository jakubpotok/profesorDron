/** @format */

import React from 'react';
import './homepage.css';
import { useContext, useState, useEffect } from 'react';
import LoadingPage from './LoadingPage';
import CourseCard from './CourseCard';

const HomePage = () => {
  //ustawianie stanu zmiennych
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [featuredCourse, setFeaturedCourse] = useState({});

  // url api bazy danych
  const url = 'http://localhost/szkolenia-drony/';
  const featuredCourseUrl = `kurs/${featuredCourse.id}`;

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

  // pobieranie wyróżnionego kursu z bazy danych
  const fetchFeaturedCourse = async () => {
    try {
      const response = await fetch(url + 'getCourseSingle.php?data=' + 52);
      const courses = await response.json();
      setFeaturedCourse(courses[0]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  // wywołanie metody po załadowaniu componentu
  useEffect(() => {
    fetchCourses();
    fetchFeaturedCourse();
  }, []);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <main className='homepage'>
        <div className='homepage__container'>
          <section className='homepage__hero'>
            <div className='homepage__hero-grid'>
              <div className='homepage__hero-content'>
                <h1 className='homepage__hero-content-title'>
                  Wznieś się <br />w przestworza<span id='title-dot'>.</span>
                </h1>
                <p className='homepage__hero-content-description'>
                  Doskonal swoje umiejętności jako pilot dronów, odkryj swój
                  potencjał i lataj bez przeszkód!
                </p>
                <div className='homepage__hero-content-button-group'>
                  <a href='/kursy'>
                    <button className='homepage__hero-content-button'>
                      Przeglądaj dostępne kursy
                    </button>
                  </a>
                </div>
              </div>
              <div className='homepage__hero-illustration'>
                <div className='homepage__hero-image-container'>
                  <img
                    className='homepage__hero-img'
                    src='https://149355317.v2.pressablecdn.com/wp-content/uploads/2017/12/drones-professional-training.jpg'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </section>
          <section className='homepage__latest-courses'>
            <div className='homepage__container-title'>
              <h1>Najnowsze kursy</h1>
            </div>
            <div className='homepage__container-courses'>
              <div className='homepage__courses-grid'>
                {courses.slice(0, 4).map((course) => {
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
                    <CourseCard
                      key={id}
                      id={id}
                      author={author}
                      authorId={author_id}
                      title={title}
                      description={description}
                      price={price}
                      img={url + 'images/courses/' + image}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* Jeżeli wyróżniony kurs istnieje to wyświetla sekcje */}
          {featuredCourse && (
            <>
              <section className='homepage__featured-course'>
                <div className='homepage__featured-course-section-title'>
                  <h1>Wyróżniony kurs</h1>
                </div>
                <div className='homepage__featured-course-container'>
                  <div className='single-course'>
                    <div className='homepage__featured-course-info'>
                      <div className='homepage__featured-course-left-side'>
                        <h1 className='homepage__featured-course-title'>
                          {featuredCourse.title}
                        </h1>
                        <p className='homepage__featured-course-description'>
                          {featuredCourse.description}
                        </p>
                        <p className='homepage__featured-course-author'>
                          Autor kursu:{' '}
                          <a
                            href={
                              '/nauczyciel/kursy/' + featuredCourse.author_id
                            }
                          >
                            {featuredCourse.author}
                          </a>
                        </p>
                        <p className='homepage__featured-course-price-tag'>
                          Cena:{' '}
                          <span className='homepage__featured-course-price'>
                            {featuredCourse.price} zł
                          </span>
                        </p>

                        <a href={featuredCourseUrl}>
                          <button className='homepage__featured-course-sign-up-btn'>
                            Przejdź do strony kursu
                          </button>
                        </a>
                      </div>
                      <div className='homepage__featured-course-right-side'>
                        <img
                          src={url + 'images/courses/' + featuredCourse.image}
                          alt=''
                          className='homepage__featured-course-image'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
