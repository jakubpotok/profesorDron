/** @format */

import React from 'react';
import './loadingpage.css';
import ReactLoading from 'react-loading';

const LoadingPage = () => {
  return (
    <main className='loading'>
      <div className='loading__container'>
        <div className='loading__animation'>
          <ReactLoading
            type={'spin'}
            name={'Spin'}
            color={'#2198ff'}
            height={150}
            width={150}
          />
        </div>
      </div>
    </main>
  );
};

export default LoadingPage;
