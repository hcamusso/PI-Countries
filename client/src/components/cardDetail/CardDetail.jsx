import React from 'react'
import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Link,useParams,useHistory } from 'react-router-dom'

import { getDetail,dismountDetail,deleteActivity } from '../../actions/index'
import style from './cardDetail.module.css'

export default function CardDetail(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    const {id} = useParams();
    let countryDetail = useSelector((state) => state.countryDetail)
   
    useEffect(() => {
        dispatch(getDetail(id))
        return() => {
            dispatch(dismountDetail())
        }

    }, [dispatch,id])

    if(!countryDetail){
        countryDetail = {
            idCountry: "NOT",
            name: "Not Found",
            imagen: "https://www.seekpng.com/png/detail/212-2123432_404-error-error-404-in-png.png",
            continent: "Not Found",
            capital: "Not Found",
            subregion: "Not Found ",
            area: 0,
            population: 0,
            activities: []
          }
    }

//     Ruta de detalle de país: debe contener

// [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// [ ] Código de país de 3 letras (id)
// [ ] Capital
// [ ] Subregión
// [ ] Área (Mostrarla en km2 o millones de km2)
// [ ] Población
// [ ] Actividades turísticas con toda su información asociada
  return (
    <div>
    <Link to={'/home'}>
        <button className={style.btnBack}>Back to home</button>
    </Link>


        <div>
                <div className={style.detailCard} key={countryDetail.idCountry} >
                    <img className={style.flag} src={countryDetail.imagen} alt="flag" />
                    <h2>{countryDetail.name}</h2>
                    <h3>Code: {countryDetail.idCountry}</h3>
                    <h3>Continent: {countryDetail.continent}</h3>
                    <h3>Capital: {countryDetail.capital}</h3>
                    <h3>Subregion: {countryDetail.subregion}</h3>
                    <h3>Area: {new Intl.NumberFormat().format(countryDetail.area)} km2</h3>
                    <h3>Population: {new Intl.NumberFormat().format(countryDetail.population)} inhabitants</h3>

                    {countryDetail.activities?.map(e => 
                    <div className={style.activities} key={countryDetail.idCountry} >
                        <h4><u>Tourist activity</u> {e.name}</h4>
                        <h5><u>Difficulty:</u> {e.dificultad}</h5>
                        <h5><u>Duration:</u> {e.duracion} hours</h5>
                        <h5><u>Season:</u> {e.temporada}</h5>
                        {/* // boton para delete de una activities */}
                        <button className={style.btnDelete} onClick={ () => {
                            let answer = window.confirm("Really do you want to delete this activity?");
                            if (answer) {
                                    dispatch(deleteActivity(countryDetail.idCountry,e.ID));
                                    history.go('/home/'+countryDetail.idCountry);}                    
                            }}>Delete</button>

                    </div>
                        )}          
                </div>
        </div>
    <Link to={'/home'}>
        <button className={style.btnBack}>Back to home</button>
    </Link>
</div>
  )
}
