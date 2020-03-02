import React from 'react';
import s from './Input.module.sass'

function Input({loadingPhotos}) {
  
  return (
    <div className={s.Input}>
      <form onSubmit={loadingPhotos} >
        <input type='text' name='url' />
        <button type='submit'>Загрузить</button>
      </form>
    </div>
  )
}

export default Input;
