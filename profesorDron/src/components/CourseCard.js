/** @format */

import React from 'react';
import './coursecard.css';

const CourseCard = ({
  id,
  title,
  img,
  author,
  authorId,
  price,
  isAuthor,
  expireDate,
}) => {
  const singleCourseLink = `/kurs/${id}`;
  const manageCourseLink = `/zarzadzaj-kursem/${id}`;

  return (
    <>
      <div className='coursecard'>
        <div className='coursecard__thumbnail-row'>
          <img src={img} alt='' className='coursecard__thumbnail' />
        </div>
        <div className='coursecard__info'>
          <p className='coursecard__title'>
            {title.length <= 50 ? title : `${title.substring(0, 45)}...`}
          </p>
          <div className='coursecard__underline'></div>
          <p className='coursecard__author-info'>
            Autor:{' '}
            <a href={'/nauczyciel/kursy/' + authorId}>
              <span className='coursecard__author'>{author}</span>
            </a>
          </p>
          <div className='coursecard__footer'>
            {/* <p className='coursecard__price'>
              {price > 0 ? `Cena: ${price} zł` : 'Za darmo'}
            </p> */}
            {!expireDate && (
              <p className='coursecard__price'>
                {price > 0 ? `Cena: ${price} zł` : 'Za darmo'}
              </p>
            )}
          </div>
          {!isAuthor && !expireDate && (
            <a href={singleCourseLink}>
              <button className='coursecard__button'>Zapisz się</button>
            </a>
          )}
          {isAuthor && (
            <a href={manageCourseLink}>
              <button className='coursecard__manage-course--btn'>
                Zarządzaj kursem
              </button>
            </a>
          )}
          {expireDate && (
            <>
              <a href={singleCourseLink}>
                <button className='coursecard__button'>Przeglądaj kurs</button>
              </a>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CourseCard;
