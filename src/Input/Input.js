import React from 'react';
import s from './Input.module.sass'

function Input() {
  
  return (
    <div className={s.Input}>
        <input type='text' />
        <button>Загрузить</button>
    </div>
  )
}

export default Input;
