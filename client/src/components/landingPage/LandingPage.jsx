import React from 'react'
import {Link} from 'react-router-dom'
import style from './landingPage.module.css'

export default function LandingPage() {
  return (

    <div className={style.body}>
    <Link to='/home'>

        <div>
            <h1>
            Countries of the WORLD 
            </h1>
        </div>
    </Link>
    </div>
  )
}
