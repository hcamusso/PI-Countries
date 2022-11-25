import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { getCountries, getCountriesByName } from '../../actions/index'
import style from './searchCountry.module.css'

export default function SearchCountry() {
  const dispatch = useDispatch()
  let [country,setCountry] = useState('')

  function handleChange(e) {
    e.preventDefault();
    setCountry(e.target.value);
  }
  function handleSubmit(e) {//maneja el submit del formulario de busqueda de pais
    e.preventDefault();
    // setCurrentPage(1);
    try {
      if (country.length) {
        
         dispatch(getCountriesByName(country));
         setCountry('');

      } else {
        alert('You must write a name of a country')
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  function handleChargeAllCountries(e){//carga nuevamente todos los paises
    e.preventDefault();

    dispatch(getCountries());
  }

  return (
        <form className={style.search}>
          <input className={style.input}
            type="text"
            placeholder="Search Country..."
            value={country}
            onChange={handleChange}
          />
          <button className={style.searchCountry} type="Submit" onClick={handleSubmit} > Search Country </button>
          {/* boton para cargar todos los paises */}
          

            <button className={style.allCountries} onClick={handleChargeAllCountries}> Charge all Countries </button>


   
        </form>
      );
  
}
