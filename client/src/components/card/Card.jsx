import React from 'react'

// Imagen de la bandera
// Nombre
// Continente

export default function Card({name,continent,imagen}) {
  return (
    <div>
        <h3>{name}</h3>
        <h5>{continent}</h5>
        <img src={imagen} alt="img not found" with="200px" height="150px"/>
    </div>
  )
}
