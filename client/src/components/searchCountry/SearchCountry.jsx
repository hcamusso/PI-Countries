import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { getCountries, getCountriesByName } from '../../actions/index'

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
      } else {
        alert('You must write a name of a country')
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  function handleChargeAllCountries(e){//carga nuevamente todos los paises
    e.preventDefault();
    // setCurrentPage(1);
    dispatch(getCountries());
  }

  return (
        <form>
          <input
            type="text"
            placeholder="Search Country..."
            value={country}
            onChange={handleChange}
          />
          <button type="Submit" onClick={handleSubmit}> Search Country </button>
          {/* boton para cargar todos los paises */}
          <button onClick={e=> {handleChargeAllCountries(e)}}> Charge all Countries </button>
        </form>
      );
  
}
