/** @format */

import { useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Register from './components/Register';
import Courses from './components/Courses';
import CourseCreate from './components/CourseCreate';
import PageNotFound from './components/PageNotFound';
import CourseSingle from './components/CourseSingle';
import LoadingPage from './components/LoadingPage';
import TeacherCourses from './components/TeacherCourses';
import CourseManage from './components/CourseManage';
import CourseEventCreate from './components/CourseEventCreate';
import UserCourses from './components/UserCourses';
import UserAccount from './components/UserAccount';
import AdminTeacherApplications from './components/AdminTeacherApplications';
import UserCalendar from './components/UserCalendar';
import AdminCourses from './components/AdminCourses';
import AdminManageTeachers from './components/AdminManageTeachers';
import TeacherEventsCalendar from './components/TeacherEventsCalendar';
import CoursesByTeacher from './components/CoursesByTeacher';

function App() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    document.title = 'profesorDron';
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='*' element={<PageNotFound />} />
        <Route path='/' element={<Homepage />} />
        <Route path='/kursy' element={<Courses />} />
        <Route path='/kurs/:id' element={<CourseSingle />} />
        <Route path='/nauczyciel/kursy/:id' element={<CoursesByTeacher />} />
        <Route path='/loading' element={<LoadingPage />} />

        {/* Jeżeli użytkownik nie jest zalogowany: */}
        {!user && (
          <>
            <Route path='/zaloguj' element={<Login />} />
            <Route path='/zarejestruj' element={<Register />} />
          </>
        )}
        {user && user.role != 0 && (
          <>
            {<Route path='/utworz-kurs' element={<CourseCreate />} />}
            <Route path='/zarzadzaj-kursami' element={<TeacherCourses />} />
            <Route path='/zarzadzaj-kursem/:id' element={<CourseManage />} />
            <Route
              path='/zarzadzaj-wydarzeniami'
              element={<TeacherEventsCalendar />}
            />
          </>
        )}
        {user && user.role == 2 && (
          <>
            <Route
              path='/podania-nauczyciel'
              element={<AdminTeacherApplications />}
            />
            <Route
              path='/zarzadzaj-wszystkimi-kursami'
              element={<AdminCourses />}
            />
            <Route
              path='/zarzadzaj-nauczycielami'
              element={<AdminManageTeachers />}
            />
          </>
        )}
        {/* Jeżeli użytkownik jest zalogowany: */}
        {user && (
          <>
            {<Route path='/kalendarz' element={<UserCalendar />} />}
            {<Route path='/moje-kursy' element={<UserCourses />} />}
            {<Route path='/moje-konto' element={<UserAccount />} />}
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
