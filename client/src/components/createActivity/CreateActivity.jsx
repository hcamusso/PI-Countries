import React from 'react';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import {postActivity,getCountries} from '../../actions/index';
import {validate} from '../createActivity/validate';
import style from './createActivity.module.css';

//AQUÍ COMIENZA NUESTRO COMPONENTE.
export default function CreateActivity() {
    const dispatch = useDispatch();
    const history = useHistory();
    const allCountries = useSelector((state) => state.countries)
    const [input, setInput] = useState({
        name: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        countries:[]
    })
    const [errors,setErrors] = useState({
        name: "",
        dificultad: "",
        duracion: "",
        temporada: "",
        countries:[]
    });
    // const [created,setCreated] = useState()
    // let created = false

//manejadores de los inputs
    function handleChange(e) {
        setInput((prevState) => {
            //creo un nuevo estado transitorio
            const newState = {
              ...prevState,
              [e.target.name]: e.target.value,
            };
            //valido los errores de mi nuevo estado transitorio
            setErrors(validate(newState))
      
            //devuelvo el nuevo estado
            return newState
          });

    }
//manejador del ckeckbox
    function handleCheck(evento){
        if(evento.target.checked){
            setInput({
                ...input,
                temporada: evento.target.value
            });
            setErrors(validate({
                ...input,
                temporada: evento.target.value
              }));
        }
    }
//manejador del select
    function handleSelect(evento){
       if (evento.target.value !== 'pais') {
           setInput({
               ...input,
               countries: [...input.countries,evento.target.value]
           })
           setErrors(validate({
               ...input,
               countries: [...input.countries,evento.target.value]
             }));
       }      
    }


//manejador del submit
    function handleSubmit(evento){
        evento.preventDefault();
        if(input.name && input.dificultad && input.duracion && input.temporada && input.countries.length > 0 
            &&!errors.name && !errors.dificultad &&!errors.duracion && !errors.temporada && !errors.countries){
                
            try {
                dispatch(postActivity(input))
                setInput({
                    name: "",
                    dificultad: "",
                    duracion: "",
                    temporada: "",
                    countries:[]
                })

                setErrors(validate({
                    ...input,
                }))
                history.go('/createactivity')
   

            } catch (error) {
                alert('The activity was not created, there are errors in the load',{errors})
            }
                
            } else {
                 alert('The activity was not created, there are errors in the load',{errors})
            }
            
    }
//al montar el componente se cargan los paises
    useEffect(()=> {
        dispatch(getCountries());
    },[dispatch]);


    return(
        <div className={style.container}>
            <Link to= '/home'><button>Back to home</button></Link>
            <h1>Create the tourist activity</h1>
            <form onSubmit={(evento)=>handleSubmit(evento)}>
                <div className={style.touristActivity}>
                    <label>Tourist activity:</label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    placeholder='insert...'
                    />
                    <p>{errors.name || ''}</p>
                </div>
                <div className={style.difficulty}>
                    <label>Difficulty:</label>
                    <input
                    type= "number"
                    value= {input.dificultad}
                    name= "dificultad"
                    onChange={handleChange}
                    placeholder= '1..5'
                    />
                    <p>{errors.dificultad || ''}</p>
                </div>
                <div className={style.duration}>
                    <label>Duration:</label>
                    <input
                    type= "number"
                    value= {input.duracion}
                    name= "duracion"
                    onChange={handleChange}
                    placeholder= '1..10'
                    />
                    <p>{errors.duracion || ''}</p>
                </div>
                <div className={style.selectTemporada}>
                    <label>Season:</label>
                    <label> <input type= "radio" value= "Verano" name= "temporada" onChange={(evento)=>handleCheck(evento)}/>Summer </label>
                    <label> <input type= "radio" value= "Otoño" name= "temporada" onChange={(evento)=>handleCheck(evento)}/>Autumn </label>
                    <label> <input type= "radio" value= "Invierno" name= "temporada" onChange={(evento)=>handleCheck(evento)}/>Winter </label>
                    <label> <input type= "radio" value= "Primavera" name= "temporada" onChange={(evento)=>handleCheck(evento)}/>Spring </label>
                    <p>{errors.temporada || ''}</p>
                </div>
                <div className={style.selectCountries}>
                    <select onChange={(evento) => handleSelect(evento)}>
                        <option value="pais">Country...</option>
                        {allCountries.map((country) => (
                        <option value={country.idCountry} key={country.idCountry}>{country.name}</option>
                    ))}
                     </select>
                    <p>{errors.countries || ''}</p>

                </div>
                <ul><li>{input.countries.map(el => el + ", ")}</li></ul>
                <button disabled= {!errors.name && !errors.dificultad && !errors.duracion && !errors.temporada && !errors.countries? false : true} type='submit'>Create Tourist Activity</button>
                
            {/* {created && <Redirect to={'/home'}/>} */}
            </form>
        </div>
    )
}