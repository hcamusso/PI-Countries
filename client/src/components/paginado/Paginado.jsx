import React from 'react'
import style from './paginado.module.css'

export default function Paginado({countriesPerPage,allCountries,paginate}) {
    const pageNumber = [];
    let totalPage = (Math.ceil((allCountries-9)/countriesPerPage))+1;
    for (let index = 1; index <= totalPage; index++) {
        pageNumber.push(index);
        }

    return (
    <nav className={style.paginado}>
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
