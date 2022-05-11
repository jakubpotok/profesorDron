/** @format */

import React from 'react';
import './useraccount.css';
import { useState, useEffect, useContext } from 'react';
import LoadingPage from './LoadingPage';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import UserAccountEdit from './UserAccountEdit';

const UserAccount = () => {
  const { user } = useContext(UserContext);
  const url = 'http://localhost/szkolenia-drony/';

  const [isLoading, setIsLoading] = useState(true);
  const [userRole, setUserRole] = useState('');
  const [teacherApplication, setTeacherApplication] = useState(false);
  const [inputMoney, setInputMoney] = useState(0);
  const [errMsg, setErrMsg] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);
  const [userEditInfo, setUserEditInfo] = useState(['', '', '']);

  // ustawia role użytkownika po wczytaniu danych o użytkowniku
  useEffect(() => {
    setUserRole(
      user.role == 2
        ? 'Administrator'
        : user.role == 1
        ? 'Nauczyciel'
        : 'Użytkownik',
    );
    fetchTeacherApplication();
  }, [user]);

  // pobieranie danych z bazy
  const fetchTeacherApplication = async () => {
    try {
      const response = await fetch(
        url + 'getUserTeacherApplication.php?data=' + user.id,
      );
      const application = await response.json();
      if (application.length > 0) {
        setTeacherApplication(true);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const editUserInfo = (id, name, email) => {
    setUserEditInfo([id, name, email]);
    const userEditModal = document.getElementById('user-edit-modal');
    userEditModal.style.display = 'block';
  };

  // wysyła podanie o zdobyciu roli nauczyciel
  const becomeTeacher = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        'Czy na pewno chcesz złożyć podanie o zostanie nauczycielem?',
      )
    ) {
      const data = new FormData();
      data.append('user_id', user.id);
      data.append('username', user.name);

      const becomeTeacher = async () => {
        axios
          .post(url + 'createTeacherApplication.php/', data)
          .then((response) => {
            console.log(response.data);
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      becomeTeacher();
    }
  };

  // odpowiada za dodanie użytkownikowi pieniędzy
  const getMoney = (e) => {
    e.preventDefault();
    console.log(typeof inputMoney);

    if (isNaN(inputMoney)) {
      setSuccessMsg(false);
      setErrMsg('Podana musi być liczba dodatnia');
    } else if (inputMoney <= 0) {
      console.log('< 0');
      setSuccessMsg(false);
      setErrMsg('Liczba musi być dodatnia');
    } else if (inputMoney > 1000) {
      console.log('> 1000');
      setSuccessMsg(false);
      setErrMsg('Maksymalnie możesz doładować 1000 zł');
      return;
    } else if (inputMoney > 0 && inputMoney <= 1000) {
      console.log('in');
      const data = JSON.stringify({
        input_money: inputMoney,
        user_id: user.id,
      });
      console.log(data);
      const addMoneyToAccount = async () => {
        axios
          .post(url + 'addMoneyToAccount.php/', data)
          .then((response) => {
            setErrMsg(false);
            setSuccessMsg('Dodano fundusze do konta');
            window.location.reload(true);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      addMoneyToAccount();
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  // po pobraniu danych o użytkowniku
  if (user) {
    return (
      <>
        <UserAccountEdit
          userId={userEditInfo[0]}
          name={userEditInfo[1]}
          email={userEditInfo[2]}
        />
        <main className='user-account__main'>
          <div className='user-account__container'>
            <div className='user-account'>
              <div className='user-account__info'>
                <div className='user-account__info-container'>
                  <p className='user-account-logged-as'>Twój profil</p>
                  <div className='user-account__underline'></div>
                  <h1 className='user-account__username'>{user.name}</h1>
                  <p className='user-account__role'>
                    Status:{' '}
                    {user.role != 2 ? (
                      <span id='user-role'>{userRole}</span>
                    ) : (
                      <span id='user-admin'>{userRole}</span>
                    )}
                  </p>
                  <p className='user-account__email'>
                    Email: <span id='user-email'>{user.email}</span>
                  </p>
                  <button
                    onClick={() => editUserInfo(user.id, user.name, user.email)}
                    className='user-account__change-email-button'
                  >
                    Edytuj informacje o koncie
                  </button>
                  <p className='user-account__money'>
                    Dostępne fundusze:{' '}
                    <span id='user-money'>{user.money} zł</span>
                  </p>
                  <div className='user-account__get-money'>
                    <p className='user-account__get-money-title'>
                      Doładuj konto:
                    </p>
                    <div className='user-account__get-money-input-container'>
                      <input
                        type='text'
                        onChange={(e) => setInputMoney(e.target.value)}
                        className='user-account__get-money-input'
                      />
                      <button
                        onClick={getMoney}
                        className='user-account__get-money-button'
                      >
                        Doładuj
                      </button>
                      {successMsg && (
                        <div className='user-account__get-money-success-msg'>
                          {successMsg}
                        </div>
                      )}
                      {errMsg && (
                        <div className='user-account__get-money-err-msg'>
                          {errMsg}
                        </div>
                      )}
                    </div>
                    {getMoney}
                  </div>
                </div>
              </div>
              <div className='user-account__underline'></div>
              {user.role == 0 && (
                <>
                  <div className='user-account__manage-account'>
                    <div className='user-account__manage-buttons'>
                      <div className='user-account__become-teacher'>
                        {!teacherApplication ? (
                          <>
                            <p className='user-account__become-teacher-text'>
                              Złóż podanie o zostanie{' '}
                              <span id='become-teacher-text'>nauczycielem</span>
                            </p>
                            <button
                              onClick={becomeTeacher}
                              className='user-account_become-teacher-button'
                            >
                              Zostań nauczycielem
                            </button>
                          </>
                        ) : (
                          <>
                            <p className='user-account__become-teacher-text'>
                              Podanie o zostanie nauczycielem zostało już
                              złożone i jest w oczekiwaniu na decyzje
                              administratora
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </>
    );
  }
};

export default UserAccount;
