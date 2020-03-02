import React from 'react';
import s from './Container.module.sass'

function Container({children}) {
    return (
        <div className={s.Container}>
            {children}
        </div>
    )
}

export default Container;
