import React from 'react'
import {Link} from 'react-router-dom'
import style from './landingPage.module.css'

export default function LandingPage() {
  return (

    <div className={style.main}>
      <Link to='/home'>
        <div>
            <h1 className={style.tittle}>
            Countries of the WORLD 
            </h1>
            <button className={style.enter}>Enter</button>
        </div>
      </Link>
    </div>
  )
}
