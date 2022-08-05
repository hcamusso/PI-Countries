import React from 'react'
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

import { getCountries, getActivities, oderCountries, filterCountriesByContinent, filterCountriesByActivity } from '../../actions/index'
import style from './home.module.css'
import Card from '../card/Card'
import Paginado from '../paginado/Paginado'
import SearchCountry from '../searchCountry/SearchCountry'


export default function Home() {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.filteredCountries) // es similar a map.state to props este es el arreglo de todos los countries
    // para el filtro por actividad
    const allActivities = useSelector((state) => state.activities)
    //estado local orden para marcar el cambio de ordenamiento
    const [orden, setOrden] = useState('');
    if (orden) {}//uso orden en un if que no hace nada solo para que no tire el warning
   //creamos estados locales para paginado
    const [currentPage,setCurrentPage]=useState(1)
    const [countriesPerPage,setCountriesPerPage]=useState(10)// OJO para la primer pagina solo mostrar 9, no 10.


      let offSet =(currentPage - 1) * countriesPerPage + 9 //9, 19,29,39,49
      let indexOfFirstCountry = 0
      if (currentPage > 1) {
        indexOfFirstCountry = offSet - countriesPerPage//9,19,29
      }
     
    const currentCountries = allCountries.slice(indexOfFirstCountry,offSet) //el arreglo de los paises de la pagina actual
    const paginate = (pageNumber) => (setCurrentPage(pageNumber))//le pasa el valor al estado local de la pagina actual
    //cuando el componente se monta, traigo todos los paises y todas las actividades.
    const [countriesMonted,setCountriesMonted] = useState () 
    useEffect(() => {
      
      dispatch(getCountries());
      setCountriesMonted('true');
      

    },[dispatch])//este segundo parametro es por si necesito dependencias

      useEffect(() => {

      dispatch(getActivities());

      document.getElementById("orderBy").selectedIndex = 0;
      document.getElementById("filterContinent").selectedIndex = 0;
      document.getElementById("filterActivity").selectedIndex = 0;
  
    },[dispatch,countriesMonted])//este segundo parametro es por si necesito dependencias
    


    function handleOrder(e){//manejador del ordenamiento
      e.preventDefault();
      if (e.target.value !== "0") {
      
        document.getElementById("filterContinent").selectedIndex = 0;
        document.getElementById("filterActivity").selectedIndex = 0;
        setCurrentPage(1);
        dispatch(oderCountries(e.target.value));
        setOrden(`${e.target.value}`);
      }
    }
    function handleFilterContinent(e){//despacha la accion para filtrar paises por continente
      e.preventDefault();
      if (e.target.value !== "0") {
        document.getElementById("orderBy").selectedIndex = 0;
        document.getElementById("filterActivity").selectedIndex = 0;
        setCurrentPage(1);
        dispatch(filterCountriesByContinent(e.target.value));
        setOrden(`${e.target.value}`);

      }
    }
    function handleFilterActivity(e){//despacha la accion para filtrar por actividad
      e.preventDefault();
      if (e.target.value !== "0") {
        document.getElementById("orderBy").selectedIndex = 0;
        document.getElementById("filterContinent").selectedIndex = 0;

        setCurrentPage(1);
        dispatch(filterCountriesByActivity(e.target.value));
        setOrden(`${e.target.value}`);
      }
    }
  return (
    <div className={style.container}>
      <h1 className={style.titulo}>COUNTRIES</h1>
      <div className={style.navbar}>
        {/* Componente para buscar un pais */}
        <SearchCountry />
        <Link to='/createactivity' className={style.createActivity}>Create Tourist Activity</Link>


        <div className={style.orden}>
          {/* ordenamiento */}
          <select id="orderBy" onChange={e => handleOrder(e)}>
            <option disabled value="0">Order by...</option>
            <option value='asc'>Alphabetically ascending</option>
            <option value='desc'>Alphabetically Descending</option>
            <option value='popAsc'>Population in ascending order</option>
            <option value='popDesc'>Population in descending order</option>
          </select>
        </div>
        <div className={style.filtradoContinente}>
          {/* filtrado  por continente */}
          <select id="filterContinent" onChange={e => handleFilterContinent(e)}>
            <option disabled value='0'>Continent...</option>
            <option value='all'>All Continents</option>
            <option value='Africa'>Africa</option>
            <option value='Americas'>Americas</option>
            <option value='Antarctic'>Antarctic</option>
            <option value='Asia'>Asia</option>
            <option value='Europe'>Europa</option>
            <option value='Oceania'>Oceania</option>
          </select>
        </div>  
         {/* filtrado por actividad  */}
        <div className={style.filtradoActividad}>
          <select id="filterActivity" onChange={(e) => handleFilterActivity(e)}>
                      <option disabled value ="0">Activity...</option>
                  {allActivities.map((activity) => (
                      <option value={activity.name} key={activity.ID}>{activity.name}</option>
                  ))}
          </select> 
        </div>  
      </div>
             
      
      <div>
          <Paginado 
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate = {paginate}/>
      </div>
        

    {/* //renderiza las Card de cada pais */}
        <div className={style.cards}> 
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
            {!currentCountries && alert('Not country')}
        </div>

        <div>
          <Paginado 
          countriesPerPage={countriesPerPage}
          allCountries={allCountries.length}
          paginate = {paginate}/>
      </div>

    </div>
  )
}
