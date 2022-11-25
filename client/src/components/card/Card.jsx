import React from 'react'
import style from './card.module.css'

// Imagen de la bandera
// Nombre
// Continente

export default function Card({name,continent,imagen}) {
  return (
    <div className={style.cards} key={name}>
        <h3>{name}</h3>
        <h5>{continent}</h5>
        <img src={imagen} alt="img not found"/>
    </div>
  )
}