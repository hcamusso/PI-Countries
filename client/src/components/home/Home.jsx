import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import { getCountries, getActivities, oderCountries, filterCountriesByContinent, filterCountriesByActivity } from '../../actions/index'
import style from './home.module.css'
import Card from '../card/Card'
import Paginado from '../paginado/Paginado'


export default function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.filteredCountries) // es similar a map.state to props este es el arreglo de todos los countries
    // para el filtro por actividad
    const allActivities = useSelector((state) => state.activities)
   //creamos estados locales para paginado
    const [currentPage,setCurrentPage]=useState(1)
    const [countriesPerPage,setCountriesPerPage]=useState(10)// OJO para la primer pagina solo mostrar 9, no 10.
    // if (currentPage === 1) { revisar no funciona
    //     setCountriesPerPage(9)
    // }
    let offSet =currentPage * countriesPerPage //10
    let indexOfFirstCountry = offSet - countriesPerPage//0

    const currentCountries = allCountries.slice(indexOfFirstCountry,offSet) //el arreglo de los paises de la pagina actual
    const paginate = (pageNumber) => (setCurrentPage(pageNumber))//le pasa el valor al estado local de la pagina actual
    //cuando el componente se monta, traigo todos los paises y todas las actividades.

    useEffect(() => {
      dispatch(getActivities());
    }, [dispatch]);
    useEffect (()=>{
      dispatch(getCountries());
    },[dispatch])//este segundo parametro es por si necesito dependencias
    

    function handleClick(e){//carga nuevamente todos los paises
      e.preventDefault();
      setCurrentPage(1);
      dispatch(getCountries());
    }
    function handleOrder(e){//manejador del ordenamiento
      e.preventDefault();
      setCurrentPage(1);
      dispatch(oderCountries(e.target.value));
    }
    function handleFilterContinent(e){//despacha la accion para filtrar paises por continente
      e.preventDefault();
      setCurrentPage(1);
      dispatch(filterCountriesByContinent(e.target.value));
    }
    function handleFilterActivity(e){//despacha la accion para filtrar por actividad
      e.preventDefault();
      setCurrentPage(1);
      dispatch(filterCountriesByActivity(e.target.value));
    }
  return (
    <div>
        <h1 className={style.color}>COUNTRIES</h1>
        <Link to='/activity' className={style.color}>create tourist activity</Link>
        {/* boton para cargar todos los paises */}
        <button onClick={e=> {handleClick(e)}}>
          Charge all Countries
        </button>

        <div>
          {/* ordenamiento */}
          <select onChange={e => handleOrder(e)}>
            <option value='asc'>Alphabetically ascending</option>
            <option value='desc'>Alphabetically Descending</option>
            <option value='popAsc'>Population in ascending order</option>
            <option value='popDesc'>Population in descending order</option>
          </select>
          {/* filtrado  por continente */}
          <select onChange={e => handleFilterContinent(e)}>
            <option value='all'>All Continents</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Antarctic'>Antarctic</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europa</option>
            <option value='Oceania'>Oceania</option>
          </select>
         {/* filtrado por actividad  */}
      <div>
        <select onChange={(e) => handleFilterActivity(e)}>
                  {allActivities.map((activity) => (
                      <option value={activity.name}>{activity.name}</option>
                  ))}
        </select> 

      </div>  
    

          <Paginado 
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate = {paginate}/>
        </div>


    {/* //renderiza las Card de cada pais */}
        <div className={style.conteinerCards}> 
            {currentCountries && currentCountries.map ( el => {
                return(
                <div key={el.idCountry}>
                    <Link to={'/home/'+el.idCountry}>
                        <Card name={el.name} continent={el.continent} imagen={el.imagen}/>
                    </Link>
                </div>
                )
                })
            }
        </div>

    </div>
  )
}
