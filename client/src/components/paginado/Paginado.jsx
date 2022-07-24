import React from 'react'
import style from './paginado.module.css'

export default function Paginado({countriesPerPage,allCountries,paginate}) {
    const pageNumber = []
    for (let index = 1; index <= Math.ceil(allCountries/countriesPerPage); index++) {
        pageNumber.push(index);
        }

    return (
    <nav>
        <ul className={style.botonPagina}> 
            { pageNumber && pageNumber.map(n => (

                <li key={n}> 
                    <button onClick ={() => paginate(n)}>{n}</button>
                </li>
            )
            )}
        </ul>
    </nav>
  )
}
